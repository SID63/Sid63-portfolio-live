// EmailJS Configuration
// Get these values from your EmailJS dashboard: https://dashboard.emailjs.com/

export const emailjsConfig = {
      serviceId: 'service_9022oj8', // Replace with your EmailJS service ID
      templateId: 'template_9022oj8', // Replace with your EmailJS template ID
      publicKey: 'user_9022oj8', // Replace with your EmailJS public key
};

// EmailJS initialization
export const initEmailJS = () => {
  // Initialize EmailJS with your public key
  // This should be called once when your app starts
  if (typeof window !== 'undefined') {
    // Only initialize on client side
    import('@emailjs/browser').then((emailjs) => {
      emailjs.default.init(emailjsConfig.publicKey);
    });
  }
};
