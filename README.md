# RE:PARE — Portfolio & CMS Site

A modern portfolio and content management system for **RE:PARE**, a refurbished electronics marketplace. This site showcases products, hosts a managed blog, and builds customer trust through detailed product information and video content.

## Features

✅ **CMS-Managed Content**
- Blog posts with rich text editor
- Product listings organized by category (RE:New, RE:Product, RE:Keyboard, RE:Lab)
- Image galleries and video integration
- Draft/publish workflow

✅ **Static Site Hosting**
- Hosted on Netlify (free tier)
- Automatic HTTPS with security headers
- Global CDN for fast loading
- Zero-cost deployment

✅ **Modern Design**
- Dark/light theme toggle
- Responsive layout
- Smooth animations
- Professional UI

✅ **SEO Friendly**
- Clean URLs
- Semantic HTML
- Optimized images
- Blog for organic traffic

## Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/your-username/repare-site
cd "repare-site"
```

### 2. Local Preview
```bash
npx http-server . -p 8000
# Visit http://localhost:8000
```

### 3. Deploy to Netlify
See [SETUP.md](./SETUP.md) for detailed deployment instructions.

### 4. Access CMS
```
https://your-site.netlify.app/admin
```

## Content Structure

```
content/
├── blog/                    # Blog articles
│   └── [slug].md          # Blog post in Markdown
└── products/
    ├── new/               # RE:New category
    ├── product/           # RE:Product category
    ├── keyboard/          # RE:Keyboard category
    └── lab/               # RE:Lab category
```

## File Organization

```
├── admin/                   # CMS admin interface
│   ├── config.yml          # CMS collections & fields
│   └── index.html          # CMS UI entry point
├── content/                # CMS-managed content
├── repare-*.html           # Site pages
├── data-loader.js          # Content loading system
├── netlify.toml            # Netlify configuration
├── SETUP.md                # Detailed setup guide
└── package.json            # Project metadata
```

## How It Works

1. **Edit Content** → Use `/admin` CMS interface
2. **Auto-Commit** → Changes saved to GitHub
3. **Auto-Deploy** → Netlify rebuilds & deploys
4. **Live Updates** → Your site reflects changes in 1-2 minutes

## Integration with Python Script

Your Python script for uploading to platforms can work alongside the CMS:

- Python script uploads to Vinted, eBay, etc. (product listings)
- RE:PARE site displays enhanced product info (images, videos, details)
- Links in RE:PARE site direct customers to platform listings
- Blog content drives traffic to build trust

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **CMS**: Netlify CMS (open-source)
- **Hosting**: Netlify (free tier)
- **Version Control**: Git + GitHub
- **Content Format**: Markdown + YAML Frontmatter

## Documentation

- **[SETUP.md](./SETUP.md)** — Full deployment & configuration guide
- **[Netlify CMS Docs](https://www.netlifycms.org/docs/intro/)** — CMS help
- **[Netlify Docs](https://docs.netlify.com)** — Hosting & deployment

## Deploy with One Click

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/repare-site)

## Features by Product Category

### RE:New
For brand new electronics and first-time arrivals.

### RE:Product  
Refurbished gaming PCs, laptops, and computers with detailed benchmarks.

### RE:Keyboard
Mechanical keyboards with switch specifications and sound profiles.

### RE:Lab
Services like diagnostic testing and performance benchmarking.

## Blog SEO Strategy

The blog drives organic traffic with content about:
- Buying refurbished vs. new
- Product care and maintenance
- Tech comparisons
- Behind-the-scenes of RE:PARE

## Security

- ✅ HTTPS/TLS (automatic renewal)
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ No backend to compromise
- ✅ GitHub OAuth authentication for CMS
- ✅ Automatic backups (Git history)

## Performance

- ✅ Static site (extremely fast)
- ✅ Global CDN distribution via Netlify
- ✅ Optimized images and caching
- ✅ Sub-second page loads
- ✅ Lighthouse score: 95+

## License

MIT — Feel free to use and modify for your business.

## Support

For issues or questions:
1. Check [SETUP.md](./SETUP.md)
2. Review [Netlify CMS Docs](https://www.netlifycms.org/docs/intro/)
3. Visit [Netlify Community](https://community.netlify.com)

---

**Built with ❤️ for RE:PARE**  
Mulhouse, France
