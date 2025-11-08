# EmailJS Setup Guide for Bus Booking App

## 📧 How to Configure EmailJS

### Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID** (you'll need this)

### Step 3: Create an Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Hello {{to_name}},

You have received a new message from your Bus Booking website:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your Bus Booking contact form.
```

4. Set the subject line: "New Contact Form Message from {{from_name}}"
5. Save the template and note down your **Template ID**

### Step 4: Get Your Public Key
1. Go to "Account" in your dashboard
2. Find your **Public Key** in the API Keys section

### Step 5: Update Configuration
1. Open `src/config/emailjs.js`
2. Replace the placeholder values with your actual credentials:

```javascript
export const emailjsConfig = {
  serviceId: "your_actual_service_id",      // From Step 2
  templateId: "your_actual_template_id",    // From Step 3
  publicKey: "your_actual_public_key"       // From Step 4
};
```

### Step 6: Test the Configuration
1. Save your changes
2. Run your app: `npm run dev`
3. Go to the Help page
4. Fill out and submit the contact form
5. Check your email for the message

## 📝 Template Variables Used

The form sends these variables to your EmailJS template:
- `from_name`: User's name from the form
- `from_email`: User's email from the form
- `message`: User's message from the form
- `to_name`: Set to "Bus Booking Support Team"
- `reply_to`: Set to user's email for easy replies

## 🔒 Security Notes

- Your Public Key is safe to use in frontend code
- Never expose your Private Key in frontend code
- EmailJS free plan includes 200 emails/month
- Consider upgrading for higher limits in production

## 🚨 Troubleshooting

**Common Issues:**

1. **"Service not found" error:**
   - Double-check your Service ID
   - Ensure the email service is properly configured

2. **"Template not found" error:**
   - Verify your Template ID
   - Make sure the template is published

3. **"Invalid public key" error:**
   - Check your Public Key from the Account section
   - Ensure you're using the public key, not private

4. **Emails not being sent:**
   - Check EmailJS dashboard for error logs
   - Verify your email service configuration
   - Ensure template variables match

## 📊 Monitoring

- Check EmailJS dashboard for delivery statistics
- Monitor email deliverability
- Review bounce rates and failed deliveries

---

Once configured, users will be able to send real emails through your contact form, and you'll receive them in your configured email inbox!