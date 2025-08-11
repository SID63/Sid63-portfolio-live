import { motion } from 'framer-motion';
import { Card, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RevealOnScroll } from './RevealOnScroll';
import { StaggerContainer, StaggerItem } from './StaggerContainer';
import { AspectRatio } from './ui/aspect-ratio';

// Local project images
import coldBloxImg from './projects images/ColdBlox Logo Design.png';
import busOverloadImg from './projects images/bus overload prevention.png';
import discordBotImg from './projects images/gojiraa discord bot.png';
import gestureVolImg from './projects images/gesture volume control.png';

export function Projects() {
  const projects = [
    {
      title: "ColdBlox - Cold Chain Monitoring System",
      description: "A research-driven cold chain monitoring system with IoT sensors, blockchain integration, and real-time dashboard for logistics tracking.",
      image: coldBloxImg,
      technologies: ["IoT", "Hyperledger", "CouchDB", "Supabase", "GSM", "Python"],
      period: "June 2024 - June 2025",
      organization: "Amrita vishwa vidyapeetham",
      projectUrl: "https://github.com/yourusername/coldblox-project",
      sourceCodeUrl: "https://github.com/SID63/ColdBlox",
      details: [
        "Collaborated with 4 peers under faculty mentorship to build a research-driven cold chain monitoring system",
        "Deployed 2 remote slave nodes and 1 master node to simulate real-world logistics",
        "Integrated IoT sensors for real-time temperature and humidity tracking with GSM-based data transmission",
        "Used Hyperledger + CouchDB for secure, tamper-proof data logging",
        "Developed a Supabase-based web dashboard for live monitoring, alerts, and CSV exports"
      ]
    },
    {
      title: "Bus Overload and Rash Driving Detection",
      description: "Real-time passenger counting and rash driving detection system using computer vision and IoT sensors.",
      image: busOverloadImg,
      technologies: ["OpenCV", "MobileNet SSD", "MQTT", "HiveMQ", "Gyroscope", "Python"],
      period: "January 2024 - June 2024",
      organization: "Amrita vishwa vidyapeetham",
      projectUrl: "https://github.com/yourusername/bus-detection-project",
      sourceCodeUrl: "https://github.com/SID63/ppl-count",
      details: [
        "Collaborated with 4 peers under faculty guidance as part of a department-wide Open Lab innovation initiative",
        "Achieved over 90% accuracy in real-time passenger counting using MobileNet SSD and Centroid Tracker",
        "Enabled instant alerts and live data visualization by integrating HiveMQ MQTT and a custom-built dashboard",
        "Simulated and tracked 5+ driving scenarios using a gyroscope and Xbox controller to detect abrupt movements",
        "Designed to support scalability across multiple vehicles for future real-world deployment"
      ]
    },
    {
      title: "Discord Chat Bot",
      description: "A multifunctional chatbot for entertainment and utilities serving a community of 1,000+ users.",
      image: discordBotImg,
      technologies: ["discord.py", "YouTube API", "Weather API", "Reddit API", "Python"],
      period: "January 2020 - May 2020",
      organization: "Passion Project",
      projectUrl: "https://top.gg/bot/766196780295389204",
      sourceCodeUrl: "https://github.com/gojiraa-bot/my-first-discord.py-bot",
      details: [
        "Created a multifunctional chatbot to automate entertainment and utilities for a community of 1,000+ users",
        "Posted trending memes from Reddit, increasing engagement",
        "Provided real-time weather updates using the Weather API",
        "Shared random dad jokes and fun content to boost interaction and user retention",
        "Integrated YouTube API for music playback in voice channels, supporting queueing, looping, and volume control"
      ]
    },
    {
      title: "Gesture Volume Control",
      description: "Python-based hand gesture recognition app that controls system volume via webcam using MediaPipe and OpenCV.",
      image: gestureVolImg,
      technologies: ["Python", "OpenCV", "MediaPipe", "NumPy", "pycaw", "Windows"],
      period: "may 2020 – may 2020",
      organization: "Passion Project",
      projectUrl: "https://github.com/yourusername/gesture-vol-control",
      sourceCodeUrl: "https://github.com/SID63/gesture-vol-control",
      details: [
        "Real-time hand tracking with 21-point landmarks and gesture state detection",
        "Thumb–index pinch maps to smooth volume changes with interpolation",
        "Visual feedback overlay with volume bar, percentage, and FPS at 30+ FPS"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/50 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <RevealOnScroll direction="up" className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of the projects I've worked on, focusing on IoT, AI, and real-world problem solving
          </p>
        </RevealOnScroll>

        <StaggerContainer className="grid lg:grid-cols-1 gap-8" delay={0.2} staggerDelay={0.15}>
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
              >
                <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-background/50 backdrop-blur-sm">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <AspectRatio ratio={16/9} className="rounded-lg overflow-hidden bg-muted/20">
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain object-center block select-none bg-background"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                          />
                        </AspectRatio>
                      </motion.div>
                      
                      {/* Overlay with buttons */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="gap-2"
                            onClick={() => window.open(project.projectUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Details
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mb-2">
                          {project.organization} • {project.period}
                        </p>
                        <CardDescription className="text-base mb-4">
                          {project.description}
                        </CardDescription>
                      </div>

                      {/* Technologies */}
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-6"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.05,
                            },
                          },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            variants={{
                              hidden: { opacity: 0, scale: 0 },
                              visible: { 
                                opacity: 1, 
                                scale: 1,
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20
                                }
                              },
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge variant="outline" className="hover:bg-primary/10 transition-colors">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Project Details */}
                      <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-sm">Key Achievements:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {project.details.slice(0, 3).map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            size="sm" 
                            className="gap-2"
                            onClick={() => window.open(project.projectUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Project
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-2"
                            onClick={() => window.open(project.sourceCodeUrl, '_blank')}
                          >
                            <Github className="h-4 w-4" />
                            Source Code
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}