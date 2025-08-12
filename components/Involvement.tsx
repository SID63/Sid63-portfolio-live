import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Award, Calendar, Target } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

export function Involvement() {
  const involvements = [
    {
      title: "Head",
      organization: "Amrita University - Anokha'24",
      period: "January 2024 - September 2024",
      location: "Amrita University",
      icon: <Users className="h-6 w-6 text-primary" />,
      achievements: [
        "Oversaw planning and execution of 50+ tech stalls and exhibitions, leading a team of 20 volunteers",
        "Coordinated with industry partners and student teams; ensured 3,000+ visitor footfall",
        "Collaborated with sponsors and industry professionals to set up demo spaces",
        "Oversaw design of stall layout and signage for better foot traffic management"
      ],
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "CO-Head",
      organization: "Amrita University - Anokha'23",
      period: "July 2024 - August 2024",
      location: "Amrita University",
      icon: <Award className="h-6 w-6 text-primary" />,
      achievements: [
        "Managed scheduling, stall layout, and volunteer coordination for 21+ student tech projects",
        "Managed scheduling, team allocation, and on-the-day coordination with faculty leads",
        "Handled last-minute logistics, AV equipment setup, and issue resolution during the event"
      ],
      color: "from-green-500/20 to-teal-500/20"
    },
    {
      title: "Class Representative",
      organization: "Amrita University",
      period: "February 2022 - June 2024",
      location: "Amrita University",
      icon: <Target className="h-6 w-6 text-primary" />,
      achievements: [
        "Represented a batch of 78 students, acting as liaison between faculty and students",
        "Organized academic discussions, managed feedback collection",
        "Coordinated class schedules, attendance reporting, and session rescheduling"
      ],
      color: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <section id="involvement" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
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
          <h2 className="text-3xl lg:text-4xl mb-6">Leadership & Involvement</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Active participation in university events and student organizations, demonstrating leadership and organizational skills
          </p>
        </RevealOnScroll>

        <StaggerContainer className="grid lg:grid-cols-1 gap-8" delay={0.2} staggerDelay={0.2}>
          {involvements.map((involvement, index) => (
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
                    className={`absolute inset-0 bg-gradient-to-br ${involvement.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  
                  <div className="relative z-10">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {involvement.icon}
                          <div>
                            <CardTitle className="text-xl">{involvement.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{involvement.organization}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {involvement.period}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {involvement.location}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <motion.div 
                        className="space-y-3"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1,
                            },
                          },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {involvement.achievements.map((achievement, achievementIndex) => (
                          <motion.div
                            key={achievementIndex}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { 
                                opacity: 1, 
                                x: 0,
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20
                                }
                              },
                            }}
                            className="flex items-start gap-3"
                          >
                            <Calendar className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{achievement}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
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
