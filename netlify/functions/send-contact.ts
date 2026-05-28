// Netlify Function (v2 signature): receives a JSON payload from the contact
// form, validates it, and forwards it to terzidest@gmail.com via Resend.
//
// Required environment variable: RESEND_API_KEY (set in the Netlify dashboard
// under Site settings → Environment variables).

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RECIPIENT = 'terzidest@gmail.com';
// onboarding@resend.dev works without DNS verification. Swap to a verified
// domain (e.g. noreply@<your-domain>) once you've added one in Resend.
const SENDER = 'Portfolio Contact <onboarding@resend.dev>';

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isValidPayload = (p: unknown): p is ContactPayload => {
  if (!p || typeof p !== 'object') return false;
  const v = p as Record<string, unknown>;
  if (typeof v.name !== 'string' || v.name.trim().length === 0) return false;
  if (typeof v.email !== 'string' || !EMAIL_RE.test(v.email)) return false;
  if (typeof v.message !== 'string' || v.message.trim().length < 10) return false;
  if (v.subject !== undefined && typeof v.subject !== 'string') return false;
  return true;
};

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const json = (status: number, body: Record<string, unknown>): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return json(500, { error: 'Server misconfigured' });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  if (!isValidPayload(payload)) {
    return json(400, { error: 'Invalid input' });
  }

  const { name, email, subject, message } = payload;
  const trimmedSubject = subject?.trim();

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px;">
      <h2 style="margin: 0 0 16px;">New portfolio contact</h2>
      <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      ${trimmedSubject ? `<p style="margin: 0 0 8px;"><strong>Subject:</strong> ${escapeHtml(trimmedSubject)}</p>` : ''}
      <p style="margin: 16px 0 4px;"><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `;

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: SENDER,
      to: [RECIPIENT],
      reply_to: email,
      subject: trimmedSubject ? `[Portfolio] ${trimmedSubject}` : `[Portfolio] Message from ${name}`,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const body = await resendResponse.text();
    console.error('Resend error', resendResponse.status, body);
    return json(502, { error: 'Failed to send email' });
  }

  return json(200, { success: true });
};
