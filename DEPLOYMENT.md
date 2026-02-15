# Deployment Checklist

Complete this checklist before deploying your portfolio to production.

## 📋 Pre-Deployment Checklist

### Content Updates
- [ ] Update your name/title in Hero section
- [ ] Update About section with your bio
- [ ] Add your projects to Projects section
- [ ] Update work experience in Experience section
- [ ] Update technical skills and proficiency levels
- [ ] Add blog posts info in Blog section
- [ ] Update contact information
- [ ] Change footer year and attribution

### Configuration
- [ ] Update `package.json` with your project name
- [ ] Update `package.json` with your description
- [ ] Review and update `next.config.ts` if needed
- [ ] Check all color schemes in `tailwind.config.ts`
- [ ] Verify `.env.example` has all needed variables

### Links & Assets
- [ ] Update all social media links in Contact section
- [ ] Update GitHub links in Projects
- [ ] Update hosting/demo links in Projects
- [ ] Add profile images to `public/` folder
- [ ] Add project screenshots to `public/` folder
- [ ] Update favicon (replace `public/favicon.ico`)
- [ ] Update OG image for social media preview

### Performance & SEO
- [ ] [ ] Run `npm run build` successfully
- [ ] [ ] Check console for TypeScript errors
- [ ] [ ] Run `npm run type-check` - no errors
- [ ] [ ] Run `npm run lint` - no critical errors
- [ ] [ ] Test dark mode toggle works
- [ ] [ ] Test mobile responsiveness
- [ ] [ ] Test all navigation links work
- [ ] [ ] Test contact form (if backend ready)

### Analytics Setup
- [ ] [ ] Vercel Analytics enabled in dashboard
- [ ] [ ] Speed Insights tracking enabled
- [ ] [ ] Test analytics in preview deployment

### Security
- [ ] [ ] `.env.local` is in `.gitignore`
- [ ] [ ] No API keys in committed code
- [ ] [ ] Secrets stored in Vercel dashboard
- [ ] [ ] Updated `Content-Security-Policy` if needed
- [ ] [ ] Run `npm audit` - no critical vulnerabilities

### Testing
- [ ] [ ] Test in Firefox
- [ ] [ ] Test in Safari
- [ ] [ ] Test in Chrome
- [ ] [ ] Test on mobile device
- [ ] [ ] Test on tablet
- [ ] [ ] Test animations in dark mode
- [ ] [ ] Test form submission

## 🚀 Deployment Steps

### Step 1: Prepare Code
```bash
# Install dependencies
python scripts/install_deps.py

# Test build
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

### Step 2: Commit Changes
```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

### Step 3: Vercel Setup
1. Go to https://vercel.com
2. Sign up or log in
3. Import your GitHub repository
4. Select your project
5. Click "Deploy"

### Step 4: Vercel Configuration
1. In Vercel Dashboard → Settings
2. Set Environment Variables:
   - Add any `NEXT_PUBLIC_*` variables
   - Add any private API keys
3. Deploy

### Step 5: Verify Deployment
- [ ] Visit your live URL
- [ ] Check all sections display correctly
- [ ] Test dark mode toggle
- [ ] Open DevTools (F12)
- [ ] Check no critical errors in console
- [ ] Test mobile response with device toolbar
- [ ] Verify analytics are tracking

## 🔧 Post-Deployment

### Monitor Performance
- [ ] Check Vercel Analytics dashboard daily for first week
- [ ] Monitor Core Web Vitals
- [ ] Check error logs in Vercel dashboard
- [ ] Review user feedback

### Maintenance
- [ ] Set calendar reminder to check dependencies monthly
- [ ] Run `python scripts/check_outdated.py` regularly
- [ ] Update packages quarterly with `python scripts/upgrade_packages.py`
- [ ] Monitor security advisories

### Content Updates
- [ ] Add new projects as completed
- [ ] Update experience section
- [ ] Write blog posts regularly
- [ ] Keep skills updated
- [ ] Update contact info if changed

## 📋 Custom Domain Setup

1. In Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain

2. Update DNS records with your domain registrar:
   - Add Vercel nameservers, OR
   - Add CNAME record pointing to Vercel

3. Verify domain connection

## 📝 SEO Optimization

- [ ] Update meta description in `layout.tsx`
- [ ] Add structured data (schema.json) if needed
- [ ] Set up sitemap (Next.js auto-generates)
- [ ] Add robots.txt to `public/` folder
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Test with Lighthouse

### robots.txt example
```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://yourdomain.com/sitemap.xml
```

## 🔐 Security Checklist

- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Add security headers in `next.config.ts`
- [ ] Set up rate limiting if needed
- [ ] Implement CSRF protection for forms
- [ ] Sanitize form inputs
- [ ] Keep dependencies updated
- [ ] Regular security audits

### Add Security Headers
```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        }
      ]
    }
  ]
}
```

## 📊 Analytics Setup

### Track Events
Add event tracking for key user interactions:

```typescript
import { event } from '@vercel/analytics'

// Track project view
event('project_viewed', {
  projectName: 'Project Name'
})

// Track contact form submission
event('contact_submitted', {
  email: 'user@example.com'
})
```

## 🔄 Continuous Integration

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run build
      - run: npm run type-check
      - run: npm run lint
```

## 📱 Mobile App Version

To turn your portfolio into a mobile app:

1. Install PWA support:
   ```bash
   npm install next-pwa
   ```

2. Add to `next.config.ts`
3. Create `public/manifest.json`
4. Add app icons to `public/`

## 🚨 Troubleshooting Deployment

### Build fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Styles not loading
- Check Tailwind config paths
- Clear Vercel cache: In Vercel Dashboard → Settings → Deployments → Clear Cache

### Environment variables not working
- Redeploy in Vercel Dashboard
- Check variable names in code match .env

### Analytics not tracking
- Check Vercel Analytics enabled
- Verify `Analytics` component imported
- Wait 24 hours for first data

## ✅ Final Sign-Off

Before marking deployment complete:

- [ ] All content is accurate and current
- [ ] No broken links or images
- [ ] Performance is acceptable (>80 Lighthouse score)
- [ ] Mobile experience is good
- [ ] Dark mode works perfectly
- [ ] Contact form works (or has backend)
- [ ] Analytics tracking works
- [ ] All social links work
- [ ] SEO basics implemented
- [ ] Security checklist complete

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Examples](https://www.framer.com/motion)

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Vercel URL**: _______________
**Custom Domain**: _______________

Good luck with your deployment! 🚀
