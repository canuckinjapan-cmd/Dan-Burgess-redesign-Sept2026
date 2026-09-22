import { connect } from 'cloudflare:sockets';

export const onRequestPost = async (context) => {
  console.log("Contact API: Request received");

  try {
    const data = await context.request.json();
    const { name, email, message, ...otherFields } = data;

    // Validate environment variables from Cloudflare dashboard
    if (!context.env.SMTP_PASS || !context.env.SMTP_USER) {
      throw new Error("Missing SMTP credentials in Cloudflare environment.");
    }

    const host = context.env.SMTP_HOST || 'smtp.gmail.com';
    const port = 465;

    console.log(`Connecting to ${host}:${port}`);

    // Connect to SMTP server via Cloudflare Sockets
    const socket = connect({ hostname: host, port: port }, { secureTransport: 'on' });
    const writer = socket.writable.getWriter();
    const reader = socket.readable.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let responseBuffer = '';

    const readUntil = async (expectedCodes) => {
      while (true) {
        const { value, done } = await reader.read();
        if (value) {
          responseBuffer += decoder.decode(value, { stream: true });
          const lines = responseBuffer.split('\r\n');
          // Check if the last completed line starts with the expected code
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            if (expectedCodes.some(code => line.startsWith(code))) {
               const result = responseBuffer;
               responseBuffer = lines.slice(i + 1).join('\r\n'); // keep remaining buffer
               return result;
            }
            // Check for SMTP error codes (4xx or 5xx)
            if (/^[45]\d\d/.test(line)) {
               throw new Error(`SMTP Server Error: ${line}`);
            }
          }
        }
        if (done) break;
      }
      return responseBuffer;
    };

    const write = async (str) => {
      await writer.write(encoder.encode(str + '\r\n'));
    };

    // SMTP Handshake and Authentication
    await readUntil(['220']);
    await write('EHLO localhost');
    await readUntil(['250']);
    
    await write('AUTH LOGIN');
    await readUntil(['334']);
    
    await write(btoa(context.env.SMTP_USER));
    await readUntil(['334']);
    
    await write(btoa(context.env.SMTP_PASS));
    await readUntil(['235']); // 235 Authentication successful
    
    await write(`MAIL FROM:<${context.env.SMTP_USER}>`);
    await readUntil(['250']);
    
    const contactEmail = context.env.CONTACT_EMAIL || context.env.SMTP_USER;
    await write(`RCPT TO:<${contactEmail}>`);
    await readUntil(['250']);
    
    await write('DATA');
    await readUntil(['354']);

    // Safely encode Subject with MIME Encoded-Word for Japanese/UTF-8 support
    const subjectText = `New Inquiry from ${name || 'User'}`;
    const utf8Bytes = encoder.encode(subjectText);
    const binaryString = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
    const encodedSubject = `=?UTF-8?B?${btoa(binaryString)}?=`;

    const otherFieldsLines = Object.entries(otherFields)
      .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`);

    // Construct Email content
    const emailData = [
      `Subject: ${encodedSubject}`,
      `Reply-To: ${email || 'no-reply@example.com'}`,
      `From: ${context.env.SMTP_USER}`,
      `To: ${contactEmail}`,
      'Content-Type: text/plain; charset=utf-8',
      '',
      `Name: ${name || 'N/A'}`,
      `Email: ${email || 'N/A'}`,
      ...otherFieldsLines,
      '',
      `Message:`,
      `${message || 'N/A'}`,
      '.',
    ].join('\r\n');

    await write(emailData);
    await readUntil(['250']);
    
    await write('QUIT');
    
    writer.close();

    return new Response(JSON.stringify({ message: "Success" }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Contact API Error:", error.message);
    return new Response(JSON.stringify({ error: error.message, message: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};