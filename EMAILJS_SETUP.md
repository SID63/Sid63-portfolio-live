# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to make your contact form functional.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID**

## Step 3: Create an Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{to_name}}` - Your name (recipient)
4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## Step 5: Update Configuration

1. Open `src/config/emailjs.ts`
2. Replace the placeholder values:

```typescript
export const emailjsConfig = {
  serviceId: 'service_gmlyl9t', // From Step 2
  templateId: 'template_8giip5m', // From Step 3
  publicKey: 'Cppc8wKnsVxzUagFi', // From Step 4
};
```

## Step 6: Test Your Form

1. Fill out the contact form on your website
2. Submit the form
3. Check your email for the message
4. Check the browser console for any errors

## Troubleshooting

- **Form not sending**: Check that all IDs are correct in the config file
- **Email not received**: Check your spam folder and EmailJS dashboard logs
- **Console errors**: Make sure EmailJS is properly initialized

## Security Notes

- The public key is safe to expose in client-side code
- EmailJS handles the email sending on their servers
- Your email credentials are never exposed to the client

## Free Tier Limits

- EmailJS free tier allows 200 emails per month
- Consider upgrading if you expect more traffic

## Alternative Solutions

If you prefer not to use EmailJS, you can also:
- Use a form service like Formspree or Netlify Forms
- Set up a backend API endpoint
- Use a serverless function (Vercel Functions, Netlify Functions)

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Community: https://community.emailjs.com/
