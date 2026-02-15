# Development Guide

Quick start guide for developing your portfolio website.

## 🚀 Quick Start

```bash
# 1. Install dependencies
python scripts/install_deps.py

# 2. Start development server
npm run dev

# 3. Open your browser
# Visit http://localhost:3000
```

## 📝 Making Changes

### Editing Content

All content is in React components in `src/components/`. Edit directly:

**Update Hero Section** (`src/components/hero.tsx`):
```tsx
// Change headline
"Full-Stack Developer & Creative Builder"

// Change description
"I craft beautiful, performant web experiences..."
```

**Update About** (`src/components/about.tsx`):
- Your bio and story
- Core values cards

**Update Projects** (`src/components/projects.tsx`):
- Add/remove projects by editing the `projects` array
- Update project details, tags, links

**Update Experience** (`src/components/experience.tsx`):
- Add work history in the `experiences` array
- Update technologies, descriptions

**Update Skills** (`src/components/skills.tsx`):
- Modify skill categories and proficiency levels
- Update `skillsData` array

**Update Blog** (`src/components/blog.tsx`):
- Add blog posts in the `blogPosts` array
- Create actual blog pages later in `src/app/blog/`

**Update Contact** (`src/components/contact.tsx`):
- Update social media links
- Change contact email
- Modify form handling

### Adding Images

1. Add images to `public/` folder
2. Use Next.js Image component:

```tsx
import Image from 'next/image'

<Image
  src="/images/project.jpg"
  alt="Project description"
  width={800}
  height={600}
/>
```

### Customizing Colors

Edit `tailwind.config.ts`:

```ts
colors: {
  'primary': '#6366f1',      // Main color
  'primary-dark': '#4f46e5', // Hover state
  'accent': '#ec4899',       // Accent color
}
```

### Adding New Sections

1. Create new component in `src/components/`:

```tsx
'use client'

import { motion } from 'framer-motion'

export function NewSection() {
  return (
    <section id="new-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Section Title
        </h2>
        {/* Your content */}
      </div>
    </section>
  )
}
```

2. Add to `src/components/index.ts`:
```tsx
export { NewSection } from './new-section'
```

3. Add to `src/app/page.tsx`:
```tsx
import { NewSection } from '@/components'

export default function Home() {
  return (
    <main>
      {/* ... other sections ... */}
      <NewSection />
    </main>
  )
}
```

4. Add to navigation in `src/components/header.tsx`:
```tsx
{ label: 'New', href: '#new-section' }
```

## 🎨 Styling

### Using Tailwind CSS Classes

```tsx
// Text styles
className="text-sm text-gray-600 dark:text-gray-400"

// Spacing
className="py-20 px-4 sm:px-6 lg:px-8"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Dark mode
className="bg-white dark:bg-slate-700"
```

### Adding Animations

```tsx
import { motion } from 'framer-motion'

// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true, margin: '-100px' }}
>
  Content
</motion.div>

// Hover effects
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Content
</motion.div>
```

## 🔍 Testing Changes Locally

1. **Check TypeScript errors**:
   ```bash
   npm run type-check
   ```

2. **Run linter**:
   ```bash
   npm run lint
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Test production build**:
   ```bash
   npm run build
   npm start
   ```

## 📱 Testing Responsive Design

In browser DevTools:
- Use Ctrl+Shift+M (Cmd+Shift+M on Mac) to toggle device toolbar
- Test on mobile, tablet, desktop sizes
- Check dark mode by clicking theme toggle

## 🐛 Debugging

### Enable debug output
```tsx
// In any component
console.log('Debug info:', data)

// View in browser console (F12)
```

### Check Next.js logs
- Terminal where `npm run dev` runs shows build errors
- Browser console shows runtime errors

### VSCode Extensions
- ESLint - Code quality
- Prettier - Code formatting
- Thunder Client or REST Client - API testing

## 📦 Managing Dependencies

### Check outdated packages
```bash
python scripts/check_outdated.py
```

### Upgrade packages
```bash
python scripts/upgrade_packages.py
```

### Add new package
```bash
# Production dependency
npm install package-name

# Development dependency
npm install --save-dev package-name
```

### Remove package
```bash
npm uninstall package-name
```

## 🚀 Deploying to Vercel

### Connect Repository
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select GitHub repository
5. Click "Deploy"

### Environment Variables
1. Go to project settings on Vercel
2. Add variables in Environment Variables section
3. Redeploy to apply changes

## 🔒 Security

### Hide sensitive data
- Never commit `.env.local`
- Use `.env.example` for templates
- Set actual values in Vercel dashboard

### Keep dependencies updated
```bash
# Weekly
python scripts/check_outdated.py

# Monthly
python scripts/upgrade_packages.py
```

## 📚 File Structure Quick Reference

```
src/
├── app/
│   ├── globals.css       ← Global styles
│   ├── layout.tsx        ← Root layout
│   └── page.tsx          ← Home page
├── components/
│   ├── header.tsx        ← Navigation
│   ├── hero.tsx          ← Hero section
│   ├── about.tsx         ← About section
│   ├── projects.tsx      ← Projects section
│   ├── experience.tsx    ← Experience section
│   ├── skills.tsx        ← Skills section
│   ├── blog.tsx          ← Blog section
│   ├── contact.tsx       ← Contact section
│   ├── footer.tsx        ← Footer
│   └── theme-toggle.tsx  ← Dark mode toggle
└── lib/
    └── theme-context.tsx ← Theme provider
```

## 🆘 Common Issues

### Port 3000 already in use
```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Dark mode not working
- Check `useTheme()` hook is used in client component
- Verify `<ThemeProvider>` wraps app in layout.tsx
- Clear browser localStorage

### Tailwind styles not applying
1. Check file is in `content` array in `tailwind.config.ts`
2. Restart dev server
3. Clear `.next` folder and rebuild

### Images not showing
1. Ensure image is in `public/` folder
2. Use correct path (e.g., `/image-name.jpg`)
3. Check image dimensions are reasonable

## 📞 Getting Help

1. Check [Next.js docs](https://nextjs.org/docs)
2. Check [Tailwind docs](https://tailwindcss.com/docs)
3. Check [Framer Motion docs](https://www.framer.com/motion)
4. Search GitHub issues
5. Ask in community forums (Reddit, Discord)

---

Happy coding! 🎉
