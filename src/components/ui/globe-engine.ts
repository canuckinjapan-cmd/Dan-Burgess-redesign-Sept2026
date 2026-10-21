// Custom WebGL Globe Engine
// Features:
// 1. Zero outside glow (transparent pixels outside the sphere)
// 2. No inside white glow (clean uniform shaded surface)
// 3. Fuzzy outside edge (smoothstep alpha transition at silhouette rim)
// 4. Surface-tangent markers (foreshortened into ellipses conformed to the 3D sphere curvature, strictly bound to surface <= 0.8, never sticking out)
// 5. Horizon fade (smoothly dissolves as it approaches the horizon, zero popping)

export interface Marker {
  location: [number, number];
  size: number;
  color?: [number, number, number];
  id?: string;
}

export interface Arc {
  from: [number, number];
  to: [number, number];
  color?: [number, number, number];
  id?: string;
}

export interface GlobeOptions {
  width: number;
  height: number;
  phi: number;
  theta: number;
  mapSamples: number;
  mapBrightness: number;
  mapBaseBrightness?: number;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor?: [number, number, number];
  markers?: Marker[];
  diffuse: number;
  devicePixelRatio?: number;
  dark: number;
  opacity?: number;
  offset?: [number, number];
  scale?: number;
  context?: WebGLContextAttributes;
  arcs?: Arc[];
  arcColor?: [number, number, number];
  arcWidth?: number;
  arcHeight?: number;
  markerElevation?: number;
  enableRoutes?: boolean;
  routesStage?: 'A' | 'B';
}

export interface GlobeInstance {
  update: (state: Partial<GlobeOptions>) => void;
  destroy: () => void;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s;
  gl.deleteShader(s);
  return null;
}

function createProgram(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (gl.getProgramParameter(p, gl.LINK_STATUS)) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return p;
  }
  gl.deleteProgram(p);
  return null;
}

function getUniforms(gl: WebGLRenderingContext, p: WebGLProgram, names: string[]) {
  const map: Record<string, WebGLUniformLocation | null> = {};
  for (const n of names) map[n] = gl.getUniformLocation(p, n);
  return map;
}

function getAttribs(gl: WebGLRenderingContext, p: WebGLProgram, names: string[]) {
  const map: Record<string, number> = {};
  for (const n of names) map[n] = gl.getAttribLocation(p, n);
  return map;
}

const { PI, sin, cos } = Math;

function toSphere([lat, lng]: [number, number]) {
  const r = (lat * PI) / 180;
  const a = (lng * PI) / 180 - PI;
  const o = cos(r);
  return [-o * cos(a), sin(r), o * sin(a)] as [number, number, number];
}

const VS_QUAD = `attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}`;

// Sphere Fragment Shader with fuzzy rim fade, zero outside glow, and no inside white rim
const FS_SPHERE = `precision highp float;
uniform vec2 t,v,s;
uniform vec3 F,w;
uniform vec4 n;
uniform float k,x,y;
uniform sampler2D z;
float u;
mat3 A(float a,float b){
  float c=cos(a),d=cos(b),e=sin(a),f=sin(b);
  return mat3(d,f*e,-f*c,0.0,c,e,f,d*-e,d*c);
}
vec3 B(vec3 c,out float G){
  c=c.xzy;
  float q=max(2.0,floor(log2(2.236068*k*3.141593*(1.0-c.z*c.z))*.72021));
  vec2 g=floor(pow(1.618034,q)/2.236068*vec2(1.0,1.618034)+.5),
       d=fract((g+1.0)*.618034)*6.283185-3.883222,
       e=-2.0*g,
       f=vec2(atan(c.y,c.x),c.z-1.0),
       r=floor(vec2(e.y*f.x-d.y*(f.y*k+1.0),-e.x*f.x+d.x*(f.y*k+1.0))/(d.x*e.y-e.x*d.y));
  float o=3.141593;
  vec3 C;
  for(float h=0.0;h<4.0;h+=1.0){
    vec2 D=vec2(mod(h,2.0),floor(h*.5));
    float j=dot(g,r+D);
    if(j>k)continue;
    float a=j,b=0.0;
    if(a>=16384.0){a-=16384.0;b+=.868872;}
    if(a>=8192.0){a-=8192.0;b+=.934436;}
    if(a>=4096.0){a-=4096.0;b+=.467218;}
    if(a>=2048.0){a-=2048.0;b+=.733609;}
    if(a>=1024.0){a-=1024.0;b+=.866804;}
    if(a>=512.0){a-=512.0;b+=.433402;}
    if(a>=256.0){a-=256.0;b+=.216701;}
    if(a>=128.0){a-=128.0;b+=.108351;}
    if(a>=64.0){a-=64.0;b+=.554175;}
    if(a>=32.0){a-=32.0;b+=.777088;}
    if(a>=16.0){a-=16.0;b+=.888544;}
    if(a>=8.0){a-=8.0;b+=.944272;}
    if(a>=4.0){a-=4.0;b+=.472136;}
    if(a>=2.0){a-=2.0;b+=.236068;}
    if(a>=1.0){a-=1.0;b+=.618034;}
    float l=fract(b)*6.283185,i=1.0-2.0*j*u,m=sqrt(1.0-i*i);
    vec3 p=vec3(cos(l)*m,sin(l)*m,i);
    float E=length(c-p);
    if(E<o){o=E;C=p;}
  }
  G=o;
  return C.xzy;
}
void main(){
  u=1.0/k;
  vec2 c=1.0/t,b=(gl_FragCoord.xy*c*2.0-1.0)/x-v*vec2(1.0,-1.0)*c;
  b.x*=t.x*c.y;
  float a=dot(b,b);
  float dist=sqrt(a);
  if(dist<=0.80){
    float g;
    vec3 h=normalize(vec3(b,sqrt(max(0.0,0.64-a))));
    mat3 o=A(s.y,s.x);
    float i=h.z;
    vec3 d=B(h*o,g);
    float j=asin(d.y),e=acos(-d.x/cos(j));
    e=d.z<0.0?-e:e;
    float p=max(texture2D(z,vec2(e*0.5/3.141593,-(j/3.141593+0.5))).x,y),
          q=p*smoothstep(0.008,0.0,g)*pow(max(0.0,i),n.y)*n.x;
    // 1. 3D Spherical Gradation:
    // Pure neutral grey (R = G = B) with no blue cast:
    float tGrad=pow(clamp(i,0.0,1.0),0.38);
    vec3 centerColor=F*vec3(1.15,1.15,1.15);
    vec3 rimColor=F*vec3(0.88,0.88,0.88);
    vec3 sphereSurface=mix(rimColor,centerColor,tGrad);
    // 2. Dark continent dots on the grey sphere surface (pure neutral dark grey, R = G = B):
    vec3 dotColor=vec3(0.18,0.18,0.18);
    vec3 surf=mix(sphereSurface,dotColor,clamp(q*1.15,0.0,1.0));
    // 3. Soft fuzzy edge: becoming transparent at the outside edge
    float edgeAlpha=smoothstep(0.80,0.73,dist);
    gl_FragColor=vec4(surf,edgeAlpha);
  }else{
    // Completely transparent outside: NO outside glow!
    gl_FragColor=vec4(0.0,0.0,0.0,0.0);
  }
}`;

