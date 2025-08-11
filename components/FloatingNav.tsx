import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingNav() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👨‍💻" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "involvement", label: "Leadership", icon: "👥" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY > 100);

      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const current = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="flex flex-col gap-3 glass-nav p-4 relative overflow-hidden">
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-primary/20"
              animate={{
                borderColor: ["rgba(59, 130, 246, 0.2)", "rgba(147, 51, 234, 0.3)", "rgba(59, 130, 246, 0.2)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20, rotateY: -90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                title={section.label}
              >
                {/* Main dot */}
                <motion.div
                  className={`w-4 h-4 rounded-full transition-all duration-300 relative z-10 ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  layoutId={
                    activeSection === section.id
                      ? "activeNavDot"
                      : undefined
                  }
                />

                {/* Pulsing ring for active section */}
                {activeSection === section.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/50"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                )}

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0.6 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Tooltip */}
                <motion.div
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 glass-card px-4 py-2 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md"
                  initial={{ x: 10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium">{section.label}</span>
                  </div>
                  
                  {/* Tooltip arrow */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-glass-border border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                </motion.div>
              </motion.button>
            ))}

            {/* Progress indicator */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-muted-foreground/20 rounded-full overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                style={{
                  scaleX: (sections.findIndex(s => s.id === activeSection) + 1) / sections.length
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}