# 🚀 Deployment Guide

Step-by-step instructions to deploy your birthday website to the web.

## Option 1: Vercel (Recommended - Easiest)

Vercel is the creator of Next.js and offers the smoothest deployment experience.

### Method A: Using Vercel Website (No CLI needed)

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

2. **Import Project**
   - Click "New Project"
   - Import your `Nbday` repository
   - Vercel will auto-detect Next.js

3. **Configure (Usually auto-configured)**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`

4. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your live URL: `your-project.vercel.app`

5. **Custom Domain (Optional)**
   - In project settings → Domains
   - Add your custom domain (if you have one)

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: Nbday (or your choice)
# - Directory: ./
# - Build settings: (accept defaults)

# For production deployment
vercel --prod
```

**Your site will be live at**: `https://your-project.vercel.app`

---

## Option 2: Netlify (Also Very Easy)

### Method A: Drag & Drop

1. **Build the site locally**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy via Netlify Drop**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `out` folder to the upload area
   - Get instant URL: `random-name.netlify.app`

### Method B: Git Integration

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **New Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub → Select `Nbday` repo
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `out`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - Site settings → Domain management
   - Add custom domain

**Your site will be live at**: `https://your-site.netlify.app`

---

## Option 3: GitHub Pages (Free, but requires setup)

1. **Update next.config.mjs**

   Add your repo name as basePath:

   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/Nbday',  // Your repo name
     images: { unoptimized: true }
   };
   ```

2. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json**
   ```json
   "scripts": {
     "deploy": "next build && touch out/.nojekyll && gh-pages -d out -t true"
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repo Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/root`
   - Save

**Your site will be live at**: `https://sahil-idk.github.io/Nbday`

---

## Option 4: Cloudflare Pages (Fast & Free)

1. **Create Cloudflare Account**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Sign up with GitHub

2. **Create New Project**
   - Connect GitHub account
   - Select `Nbday` repository
   - Configure:
     - Framework preset: Next.js
     - Build command: `npm run build`
     - Build output: `out`

3. **Deploy**
   - Click "Save and Deploy"
   - Wait for build

**Your site will be live at**: `your-project.pages.dev`

---

## 🔍 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All content in `content.json` is updated
- [ ] Photos are added to `public/photos/`
- [ ] Tested locally with `npm run dev`
- [ ] Tested on mobile viewport
- [ ] All sections work correctly
- [ ] No console errors
- [ ] Personal information is correct

---

## 🧪 Testing Your Deployed Site

After deployment:

1. **Test on Multiple Devices**
   - Desktop Chrome
   - Desktop Safari/Firefox
   - iPhone Safari
   - Android Chrome

2. **Check All Interactions**
   - Scroll animations work
   - Brooklyn 99 quiz works
   - Photo gallery/lightbox works
   - Journey map slider works
   - Date card selections work
   - All buttons/links work

3. **Performance Check**
   - Run [PageSpeed Insights](https://pagespeed.web.dev/)
   - Aim for 90+ score
   - Check Core Web Vitals

4. **Share Test**
   - Send to a friend to test
   - Verify it loads on different networks

---

## 🎯 Quick Deploy Commands Reference

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

### GitHub Pages
```bash
npm run deploy
```

---

## 🌐 Custom Domain Setup (Optional)

If you have a custom domain (e.g., `birthday.yourname.com`):

### For Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records (Vercel provides instructions)

### For Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS (Netlify provides instructions)

### For Cloudflare Pages:
1. Go to Custom Domains
2. Add domain
3. DNS auto-configured if using Cloudflare DNS

---

## 🔄 Updating Your Site

When you want to make changes:

1. **Update locally**
   ```bash
   # Edit content.json or components
   npm run dev  # Test locally
   ```

2. **Commit and push**
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

3. **Redeploy**
   - **Vercel/Netlify/Cloudflare**: Auto-deploys on push! 🎉
   - **GitHub Pages**: Run `npm run deploy` again

---

## 🆘 Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: "Out of memory"**
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Site Not Loading

1. Check build logs for errors
2. Verify `out` directory was created
3. Check if images are too large
4. Ensure no absolute paths in code

### Photos Not Showing

1. Verify photos are in `public/photos/`
2. Check filenames match content.json
3. Ensure photos aren't too large (>1MB)
4. Try different image formats (JPG instead of PNG)

### Slow Loading

1. Compress images (use TinyPNG)
2. Convert images to WebP format
3. Reduce number of photos
4. Enable CDN (usually auto-enabled on Vercel/Netlify)

---

## 🎉 Success!

Once deployed, you'll have a URL like:
- `https://nbday.vercel.app`
- `https://birthday-site.netlify.app`
- `https://sahil-idk.github.io/Nbday`

**Share this URL with her and make her day special! 💙**

---

## 📊 Analytics (Optional)

Want to know when she visits?

### Vercel Analytics (Free)
```bash
npm install @vercel/analytics
```

Then add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

**Need help?** Check the main README or create an issue on GitHub!
