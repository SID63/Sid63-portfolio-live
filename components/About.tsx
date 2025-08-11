import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Code, Palette, Rocket, GraduationCap, Briefcase } from 'lucide-react';

export function About() {
  const highlights = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "IoT & AI Development",
      description: "Experienced in OpenCV, YOLO models, and IoT sensor integration for real-world applications."
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Full Stack Development",
      description: "Building responsive applications with Angular, Flask, and modern web technologies."
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Blockchain Integration",
      description: "Implementing secure, tamper-proof data logging with Hyperledger and CouchDB."
    }
  ];

  const education = [
    {
      degree: "B.Tech CCE",
      institution: "Amrita University",
      location: "Coimbatore",
      period: "2021 - 2025*",
      details: "Computer and Communication Engineering"
    },
    {
      degree: "PCM, IP",
      institution: "Kathir Vidyaa Mandhir",
      location: "Coimbatore",
      period: "2020 - 2021",
      details: "Higher Secondary Education"
    },
    {
      degree: "Regular + FIIT",
      institution: "Delhi Public School",
      location: "Coimbatore",
      period: "2018 - 2019",
      details: "Secondary Education"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm a B.Tech student in Computer and Communication Engineering who loves turning ideas into real, working solutions. 
            I've worked on projects involving IoT, blockchain, and AI—always with a focus on solving real-world problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-2xl mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-4">
              I enjoy building things from scratch, learning as I go, and I'm not shy about using AI tools to speed things up 
              or explore new approaches. Whether it's writing code, debugging, or collaborating with a team, I'm always eager 
              to dive in and figure things out.
            </p>
            <p className="text-muted-foreground mb-6">
              My experience spans from IoT sensor integration to blockchain development, with a focus on creating practical 
              solutions that address real-world challenges. I've worked on projects involving computer vision, data analytics, 
              and full-stack web development.
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Python & AI/ML</span>
                <span className="text-primary"></span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>IoT & Hardware</span>
                <span className="text-primary"></span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Full Stack Development</span>
                <span className="text-primary"></span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {highlights.map((item, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-2xl mb-8 text-center">Education</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.location} • {edu.period}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{edu.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h3 className="text-2xl mb-8 text-center">Experience</h3>
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-lg">Intern - IntersectIQ</CardTitle>
                      <p className="text-sm text-muted-foreground">July 2024 - September 2024 • Remote</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Leveraged OpenCV to implement YOLOv10 Models for image processing</li>
                  <li>• Conducted image annotation for industrial datasets, enhancing model accuracy</li>
                  <li>• Learned and applied MQTT and OPC-UA protocols for client data transfer</li>
                  <li>• Collaborated with experienced mentors, utilizing Git for version control</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-lg">Intern - TATA Telecommunications</CardTitle>
                      <p className="text-sm text-muted-foreground">July 2023 - August 2023 • Chennai</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Collaborated in a 4-member team to develop a responsive CRUD interface using Angular 12 and Flask</li>
                  <li>• Integrated a MySQL database for efficient data management and storage</li>
                  <li>• Used Git for version control, ensuring smooth collaboration and streamlined project workflows</li>
                  <li>• Gained hands-on exposure to DevOps practices, CI/CD pipelines, and fundamental UI/UX design principles</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}