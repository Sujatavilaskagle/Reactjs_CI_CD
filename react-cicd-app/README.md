# React Vite CI/CD with GitHub Actions & Vercel

A modern React application with Vite, Jest testing, GitHub Actions CI/CD pipeline, and Vercel deployment.

## 🚀 Features

- **React 19** with Vite for fast development
- **Jest** testing framework with React Testing Library
- **GitHub Actions** CI/CD pipeline
- **Vercel** deployment integration
- **ESLint** for code quality
- **Babel** for JavaScript transpilation

## 📋 Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git

## 🛠️ Installation

```bash
cd react-cicd-app
npm install
```

## 📝 Available Scripts

### Development
```bash
npm run dev
```
Runs the app in development mode with hot reload.

### Build
```bash
npm run build
```
Builds the app for production to the `dist` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── App.jsx              # Main App component
├── App.test.jsx         # App component tests
├── App.css              # App styles
├── main.jsx             # Entry point
├── setupTests.js        # Jest configuration
├── assets/              # Static assets
└── __mocks__/           # Mock files for testing
```

## 🧪 Testing

The project includes POC test cases for the App component using Jest and React Testing Library:

- Component rendering tests
- User interaction tests
- Prop verification tests

Run all tests:
```bash
npm test
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline (`.github/workflows/ci.yml`) runs on:
- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches

#### Pipeline Stages:

1. **Test Stage**
   - Runs on Node 18.x and 20.x
   - Installs dependencies
   - Runs linter
   - Runs Jest tests
   - Generates coverage reports
   - Uploads to Codecov

2. **Build Stage**
   - Builds the production bundle
   - Uploads artifacts for deployment

3. **Deploy Stage**
   - Deploys to Vercel (only on main branch pushes)
   - Requires Vercel secrets configured

### Setting up GitHub Actions

1. Push your code to GitHub
2. Go to your repository Settings → Secrets and variables → Actions
3. Add the following secrets for Vercel deployment:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

## 🚢 Deployment to Vercel

### Automatic Deployment

Merges to `main` branch automatically trigger deployment via GitHub Actions.

### Manual Setup

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### Vercel Configuration

The `vercel.json` file contains:
- Build command
- Output directory
- Development command
- Framework detection (Vite)

## 🔐 Environment Variables

Create a `.env.local` file for environment variables:

```env
VITE_API_URL=https://api.example.com
```

Access in your app:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📊 Code Coverage

Coverage reports are generated in:
```
coverage/
├── coverage-final.json
├── index.html
└── lcov.info
```

View coverage report:
```bash
npm run test:coverage
```

## 🐛 Troubleshooting

### Tests failing?
- Ensure all dependencies are installed: `npm install`
- Clear Jest cache: `npx jest --clearCache`
- Check that babel.config.cjs and jest.config.cjs exist

### Build failing?
- Run `npm run build` locally to test
- Check for TypeScript/ESLint errors

### Vercel deployment failing?
- Verify environment variables are set in Vercel dashboard
- Check build logs in Vercel console
- Ensure `vercel.json` is properly configured

## 📚 Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Jest Documentation](https://jestjs.io)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 License

MIT
