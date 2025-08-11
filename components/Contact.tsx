import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mail, Phone, MapPin, Send, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../src/config/emailjs';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Debug: Check EmailJS initialization
  useEffect(() => {
    console.log('🔧 Contact component mounted');
    console.log('📧 EmailJS config:', emailjsConfig);
    console.log('📧 EmailJS library loaded:', typeof emailjs !== 'undefined');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // EmailJS configuration - you'll need to set these up
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Sidarth',
      };

      // Debug logging
      console.log('🚀 Attempting to send email...');
      console.log('📧 Template params:', templateParams);
      console.log('⚙️ EmailJS config:', emailjsConfig);

      // Use EmailJS configuration
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      console.log('✅ EmailJS result:', result);

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact me directly via email.');
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "iamsidarth@gmail.com",
      link: "mailto:iamsidarth@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "+91 9962581028",
      link: "tel:+919962581028"
    },
    {
      icon: <Linkedin className="h-6 w-6 text-primary" />,
      title: "LinkedIn",
      value: "linkedin.com/in/sidarthmurali-63",
      link: "https://linkedin.com/in/sidarthmurali-63"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location",
      value: "Chennai, Tamil Nadu, India",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in hearing about new opportunities and exciting projects.
                Whether you have a question about my work or want to discuss potential collaborations, 
                feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : '_self'}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-6">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Tell me about your project or question..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full gap-2" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}