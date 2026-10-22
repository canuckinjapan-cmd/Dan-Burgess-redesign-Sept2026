// WCAG 2.1 Contrast Calculation Script

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function getLuminance(r, g, b) {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function getContrast(rgb1, rgb2) {
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function blend(fgRgb, fgAlpha, bgRgb) {
  return {
    r: Math.round(fgRgb.r * fgAlpha + bgRgb.r * (1 - fgAlpha)),
    g: Math.round(fgRgb.g * fgAlpha + bgRgb.g * (1 - fgAlpha)),
    b: Math.round(fgRgb.b * fgAlpha + bgRgb.b * (1 - fgAlpha))
  };
}

const colors = {
  paper: hexToRgb('F7F3EC'),
  paperAlt: hexToRgb('F4F0EC'),
  white: hexToRgb('FFFFFF'),
  wash1: hexToRgb('E1DBD2'),
  wash2: hexToRgb('E8D9CE'),
  ink: hexToRgb('14171A'),
  inkDark: hexToRgb('111318'),
  inkLabel: hexToRgb('5F636A'),
  inkPlaceholder: hexToRgb('6B6F76'),
  accentBrand: hexToRgb('FF6A1F'),
  accentText: hexToRgb('C2410C'),
  accentTextLarge: hexToRgb('D9500F'),
  accentTextOnPhoto: hexToRgb('A8360A'),
  accentTextLinkOnPhoto: hexToRgb('9A3412'),
};

const checks = [
  // 1. About section over rendered photo wash samples (#E1DBD2 and #E8D9CE)
  { element: 'About "02" numeral (large)', fg: colors.accentText, bg: colors.wash1, req: 3.0 },
  { element: 'About "02" numeral (large)', fg: colors.accentText, bg: colors.wash2, req: 3.0 },
  { element: 'About "Design" / "デザイン" headline (large)', fg: colors.accentText, bg: colors.wash1, req: 3.0 },
  { element: 'About "Design" / "デザイン" headline (large)', fg: colors.accentText, bg: colors.wash2, req: 3.0 },
  { element: 'About "About" / "私について" label (--accent-text-on-photo)', fg: colors.accentTextOnPhoto, bg: colors.wash1, req: 4.5 },
  { element: 'About "About" / "私について" label (--accent-text-on-photo)', fg: colors.accentTextOnPhoto, bg: colors.wash2, req: 4.5 },
  { element: 'About LinkedIn link (--accent-text-link-on-photo)', fg: colors.accentTextLinkOnPhoto, bg: colors.wash1, req: 4.5 },
  { element: 'About LinkedIn link (--accent-text-link-on-photo)', fg: colors.accentTextLinkOnPhoto, bg: colors.wash2, req: 4.5 },
  { element: 'About body text (ink/80 on photo wash)', fg: blend(colors.ink, 0.8, colors.wash1), bg: colors.wash1, req: 4.5 },
  { element: 'About body text (ink/80 on photo wash alt)', fg: blend(colors.ink, 0.8, colors.wash2), bg: colors.wash2, req: 4.5 },

  // 2. Core Capabilities & Chip texts
  { element: 'CORE CAPABILITIES label (--ink-label on paper)', fg: colors.inkLabel, bg: colors.paper, req: 4.5 },
  { element: 'Chip text "Layout · Typography · UI" (--ink-label on card)', fg: colors.inkLabel, bg: colors.white, req: 4.5 },
  { element: 'Chip text "Concept → Prototype → Code" (--ink-label on card)', fg: colors.inkLabel, bg: colors.white, req: 4.5 },
  { element: 'Small label / CAPABILITY (--ink-label on paper)', fg: colors.inkLabel, bg: colors.paper, req: 4.5 },

  // 3. Form placeholder and focus border
  { element: 'Form input placeholder (--ink-placeholder on white)', fg: colors.inkPlaceholder, bg: colors.white, req: 4.5 },
  { element: 'Form focus border (--accent-text on white)', fg: colors.accentText, bg: colors.white, req: 3.0 },

  // 4. Hero & Section typography
  { element: 'Hero headline "Web Designer" (--accent-text-large on paper/white)', fg: colors.accentTextLarge, bg: colors.white, req: 3.0 },
  { element: 'Section numerals 01, 03, 04 (--accent-text-large on paper)', fg: colors.accentTextLarge, bg: colors.paper, req: 3.0 },
  { element: 'Section numerals 01, 03, 04 (--accent-text-large on alt paper)', fg: colors.accentTextLarge, bg: colors.paperAlt, req: 3.0 },
  { element: 'Section labels "Selected Work", "Skills", "Contact" (--accent-text on paper)', fg: colors.accentText, bg: colors.paper, req: 4.5 },
  { element: 'Section 01 highlight "One design approach" (--accent-text-large on paper)', fg: colors.accentTextLarge, bg: colors.paper, req: 3.0 },
  { element: 'Project row numerals "01, 02, 03" (--accent-text on paper)', fg: colors.accentText, bg: colors.paper, req: 4.5 },
  { element: 'Capability chip HTML / JP orange text (--accent-text on card)', fg: colors.accentText, bg: colors.white, req: 4.5 },

  // 5. Interactive buttons & badges
  { element: 'Language switcher active pill (ink-dark on #FF6A1F)', fg: colors.inkDark, bg: colors.accentBrand, req: 4.5 },
  { element: 'Nav link hover (white on --accent-text)', fg: colors.white, bg: colors.accentText, req: 4.5 },
  { element: 'CTA button hover (white on --accent-text)', fg: colors.white, bg: colors.accentText, req: 4.5 },
  { element: 'Project demo link hover (--accent-text on paper)', fg: colors.accentText, bg: colors.paper, req: 4.5 },

  // 6. Social icons & Blogger mark
  { element: 'Social icons stroke/fill (--accent-text on paper)', fg: colors.accentText, bg: colors.paper, req: 3.0 },
  { element: 'Blogger icon squircle on paper (--accent-text on paper)', fg: colors.accentText, bg: colors.paper, req: 3.0 },
  { element: 'Blogger icon "B" lettermark (white on --accent-text)', fg: colors.white, bg: colors.accentText, req: 3.0 },
];

console.log('| Element | Foreground | Background | Ratio | Required | Pass/Fail |');
console.log('| :--- | :--- | :--- | :--- | :--- | :--- |');

let allPassed = true;
for (const c of checks) {
  const ratio = getContrast(c.fg, c.bg);
  const passed = ratio >= c.req;
  if (!passed) allPassed = false;
  const fgHex = '#' + [c.fg.r, c.fg.g, c.fg.b].map(x => x.toString(16).padStart(2, '0')).join('');
  const bgHex = '#' + [c.bg.r, c.bg.g, c.bg.b].map(x => x.toString(16).padStart(2, '0')).join('');
  console.log(`| ${c.element} | \`${fgHex}\` | \`${bgHex}\` | **${ratio.toFixed(2)}:1** | ${c.req.toFixed(1)}:1 | ${passed ? 'PASS' : 'FAIL'} |`);
}

console.log('\nAll checks passed:', allPassed);
