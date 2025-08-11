import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "https://github.com/SID63" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/sidarthmurali-63/" },
    { icon: <Mail className="h-5 w-5" />, label: "Email", href: "mailto:iamsidarth@gmail.com" },
  ];

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg mb-2">Sidarth Murali</h3>
            <p className="text-muted-foreground">B.Tech CCE Student & Innovative Developer</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <Button key={index} variant="ghost" size="sm" className="gap-2" asChild>
                <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Sidarth Murali. Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> 
          </p>
        </div>
      </div>
    </footer>
  );
}