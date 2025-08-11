import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RevealOnScroll } from './RevealOnScroll';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "SQL", "Java basics", "JavaScript"],
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "AI & Computer Vision",
      skills: ["OpenCV", "YOLO", "Machine Learning", "Computer Vision"],
      color: "from-green-500/20 to-teal-500/20"
    },
    {
      title: "Web Development",
      skills: ["Flask","HTML/CSS", "Git"],
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "IoT & Hardware",
      skills: ["IoT", "MQTT", "OPC-UA", "Sensor Integration"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Soft Skills",
      skills: ["Project Management", "Presentation", "Teamwork", "Time Management"],
      color: "from-indigo-500/20 to-blue-500/20"
    },
    {
      title: "Languages",
      skills: ["English", "Tamil", "Hindi (basic)"],
      color: "from-yellow-500/20 to-orange-500/20"
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <RevealOnScroll direction="up" className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I work with modern technologies to build scalable, performant applications with focus on IoT, AI, and blockchain
          </p>
        </RevealOnScroll>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" delay={0.2} staggerDelay={0.2}>
          {skillCategories.map((category, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
              >
                <Card className="p-6 relative overflow-hidden group">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <CardTitle className="text-xl text-center">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <motion.div 
                      className="flex flex-wrap gap-3 justify-center"
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
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
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
                          whileHover={{ 
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge variant="secondary" className="px-3 py-1 cursor-pointer">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