// Marker Vertex Shader: Tangent surface-conforming, horizon fade, zero stick-out
const VS_MARKER = `attribute vec2 n;
attribute vec3 p,w;
attribute float q,x;
uniform vec2 b,r;
uniform float i,j,k,s;
varying vec2 m;
varying vec3 g;
varying float h;
varying float vFade;
void main(){
  float c=cos(j),d=sin(j),e=cos(i),f=sin(i);
  // Surface level at radius 0.8:
  vec3 a=p*0.8;
  vec3 l=vec3(
    e*a.x+f*a.z,
    f*d*a.x+c*a.y-e*d*a.z,
    -f*c*a.x+d*a.y+e*c*a.z
  );
  // Cull if on back of sphere:
  if(l.z<=0.0){
    gl_Position=vec4(2.0,2.0,0.0,1.0);
    return;
  }
  // Smooth fade towards horizon so it never pops suddenly:
  float fade=smoothstep(0.0,0.16,l.z);
  
  // Tangent foreshortening along radial curvature:
  float len=length(l.xy);
  vec2 urad=len>0.001?l.xy/len:vec2(1.0,0.0);
  vec2 uperp=vec2(-urad.y,urad.x);
  float scaleRad=l.z/0.8;
  vec2 off=(n.x*uperp+n.y*scaleRad*urad)*q*2.0;

  float t=b.y/b.x;
  vec2 y=(l.xy+off)*vec2(t,1.0)*k+r*vec2(1.0,-1.0)*k/b;
  gl_Position=vec4(y,0.0,1.0);
  m=n;
  g=w;
  h=x;
  vFade=fade;
}`;

// Marker Fragment Shader: Solid color with clean anti-aliased edge
const FS_MARKER = `precision highp float;
varying vec2 m;
varying vec3 g;
varying float h;
varying float vFade;
uniform vec3 v;
void main(){
  float dist=length(m)*2.0;
  if(dist>1.0)discard;
  float alpha=1.0 * vFade * 0.8;
  vec3 col=vec3(1.0, 0.5, 0.0); // Orange
  gl_FragColor=vec4(col,alpha);
}`;

