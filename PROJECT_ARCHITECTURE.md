
# DevSuite Project Architecture

## 📋 Overview
DevSuite is a modular Sui blockchain developer toolkit built with React, TypeScript, and Tailwind CSS. The application follows a component-based architecture with clear separation of concerns.

## 🏗️ Project Structure

```
DevSuite/
├── public/
│   ├── logo-*.png
│   
├── src/
│   ├── components/              # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── badge.tsx       # Line 1-40
│   │   │   ├── button.tsx      # Line 1-85
│   │   │   └── card.tsx        # Line 1-85
│   │   ├── Dashboard.tsx       # Main dashboard (Line 1-210)
│   │   ├── ModuleDocumentation.tsx  # Documentation viewer
│   │   ├── Module1GraphQLStudio.tsx # GraphQL playground
│   │   ├── Module2SDKMigration.tsx  # SDK migration tool
│   │   └── Module3BridgeComposer.tsx # Bridge flow composer
│   ├── pages/
│   │   ├── Index.tsx           # Main routing logic (Line 1-35)
│   │   └── NotFound.tsx        # 404 page
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── App.tsx                # Main app component (Line 1-25)
│   ├── main.tsx               # Entry point (Line 1-5)
│   └── index.css              # Global styles
├── index.html                 # HTML template
└── config files...
```

## 🧩 Module Architecture

### Core Modules (Active)

#### 1. GraphQL Studio (`Module1GraphQLStudio.tsx`)
**Purpose**: Sui GraphQL 2.0 exploration interface
**Location**: `src/components/Module1GraphQLStudio.tsx`
**Features**:
- Dark-mode code editor
- Auto-suggestion from Sui schema
- Query execution with result output
- Export functionality (TS/Move)

#### 2. SDK Migration Guide (`Module2SDKMigration.tsx`)
**Purpose**: Side-by-side diff viewer for SDK changes
**Location**: `src/components/Module2SDKMigration.tsx`
**Features**:
- Two editable code panels
- Compare functionality
- Inline difference highlighting
- AI-powered migration guidance

#### 3. Bridge Flow Composer (`Module3BridgeComposer.tsx`)
**Purpose**: Cross-chain asset bridge interface
**Location**: `src/components/Module3BridgeComposer.tsx`
**Features**:
- 3-step flow: Deposit → Bridge → Withdraw
- Transaction hash simulation
- Stepper component
- Object ID tracking

### Future Modules (Coming Soon)

#### 4. SCION Simulator
**Planned Location**: `src/components/Module4SCIONSimulator.tsx`
**Purpose**: Network resilience visualization
**Features**: Stress testing, partition simulation

#### 5. Instant Deploy
**Planned Location**: `src/components/Module5InstantDeploy.tsx`
**Purpose**: One-click deployment orchestrator
**Features**: Production-ready configs, wallet/faucet deployment

#### 6. Move Simulator
**Planned Location**: `src/components/Module6MoveSimulator.tsx`
**Purpose**: Smart contract state preview
**Features**: Real-time visualization, state change preview

#### 7. Object Explorer
**Planned Location**: `src/components/Module7ObjectExplorer.tsx`
**Purpose**: Sui object graph navigation
**Features**: Tree visualizations, relationship mapping

#### 8. Wallet Sandbox
**Planned Location**: `src/components/Module8WalletSandbox.tsx`
**Purpose**: Authentication flow testing
**Features**: Multisig simulation, session keys, gasless transactions

#### 9. Security Auditor
**Planned Location**: `src/components/Module9SecurityAuditor.tsx`
**Purpose**: Move module vulnerability scanner
**Features**: AI-powered analysis, security pattern detection

#### 10. Extension Hub
**Planned Location**: `src/components/Module10ExtensionHub.tsx`
**Purpose**: Community plugin marketplace
**Features**: Plugin integration, community contributions

## 🎨 Design System

