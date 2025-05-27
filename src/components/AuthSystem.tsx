import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Lock, Github, Eye, EyeOff, UserPlus } from 'lucide-react';

interface AuthSystemProps {
  onAuthenticated: (user: any) => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'developer' | 'admin' | 'guest';
  avatar?: string;
}

const AuthSystem = ({ onAuthenticated }: AuthSystemProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper function to safely store user data
  const storeUserData = (user: User) => {
    try {
      localStorage.setItem('devsuite-user', JSON.stringify(user));
    } catch (error) {
      console.warn('localStorage access denied, user data will not persist:', error);
      // Continue without storing - user will need to re-authenticate on refresh
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        role: 'developer'
      };

      storeUserData(user);
      onAuthenticated(user);
      setIsLoading(false);
    }, 1500);
  };

  const handleGithubAuth = () => {
    setIsLoading(true);
    // Simulate GitHub OAuth
    setTimeout(() => {
      const user: User = {
        id: 'github-user-' + Math.random().toString(36).substr(2, 9),
        email: 'developer@github.com',
        name: 'GitHub Developer',
        role: 'developer',
        avatar: 'https://github.com/github.png'
      };

      storeUserData(user);
      onAuthenticated(user);
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="logo.png" 
            alt="DevSuite Logo" 
            className="h-16 w-auto mx-auto mb-4" 
          />
          <h1 className="text-2xl font-display font-bold text-white mb-2">
            Welcome to DevSuite
          </h1>
          <p className="text-cool-gray">
            {isLogin ? 'Sign in to access your developer toolkit' : 'Create your developer account'}
          </p>
        </div>

        <Card className="bg-gradient-to-br from-slate-card to-[#0F1419] border-slate-400/20">
          <CardHeader>
            <CardTitle className="text-white text-center">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* GitHub Auth */}
            <Button
              onClick={handleGithubAuth}
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
              variant="outline"
            >
              <Github className="w-4 h-4 mr-2" />
              Continue with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-400/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-card px-2 text-cool-gray">Or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-cool-gray mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-cool-gray" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-deep-ocean/10 border border-slate-400/20 rounded-lg text-white placeholder-cool-gray focus:border-electric-teal focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-sunset-orange text-xs mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-cool-gray mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-cool-gray" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-deep-ocean/10 border border-slate-400/20 rounded-lg text-white placeholder-cool-gray focus:border-electric-teal focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-sunset-orange text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-cool-gray mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-cool-gray" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-deep-ocean/10 border border-slate-400/20 rounded-lg text-white placeholder-cool-gray focus:border-electric-teal focus:outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-cool-gray hover:text-electric-teal"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sunset-orange text-xs mt-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-cool-gray mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cool-gray" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-deep-ocean/10 border border-slate-400/20 rounded-lg text-white placeholder-cool-gray focus:border-electric-teal focus:outline-none"
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-sunset-orange text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-electric-teal hover:bg-electric-teal/90 text-deep-ocean font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-deep-ocean mr-2"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  <>
                    {isLogin ? <User className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </Button>
            </form>

            {/* Toggle */}
            <div className="text-center">
              <p className="text-cool-gray text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
                  }}
                  className="text-electric-teal hover:text-electric-teal/80 ml-1 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Developer Badge */}
            <div className="flex justify-center pt-4">
              <Badge className="bg-jade-green/20 text-jade-green border-jade-green/30">
                Developer Access
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-cool-gray text-xs">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;