const TEXTURE_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAECklEQVR42u3VsW4jRRzH8d94gzfF4Q0VQaC4vBLTRTp0mze4ggfAPAE5XQEFsGNAVIjwBrmW7h7gJE+giKjyABTZE4g06LKJETdRJvtD65kdz6yduKABiW+TVfzRf2bXYxtcE/59YJCz6YdbgQF6ACSRrwYKYImmh5PbwOewlV3wlQNbAN6SEExjUOO+BU0aCSnxReHABUlK4YFQeJeUT3da8IIkZ6NGoSnFY5KsMoVzMKfECUnqxgPYRArarmUCndHwzIEaQEpg5xVdBXROl8mpAQx5dUgPiHoYAAkg5w3JABR06byGAVgcRGAz5bznj6phBQNRFwyqgdxebH6gshJAesWoFhgYpApAFoG8BIZ/fEhSox5jDjQXmV0Ar5XJfAIrALi3URVs09gHIL4XJCkLC5LH9JWiArABFCSrQjdgkBzRJ0WJeUOSNyQAfJJwUSWUBRlJQ8oGHATACGlBynnzy2kEYLNjrxouigD8BZcgOeVPqh12RtufaCN5wCPVDpvQ9lsIrqndsJtDcWqBCpf4hWN7OdWHBw58FwIaNOU/n1TpMW2DFaD48cmr4185T8NHkpUFX749pQPVdgRKC/DGoQPVeAEKv+WHvY8OOWNTPRp5kHuwSf8wzXtVBKR7YwEH9H3lQUaypUfSATOALyVNu5vZJW31Bnx98nkLfDUWJaz6ixvm+RIQRdl3kmRxxiaDoGnZW4CpPfkaQadlcPim1xOSvETQo7Lv75enVAXJ3xGUlony4KQBBWUM1NiDc6qhyS8RgQs18OCMMtPDaAUIyg0PZkRWDqs+wnKJBTDI1Js6BolegOsKmUxNDBAAKqQyMQmidhegBlLZ+wwKYdv5M/8x1khkb1cgKqP2H+MKyV5vS+whrE8DQDgAlUAoRBX056EElJCjJVACeJBZgNfVp+iCCm4RBWCgKsRxASSA9KgDhDtCiTuMyfHsKXzhC6wNAIjjWb8LKAOA2ctk3FmCOlgKFy8f1N0JJtgsxinYnVAHt4t3gPzZXSCTyCWCQmBT91QE3B5yarSN40dNHYPka4TlDhTUI8zLvl0JSL3vZn6DsCFZOeB2yROEpR68sECQQA++xIGCR2X7DwlEoLRgUrZrqlUg50S1uy43YqDcN6UFBVkhAjWiCV2Q0jgQPdplMKxvBXodcOfAwJYvgdL+1etA1YJJfBcZlQV7sO1i2gHoNiyxtQ5sBsCgWyoxCHiFFd2L5nUTCqMAqGUgsQ9f5kCcCiZgRYkMgMTd5WsB1rTzj0Em14BE4r+QxN1lCEsVur2PoF5Wbg8RJXR4djgvBgauhLywoEZQrt1KKRdVS4CdlJ8qafyP+9KIj/nE/d7kKwH9jgS72e9DV+kvfTWgct4ZyP8Byb8BPG7MaaIIkAQAAAAASUVORK5CYII=";

// Arc Vertex Shader: renders screen-space ribbon quads and arrowheads with alpha blending
const VS_ARC = `attribute vec2 a;
attribute float b;
attribute vec3 c;
varying float vAlpha;
varying vec3 vColor;
void main(){
  gl_Position=vec4(a,0.0,1.0);
  vAlpha=b;
  vColor=c;
}`;

// Arc Fragment Shader: smoothly fades out below threshold with clean depth horizon culling
const FS_ARC = `precision highp float;
varying float vAlpha;
varying vec3 vColor;
void main(){
  if(vAlpha<=0.005)discard;
  gl_FragColor=vec4(vColor,vAlpha);
}`;

function slerpVec3(
  v1: [number, number, number],
  v2: [number, number, number],
  t: number,
  angle: number
): [number, number, number] {
  const sinAngle = Math.sin(angle);
  if (sinAngle < 0.001) {
    const x = v1[0] + (v2[0] - v1[0]) * t;
    const y = v1[1] + (v2[1] - v1[1]) * t;
    const z = v1[2] + (v2[2] - v1[2]) * t;
    const len = Math.hypot(x, y, z) || 1;
    return [x / len, y / len, z / len];
  }
  const f1 = Math.sin((1 - t) * angle) / sinAngle;
  const f2 = Math.sin(t * angle) / sinAngle;
  const x = f1 * v1[0] + f2 * v2[0];
  const y = f1 * v1[1] + f2 * v2[1];
  const z = f1 * v1[2] + f2 * v2[2];
  const len = Math.hypot(x, y, z) || 1;
  return [x / len, y / len, z / len];
}

interface ArcRoute3D {
  from: [number, number];
  to: [number, number];
  points: [number, number, number][];
  angle: number;
}

function createArc3D(from: [number, number], to: [number, number], samples = 96): ArcRoute3D {
  const pA = toSphere(from);
  const pB = toSphere(to);
  const dotVal = Math.max(-1, Math.min(1, pA[0] * pB[0] + pA[1] * pB[1] + pA[2] * pB[2]));
  const angle = Math.acos(dotVal);
  // Gentle, elegant arc elevation adjusted according to distance (maximum ~5-6% above surface)
  const maxElev = Math.sin(angle * 0.5) * 0.075;
  const points: [number, number, number][] = [];

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const unit = slerpVec3(pA, pB, t, angle);
    const elev = Math.sin(t * Math.PI) * maxElev;
    const radius = 0.8 + elev;
    points.push([unit[0] * radius, unit[1] * radius, unit[2] * radius]);
  }

  return { from, to, points, angle };
}

// Stage A: Vancouver, Canada [49.2827, -123.1207] -> Fukuoka, Japan [33.5904, 130.4017]
const ROUTE_STAGE_A = createArc3D([49.2827, -123.1207], [33.5904, 130.4017], 96);

