# Developer Portfolio Website

A modern, animated developer portfolio built with Next.js, TypeScript, Framer Motion, and Tailwind CSS. Features dark/light theme toggle, Vercel Analytics, and is optimized for Vercel deployment.

## 🚀 Features

- **Modern Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion animations throughout
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Analytics**: Vercel Analytics & Speed Insights integrated
- **Responsive Design**: Mobile-first approach, works on all devices
- **SEO Optimized**: Meta tags, Open Graph support
- **Performance**: Optimized for Core Web Vitals
- **Type Safe**: Full TypeScript support

## 📁 Project Structure

```
agileplaya.com/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with theme provider & analytics
│   │   ├── page.tsx            # Home page with all sections
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── header.tsx          # Navigation header with mobile menu
│   │   ├── hero.tsx            # Hero section
│   │   ├── about.tsx           # About section
│   │   ├── projects.tsx        # Projects showcase
│   │   ├── experience.tsx      # Work experience timeline
│   │   ├── skills.tsx          # Technical skills
│   │   ├── blog.tsx            # Latest blog posts
│   │   ├── contact.tsx         # Contact form & social links
│   │   ├── footer.tsx          # Footer
│   │   ├── theme-toggle.tsx    # Dark/light mode toggle
│   └── lib/
│       └── theme-context.tsx   # Theme provider context
├── scripts/
│   ├── upgrade_packages.py     # Upgrade npm packages
│   ├── check_outdated.py       # Check for outdated packages
│   └── install_deps.py         # Install dependencies
├── public/                      # Static files (add images here)
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.ts              # Next.js configuration
├── postcss.config.js           # PostCSS configuration
└── vercel.json                 # Vercel deployment config
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm 8+
- Python 3.7+ (for Python scripts)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd agileplaya.com
   ```

2. **Install dependencies** (Choose one method)

   Using npm directly:
   ```bash
   npm install
   ```

   Using Python script:
   ```bash
   python scripts/install_deps.py
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

### Development

```bash
# Start development server with hot reload
npm run dev

# Type check
npm run type-check

# Lint code
npm run lint
```

### Building

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📦 Package Management Scripts

The project includes Python scripts to manage npm dependencies. Make sure you have Python 3.7+ installed.

### 1. Install Dependencies
```bash
python scripts/install_deps.py
```
- Installs all npm dependencies
- Checks if Node.js/npm is installed
- Offers to clean existing node_modules if needed

### 2. Check Outdated Packages
```bash
python scripts/check_outdated.py
```
- Lists all outdated packages with their versions
- Checks for security vulnerabilities
- Shows how to fix security issues

### 3. Upgrade Packages
```bash
python scripts/upgrade_packages.py
```
- Upgrades all packages to their latest versions
- Runs security audit and fixes vulnerabilities
- Updates package.json and package-lock.json

## 🎨 Customization

### Update Personal Information

Edit `src/app/page.tsx` and component files to:
- Change your name and title in [Hero section](src/components/hero.tsx)
- Update about information in [About section](src/components/about.tsx)
- Add your projects in [Projects section](src/components/projects.tsx)
- Update experience in [Experience section](src/components/experience.tsx)
- Modify skills in [Skills section](src/components/skills.tsx)
- Add blog posts in [Blog section](src/components/blog.tsx)
- Update contact info in [Contact section](src/components/contact.tsx)

### Change Colors

Edit `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      'primary': '#6366f1',      // Change primary color
      'primary-dark': '#4f46e5',
      'accent': '#ec4899',       // Change accent color
    },
  },
},
```

### Dark Mode

The site has built-in dark mode toggle. Theme preference is automatically saved to localStorage and restored on reload.

## 📊 Analytics

### Vercel Analytics

Automatically tracks:
- Web Vitals (LCP, FID, CLS)
- Page views and navigation
- User interactions

The analytics are automatically reported to Vercel when deployed.

### Speed Insights

Vercel Speed Insights monitor Core Web Vitals:
- **LCP** (Largest Contentful Paint) - Loading
- **FID** (First Input Delay) - Interactivity  
- **CLS** (Cumulative Layout Shift) - Visual Stability

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Environment Variables** (if needed)
   - Set up environment variables in Vercel dashboard
   - They'll be automatically available at build time

The `vercel.json` file in the project root configures the build and dev commands.

## 📚 Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **lucide-react** - Icon library

### Backend/DevOps
- **Node.js** - Runtime
- **npm** - Package manager
- **Vercel** - Deployment platform

### Tools & Utilities
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path aliases configured (`@/*`)
- ES2020 target

### Tailwind CSS (`tailwind.config.ts`)
- Dark mode with `class` strategy
- Custom colors and animations
- Mobile-first responsive design

### ESLint (`.eslintrc.json`)
- Extends Next.js recommended rules
- Core Web Vitals support

## 📝 Environment Variables

If you need environment variables, create a `.env.local` file:
```env
# Example - add your variables here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Public variables must be prefixed with `NEXT_PUBLIC_`.

## 🧪 Testing

To add testing, install testing libraries:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Node Modules Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
python scripts/install_deps.py
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 💡 Tips

- Use `npm run type-check` regularly to catch TypeScript errors
- Check dark mode toggle by clicking the moon/sun icon in header
- Test mobile responsiveness by resizing browser
- Use components' animation variants as templates for new sections
- Keep components focused with one responsibility
- Update `src/lib/theme-context.tsx` to customize theme behavior

## 📞 Contact

For questions or feedback, reach out through the contact form on the website!

---

**Built with ❤️ by [Your Name]**
