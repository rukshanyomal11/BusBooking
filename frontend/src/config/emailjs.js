// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials
// Sign up at https://www.emailjs.com/ to get your credentials

export const emailjsConfig = {
  // Your EmailJS service ID (from EmailJS dashboard)
  serviceId: "your_service_id",
  
  // Your EmailJS template ID (from EmailJS dashboard)
  templateId: "your_template_id",
  
  // Your EmailJS public key (from EmailJS dashboard)
  publicKey: "your_public_key"
};

// Template variables that will be sent to EmailJS
// Make sure your EmailJS template has these variable names:
// - from_name: {{from_name}}
// - from_email: {{from_email}}
// - message: {{message}}
// - to_name: Bus Booking Support (or your preferred name)