// Stage B: Six international destinations originating from Fukuoka [33.5904, 130.4017]
const FUKUOKA_COORD: [number, number] = [33.5904, 130.4017];
const STAGE_B_DESTINATIONS: [number, number][] = [
  [34.0522, -118.2437], // 1. Los Angeles, USA
  [14.5995, 120.9842],  // 2. Manila, Philippines
  [-12.4634, 130.8456], // 3. Darwin, Australia
  [6.9271, 79.8612],    // 4. Colombo, Sri Lanka
  [15.5007, 32.5599],   // 5. Khartoum, Sudan
  [51.5074, -0.1278],   // 6. London, England
];
const ROUTES_STAGE_B = STAGE_B_DESTINATIONS.map(dest => createArc3D(FUKUOKA_COORD, dest, 96));

function computeAnim(t: number, prefersReducedMotion: boolean, travelTime = 4.4) {
  const T_FINISH = 0.6;
  const T_HOLD = 1.8;
  const T_FADE = 1.0;
  if (prefersReducedMotion) {
    return { headT: 1.0, lineT: 1.0, lineAlpha: 0.6, arrowAlpha: 0.6 };
  }
  if (t < 0) {
    return { headT: 0, lineT: 0, lineAlpha: 0, arrowAlpha: 0 };
  } else if (t < travelTime) {
    const pVal = t / travelTime;
    const headT = 1 - Math.pow(1 - pVal, 2.3);
    return { headT, lineT: headT, lineAlpha: 1.0, arrowAlpha: 1.0 };
  } else if (t < travelTime + T_FINISH) {
    return { headT: 1.0, lineT: 1.0, lineAlpha: 1.0, arrowAlpha: 1.0 };
  } else if (t < travelTime + T_FINISH + T_HOLD) {
    const holdTime = t - (travelTime + T_FINISH);
    const arrowAlpha = Math.max(0, 1.0 - holdTime / 0.5);
    return { headT: 1.0, lineT: 1.0, lineAlpha: 1.0, arrowAlpha };
  } else {
    const fadeTime = t - (travelTime + T_FINISH + T_HOLD);
    const lineAlpha = Math.max(0, 1.0 - fadeTime / T_FADE);
    return { headT: 1.0, lineT: 1.0, lineAlpha, arrowAlpha: 0 };
  }
}

