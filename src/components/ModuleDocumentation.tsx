
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface ModuleDoc {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'active' | 'beta' | 'coming-soon';
  features: string[];
  techStack: string[];
}

const ModuleDocumentation = ({ onBack }: { onBack: () => void }) => {
  const modules: ModuleDoc[] = [
    {
      id: 'graphql-studio',
      title: 'GraphQL Studio',
      description: 'Explore Sui\'s GraphQL 2.0 with live queries, intelligent schema browsing, and instant code generation.',
      icon: '🔍',
      status: 'active',
      features: ['Live Query Builder', 'Schema Auto-completion', 'Code Generation', 'Export Functionality'],
      techStack: ['GraphQL', 'React', 'TypeScript']
    },
    {
      id: 'sdk-migration',
      title: 'SDK Migration Guide',
      description: 'Navigate SDK changes confidently. Compare API versions and get AI-powered migration guidance in seconds.',
      icon: '🔄',
      status: 'active',
      features: ['Side-by-side Diff Viewer', 'AI-powered Analysis', 'Migration Suggestions', 'Code Comparison'],
      techStack: ['React', 'Diff Algorithm', 'AI Integration']
    },
    {
      id: 'bridge-composer',
      title: 'Bridge Flow Composer',
      description: 'Experience seamless cross-chain flows with a visual interface that brings Sui\'s object model to life.',
      icon: '🌉',
      status: 'active',
      features: ['3-step Flow Design', 'Mock Transaction IDs', 'Visual Progress Tracking', 'Cross-chain Simulation'],
      techStack: ['React', 'Blockchain APIs', 'Web3']
    },
    {
      id: 'scion-simulator',
      title: 'SCION Simulator',
      description: 'Visualize network resilience. Simulate partitions, latency, and attacks to understand your dApp\'s behavior under stress.',
      icon: '📊',
      status: 'coming-soon',
      features: ['Network Simulation', 'Stress Testing', 'Visual Analytics', 'Performance Metrics'],
      techStack: ['Network Protocols', 'Simulation Engine', 'Data Visualization']
    },
    {
      id: 'instant-deploy',
      title: 'Instant Deploy',
      description: 'From zero to deployed in one click. Launch wallets, faucets, and contracts with production-ready configurations.',
      icon: '🚀',
      status: 'coming-soon',
      features: ['One-click Deployment', 'Template Library', 'Configuration Management', 'Production-ready Setups'],
      techStack: ['DevOps', 'Container Orchestration', 'CI/CD']
    },
    {
      id: 'move-simulator',
      title: 'Move Simulator',
      description: 'Preview state changes before execution. Visualize how your Move logic transforms objects in real-time.',
      icon: '⚡',
      status: 'coming-soon',
      features: ['State Preview', 'Real-time Visualization', 'Move Language Support', 'Debug Tools'],
      techStack: ['Move Language', 'State Management', 'Visualization']
    },
    {
      id: 'object-explorer',
      title: 'Object Explorer',
      description: 'Map the relationships that matter. Navigate Sui\'s object graph with intuitive tree visualizations.',
      icon: '🗺️',
      status: 'coming-soon',
      features: ['Object Graph Visualization', 'Relationship Mapping', 'Interactive Navigation', 'Tree Structure'],
      techStack: ['Graph Algorithms', 'D3.js', 'Data Structures']
    },
    {
      id: 'wallet-sandbox',
      title: 'Wallet Sandbox',
      description: 'Test complex authentication flows. Simulate multisig, session keys, and gasless transactions effortlessly.',
      icon: '👛',
      status: 'coming-soon',
      features: ['Authentication Testing', 'Multisig Simulation', 'Session Key Management', 'Gasless Transactions'],
      techStack: ['Wallet Connect', 'Authentication Protocols', 'Cryptography']
    },
    {
      id: 'security-auditor',
      title: 'Security Auditor',
      description: 'Catch vulnerabilities early. AI-powered analysis highlights security patterns in your Move modules.',
      icon: '🔒',
      status: 'coming-soon',
      features: ['Vulnerability Detection', 'AI-powered Analysis', 'Security Best Practices', 'Code Review'],
      techStack: ['Static Analysis', 'AI/ML', 'Security Frameworks']
    },
    {
      id: 'extension-hub',
      title: 'Extension Hub',
      description: 'Expand your toolkit. Community-driven plugins integrate seamlessly into your workflow.',
      icon: '🧩',
      status: 'coming-soon',
      features: ['Plugin Marketplace', 'Community Extensions', 'Custom Integrations', 'API Framework'],
      techStack: ['Plugin Architecture', 'Community APIs', 'Integration Framework']
    }
  ];

  const getStatusBadge = (status: ModuleDoc['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-jade-green/20 text-jade-green border-jade-green/30">Active</Badge>;
      case 'beta':
        return <Badge className="bg-electric-teal/20 text-electric-teal border-electric-teal/30">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-cool-gray/20 text-cool-gray border-cool-gray/30">Coming Soon</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <header className="border-b border-slate-400/20 bg-midnight/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-electric-teal hover:bg-electric-teal/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-display font-semibold text-white">Module Documentation</h1>
              <p className="text-sm text-cool-gray">Complete guide to all DevSuite tools</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            DevSuite Module Documentation
          </h2>
          <p className="text-lg text-cool-gray">
            Explore all 10 modules in the DevSuite toolkit, from active tools to upcoming features.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{module.icon}</div>
                  {getStatusBadge(module.status)}
                </div>
                <CardTitle className="text-white text-xl">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-cool-gray leading-relaxed">
                  {module.description}
                </p>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Key Features</h4>
                  <ul className="list-disc list-inside text-cool-gray text-sm space-y-1">
                    {module.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.techStack.map((tech, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="text-xs border-electric-teal/30 text-electric-teal"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ModuleDocumentation;
