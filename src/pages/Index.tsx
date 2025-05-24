
import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import GraphQLStudio from '@/components/Module1GraphQLStudio';
import SDKMigration from '@/components/Module2SDKMigration';
import BridgeComposer from '@/components/Module3BridgeComposer';
import AuthSystem from '@/components/AuthSystem';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session with error handling
    try {
      const storedUser = localStorage.getItem('devsuite-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.warn('localStorage access denied, continuing without stored user data:', error);
      // Continue without stored user data - user will need to authenticate
    }
    setIsLoading(false);
  }, []);

  const handleEnterApp = () => {
    if (user) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('auth');
    }
  };

  const handleAuthenticated = (userData: any) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleModuleSelect = (moduleId: string) => {
    setCurrentModule(moduleId);
  };

  const handleBackToDashboard = () => {
    setCurrentModule(null);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('devsuite-user');
    } catch (error) {
      console.warn('localStorage access denied during logout:', error);
      // Continue with logout even if we can't clear localStorage
    }
    setUser(null);
    setCurrentModule(null);
    setCurrentView('landing');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-teal"></div>
      </div>
    );
  }

  const renderCurrentView = () => {
    if (currentView === 'landing') {
      return <LandingPage onEnterApp={handleEnterApp} />;
    }

    if (currentView === 'auth') {
      return <AuthSystem onAuthenticated={handleAuthenticated} />;
    }

    // Dashboard view
    switch (currentModule) {
      case 'graphql-studio':
        return <GraphQLStudio onBack={handleBackToDashboard} />;
      case 'sdk-migration':
        return <SDKMigration onBack={handleBackToDashboard} />;
      case 'bridge-composer':
        return <BridgeComposer onBack={handleBackToDashboard} />;
      default:
        return <Dashboard onModuleSelect={handleModuleSelect} user={user} onLogout={handleLogout} />;
    }
  };

  return renderCurrentView();
};

export default Index;
