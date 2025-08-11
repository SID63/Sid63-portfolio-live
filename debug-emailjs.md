# 🚨 EmailJS Debug Checklist

## **IMMEDIATE STEPS TO TAKE:**

### 1. **Check Browser Console (F12)**
- Open DevTools → Console
- Submit the contact form
- Look for these debug messages:
  - 🔧 Contact component mounted
  - 📧 EmailJS config: {serviceId, templateId, publicKey}
  - 📧 EmailJS library loaded: true/false
  - 🚀 Attempting to send email...
  - 📧 Template params: {...}
  - ⚙️ EmailJS config: {...}
  - ✅ EmailJS result: {...}

### 2. **Check EmailJS Dashboard**
- Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
- Check **"Email Logs"** - Look for recent submissions
- Check **"Email Services"** - Ensure service_9022oj8 is "Connected"

### 3. **Verify Template Variables**
- In EmailJS Dashboard → Email Templates
- Click on template_9022oj8
- Ensure it has EXACTLY these variables:
  ```
  {{from_name}}
  {{from_email}}
  {{subject}}
  {{message}}
  {{to_name}}
  ```

### 4. **Quick Test**
- Send a test message to YOURSELF
- Use your own email address
- Check both inbox AND spam folder

## **COMMON ISSUES:**

### ❌ **Service Not Connected**
- **Fix:** Re-authenticate email service in EmailJS dashboard

### ❌ **Template Variables Wrong**
- **Fix:** Copy this exact template:
  ```
  Subject: New Portfolio Message: {{subject}}
  
  From: {{from_name}} ({{from_email}})
  Subject: {{subject}}
  Message: {{message}}
  To: {{to_name}}
  ```

### ❌ **Wrong Credentials**
- **Fix:** Double-check all IDs match dashboard exactly

### ❌ **Email Provider Blocking**
- **Fix:** Try different email service (Gmail, Outlook, etc.)

## **NEXT STEPS:**

1. **Run the debug checklist above**
2. **Tell me what you see in the browser console**
3. **Tell me what you see in EmailJS dashboard logs**
4. **Tell me if you see any error messages**

## **EMERGENCY FIX:**

If nothing works, try this simple template:

**Subject:** Test Message

**Body:**
```
Test message from {{from_name}}
Email: {{from_email}}
Message: {{message}}
```

This will help rule out template issues.
