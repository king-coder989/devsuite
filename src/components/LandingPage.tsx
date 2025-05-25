import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowDown, Github, Terminal, Zap, Code, Database, GitBranch, Clock, Users, Star } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage = ({ onEnterApp }: LandingPageProps) => {
  const [terminalText, setTerminalText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);

  const terminalLines = [
    '$ sui client query --type GraphQL',
    '> Connecting to Sui mainnet...',
    '> Query executed successfully ✓',
    '> Code generated in TypeScript ✓',
    '$ sui move build --migration-check',
    '> Analyzing breaking changes...',
    '> Migration guide ready ✓',
    '$ bridge simulate --token SUI',
    '> Simulating cross-chain flow...',
    '> Bridge test complete ✓'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        const line = terminalLines[currentLine];
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= line.length) {
            setTerminalText(prev => {
              const lines = prev.split('\n');
              lines[currentLine] = line.slice(0, charIndex);
              return lines.join('\n');
            });
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              setCurrentLine(prev => prev + 1);
            }, 1000);
          }
        }, 50);
      } else {
        setCurrentLine(0);
        setTerminalText('');
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentLine]);

  const modules = [
    {
      name: 'SuiGraphQLStudio',
      description: 'Advanced GraphQL playground for Sui RPC 2.0 with real-time query building and code generation.',
      icon: <Database className="w-8 h-8" />,
      status: 'live',
      color: 'from-electric-teal to-jade-green'
    },
    {
      name: 'SDKMigrationGuide',
      description: 'AI-powered diff tool to detect breaking changes across Sui SDK versions.',
      icon: <Code className="w-8 h-8" />,
      status: 'live',
      color: 'from-jade-green to-electric-teal'
    },
    {
      name: 'BridgeFlowComposer',
      description: 'Visual token bridge simulator for safe cross-chain flow modeling.',
      icon: <GitBranch className="w-8 h-8" />,
      status: 'live',
      color: 'from-sunset-orange to-electric-teal'
    }
  ];

  const roadmapModules = [
    'SCION Network Simulator',
    'Object Composition Visualizer',
    'Move State Previewer',
    'Plugin SDK Framework',
    'Live Devnet Deploy Tracker',
    'Faucet Automation Suite',
    'Performance Analytics Dashboard'
  ];

  const techStack = [
    { name: 'React', color: 'bg-blue-500' },
    { name: 'TypeScript', color: 'bg-blue-600' },
    { name: 'Tailwind CSS', color: 'bg-teal-500' },
    { name: 'GPT-4', color: 'bg-green-500' },
    { name: 'Sui Blockchain', color: 'bg-indigo-500' },
    { name: 'GraphQL', color: 'bg-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-midnight text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-deep-ocean via-midnight to-slate-card opacity-90"></div>
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-jade-green/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-slate-400/20">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/fd85d8cb-27fb-4676-b7e3-8317940f36df.png" 
            alt="DevSuite" 
            className="h-10 w-auto"
          />
          <span className="text-xl font-display font-bold">DevSuite</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#modules" className="hover:text-electric-teal transition-colors">Modules</a>
          <a href="#roadmap" className="hover:text-electric-teal transition-colors">Roadmap</a>
          <a href="#tech" className="hover:text-electric-teal transition-colors">Tech Stack</a>
        </nav>
        <Button onClick={onEnterApp} className="bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean">
          Launch App
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto">
        <div className="flex-1 mb-12 lg:mb-0">
          <Badge className="mb-6 bg-electric-teal/20 text-electric-teal border-electric-teal/30">
            🚀 Sui Overflow 2025 Winner
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white via-electric-teal to-jade-green bg-clip-text text-transparent">
            The Future of
            <br />
            Sui Development
          </h1>
          <p className="text-xl text-cool-gray mb-8 max-w-2xl">
            Transform complex blockchain workflows into effortless experiences. 
            Built for developers who demand speed, precision, and modularity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onEnterApp}
              className="bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-semibold px-8 py-3 text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try DevSuite Now
            </Button>
            <Button 
              variant="outline" 
              className="border-electric-teal text-electric-teal hover:bg-electric-teal hover:text-deep-ocean font-semibold px-8 py-3 text-lg"
              onClick={() => window.open('https://github.com/king-coder989', '_blank')}
            >
              <Github className="w-5 h-5 mr-2" />
              View GitHub
            </Button>
          </div>
        </div>

        {/* Animated Terminal */}
        <div className="flex-1 max-w-lg">
          <Card className="bg-black/50 border-electric-teal/30 p-6 font-mono text-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-cool-gray ml-2">DevSuite Terminal</span>
            </div>
            <div className="min-h-[300px] text-green-400">
              <pre className="whitespace-pre-wrap">{terminalText}</pre>
              <span className="animate-pulse">_</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Live Development Modules</h2>
          <p className="text-xl text-cool-gray">Three powerful tools, ready to revolutionize your workflow</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Card 
              key={module.name}
              className={`group p-8 bg-gradient-to-br ${module.color} opacity-90 hover:opacity-100 border-0 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-electric-teal/20`}
            >
              <div className="text-deep-ocean">
                <div className="mb-4 p-3 bg-black/20 rounded-lg w-fit">
                  {module.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">{module.name}</h3>
                <p className="text-deep-ocean/80 mb-4">{module.description}</p>
                <Badge className="bg-black/20 text-deep-ocean border-0">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Live
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative z-10 px-6 py-20 bg-gradient-to-r from-deep-ocean/50 to-slate-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Development Roadmap</h2>
            <p className="text-xl text-cool-gray">7 more modules coming soon</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {roadmapModules.slice(0, 4).map((module, index) => (
                <div key={module} className="flex items-center gap-4 p-4 bg-slate-card/30 rounded-lg border border-slate-400/20">
                  <div className="w-8 h-8 rounded-full bg-electric-teal/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-electric-teal" />
                  </div>
                  <span className="text-lg">{module}</span>
                  <Badge variant="outline" className="ml-auto">Coming Soon</Badge>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {roadmapModules.slice(4).map((module, index) => (
                <div key={module} className="flex items-center gap-4 p-4 bg-slate-card/30 rounded-lg border border-slate-400/20">
                  <div className="w-8 h-8 rounded-full bg-jade-green/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-jade-green" />
                  </div>
                  <span className="text-lg">{module}</span>
                  <Badge variant="outline" className="ml-auto">Q2 2025</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Built with Modern Tech</h2>
          <p className="text-xl text-cool-gray">Powered by industry-leading technologies</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech) => (
            <Badge 
              key={tech.name}
              className={`${tech.color} text-white px-6 py-3 text-lg font-semibold hover:scale-110 transition-transform cursor-pointer`}
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-electric-teal/10 via-jade-green/10 to-sunset-orange/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-display font-bold mb-6 bg-gradient-to-r from-electric-teal to-jade-green bg-clip-text text-transparent">
            Join the Revolution
          </h2>
          <p className="text-2xl text-cool-gray mb-8">
            Contribute. Build. Shape the future of Web3 development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button 
              onClick={onEnterApp}
              className="bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-bold px-12 py-4 text-xl"
            >
              <Terminal className="w-6 h-6 mr-3" />
              Launch Playground
            </Button>
            <Button 
              variant="outline"
              className="border-jade-green text-jade-green hover:bg-jade-green hover:text-deep-ocean font-bold px-12 py-4 text-xl"
              onClick={() => window.open('https://github.com/king-coder989', '_blank')}
            >
              <Users className="w-6 h-6 mr-3" />
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-400/20 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/fd85d8cb-27fb-4676-b7e3-8317940f36df.png" 
                alt="DevSuite" 
                className="h-8 w-auto"
              />
              <span className="text-lg font-display font-bold">DevSuite</span>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/king-coder989" target="_blank" rel="noopener noreferrer" className="text-cool-gray hover:text-electric-teal transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://x.com/gupta_arpit24" target="_blank" rel="noopener noreferrer" className="text-cool-gray hover:text-electric-teal transition-colors">
                <Star className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/arpit-gupta-985720340/" target="_blank" rel="noopener noreferrer" className="text-cool-gray hover:text-electric-teal transition-colors">
                <Users className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-slate-400/20">
            <p className="text-cool-gray">© 2025 DevSuite. Built for Sui Overflow 2025 Hackathon.</p>
          </div>
        </div>
      </footer>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-electric-teal" />
      </div>
    </div>
  );
};

export default LandingPage;
