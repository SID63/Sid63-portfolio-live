# EmailJS Troubleshooting Guide

## Form Submitted But Email Not Received?

Here's a step-by-step troubleshooting guide to fix email delivery issues.

## 🔍 **Step 1: Check EmailJS Dashboard**

1. **Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)**
2. **Check "Email Logs"** - Look for your recent submissions
3. **Check "Email Services"** - Ensure your service is active and connected

## 🔍 **Step 2: Verify Your Configuration**

Your current config in `src/config/emailjs.ts`:
```typescript
export const emailjsConfig = {
  serviceId: 'service_9022oj8',
  templateId: 'template_9022oj8', 
  publicKey: 'user_9022oj8',
};
```

**Verify these match exactly with your EmailJS dashboard:**
- ✅ Service ID starts with `service_`
- ✅ Template ID starts with `template_`
- ✅ Public Key starts with `user_`

## 🔍 **Step 3: Check Email Service Status**

1. **In EmailJS Dashboard → Email Services**
2. **Click on your service** (service_9022oj8)
3. **Check if it shows "Connected" status**
4. **If disconnected, re-authenticate with your email provider**

## 🔍 **Step 4: Verify Email Template**

1. **In EmailJS Dashboard → Email Templates**
2. **Click on your template** (template_9022oj8)
3. **Ensure it has these exact variables:**
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{to_name}}`

## 🔍 **Step 5: Check Spam/Junk Folder**

- **Check your spam/junk folder**
- **Check EmailJS dashboard logs for delivery status**
- **Look for any bounce messages**

## 🔍 **Step 6: Test with Simple Template**

Create a simple test template to rule out template issues:

**Subject:** Test Message from Portfolio

**Body:**
```
Test message received!
From: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```

## 🔍 **Step 7: Check Browser Console**

1. **Open browser DevTools (F12)**
2. **Go to Console tab**
3. **Submit the form**
4. **Look for any error messages**

## 🔍 **Step 8: Verify EmailJS Initialization**

Check if EmailJS is properly initialized by adding this to your Contact component:

```typescript
useEffect(() => {
  console.log('EmailJS Config:', emailjsConfig);
  console.log('EmailJS initialized:', typeof emailjs !== 'undefined');
}, []);
```

## 🚨 **Common Issues & Solutions**

### **Issue 1: Service Not Connected**
- **Solution:** Re-authenticate your email service in EmailJS dashboard

### **Issue 2: Template Variables Mismatch**
- **Solution:** Ensure template variables exactly match what your code sends

### **Issue 3: Email Provider Blocking**
- **Solution:** Check if your email provider (Gmail, Outlook) is blocking emails

### **Issue 4: Rate Limiting**
- **Solution:** Free tier allows 200 emails/month. Check if you've exceeded this.

### **Issue 5: Wrong Credentials**
- **Solution:** Double-check all IDs in your config file

## 🧪 **Debug Steps**

1. **Add console logging to your form submission:**
```typescript
console.log('Sending email with params:', templateParams);
console.log('Using config:', emailjsConfig);
```

2. **Check EmailJS response:**
```typescript
console.log('EmailJS result:', result);
```

3. **Test with a simple email first:**
```typescript
// Test with minimal data
const testParams = {
  from_name: 'Test User',
  from_email: 'test@example.com',
  subject: 'Test',
  message: 'Test message',
  to_name: 'Sidarth',
};
```

## 📧 **Alternative Testing**

If EmailJS still doesn't work, test with:
1. **Different email service** (Gmail, Outlook, etc.)
2. **Different template** (copy the simple test template above)
3. **Different email address** for receiving

## 🆘 **Still Not Working?**

1. **Check EmailJS status page:** https://status.emailjs.com/
2. **Contact EmailJS support:** https://www.emailjs.com/support/
3. **Check your email provider's spam settings**
4. **Try sending to a different email address**

## 📱 **Quick Test**

Send a test message to yourself:
1. Fill out the form with your own email
2. Check both inbox and spam
3. Check EmailJS dashboard logs
4. Check browser console for errors

Let me know what you find in the EmailJS dashboard logs!