function renderSingleRoute(
  route: ArcRoute3D,
  lineT: number,
  headT: number,
  lineAlpha: number,
  arrowAlpha: number,
  canvas: HTMLCanvasElement,
  scale: number,
  offset: [number, number],
  dpr: number,
  theta: number,
  phi: number,
  arcData: Float32Array,
  vertexIdxRef: { value: number }
) {
  if (lineAlpha <= 0.005 || lineT <= 0.005) return;
  const totalSamples = route.points.length - 1;
  const cCos = Math.cos(theta), sSin = Math.sin(theta);
  const eCos = Math.cos(phi), fSin = Math.sin(phi);

  interface ProjPt { sx: number; sy: number; depth: number; fade: number; }
  const projPts: ProjPt[] = [];
  for (let i = 0; i <= totalSamples; i++) {
    const pt3D = route.points[i];
    const rx = eCos * pt3D[0] + fSin * pt3D[2];
    const ry = fSin * sSin * pt3D[0] + cCos * pt3D[1] - eCos * sSin * pt3D[2];
    const rz = -fSin * cCos * pt3D[0] + sSin * pt3D[1] + eCos * cCos * pt3D[2];

    const sx = rx * (canvas.height / canvas.width) * scale + (offset[0] * dpr * scale / canvas.width);
    const sy = ry * scale - (offset[1] * dpr * scale / canvas.height);
    const fade = Math.max(0, Math.min(1, rz / 0.12));
    projPts.push({ sx, sy, depth: rz, fade });
  }

  const targetWidthPx = 4.0;
  const halfWX = (targetWidthPx * 0.5 * dpr / canvas.width) * 2.0;
  const halfWY = (targetWidthPx * 0.5 * dpr / canvas.height) * 2.0;

  const colR = 251 / 255;
  const colG = 100 / 255;
  const colB = 21 / 255;
  const baseOpacity = 0.95 * lineAlpha;

  const maxIndex = Math.min(totalSamples - 1, Math.floor(lineT * totalSamples));
  const frac = (lineT * totalSamples) - maxIndex;

  for (let i = 0; i <= maxIndex; i++) {
    const ptA = projPts[i];
    let ptBSx = projPts[i + 1].sx;
    let ptBSy = projPts[i + 1].sy;
    let ptBFade = projPts[i + 1].fade;
    let ptBDepth = projPts[i + 1].depth;

    if (i === maxIndex) {
      ptBSx = ptA.sx + (ptBSx - ptA.sx) * frac;
      ptBSy = ptA.sy + (ptBSy - ptA.sy) * frac;
      ptBFade = ptA.fade + (ptBFade - ptA.fade) * frac;
      ptBDepth = ptA.depth + (ptBDepth - ptA.depth) * frac;
    }

    if (ptA.depth <= 0 && ptBDepth <= 0) continue;

    const dx = ptBSx - ptA.sx;
    const dy = ptBSy - ptA.sy;
    const len = Math.hypot(dx, dy);
    if (len < 0.00005) continue;

    const nx = -dy / len;
    const ny = dx / len;
    const ox = nx * halfWX;
    const oy = ny * halfWY;

    const aA = baseOpacity * ptA.fade;
    const aB = baseOpacity * ptBFade;
    if (aA <= 0.005 && aB <= 0.005) continue;
    if (vertexIdxRef.value + 36 > arcData.length) break;

    arcData[vertexIdxRef.value++] = ptA.sx + ox;
    arcData[vertexIdxRef.value++] = ptA.sy + oy;
    arcData[vertexIdxRef.value++] = aA;
    arcData[vertexIdxRef.value++] = colR;
    arcData[vertexIdxRef.value++] = colG;
    arcData[vertexIdxRef.value++] = colB;

    arcData[vertexIdxRef.value++] = ptBSx + ox;
    arcData[vertexIdxRef.value++] = ptBSy + oy;
    arcData[vertexIdxRef.value++] = aB;
    arcData[vertexIdxRef.value++] = colR;
    arcData[vertexIdxRef.value++] = colG;
    arcData[vertexIdxRef.value++] = colB;

    arcData[vertexIdxRef.value++] = ptA.sx - ox;
    arcData[vertexIdxRef.value++] = ptA.sy - oy;
    arcData[vertexIdxRef.value++] = aA;
    arcData[vertexIdxRef.value++] = colR;
    arcData[vertexIdxRef.value++] = colG;
    arcData[vertexIdxRef.value++] = colB;

    arcData[vertexIdxRef.value++] = ptA.sx - ox;
    arcData[vertexIdxRef.value++] = ptA.sy - oy;
    arcData[vertexIdxRef.value++] = aA;
    arcData[vertexIdxRef.value++] = colR;
    arcData[vertexIdxRef.value++] = colG;
    arcData[vertexIdxRef.value++] = colB;

    arcData[vertexIdxRef.value++] = ptBSx + ox;
    arcData[vertexIdxRef.value++] = ptBSy + oy;
    arcData[vertexIdxRef.value++] = aB;
    arcData[vertexIdxRef.value++] = colR;
    arcData[vertexIdxRef.value++] = colG;
    arcData[vertexIdxRef.value++] = colB;

    arcData[vertexIdxRef.value++] = ptBSx - ox;
    arcData[vertexIdxRef.value++] = ptBSy - oy;
    arcData[vertexIdxRef.value++] = aB;
    arcData[vertexIdxRef.value++] = colR;
    arcData[vertexIdxRef.value++] = colG;
    arcData[vertexIdxRef.value++] = colB;
  }

  if (arrowAlpha > 0.01 && headT > 0.02) {
    if (vertexIdxRef.value + 36 > arcData.length) return;
    const hIdx = Math.min(totalSamples - 1, Math.floor(headT * totalSamples));
    const hFrac = (headT * totalSamples) - hIdx;
    const p1 = projPts[hIdx];
    const p2 = projPts[hIdx + 1];

    const headSx = p1.sx + (p2.sx - p1.sx) * hFrac;
    const headSy = p1.sy + (p2.sy - p1.sy) * hFrac;
    const headDepth = p1.depth + (p2.depth - p1.depth) * hFrac;
    const headFade = p1.fade + (p2.fade - p1.fade) * hFrac;

    if (headDepth > 0 && headFade > 0.01) {
      // 3D great-circle arc tangent rotated to camera view space
      // Guarantees consistent forward pointing without flipping or vanishing
      const i0 = Math.max(0, hIdx - 1);
      const i1 = Math.min(totalSamples, hIdx + 1);
      const p3A = route.points[i0];
      const p3B = route.points[i1];
      const v3x = p3B[0] - p3A[0];
      const v3y = p3B[1] - p3A[1];
      const v3z = p3B[2] - p3A[2];
      const rotX = eCos * v3x + fSin * v3z;
      const rotY = fSin * sSin * v3x + cCos * v3y - eCos * sSin * v3z;
      let ux = rotX * (canvas.height / canvas.width);
      let uy = rotY;
      const tlen = Math.hypot(ux, uy);

      if (tlen > 0.0001) {
        ux /= tlen;
        uy /= tlen;
      } else {
        const prevIdx = Math.max(0, hIdx - 2);
        const nextIdx = Math.min(totalSamples, hIdx + 2);
        const tdx = projPts[nextIdx].sx - projPts[prevIdx].sx;
        const tdy = projPts[nextIdx].sy - projPts[prevIdx].sy;
        const fallbackLen = Math.hypot(tdx, tdy) || 1;
        ux = tdx / fallbackLen;
        uy = tdy / fallbackLen;
      }
      const unx = -uy;
      const uny = ux;

      const arrowLenPx = 20.0;
      const arrowWidPx = 20.0;
      const alX = ux * (arrowLenPx * dpr / canvas.width) * 2.0;
      const alY = uy * (arrowLenPx * dpr / canvas.height) * 2.0;
      const awX = unx * (arrowWidPx * 0.5 * dpr / canvas.width) * 2.0;
      const awY = uny * (arrowWidPx * 0.5 * dpr / canvas.height) * 2.0;

      const tipX = headSx + alX * 0.55;
      const tipY = headSy + alY * 0.55;
      const b1X = headSx - alX * 0.45 + awX;
      const b1Y = headSy - alY * 0.45 + awY;
      const b2X = headSx - alX * 0.45 - awX;
      const b2Y = headSy - alY * 0.45 - awY;
      const notchX = headSx - alX * 0.15;
      const notchY = headSy - alY * 0.15;

      const aAlpha = arrowAlpha * Math.max(0.2, headFade) * 0.98;

        // Triangle 1
        arcData[vertexIdxRef.value++] = tipX;
        arcData[vertexIdxRef.value++] = tipY;
        arcData[vertexIdxRef.value++] = aAlpha;
        arcData[vertexIdxRef.value++] = colR;
        arcData[vertexIdxRef.value++] = colG;
        arcData[vertexIdxRef.value++] = colB;

        arcData[vertexIdxRef.value++] = b1X;
        arcData[vertexIdxRef.value++] = b1Y;
        arcData[vertexIdxRef.value++] = aAlpha;
        arcData[vertexIdxRef.value++] = colR;
        arcData[vertexIdxRef.value++] = colG;
        arcData[vertexIdxRef.value++] = colB;

        arcData[vertexIdxRef.value++] = notchX;
        arcData[vertexIdxRef.value++] = notchY;
        arcData[vertexIdxRef.value++] = aAlpha;
        arcData[vertexIdxRef.value++] = colR;
        arcData[vertexIdxRef.value++] = colG;
        arcData[vertexIdxRef.value++] = colB;

        // Triangle 2
        arcData[vertexIdxRef.value++] = tipX;
        arcData[vertexIdxRef.value++] = tipY;
        arcData[vertexIdxRef.value++] = aAlpha;
        arcData[vertexIdxRef.value++] = colR;
        arcData[vertexIdxRef.value++] = colG;
        arcData[vertexIdxRef.value++] = colB;

        arcData[vertexIdxRef.value++] = notchX;
        arcData[vertexIdxRef.value++] = notchY;
        arcData[vertexIdxRef.value++] = aAlpha;
        arcData[vertexIdxRef.value++] = colR;
        arcData[vertexIdxRef.value++] = colG;
        arcData[vertexIdxRef.value++] = colB;

        arcData[vertexIdxRef.value++] = b2X;
        arcData[vertexIdxRef.value++] = b2Y;
        arcData[vertexIdxRef.value++] = aAlpha;
        arcData[vertexIdxRef.value++] = colR;
        arcData[vertexIdxRef.value++] = colG;
        arcData[vertexIdxRef.value++] = colB;
      }
    }
  }

