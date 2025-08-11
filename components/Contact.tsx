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
  const [validationErrors, setValidationErrors] = useState<{
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
  }>({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  // AI writing state
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState<EmailTone>('professional');
  const [isGenerating, setIsGenerating] = useState(false);

  // Animated placeholder state
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [currentPlaceholderText, setCurrentPlaceholderText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const placeholderExamples = [
    "I want to collaborate on an IoT dashboard project for smart city monitoring...",
    "Looking for a developer to help build a gesture-controlled volume system...",
    "Interested in discussing potential internship opportunities at your company...",
    "Need assistance with a React-based portfolio website redesign...",
    "Would like to explore freelance opportunities for web development projects..."
  ];

  // Animated typing effect for placeholder
  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    
    const clearAllTimeouts = () => {
      timeoutIds.forEach(id => clearTimeout(id));
      timeoutIds = [];
    };

    const typeText = (text: string, index: number) => {
      if (purpose.trim()) return;
      
      setIsTyping(true);
      let currentText = '';
      let charIndex = 0;
      
      const typeNextChar = () => {
        if (purpose.trim() || charIndex >= text.length) {
          if (charIndex >= text.length) {
            // Finished typing, wait then delete
            const waitId = setTimeout(() => deleteText(text, index), 2000);
            timeoutIds.push(waitId);
          } else {
            setIsTyping(false);
            setCurrentPlaceholderText('');
          }
          return;
        }
        
        currentText += text[charIndex];
        setCurrentPlaceholderText(currentText);
        charIndex++;
        
        const nextId = setTimeout(typeNextChar, 50);
        timeoutIds.push(nextId);
      };
      
      typeNextChar();
    };

    const deleteText = (text: string, index: number) => {
      if (purpose.trim()) {
        setIsTyping(false);
        setCurrentPlaceholderText('');
        return;
      }
      
      let currentText = text;
      let charIndex = text.length;
      
      const deleteNextChar = () => {
        if (purpose.trim() || charIndex <= 0) {
          setIsTyping(false);
          setCurrentPlaceholderText('');
          
          if (!purpose.trim()) {
            // Move to next example
            const nextIndex = (index + 1) % placeholderExamples.length;
            setCurrentPlaceholderIndex(nextIndex);
            
            const waitId = setTimeout(() => {
              if (!purpose.trim()) {
                typeText(placeholderExamples[nextIndex], nextIndex);
              }
            }, 1000);
            timeoutIds.push(waitId);
          }
          return;
        }
        
        currentText = text.slice(0, charIndex);
        setCurrentPlaceholderText(currentText);
        charIndex--;
        
        const nextId = setTimeout(deleteNextChar, 30);
        timeoutIds.push(nextId);
      };
      
      deleteNextChar();
    };

    // Start animation only if field is empty
    if (!purpose.trim()) {
      typeText(placeholderExamples[currentPlaceholderIndex], currentPlaceholderIndex);
    }

    return clearAllTimeouts;
  }, [purpose, currentPlaceholderIndex]);

  // Clear placeholder text when user starts typing
  useEffect(() => {
    if (purpose.trim()) {
      setCurrentPlaceholderText('');
      setIsTyping(false);
    }
  }, [purpose]);

  // Debug: Check EmailJS initialization
  useEffect(() => {
    console.log('🔧 Contact component mounted');
    console.log('📧 EmailJS config:', emailjsConfig);
    console.log('📧 EmailJS library loaded:', typeof emailjs !== 'undefined');
  }, []);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !isEmailValid,
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };
    
    console.log('🔍 Validation errors:', errors);
    console.log('📝 Form data:', formData);
    console.log('📧 Email validation:', {
      email: formData.email,
      trimmed: formData.email.trim(),
      hasAtSymbol: formData.email.includes('@'),
      hasDot: formData.email.includes('.'),
      regexTest: isEmailValid,
      emailError: errors.email
    });
    
    setValidationErrors(errors);
    const isValid = !Object.values(errors).some(error => error);
    console.log('✅ Form is valid:', isValid);
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submission attempted');
    
    if (!validateForm()) {
      console.log('❌ Validation failed, stopping submission');
      return; // Stop submission if validation fails
    }
    
    console.log('✅ Validation passed, proceeding with submission');
    
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
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[e.target.name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [e.target.name]: false
      }));
    }
    
    // Real-time email validation
    if (e.target.name === 'email' && e.target.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailRegex.test(e.target.value);
      
      if (!isEmailValid) {
        setValidationErrors(prev => ({
          ...prev,
          email: true
        }));
      }
    }
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
                <div className="relative">
                  <Textarea
                    id="purpose"
                    name="purpose"
                    rows={3}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder=""
                    disabled={isLoading || isGenerating}
                    className="relative z-10 text-[14px] leading-[1.5] pl-4 pt-3"
                  />
                  {/* Animated placeholder text */}
                  {isTyping && currentPlaceholderText && (
                    <div 
                      className="absolute top-0 left-0 pointer-events-none text-gray-600"
                      style={{
                        top: '12px',
                        left: '16px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        maxWidth: 'calc(100% - 32px)',
                        zIndex: 5
                      }}
                    >
                      {currentPlaceholderText}
                      <span className="ml-1 animate-pulse">▋</span>
                    </div>
                  )}
                  
                  {/* Static placeholder when no animation is active */}
                  {!isTyping && !currentPlaceholderText && !purpose && (
                    <div 
                      className="absolute top-0 left-0 pointer-events-none text-gray-700"
                      style={{
                        top: '12px',
                        left: '16px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        maxWidth: 'calc(100% - 32px)',
                        zIndex: 5
                      }}
                    >
                      {placeholderExamples[currentPlaceholderIndex]}
                    </div>
                  )}
                </div>
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
                  <Button 
                    type="button" 
                    size="sm" 
                    className="gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={handleGenerate} 
                    disabled={isGenerating || !purpose.trim()}
                  >
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
                      className={`placeholder:text-gray-600 transition-all duration-300 ${
                        validationErrors.name 
                          ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/25' 
                          : 'ring-1 ring-border'
                      }`}
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
                      className={`placeholder:text-gray-600 transition-all duration-300 ${
                        validationErrors.email 
                          ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/25' 
                          : 'ring-1 ring-border'
                      }`}
                    />
                    {validationErrors.email && formData.email.trim() && (
                      <p className="text-sm text-red-500 mt-1">
                        Please enter a valid email address (e.g., user@example.com)
                      </p>
                    )}
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
                    className={`placeholder:text-gray-600 transition-all duration-300 ${
                      validationErrors.subject 
                        ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/25'
                        : formData.subject && formData.subject !== purpose 
                          ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/25' 
                          : 'ring-1 ring-border'
                    }`}
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
                    className={`placeholder:text-gray-600 transition-all duration-300 ${
                      validationErrors.message 
                        ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/25'
                        : formData.message && formData.message !== purpose 
                          ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/25' 
                          : 'ring-1 ring-border'
                    }`}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className={`w-full gap-2 transition-all duration-300 ${
                    formData.name && formData.email && formData.subject && formData.message
                      ? 'bg-gradient-to-r from-primary to-accent text-green-500 hover:opacity-90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  disabled={isLoading}
                  onClick={(e) => {
                    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                      e.preventDefault();
                      validateForm();
                    }
                  }}
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