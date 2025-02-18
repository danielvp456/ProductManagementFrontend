# Product Management Frontend

A comprehensive Angular-based frontend application for managing users, products, and invoices. This application is part of a full-stack solution that follows SOLID principles and clean architecture practices.

## 🏗️ Architecture

The application follows a modular architecture with the following structure:

```
src/
├── app/
│   ├── core/                 # Core Module
│   │   ├── guards/          # Authentication & Authorization guards
│   │   ├── interfaces/      # TypeScript interfaces
│   │   └── services/        # Core services
│   │
│   ├── modules/             # Feature Modules
│   │   ├── admin/          # Admin module
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── products/
│   │   │   └── invoices/
│   │   │
│   │   ├── auth/           # Auth module
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   └── user/           # User module
│   │       ├── profile/
│   │       ├── products/
│   │       └── cart/
│   │
│   └── shared/             # Shared Module
│       ├── components/
│       ├── directives/
│       └── pipes/
│
├── assets/                  # Static assets
└── environments/           # Environment configurations
```

### Core Module
Contains singleton services and interfaces that are essential throughout the application:
- **Guards**: Authentication and role-based authorization
- **Interfaces**: TypeScript interfaces for data models
- **Services**: Core services for API communication and state management

### Feature Modules
- **Admin Module**: Dashboard and management interfaces for administrators
- **Auth Module**: Authentication and user registration
- **User Module**: User-specific features and shopping interface

### Shared Module
Contains reusable components, directives, and pipes used across different modules.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or later)
- Docker (if running with containers)
- Angular CLI

### Installation

1. Clone the repository:

```bash
git clone https://github.com/danielvp456/ProductManagementFrontend.git
cd product-management-frontend
```
2. Install dependencies:

```bash
npm install
```

### Running the Application

#### Development server

```bash
ng serve
```
Navigate to `http://localhost:4200/`

#### Using Docker
1. Build the Docker image:

```bash
docker build -t product-management-frontend .
```

2. Run the Docker container:    

```bash
docker run -p 4000:4000 product-management-frontend
```

Navigate to `http://localhost:4000/`

## ⚙️ Configuration

The application can be configured through the environment files located in `src/environments/`:

- `environment.ts` for development

### Environment Variables   

```typescript
// environment.ts
export const environment = {
production: false,
// For local backend:
// apiUrl: 'http://localhost:3000'
// For deployed backend:
apiUrl: 'https://productmanagementbackend-638194867449.us-central1.run.app'
};
```
## 🔐 Authentication & Authorization

The application implements role-based access control:
- **Admin Users**: Full access to user management, product management, and analytics
- **Regular Users**: Can view products, make purchases, and manage their own profile

## 🛠️ Features

### Admin Dashboard
- User management (CRUD operations)
- Product management
- Invoice tracking
- Analytics and statistics

### User Features
- Product browsing
- Shopping cart functionality
- Purchase history
- Profile management

## 📱 Components

### Core Components
- **Navbar**: Navigation and authentication status
- **Guards**: Route protection based on user roles
- **Services**: API communication and state management

### Feature Components
- **Admin Dashboard**: Analytics and management interface
- **Product List**: Product display and management
- **Shopping Cart**: Cart management and checkout
- **User Profile**: Profile management and settings

## 🔄 State Management

The application uses various services for state management:
- **UserStateService**: Manages user authentication state
- **CartService**: Manages shopping cart state
- **AuthService**: Handles authentication and token management

## 🌐 API Integration

The frontend communicates with a NestJS backend through RESTful APIs:
- User authentication and management
- Product CRUD operations
- Invoice generation and management
- Analytics and reporting

## 🧪 Testing

Run unit tests:

```bash
npm test
```

## 📦 Build

Generate a production build:

```bash
npm run build
```

