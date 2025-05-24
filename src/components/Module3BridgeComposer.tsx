
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BridgeComposer = ({ onBack }: { onBack: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bridgeData, setBridgeData] = useState({
    sourceChain: 'sui',
    targetChain: '',
    asset: '',
    amount: '',
    recipient: '',
    depositTxHash: '',
    bridgeTxHash: '',
    withdrawTxHash: ''
  });

  const chains = [
    { id: 'sui', name: 'Sui', color: 'electric-teal' },
    { id: 'ethereum', name: 'Ethereum', color: 'jade-green' },
    { id: 'polygon', name: 'Polygon', color: 'sunset-orange' },
    { id: 'arbitrum', name: 'Arbitrum', color: 'electric-teal' }
  ];

  const assets = [
    { id: 'sui', name: 'SUI', symbol: 'SUI' },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH' },
    { id: 'wbtc', name: 'Wrapped Bitcoin', symbol: 'WBTC' }
  ];

  const generateMockTxHash = () => {
    return '0x' + Math.random().toString(16).substring(2, 66);
  };

  const generateMockObjectId = () => {
    return '0x' + Math.random().toString(16).substring(2, 42);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Mock deposit transaction
      setBridgeData(prev => ({
        ...prev,
        depositTxHash: generateMockTxHash()
      }));
    } else if (currentStep === 2) {
      // Mock bridge transaction
      setBridgeData(prev => ({
        ...prev,
        bridgeTxHash: generateMockTxHash()
      }));
    } else if (currentStep === 3) {
      // Mock withdraw transaction
      setBridgeData(prev => ({
        ...prev,
        withdrawTxHash: generateMockTxHash()
      }));
    }
    
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-jade-green border-jade-green text-deep-ocean';
      case 'active': return 'bg-electric-teal border-electric-teal text-deep-ocean';
      case 'pending': return 'bg-slate-400/20 border-slate-400/40 text-cool-gray';
      default: return 'bg-slate-400/20 border-slate-400/40 text-cool-gray';
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
              <h1 className="text-xl font-display font-semibold text-white">Bridge Flow Composer</h1>
              <Badge className="bg-jade-green/20 text-jade-green border-jade-green/30">Active</Badge>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setCurrentStep(1);
                setBridgeData({
                  sourceChain: 'sui',
                  targetChain: '',
                  asset: '',
                  amount: '',
                  recipient: '',
                  depositTxHash: '',
                  bridgeTxHash: '',
                  withdrawTxHash: ''
                });
              }}
              className="border-electric-teal/30 text-electric-teal hover:bg-electric-teal/10"
            >
              Reset Flow
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { number: 1, title: 'Deposit', description: 'Lock assets on source chain' },
              { number: 2, title: 'Bridge', description: 'Cross-chain transaction' },
              { number: 3, title: 'Withdraw', description: 'Claim on target chain' }
            ].map((step, index) => {
              const status = getStepStatus(step.number);
              return (
                <div key={step.number} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold mb-2 ${getStepColor(status)}`}>
                      {status === 'completed' ? '✓' : step.number}
                    </div>
                    <div className="text-white font-medium">{step.title}</div>
                    <div className="text-sm text-cool-gray">{step.description}</div>
                  </div>
                  {index < 2 && (
                    <div className={`flex-1 h-px mx-4 ${status === 'completed' ? 'bg-jade-green' : 'bg-slate-400/20'}`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Step 1: Configure Deposit</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cool-gray mb-2">Source Chain</label>
                    <Select value={bridgeData.sourceChain} onValueChange={(value) => setBridgeData(prev => ({ ...prev, sourceChain: value }))}>
                      <SelectTrigger className="bg-deep-ocean border-slate-400/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-card border-slate-400/20">
                        {chains.map(chain => (
                          <SelectItem key={chain.id} value={chain.id}>{chain.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cool-gray mb-2">Target Chain</label>
                    <Select value={bridgeData.targetChain} onValueChange={(value) => setBridgeData(prev => ({ ...prev, targetChain: value }))}>
                      <SelectTrigger className="bg-deep-ocean border-slate-400/20">
                        <SelectValue placeholder="Select target chain" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-card border-slate-400/20">
                        {chains.filter(chain => chain.id !== bridgeData.sourceChain).map(chain => (
                          <SelectItem key={chain.id} value={chain.id}>{chain.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cool-gray mb-2">Asset</label>
                    <Select value={bridgeData.asset} onValueChange={(value) => setBridgeData(prev => ({ ...prev, asset: value }))}>
                      <SelectTrigger className="bg-deep-ocean border-slate-400/20">
                        <SelectValue placeholder="Select asset to bridge" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-card border-slate-400/20">
                        {assets.map(asset => (
                          <SelectItem key={asset.id} value={asset.id}>{asset.name} ({asset.symbol})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cool-gray mb-2">Amount</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={bridgeData.amount}
                      onChange={(e) => setBridgeData(prev => ({ ...prev, amount: e.target.value }))}
                      className="bg-deep-ocean border-slate-400/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cool-gray mb-2">Recipient Address</label>
                    <Input
                      placeholder="0x..."
                      value={bridgeData.recipient}
                      onChange={(e) => setBridgeData(prev => ({ ...prev, recipient: e.target.value }))}
                      className="bg-deep-ocean border-slate-400/20"
                    />
                  </div>
                </div>

                <div className="bg-deep-ocean/30 rounded-lg p-6">
                  <h3 className="font-semibold text-white mb-4">Bridge Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cool-gray">From:</span>
                      <span className="text-white">{chains.find(c => c.id === bridgeData.sourceChain)?.name || 'Sui'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-gray">To:</span>
                      <span className="text-white">{bridgeData.targetChain ? chains.find(c => c.id === bridgeData.targetChain)?.name : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-gray">Asset:</span>
                      <span className="text-white">{bridgeData.asset ? assets.find(a => a.id === bridgeData.asset)?.symbol : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-gray">Amount:</span>
                      <span className="text-white">{bridgeData.amount || '0.00'}</span>
                    </div>
                    <div className="border-t border-slate-400/20 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-cool-gray">Bridge Fee:</span>
                        <span className="text-electric-teal">~0.001 SUI</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cool-gray">Est. Time:</span>
                        <span className="text-electric-teal">2-5 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={handleNext}
                  disabled={!bridgeData.targetChain || !bridgeData.asset || !bridgeData.amount || !bridgeData.recipient}
                  className="bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-medium px-8"
                >
                  Initiate Deposit
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Step 2: Bridge Transaction</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-jade-green/10 border border-jade-green/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-jade-green"></div>
                      <span className="text-jade-green font-medium">Deposit Confirmed</span>
                    </div>
                    <div className="text-sm text-cool-gray">
                      Transaction Hash: <span className="text-white font-mono text-xs">{bridgeData.depositTxHash}</span>
                    </div>
                    <div className="text-sm text-cool-gray mt-1">
                      Object ID: <span className="text-white font-mono text-xs">{generateMockObjectId()}</span>
                    </div>
                  </div>

                  <div className="bg-electric-teal/10 border border-electric-teal/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-electric-teal animate-pulse"></div>
                      <span className="text-electric-teal font-medium">Bridge in Progress</span>
                    </div>
                    <div className="text-sm text-cool-gray">
                      Cross-chain validators are processing your transaction...
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-deep-ocean rounded-full h-2">
                        <div className="bg-electric-teal h-2 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                      </div>
                      <div className="text-xs text-cool-gray mt-1">65% Complete</div>
                    </div>
                  </div>
                </div>

                <div className="bg-deep-ocean/30 rounded-lg p-6">
                  <h3 className="font-semibold text-white mb-4">Bridge Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-jade-green"></div>
                      <span className="text-sm text-white">Source chain locked</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-electric-teal animate-pulse"></div>
                      <span className="text-sm text-white">Validators signing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-slate-400/40"></div>
                      <span className="text-sm text-cool-gray">Target chain mint</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-400/20">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-cool-gray">Validators:</span>
                        <span className="text-white">12/15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cool-gray">Confirmations:</span>
                        <span className="text-white">8/12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cool-gray">Est. Complete:</span>
                        <span className="text-electric-teal">~2 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={handleNext}
                  className="bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-medium px-8"
                >
                  Continue to Withdraw
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Step 3: Withdraw Assets</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-jade-green/10 border border-jade-green/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-jade-green"></div>
                      <span className="text-jade-green font-medium">Bridge Complete</span>
                    </div>
                    <div className="text-sm text-cool-gray">
                      Bridge Hash: <span className="text-white font-mono text-xs">{bridgeData.bridgeTxHash}</span>
                    </div>
                  </div>

                  <div className="bg-electric-teal/10 border border-electric-teal/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-electric-teal"></div>
                      <span className="text-electric-teal font-medium">Ready to Withdraw</span>
                    </div>
                    <div className="text-sm text-cool-gray mb-3">
                      Your assets are now available on {chains.find(c => c.id === bridgeData.targetChain)?.name}
                    </div>
                    <Button 
                      onClick={handleNext}
                      size="sm"
                      className="bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-medium"
                    >
                      Execute Withdraw
                    </Button>
                  </div>

                  {bridgeData.withdrawTxHash && (
                    <div className="bg-jade-green/10 border border-jade-green/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-jade-green"></div>
                        <span className="text-jade-green font-medium">Withdraw Successful</span>
                      </div>
                      <div className="text-sm text-cool-gray">
                        Withdraw Hash: <span className="text-white font-mono text-xs">{bridgeData.withdrawTxHash}</span>
                      </div>
                      <div className="text-sm text-cool-gray mt-1">
                        New Object ID: <span className="text-white font-mono text-xs">{generateMockObjectId()}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-deep-ocean/30 rounded-lg p-6">
                  <h3 className="font-semibold text-white mb-4">Transaction Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cool-gray">Bridged Amount:</span>
                      <span className="text-white">{bridgeData.amount} {assets.find(a => a.id === bridgeData.asset)?.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-gray">From:</span>
                      <span className="text-white">{chains.find(c => c.id === bridgeData.sourceChain)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-gray">To:</span>
                      <span className="text-white">{chains.find(c => c.id === bridgeData.targetChain)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-gray">Recipient:</span>
                      <span className="text-white font-mono text-xs">{bridgeData.recipient}</span>
                    </div>
                    <div className="border-t border-slate-400/20 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-cool-gray">Total Fees Paid:</span>
                        <span className="text-electric-teal">0.003 SUI</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cool-gray">Total Time:</span>
                        <span className="text-electric-teal">3m 24s</span>
                      </div>
                    </div>
                  </div>

                  {bridgeData.withdrawTxHash && (
                    <div className="mt-6 pt-4 border-t border-slate-400/20">
                      <Badge className="status-success w-full justify-center">
                        Bridge Flow Complete ✓
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default BridgeComposer;
