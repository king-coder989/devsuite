import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Instagram, Github, Linkedin, Twitter, User, LogOut } from 'lucide-react';
import ModuleDocumentation from './ModuleDocumentation';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'active' | 'beta' | 'coming-soon';
  category: 'core' | 'advanced' | 'community';
}

interface DashboardProps {
  onModuleSelect: (moduleId: string) => void;
  user?: any;
  onLogout?: () => void;
}

const Dashboard = ({ onModuleSelect, user, onLogout }: DashboardProps) => {
  const [showDocumentation, setShowDocumentation] = useState(false);

  if (showDocumentation) {
    return <ModuleDocumentation onBack={() => setShowDocumentation(false)} />;
  }

  const modules: Module[] = [{
    id: 'graphql-studio',
    title: 'GraphQL Studio',
    description: 'Explore Sui\'s GraphQL 2.0 with live queries and intelligent schema browsing.',
    icon: '🔍',
    status: 'active',
    category: 'core'
  }, {
    id: 'sdk-migration',
    title: 'SDK Migration Guide',
    description: 'Navigate SDK changes confidently with AI-powered migration guidance.',
    icon: '🔄',
    status: 'active',
    category: 'core'
  }, {
    id: 'bridge-composer',
    title: 'Bridge Flow Composer',
    description: 'Experience seamless cross-chain flows with visual interface design.',
    icon: '🌉',
    status: 'active',
    category: 'core'
  }, {
    id: 'scion-simulator',
    title: 'SCION Simulator',
    description: 'Visualize network resilience and simulate stress conditions.',
    icon: '📊',
    status: 'coming-soon',
    category: 'advanced'
  }, {
    id: 'instant-deploy',
    title: 'Instant Deploy',
    description: 'From zero to deployed in one click with production-ready configs.',
    icon: '🚀',
    status: 'coming-soon',
    category: 'core'
  }, {
    id: 'move-simulator',
    title: 'Move Simulator',
    description: 'Preview state changes before execution with real-time visualization.',
    icon: '⚡',
    status: 'coming-soon',
    category: 'advanced'
  }];
  
  const getStatusBadge = (status: Module['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-jade-green/20 text-jade-green border-jade-green/30 hover:bg-jade-green/30">Active</Badge>;
      case 'beta':
        return <Badge className="bg-electric-teal/20 text-electric-teal border-electric-teal/30 hover:bg-electric-teal/30">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-cool-gray/20 text-cool-gray border-cool-gray/30">Coming Soon</Badge>;
    }
  };

  const socialLinks = [{
    name: 'Instagram',
    url: 'https://www.instagram.com/cm_guptaji/',
    icon: Instagram
  }, {
    name: 'GitHub',
    url: 'https://github.com/king-coder989',
    icon: Github
  }, {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/arpit-gupta-985720340/',
    icon: Linkedin
  }, {
    name: 'Twitter',
    url: 'https://x.com/gupta_arpit24',
    icon: Twitter
  }];

  return <div className="min-h-screen bg-midnight">
      {/* Header */}
      <header className="border-b border-slate-400/20 bg-midnight/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <img src="/lovable-uploads/fd85d8cb-27fb-4676-b7e3-8317940f36df.png" alt="DevSuite Logo" className="h-16 w-auto" />
              <p className="text-sm text-cool-gray">Sui Developer Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <div className="flex items-center gap-2 text-cool-gray text-sm">
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                    <Badge className="bg-jade-green/20 text-jade-green border-jade-green/30 text-xs">
                      {user.role}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-sunset-orange/30 text-sunset-orange hover:bg-sunset-orange/10"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" className="border-electric-teal/30 text-electric-teal hover:bg-electric-teal/10">
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Transform Sui development from 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-jade-green"> complex to effortless</span>
          </h2>
          <p className="text-lg text-cool-gray max-w-3xl mx-auto">
            Built for the next generation of Move developers, DevSuite is a unified workspace that eliminates 
            the friction between idea and deployment.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-6 text-center">
            <div className="text-3xl font-bold text-electric-teal mb-2">3</div>
            <div className="text-cool-gray">Active Tools</div>
          </Card>
          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-6 text-center cursor-pointer hover:border-electric-teal/50 transition-all duration-300" onClick={() => setShowDocumentation(true)}>
            <div className="text-3xl font-bold text-jade-green mb-2">10</div>
            <div className="text-cool-gray">Total Modules</div>
            <div className="text-xs text-electric-teal mt-1">Click to view documentation</div>
          </Card>
        </section>

        {/* Module Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-semibold text-white">Developer Tools</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-electric-teal/30 text-electric-teal">
                Core Tools
              </Button>
              <Button variant="ghost" size="sm" className="text-cool-gray">
                Advanced
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map(module => <Card key={module.id} className={`module-card cursor-pointer group ${module.status === 'coming-soon' ? 'opacity-60 cursor-not-allowed' : ''}`} onClick={() => module.status === 'active' && onModuleSelect(module.id)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl">{module.icon}</div>
                  {getStatusBadge(module.status)}
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-electric-teal transition-colors">
                  {module.title}
                </h4>
                
                <p className="text-cool-gray text-sm mb-4 leading-relaxed">
                  {module.description}
                </p>
                
                {module.status === 'active' && <Button size="sm" className="w-full bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-medium">
                    Launch Tool
                  </Button>}
                
                {module.status === 'coming-soon' && <Button size="sm" variant="outline" className="w-full border-cool-gray/30 text-cool-gray cursor-not-allowed" disabled>
                    Coming Soon
                  </Button>}
              </Card>)}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-400/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-cool-gray text-sm mb-2">
                One dashboard. Ten breakthrough tools. Infinite possibilities on Sui.
              </p>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <img src="/lovable-uploads/ca78a567-8f65-4ab6-8ada-58b241900c4c.png" alt="DevSuite Logo" className="h-6 w-auto" />
                <span className="text-electric-teal text-sm font-medium">DevSuite 2025</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-cool-gray text-sm">Connect with us:</span>
              {socialLinks.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-cool-gray hover:text-electric-teal transition-colors p-2 hover:bg-electric-teal/10 rounded-full" title={social.name}>
                  <social.icon className="w-5 h-5" />
                </a>)}
              <a href="https://devfolio.co/@kinglegendery76" target="_blank" rel="noopener noreferrer" className="text-cool-gray hover:text-electric-teal transition-colors p-2 hover:bg-electric-teal/10 rounded-full text-sm font-mono" title="Devfolio">
                DEV
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>;
};

export default Dashboard;
