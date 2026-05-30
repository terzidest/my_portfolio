// Netlify Function (v2 signature): receives a JSON payload from the contact
// form, validates it, and forwards it to terzidest@gmail.com via Resend.
//
// Required env var: RESEND_API_KEY
// Optional env var: RESEND_SENDER (e.g. `Portfolio <noreply@your-domain.com>`)
//   When set, replaces the default test sender AND enables the auto-reply to
//   the submitter (which requires a verified domain in Resend, since
//   onboarding@resend.dev can only deliver to the Resend account owner).

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RECIPIENT = 'terzidest@gmail.com';
const DEFAULT_SENDER = 'Portfolio Contact <onboarding@resend.dev>';

// Honeypot field name — must match the hidden input in ContactForm.tsx.
const HONEYPOT_FIELD = 'website';

// Length caps to prevent abuse-by-volume.
const MAX_NAME = 200;
const MAX_EMAIL = 200;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;

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
  if (typeof v.name !== 'string' || v.name.trim().length === 0 || v.name.length > MAX_NAME) return false;
  if (typeof v.email !== 'string' || v.email.length > MAX_EMAIL || !EMAIL_RE.test(v.email)) return false;
  if (
    typeof v.message !== 'string' ||
    v.message.trim().length < MIN_MESSAGE ||
    v.message.length > MAX_MESSAGE
  ) {
    return false;
  }
  if (v.subject !== undefined && (typeof v.subject !== 'string' || v.subject.length > MAX_SUBJECT)) return false;
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

interface SendArgs {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}

const sendEmail = async ({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  html,
}: SendArgs): Promise<{ ok: boolean; status: number; body: string }> => {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
    }),
  });
  const body = await response.text();
  return { ok: response.ok, status: response.status, body };
};

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

  // Honeypot: bots fill the hidden field; humans don't. Silently succeed so
  // bots don't learn they were rejected, and skip the Resend call entirely.
  const honeypot = (payload as Record<string, unknown> | null | undefined)?.[HONEYPOT_FIELD];
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    console.info('Honeypot triggered; dropping submission');
    return json(200, { success: true });
  }

  if (!isValidPayload(payload)) {
    return json(400, { error: 'Invalid input' });
  }

  const { name, email, subject, message } = payload;
  const trimmedSubject = subject?.trim();

  const sender = process.env.RESEND_SENDER ?? DEFAULT_SENDER;
  const usingCustomSender = sender !== DEFAULT_SENDER;

  // Notification email to the site owner.
  const ownerHtml = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px;">
      <h2 style="margin: 0 0 16px;">New portfolio contact</h2>
      <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      ${trimmedSubject ? `<p style="margin: 0 0 8px;"><strong>Subject:</strong> ${escapeHtml(trimmedSubject)}</p>` : ''}
      <p style="margin: 16px 0 4px;"><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `;

  const primary = await sendEmail({
    apiKey,
    from: sender,
    to: RECIPIENT,
    replyTo: email,
    subject: trimmedSubject ? `[Portfolio] ${trimmedSubject}` : `[Portfolio] Message from ${name}`,
    html: ownerHtml,
  });

  if (!primary.ok) {
    console.error('Resend error (primary)', primary.status, primary.body);
    return json(502, { error: 'Failed to send email' });
  }

  // Auto-reply: only attempted when a custom (verified) sender is configured,
  // since onboarding@resend.dev can only deliver to the Resend account owner.
  // The request never fails on auto-reply errors — the primary already
  // arrived, so the submission is effectively successful.
  if (usingCustomSender) {
    const replyHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px;">
        <h2 style="margin: 0 0 16px;">Thanks for getting in touch!</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>I got your message and will reply soon.</p>
        <p>— Triantaphilos</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #666; font-size: 12px; margin: 0 0 4px;">Your message:</p>
        <blockquote style="color: #666; white-space: pre-wrap; margin: 0; padding-left: 12px; border-left: 3px solid #eee;">${escapeHtml(message)}</blockquote>
      </div>
    `;
    const reply = await sendEmail({
      apiKey,
      from: sender,
      to: email,
      subject: "Thanks for reaching out — I'll get back to you soon",
      html: replyHtml,
    });
    if (!reply.ok) {
      console.error('Resend error (auto-reply)', reply.status, reply.body);
    }
  }

  return json(200, { success: true });
};