export function createCustomGlobe(
  canvas: HTMLCanvasElement,
  opts: GlobeOptions
): GlobeInstance {
  const ctxAttrs: WebGLContextAttributes = {
    alpha: true,
    premultipliedAlpha: true,
    stencil: false,
    antialias: true,
    depth: false,
    preserveDrawingBuffer: false,
    ...opts.context,
  };

  let gl = canvas.getContext("webgl2", ctxAttrs) as WebGLRenderingContext | null;
  const isWebGL2 = !!gl;
  if (!gl) {
    gl = canvas.getContext("webgl", ctxAttrs) as WebGLRenderingContext | null;
  }
  if (!gl) {
    return { destroy: () => {}, update: () => {} };
  }

  const instExt = isWebGL2 ? null : gl.getExtension("ANGLE_instanced_arrays");
  const dpr = opts.devicePixelRatio || 1;
  canvas.width = opts.width * dpr;
  canvas.height = opts.height * dpr;

  let phi = opts.phi || 0;
  let theta = opts.theta || 0;
  let markers = opts.markers || [];
  let mapSamples = opts.mapSamples || 16000;
  let mapBrightness = opts.mapBrightness || 1.2;
  let mapBaseBrightness = opts.mapBaseBrightness || 0;
  let baseColor = opts.baseColor || [1, 1, 1];
  let markerColor = opts.markerColor || [1, 0.4, 0.1];
  let glowColor = opts.glowColor || [1, 1, 1];
  let diffuse = opts.diffuse || 0.4;
  let dark = opts.dark || 0;
  let offset = opts.offset || [0, 0];
  let scale = opts.scale || 1;
  let enableRoutes = opts.enableRoutes !== false;
  let routesStage = opts.routesStage || 'A';
  const animStartTime = performance.now();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  const progSphere = createProgram(gl, VS_QUAD, FS_SPHERE);
  const progMarker = createProgram(gl, VS_MARKER, FS_MARKER);
  const progArc = createProgram(gl, VS_ARC, FS_ARC);
  if (!progSphere) {
    return { destroy: () => {}, update: () => {} };
  }

  const quadBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const markerBuf = gl.createBuffer();
  const arcBuf = gl.createBuffer();
  let aArcPos = -1;
  let aArcAlpha = -1;
  let aArcColor = -1;
  if (progArc) {
    aArcPos = gl.getAttribLocation(progArc, "a");
    aArcAlpha = gl.getAttribLocation(progArc, "b");
    aArcColor = gl.getAttribLocation(progArc, "c");
  }
  const arcData = new Float32Array(65536);
  const uSphere = getUniforms(gl, progSphere, ["t", "s", "k", "x", "v", "F", "w", "n", "y", "z"]);
  const aSphere = gl.getAttribLocation(progSphere, "a");

  let uMarker: Record<string, WebGLUniformLocation | null> = {};
  let aMarker: Record<string, number> = {};
  if (progMarker) {
    uMarker = getUniforms(gl, progMarker, ["i", "j", "b", "k", "r", "v", "s"]);
    aMarker = getAttribs(gl, progMarker, ["n", "p", "q", "w", "x"]);
  }

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  const img = new Image();
  img.onload = () => {
    if (!gl) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
  };
  img.src = TEXTURE_DATA_URI;

  function updateMarkers(mList: Marker[]) {
    if (!gl || !markerBuf) return;
    markers = mList;
    const data = new Float32Array(8 * markers.length);
    markers.forEach((m, idx) => {
      data.set(
        [
          ...toSphere(m.location),
          m.size,
          ...(m.color || [0, 0, 0]),
          m.color ? 1 : 0,
        ],
        8 * idx
      );
    });
    gl.bindBuffer(gl.ARRAY_BUFFER, markerBuf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  }

  function render(p: Partial<GlobeOptions>) {
    if (!gl) return;
    if (p.phi !== undefined) phi = p.phi;
    if (p.theta !== undefined) theta = p.theta;
    if (p.markers) updateMarkers(p.markers);
    if (p.width && p.height) {
      canvas.width = p.width * dpr;
      canvas.height = p.height * dpr;
    }
    if (p.mapSamples !== undefined) mapSamples = p.mapSamples;
    if (p.mapBrightness !== undefined) mapBrightness = p.mapBrightness;
    if (p.mapBaseBrightness !== undefined) mapBaseBrightness = p.mapBaseBrightness;
    if (p.baseColor !== undefined) baseColor = p.baseColor;
    if (p.markerColor !== undefined) markerColor = p.markerColor;
    if (p.glowColor !== undefined) glowColor = p.glowColor;
    if (p.diffuse !== undefined) diffuse = p.diffuse;
    if (p.dark !== undefined) dark = p.dark;
    if (p.offset !== undefined) offset = p.offset;
    if (p.scale !== undefined) scale = p.scale;
    if (p.enableRoutes !== undefined) enableRoutes = p.enableRoutes;
    if (p.routesStage !== undefined) routesStage = p.routesStage;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // 1. Draw Sphere
    if (progSphere) {
      gl.useProgram(progSphere);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      gl.enableVertexAttribArray(aSphere);
      gl.vertexAttribPointer(aSphere, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uSphere.t!, canvas.width, canvas.height);
      gl.uniform2f(uSphere.s!, phi, theta);
      gl.uniform1f(uSphere.k!, mapSamples);
      gl.uniform1f(uSphere.x!, scale);
      gl.uniform2f(uSphere.v!, offset[0] * dpr, offset[1] * dpr);
      gl.uniform3fv(uSphere.F!, baseColor);
      gl.uniform3fv(uSphere.w!, glowColor);
      gl.uniform4f(uSphere.n!, mapBrightness, diffuse, dark, 1.0);
      gl.uniform1f(uSphere.y!, mapBaseBrightness);
      gl.uniform1i(uSphere.z!, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    // 2. Draw Animated Route Arcs (Stage A & Stage B)
    if (progArc && enableRoutes) {
      const now = performance.now();
      const elapsed = (now - animStartTime) / 1000;
      const startDelay = 2.0;

      if (elapsed >= startDelay) {
        const activeElapsed = elapsed - startDelay;

        // Stage A timing
        const T_TRAVEL = 4.4; // 25% faster travel speed
        const T_FINISH = 0.6;
        const T_HOLD = 1.8;
        const T_FADE = 1.0;
        const T_PAUSE = 0.8;
        const T_CYCLE_A = T_TRAVEL + T_FINISH + T_HOLD + T_FADE + T_PAUSE; // 8.6s

        // Stage B timing: all 6 international routes from Fukuoka
        const STAGE_B_STAGGER = 0.45; // Smooth cascading stagger across 6 routes
        const STAGE_B_HOLD = 3.5;    // Hold all 6 completed routes together
        const STAGE_B_FADE = 0.72;   // Shortened by 40% (was 1.2s) for faster line disappearance
        const STAGE_B_PAUSE = 0.5;   // Brief pause after lines disappear before Stage A loops again
        const STAGE_B_DURATION =
          (ROUTES_STAGE_B.length - 1) * STAGE_B_STAGGER +
          T_TRAVEL +
          T_FINISH +
          STAGE_B_HOLD +
          STAGE_B_FADE +
          STAGE_B_PAUSE; // ~12.0s
        const T_TOTAL_CYCLE = T_CYCLE_A + STAGE_B_DURATION; // Continuous seamless loop

        const cycleTime = prefersReducedMotion ? 0 : activeElapsed % T_TOTAL_CYCLE;

        const vertexIdxRef = { value: 0 };

        if (cycleTime < T_CYCLE_A) {
          const anim = computeAnim(cycleTime, !!prefersReducedMotion, T_TRAVEL);
          renderSingleRoute(
            ROUTE_STAGE_A,
            anim.lineT,
            anim.headT,
            anim.lineAlpha,
            anim.arrowAlpha,
            canvas,
            scale,
            offset,
            dpr,
            theta,
            phi,
            arcData,
            vertexIdxRef
          );
        } else {
          const stageBTime = cycleTime - T_CYCLE_A;
          const fadeStartTime = STAGE_B_DURATION - STAGE_B_PAUSE - STAGE_B_FADE;
          let collectiveFade = 1.0;
          if (stageBTime >= fadeStartTime && stageBTime < STAGE_B_DURATION - STAGE_B_PAUSE) {
            collectiveFade = Math.max(0, 1.0 - (stageBTime - fadeStartTime) / STAGE_B_FADE);
          } else if (stageBTime >= STAGE_B_DURATION - STAGE_B_PAUSE) {
            collectiveFade = 0;
          }

          for (let i = 0; i < ROUTES_STAGE_B.length; i++) {
            const routeTime = stageBTime - i * STAGE_B_STAGGER;
            if (routeTime >= 0) {
              let lineT: number;
              let headT: number;
              let lineAlpha: number;
              let arrowAlpha: number;

              if (prefersReducedMotion) {
                lineT = 1.0;
                headT = 1.0;
                lineAlpha = 0.6;
                arrowAlpha = 0.6;
              } else if (routeTime < T_TRAVEL) {
                const pVal = routeTime / T_TRAVEL;
                headT = 1 - Math.pow(1 - pVal, 2.3);
                lineT = headT;
                lineAlpha = 1.0;
                arrowAlpha = 1.0;
              } else {
                headT = 1.0;
                lineT = 1.0;
                lineAlpha = 1.0;
                const postArrival = routeTime - T_TRAVEL;
                arrowAlpha = Math.max(0, 1.0 - postArrival / 0.5);
              }

              const finalLineAlpha = lineAlpha * collectiveFade;
              const finalArrowAlpha = arrowAlpha * collectiveFade;
              renderSingleRoute(
                ROUTES_STAGE_B[i],
                lineT,
                headT,
                finalLineAlpha,
                finalArrowAlpha,
                canvas,
                scale,
                offset,
                dpr,
                theta,
                phi,
                arcData,
                vertexIdxRef
              );
            }
          }
        }

        const vertexIdx = vertexIdxRef.value;
        if (vertexIdx > 0 && vertexIdx <= arcData.length) {
          gl.useProgram(progArc);
          gl.bindBuffer(gl.ARRAY_BUFFER, arcBuf);
          gl.bufferData(gl.ARRAY_BUFFER, arcData.subarray(0, vertexIdx), gl.DYNAMIC_DRAW);

          const stride = 24;
          gl.enableVertexAttribArray(aArcPos);
          gl.vertexAttribPointer(aArcPos, 2, gl.FLOAT, false, stride, 0);

          gl.enableVertexAttribArray(aArcAlpha);
          gl.vertexAttribPointer(aArcAlpha, 1, gl.FLOAT, false, stride, 8);

          gl.enableVertexAttribArray(aArcColor);
          gl.vertexAttribPointer(aArcColor, 3, gl.FLOAT, false, stride, 12);

          gl.drawArrays(gl.TRIANGLES, 0, Math.floor(vertexIdx / 6));

          gl.disableVertexAttribArray(aArcPos);
          gl.disableVertexAttribArray(aArcAlpha);
          gl.disableVertexAttribArray(aArcColor);
        }
      }
    }

    // 3. Draw Markers (surface-tangent, flat, blurry, no stick-out)
    if (progMarker && markers.length > 0) {
      gl.useProgram(progMarker);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      if (aMarker.n >= 0) {
        gl.enableVertexAttribArray(aMarker.n);
        gl.vertexAttribPointer(aMarker.n, 2, gl.FLOAT, false, 0, 0);
        if (isWebGL2) {
          (gl as WebGL2RenderingContext).vertexAttribDivisor(aMarker.n, 0);
        } else if (instExt) {
          instExt.vertexAttribDivisorANGLE(aMarker.n, 0);
        }
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, markerBuf);
      const stride = 32;

      function bindInstancedAttrib(idx: number, size: number, off: number) {
        if (!gl || idx < 0) return;
        gl.enableVertexAttribArray(idx);
        gl.vertexAttribPointer(idx, size, gl.FLOAT, false, stride, off);
        if (isWebGL2) {
          (gl as WebGL2RenderingContext).vertexAttribDivisor(idx, 1);
        } else if (instExt) {
          instExt.vertexAttribDivisorANGLE(idx, 1);
        }
      }

      bindInstancedAttrib(aMarker.p, 3, 0);
      bindInstancedAttrib(aMarker.q, 1, 12);
      bindInstancedAttrib(aMarker.w, 3, 16);
      bindInstancedAttrib(aMarker.x, 1, 28);

      gl.uniform1f(uMarker.i!, phi);
      gl.uniform1f(uMarker.j!, theta);
      gl.uniform2f(uMarker.b!, canvas.width, canvas.height);
      gl.uniform1f(uMarker.k!, scale);
      gl.uniform2f(uMarker.r!, offset[0] * dpr, offset[1] * dpr);
      gl.uniform3fv(uMarker.v!, markerColor);
      gl.uniform1f(uMarker.s!, 0);

      if (isWebGL2) {
        (gl as WebGL2RenderingContext).drawArraysInstanced(gl.TRIANGLES, 0, 6, markers.length);
      } else if (instExt) {
        instExt.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, markers.length);
      } else {
        for (let i = 0; i < markers.length; i++) {
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      }
    }
  }

  updateMarkers(markers);
  render({});

  return {
    update: render,
    destroy: () => {
      if (!gl) return;
      gl.deleteBuffer(quadBuf);
      gl.deleteBuffer(markerBuf);
      if (arcBuf) gl.deleteBuffer(arcBuf);
      if (progSphere) gl.deleteProgram(progSphere);
      if (progMarker) gl.deleteProgram(progMarker);
      if (progArc) gl.deleteProgram(progArc);
      gl = null;
    },
  };
}
