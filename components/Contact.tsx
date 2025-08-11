import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mail, Phone, MapPin, Send, Linkedin, CheckCircle, AlertCircle, Wand2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../src/config/emailjs';
import { generateEmailFromPurpose, type EmailTone } from '../src/config/gemini';

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

  // AI writing state
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState<EmailTone>('professional');
  const [isGenerating, setIsGenerating] = useState(false);

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
      const looksInvalid =
        !emailjsConfig?.serviceId?.startsWith('service_') ||
        !emailjsConfig?.templateId?.startsWith('template_') ||
        !emailjsConfig?.publicKey;
      if (looksInvalid) {
        throw new Error('Email configuration is invalid. Please verify Service ID, Template ID, and Public Key.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Sidarth',
      };

      console.log('🚀 Attempting to send email...');
      console.log('📧 Template params:', templateParams);
      console.log('⚙️ EmailJS config:', emailjsConfig);

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
        setPurpose('');
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      console.error('EmailJS error:', error);
      if (error?.text) console.error('EmailJS error text:', error.text);
      setSubmitStatus('error');
      setErrorMessage(
        error?.text ||
          error?.message ||
          'Failed to send message. Please try again or contact me directly via email.'
      );
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

  const handleGenerate = async () => {
    if (!purpose.trim()) return;
    try {
      setIsGenerating(true);
      const draft = await generateEmailFromPurpose({
        purpose: purpose.trim(),
        senderName: formData.name || 'Visitor',
        senderEmail: formData.email || 'visitor@example.com',
        tone,
      });

      // Split possible "Subject:" line and message body
      const lines = draft.split('\n').map(l => l.trim()).filter(Boolean);
      let subject = formData.subject;
      let bodyStart = 0;
      if (lines[0]?.toLowerCase().startsWith('subject:')) {
        subject = lines[0].replace(/^[Ss]ubject:\s*/, '').trim();
        bodyStart = 1;
      }
      const body = lines.slice(bodyStart).join('\n');

      setFormData(prev => ({ ...prev, subject, message: body }));
    } catch (err) {
      console.error('Gemini generate error:', err);
      setSubmitStatus('error');
      setErrorMessage('Could not generate email. Please try again later.');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } finally {
      setIsGenerating(false);
    }
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
            <CardContent className="pt-0 space-y-4">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* AI Assist */}
              <div className="space-y-2">
                <label htmlFor="purpose" className="text-sm font-medium">Describe the purpose (AI can draft for you)</label>
                <Textarea
                  id="purpose"
                  name="purpose"
                  rows={3}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="E.g., I want to inquire about collaborating on an IoT dashboard project next month..."
                  disabled={isLoading || isGenerating}
                />
                <div className="flex items-center gap-3">
                  <select
                    className="bg-input-background border border-input rounded-md px-2 py-1 text-sm"
                    value={tone}
                    onChange={(e) => setTone(e.target.value as EmailTone)}
                    disabled={isLoading || isGenerating}
                    aria-label="Writing tone"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="concise">Concise</option>
                    <option value="detailed">Detailed</option>
                  </select>
                  <Button type="button" variant="outline" size="sm" className="gap-2" onClick={handleGenerate} disabled={isGenerating || !purpose.trim()}>
                    <Wand2 className="h-4 w-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </div>
              </div>

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