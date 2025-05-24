
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GraphQLStudio = ({ onBack }: { onBack: () => void }) => {
  const [query, setQuery] = useState(`query GetObjects($first: Int, $filter: ObjectFilter) {
  objects(first: $first, filter: $filter) {
    nodes {
      address
      version
      digest
      type {
        repr
      }
      owner {
        ... on AddressOwner {
          owner {
            address
          }
        }
      }
      contents {
        ... on MoveObject {
          type {
            repr
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`);

  const [variables, setVariables] = useState(`{
  "first": 10,
  "filter": {
    "type": "0x2::coin::Coin<0x2::sui::SUI>"
  }
}`);

  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockResult = {
    "data": {
      "objects": {
        "nodes": [
          {
            "address": "0x123abc...",
            "version": "1",
            "digest": "abc123...",
            "type": {
              "repr": "0x2::coin::Coin<0x2::sui::SUI>"
            },
            "owner": {
              "owner": {
                "address": "0xdef456..."
              }
            },
            "contents": {
              "type": {
                "repr": "0x2::coin::Coin<0x2::sui::SUI>"
              }
            }
          }
        ],
        "pageInfo": {
          "hasNextPage": true,
          "endCursor": "cursor123"
        }
      }
    }
  };

  const handleRunQuery = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult(JSON.stringify(mockResult, null, 2));
      setIsLoading(false);
    }, 1500);
  };

  const handleExport = (format: 'typescript' | 'move') => {
    const tsCode = `// TypeScript SDK Usage
import { SuiClient } from '@mysten/sui.js/client';

const client = new SuiClient({ url: 'https://fullnode.mainnet.sui.io' });

const query = \`${query}\`;
const variables = ${variables};

const result = await client.executeTransactionBlock({
  transactionBlock: query,
  options: { showObjectChanges: true }
});`;

    const moveCode = `// Move Module Example
module example::query_objects {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    
    public fun query_sui_coins(ctx: &mut TxContext) {
        // Query implementation would go here
        // This is a mock for demonstration
    }
}`;

    const code = format === 'typescript' ? tsCode : moveCode;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sui_query.${format === 'typescript' ? 'ts' : 'move'}`;
    a.click();
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
              <h1 className="text-xl font-display font-semibold text-white">GraphQL Studio</h1>
              <Badge className="bg-jade-green/20 text-jade-green border-jade-green/30">Active</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExport('typescript')}
                className="border-electric-teal/30 text-electric-teal hover:bg-electric-teal/10"
              >
                Export TS
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExport('move')}
                className="border-electric-teal/30 text-electric-teal hover:bg-electric-teal/10"
              >
                Export Move
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          {/* Query Builder */}
          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Query Builder</h2>
              <Badge className="status-loading">
                <div className="w-2 h-2 rounded-full bg-electric-teal animate-pulse mr-2"></div>
                Sui RPC 2.0
              </Badge>
            </div>

            <Tabs defaultValue="query" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 bg-deep-ocean/50">
                <TabsTrigger value="query" className="data-[state=active]:bg-electric-teal data-[state=active]:text-deep-ocean">
                  Query
                </TabsTrigger>
                <TabsTrigger value="variables" className="data-[state=active]:bg-electric-teal data-[state=active]:text-deep-ocean">
                  Variables
                </TabsTrigger>
              </TabsList>

              <TabsContent value="query" className="flex-1 mt-4">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="code-editor h-full resize-none"
                  placeholder="Enter your GraphQL query..."
                />
              </TabsContent>

              <TabsContent value="variables" className="flex-1 mt-4">
                <Textarea
                  value={variables}
                  onChange={(e) => setVariables(e.target.value)}
                  className="code-editor h-full resize-none"
                  placeholder="Enter query variables as JSON..."
                />
              </TabsContent>
            </Tabs>

            <div className="mt-4 pt-4 border-t border-slate-400/20">
              <Button 
                onClick={handleRunQuery}
                disabled={isLoading}
                className="w-full bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-deep-ocean border-t-transparent rounded-full animate-spin mr-2"></div>
                    Running Query...
                  </>
                ) : (
                  'Run Query'
                )}
              </Button>
            </div>
          </Card>

          {/* Results Panel */}
          <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Query Results</h2>
              {result && (
                <Badge className="status-success">
                  Query Successful
                </Badge>
              )}
            </div>

            <div className="flex-1 code-editor overflow-auto">
              {result ? (
                <pre className="text-sm leading-relaxed">
                  <code className="text-jade-green">{result}</code>
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-cool-gray">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <p>Run a query to see results here</p>
                    <p className="text-sm mt-2">Results will be formatted as JSON</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Schema Explorer */}
        <Card className="mt-6 bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Schema Explorer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-deep-ocean/30 rounded-lg">
              <h4 className="font-medium text-electric-teal mb-2">Objects</h4>
              <ul className="text-sm text-cool-gray space-y-1">
                <li>• objects(first, filter)</li>
                <li>• object(address)</li>
                <li>• objectConnection</li>
              </ul>
            </div>
            <div className="p-4 bg-deep-ocean/30 rounded-lg">
              <h4 className="font-medium text-electric-teal mb-2">Transactions</h4>
              <ul className="text-sm text-cool-gray space-y-1">
                <li>• transactionBlocks</li>
                <li>• transactionBlock</li>
                <li>• transactionBlockConnection</li>
              </ul>
            </div>
            <div className="p-4 bg-deep-ocean/30 rounded-lg">
              <h4 className="font-medium text-electric-teal mb-2">Coins</h4>
              <ul className="text-sm text-cool-gray space-y-1">
                <li>• coins(type, owner)</li>
                <li>• coinMetadata</li>
                <li>• allCoinBalances</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default GraphQLStudio;
