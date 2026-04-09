# RE:PARE Site Setup & Deployment Guide

## Overview
This site uses **Netlify CMS** to manage blog posts and product content, with **static hosting** for security and simplicity.

## Local Development

### Prerequisites
- Git installed
- GitHub account
- Netlify account (free tier works)

### Initial Setup

1. **Initialize Git Repository**
   ```bash
   cd "c:\Users\PC.ingot\Desktop\RE PARE\Site v3"
   git init
   git add .
   git commit -m "Initial commit: RE:PARE site with Netlify CMS"
   ```

2. **Create GitHub Repository**
   - Go to https://github.com/new
   - Create repo named `repare-site`
   - Don't initialize with README
   - Follow the instructions to push your local repo

3. **Update admin/config.yml**
   - Replace `your-username/your-repo-name` with `your-github-username/repare-site`
   - Save the file

### Netlify CMS Setup

1. **GitHub OAuth Setup** (Required for CMS login)
   - Go to GitHub Settings → Developer settings → OAuth Apps → New OAuth App
   - Application name: `RE:PARE CMS`
   - Homepage URL: `https://your-domain.com` (or temporary Netlify domain)
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Save Client ID and Client Secret

2. **Netlify Site Setup**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select `repare-site` repository
   - Leave build settings as default (no build command needed for static site)
   - Click "Deploy site"

3. **Add Netlify Identity & CMS**
   - In Netlify, go to Site settings → Build & deploy → Environment
   - Add a new variable or use GitHub OAuth directly
   - Go to Site settings → Access control → OAuth providers
   - Add GitHub OAuth with your Client ID and Secret

4. **Access CMS Admin**
   - Visit `https://your-netlify-site.netlify.app/admin`
   - Log in with GitHub
   - Start creating content!

## Content Management

### Adding Blog Posts
1. In CMS Admin → Blog Articles
2. Click "New Blog Article"
3. Fill in:
   - **Title**: Article title
   - **Slug**: URL-friendly version (auto-generated)
   - **Tag**: Choose from predefined tags
   - **Summary**: Short description
   - **Cover Image**: Upload - Use at least 800x600px
   - **Content**: Write in Markdown
   - **Publish Date**: Set date and time
4. Click "Publish"

### Adding Products
1. In CMS Admin → Choose product category:
   - Products - RE:New
   - Products - RE:Product
   - Products - RE:Keyboard
   - Products - RE:Lab

2. Click "New [Category]"
3. Fill in:
   - **Title**: Product name
   - **Slug**: URL-friendly version
   - **Images**: Upload multiple images (at least one)
   - **Description**: Detailed product info in Markdown
   - **Platform Links**: Vinted/eBay URLs (optional)
   - **Video URL**: YouTube/Vimeo embed link (optional)
   - **Status**: Select "À vendre" or "Vendu"
4. Click "Publish"

### Editing Content
- All published content can be edited anytime in the CMS
- Changes auto-deploy within minutes
- No need to manually update HTML

## File Structure

```
├── admin/
│   ├── config.yml          # CMS configuration
│   └── index.html          # CMS admin UI
├── content/
│   ├── blog/               # Blog articles (Markdown)
│   └── products/
│       ├── new/
│       ├── product/
│       ├── keyboard/
│       └── lab/
├── data-loader.js          # Loads CMS content
├── repare-*.html           # Site pages
└── .gitignore
```

## Deployment

### Automatic Deployment
- Every time you publish content in Netlify CMS, it commits to GitHub
- Netlify automatically detects the change and rebuilds the site
- Your site updates within 1-2 minutes

### Manual Deployment
- Push changes to GitHub `main` branch
- Netlify auto-deploys

### Custom Domain
1. In Netlify, go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `repare.com`)
4. Update your domain DNS settings with Netlify's nameservers
5. HTTPS certificate is automatic (free)

## Security & Performance

### HTTPS (SSL/TLS)
- ✅ Automatic with Netlify
- ✅ Renews automatically
- ✅ No cost

### Security Headers
- Add in Netlify under Site settings → Build & deploy → Headers
- Example `_headers` file in root:
  ```
  /*
    Strict-Transport-Security: max-age=31536000; includeSubDomains
    X-Frame-Options: SAMEORIGIN
    X-Content-Type-Options: nosniff
    Content-Security-Policy: default-src 'self' https:; script-src 'self' 'unsafe-inline' unpkg.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com
  ```

### CDN & Edge Caching
- ✅ Included with Netlify
- ✅ Global distribution
- ✅ Automatic cache invalidation on deploy

## Troubleshooting

### Content Not Showing
- Clear browser cache (Ctrl+Shift+Del)
- Wait 2-3 minutes for Netlify to rebuild
- Check browser console for JavaScript errors

### CMS Login Issues
- Verify GitHub OAuth credentials in Netlify
- Try logging out and back in
- Check that GitHub account has access to the repo

### Images Not Displaying
- Ensure images are uploaded through CMS (not manually)
- Use images in `/images/uploads/` folder
- Check file size < 5MB per image

## Python Script Integration

Your existing Python script for uploading to platforms can be enhanced:

1. **Option A**: Have the Python script export product data as JSON
   - Save to `content/products/[category]/data.json`
   - Commit to GitHub automatically
   - CMS + Python script can coexist

2. **Option B**: API-based (future expansion)
   - Use Netlify Functions to sync Python script output
   - Requires Netlify Pro (currently free tier recommended)

## Next Steps

1. Set up GitHub repository
2. Configure Netlify and OAuth
3. Access CMS at `/admin` and test adding content
4. Configure custom domain
5. Monitor site performance in Netlify analytics

## Support

- **Netlify Docs**: https://docs.netlify.com
- **Netlify CMS Docs**: https://www.netlifycms.org/docs/intro/
- **GitHub Docs**: https://docs.github.com

---

**Re:PARE Site v3** — Managed with Netlify CMS
