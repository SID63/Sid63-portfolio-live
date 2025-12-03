import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  // Non-fatal warning; UI should handle missing key gracefully
  // eslint-disable-next-line no-console
  console.warn('Gemini API key (VITE_GEMINI_API_KEY) is not set. AI generation will be disabled.');
}

let client: GoogleGenerativeAI | null = null;
if (apiKey) {
  client = new GoogleGenerativeAI(apiKey);
}

export type EmailTone = 'professional' | 'friendly' | 'concise' | 'detailed';

export async function generateEmailFromPurpose({
  purpose,
  senderName,
  senderEmail,
  tone = 'professional',
}: {
  purpose: string;
  senderName?: string;
  senderEmail?: string;
  tone?: EmailTone;
}): Promise<string> {
  if (!client) {
    throw new Error('Gemini not configured');
  }

  const model = client.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `You are an assistant that writes clear, well-structured emails.
Tone: ${tone}
Sender: ${senderName || 'User'} <${senderEmail || 'user@example.com'}>

Compose a short email that matches this purpose:
"""
${purpose}
"""

Requirements:
- 4-8 sentences
- Subject line first on a single line starting with: Subject:
- Use simple, direct language
- Add a polite closing with the sender name`;

  const res = await model.generateContent(prompt);
  const text = res.response.text();
  return text.trim();
}
