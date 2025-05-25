
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SDKMigration = ({ onBack }: { onBack: () => void }) => {
  const [oldCode, setOldCode] = useState(`// Sui SDK v0.50.x
import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';

const provider = new JsonRpcProvider(devnetConnection);

const result = await provider.getObjectsOwnedByAddress(
  '0x123...'
);

// Get balance
const balance = await provider.getBalance(
  '0x123...',
  '0x2::sui::SUI'
);`);

  const [newCode, setNewCode] = useState(`// Sui SDK v1.0.x+
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

const client = new SuiClient({ 
  url: getFullnodeUrl('devnet') 
});

const result = await client.getOwnedObjects({
  owner: '0x123...'
});

// Get balance
const balance = await client.getBalance({
  owner: '0x123...',
  coinType: '0x2::sui::SUI'
});`);

  const [differences, setDifferences] = useState<any[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [fromVersion, setFromVersion] = useState('0.50.x');
  const [toVersion, setToVersion] = useState('1.0.x');

  const mockDifferences = [
    {
      type: 'breaking-change',
      description: 'JsonRpcProvider replaced with SuiClient',
      oldLine: 'import { JsonRpcProvider, devnetConnection }',
      newLine: 'import { SuiClient, getFullnodeUrl }',
      category: 'Import Changes'
    },
    {
      type: 'breaking-change',
      description: 'Connection object replaced with URL string',
      oldLine: 'new JsonRpcProvider(devnetConnection)',
      newLine: 'new SuiClient({ url: getFullnodeUrl(\'devnet\') })',
      category: 'Client Initialization'
    },
    {
      type: 'method-change',
      description: 'Method renamed and parameters restructured',
      oldLine: 'getObjectsOwnedByAddress(\'0x123...\')',
      newLine: 'getOwnedObjects({ owner: \'0x123...\' })',
      category: 'API Methods'
    },
    {
      type: 'parameter-change',
      description: 'Parameters now use object destructuring',
      oldLine: 'getBalance(\'0x123...\', \'0x2::sui::SUI\')',
      newLine: 'getBalance({ owner: \'0x123...\', coinType: \'0x2::sui::SUI\' })',
      category: 'Parameter Structure'
    }
  ];

  const handleCompare = async () => {
    setIsComparing(true);
    // Simulate AI-powered comparison
    setTimeout(() => {
      setDifferences(mockDifferences);
      setIsComparing(false);
    }, 2000);
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'breaking-change':
        return 'bg-sunset-orange/20 text-sunset-orange border-sunset-orange/30';
      case 'method-change':
        return 'bg-electric-teal/20 text-electric-teal border-electric-teal/30';
      case 'parameter-change':
        return 'bg-jade-green/20 text-jade-green border-jade-green/30';
      default:
        return 'bg-cool-gray/20 text-cool-gray border-cool-gray/30';
    }
  };

  return (
    <div className="min-h-screen bg-midnight">
      <header className="border-b border-slate-400/20 bg-midnight/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-electric-teal hover:bg-electric-teal/10"
              >
                ← Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-slate-400/20"></div>
              <h1 className="text-xl font-display font-semibold text-white">SDK Migration Guide</h1>
              <Badge className="bg-jade-green/20 text-jade-green border-jade-green/30">Active</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Select value={fromVersion} onValueChange={setFromVersion}>
                  <SelectTrigger className="w-32 bg-deep-ocean border-slate-400/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-card border-slate-400/20">
                    <SelectItem value="0.40.x">v0.40.x</SelectItem>
                    <SelectItem value="0.50.x">v0.50.x</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-cool-gray">→</span>
                <Select value={toVersion} onValueChange={setToVersion}>
                  <SelectTrigger className="w-32 bg-deep-ocean border-slate-400/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-card border-slate-400/20">
                    <SelectItem value="1.0.x">v1.0.x</SelectItem>
                    <SelectItem value="1.1.x">v1.1.x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleCompare}
                disabled={isComparing}
                className="bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-medium"
              >
                {isComparing ? 'Analyzing...' : 'Compare'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Code Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Legacy Code ({fromVersion})</h2>
              <Badge className="bg-sunset-orange/20 text-sunset-orange border-sunset-orange/30">
                Deprecated
              </Badge>
            </div>
            <Textarea
              value={oldCode}
              onChange={(e) => setOldCode(e.target.value)}
              className="code-editor h-80 resize-none"
              placeholder="Paste your legacy SDK code here..."
            />
          </Card>

          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Modern Code ({toVersion})</h2>
              <Badge className="bg-jade-green/20 text-jade-green border-jade-green/30">
                Current
              </Badge>
            </div>
            <Textarea
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="code-editor h-80 resize-none"
              placeholder="Updated code will appear here..."
            />
          </Card>
        </div>

        {/* Differences Analysis */}
        {differences.length > 0 && (
          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Migration Analysis</h3>
            
            <div className="space-y-4">
              {differences.map((diff, index) => (
                <div key={index} className="border border-slate-400/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={getChangeTypeColor(diff.type)}>
                        {diff.type.replace('-', ' ')}
                      </Badge>
                      <span className="text-sm font-medium text-cool-gray">{diff.category}</span>
                    </div>
                  </div>
                  
                  <p className="text-white mb-3">{diff.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-sunset-orange/10 border border-sunset-orange/20 rounded p-3">
                      <div className="text-xs text-sunset-orange font-medium mb-2">- REMOVE</div>
                      <code className="text-sm text-white font-mono">{diff.oldLine}</code>
                    </div>
                    <div className="bg-jade-green/10 border border-jade-green/20 rounded p-3">
                      <div className="text-xs text-jade-green font-medium mb-2">+ ADD</div>
                      <code className="text-sm text-white font-mono">{diff.newLine}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Migration Summary */}
            <div className="mt-8 p-6 bg-electric-teal/10 border border-electric-teal/20 rounded-lg">
              <h4 className="text-lg font-semibold text-electric-teal mb-3">Migration Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-sunset-orange font-medium">Breaking Changes</div>
                  <div className="text-white">{differences.filter(d => d.type === 'breaking-change').length} found</div>
                </div>
                <div>
                  <div className="text-electric-teal font-medium">Method Updates</div>
                  <div className="text-white">{differences.filter(d => d.type === 'method-change').length} found</div>
                </div>
                <div>
                  <div className="text-jade-green font-medium">Parameter Changes</div>
                  <div className="text-white">{differences.filter(d => d.type === 'parameter-change').length} found</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {isComparing && (
          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-teal/20 rounded-full mb-4">
                <div className="w-8 h-8 border-2 border-electric-teal border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analyzing Code Differences</h3>
              <p className="text-cool-gray">AI is comparing your code against the latest SDK patterns...</p>
            </div>
          </Card>
        )}

        {differences.length === 0 && !isComparing && (
          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-12">
            <div className="text-center">
              <div className="text-6xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold text-white mb-2">Ready to Compare</h3>
              <p className="text-cool-gray">Paste your legacy code and click Compare to get AI-powered migration guidance</p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default SDKMigration;