### Color Palette
- **Primary**: Deep Ocean Blue (`#0B1426`)
- **Accent**: Electric Teal (`#00D2FF`)
- **Success**: Jade Green (`#00C896`)
- **Warning**: Sunset Orange (`#FF6B35`)
- **Background**: Midnight (`#070B14`)
- **Card**: Slate (`#1A2332`)

### Typography
- **Headlines**: Inter Display, 32px, Weight 600
- **Body**: Inter, 16px, Weight 400
- **Code**: JetBrains Mono, 14px, Weight 400

### Component Classes
- `.module-card`: Module card styling (Line 98, index.css)
- `.code-editor`: Code editor styling (Line 103, index.css)
- `.status-indicator`: Status badge styling (Line 108, index.css)

## 🔄 State Management

### Dashboard State (`Dashboard.tsx`)
- `showDocumentation`: Boolean for documentation view toggle
- Module selection handled via props

### Routing State (`Index.tsx`)
- `currentModule`: String tracking active module
- Navigation functions: `handleModuleSelect`, `handleBackToDashboard`

## 📁 File Naming Convention

### Components
- **Dashboard**: `Dashboard.tsx` (Main interface)
- **Modules**: `Module{N}{ModuleName}.tsx` (e.g., `Module1GraphQLStudio.tsx`)
- **UI Components**: `{component-name}.tsx` (shadcn/ui convention)
- **Documentation**: `ModuleDocumentation.tsx`

### Pages
- **Main**: `Index.tsx`
- **Error**: `NotFound.tsx`

## 🚀 Adding New Modules

### Step 1: Create Component File
```typescript
// src/components/Module{N}{ModuleName}.tsx
import React from 'react';

interface Module{N}{ModuleName}Props {
  onBack: () => void;
}

const Module{N}{ModuleName} = ({ onBack }: Module{N}{ModuleName}Props) => {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Module content */}
    </div>
  );
};

export default Module{N}{ModuleName};
```

### Step 2: Add to Dashboard Module Array
**File**: `src/components/Dashboard.tsx` (Line ~45)
```typescript
{
  id: 'module-name',
  title: 'Module Title',
  description: 'Module description',
  icon: '🔧',
  status: 'active' | 'beta' | 'coming-soon',
  category: 'core' | 'advanced' | 'community'
}
```

### Step 3: Add Route Handler
**File**: `src/pages/Index.tsx` (Line ~15)
```typescript
case 'module-name':
  return <Module{N}{ModuleName} onBack={handleBackToDashboard} />;
```

### Step 4: Update Documentation
**File**: `src/components/ModuleDocumentation.tsx`
Add module details to the documentation array.

## 🔧 Development Guidelines

### Component Structure
1. **Props Interface**: Define TypeScript interfaces
2. **State Management**: Use React hooks appropriately
3. **Styling**: Tailwind CSS with custom classes
4. **Accessibility**: ARIA labels and keyboard navigation

### Code Organization
1. **Imports**: Group by type (React, components, utils)
2. **Interfaces**: Define before component
3. **Component**: Functional components with hooks
4. **Export**: Default export at bottom

### Performance Considerations
1. **Lazy Loading**: Modules load only when accessed
2. **Memoization**: Use React.memo for expensive components
3. **Code Splitting**: Dynamic imports for large modules

## 📝 Modification Log

### Recent Changes
- **Header Update**: Replaced text with image logo (Line 99, Dashboard.tsx)
- **Social Links**: Added footer social media links (Line 180, Dashboard.tsx)
- **Documentation**: Created comprehensive architecture guide

### Next Steps
1. Implement authentication system
2. Add remaining 7 modules
3. Integrate Supabase for backend functionality
4. Add testing suite
5. Performance optimization

## 🔐 Security Considerations

### Frontend Security
- Input validation for all user inputs
- XSS prevention through React's built-in protections
- Secure routing with proper authentication checks

### Future Backend Integration
- JWT token management
- Role-based access control
- API rate limiting
- Secure data transmission

---

**Last Updated**: 2025-01-24
**Version**: 1.0.0
**Maintainer**: DevSuite Team
