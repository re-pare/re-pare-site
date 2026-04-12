/**
 * Data Loader for RE:PARE CMS Content
 * Fetches and parses markdown files from content/ folder
 */

class DataLoader {
  constructor() {
    this.blogPosts = [];
    this.products = {
      lab: [],
      laptop: [],
      keyboard: [],
      new: [],
      product: [],
      custom: []
    };
  }

  /**
   * Parse YAML front matter from markdown files
   */
  parseFrontMatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { frontmatter: {}, body: content.trim() };

    const frontmatterStr = match[1];
    const body = match[2];
    const frontmatter = {};

    // Simple YAML parser for common fields
    const lines = frontmatterStr.split('\n');
    let currentKey = '';
    let isArray = false;
    
    for (const line of lines) {
      if (!line.trim()) continue;

      // Handle arrays (e.g., images:)
      if (line.match(/^\w+:\s*$/)) {
        currentKey = line.replace(':', '').trim();
        frontmatter[currentKey] = [];
        isArray = true;
        continue;
      }

      // Handle array items
      if (isArray && line.startsWith('  - ')) {
        const value = line.replace('  - ', '').trim().replace(/^["']|["']$/g, '');
        frontmatter[currentKey].push(value);
        continue;
      }

      // Handle regular key-value pairs
      const kvMatch = line.match(/^(\w+):\s*(.+)$/);
      if (kvMatch) {
        const key = kvMatch[1];
        let value = kvMatch[2].trim().replace(/^["']|["']$/g, '');
        
        // Parse boolean and null values
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (value === 'null') value = null;
        
        frontmatter[key] = value;
        isArray = false;
        currentKey = '';
      }
    }

    return { frontmatter, body };
  }

  /**
   * Load blog posts from content/blog folder
   */
  async loadBlogPosts() {
    try {
      const response = await fetch('/content/blog/');
      const html = await response.text();
      const knownFiles = [
        'pourquoi-reconditionner.md',
        're-mod.md',
        'ou-acheter-repare.md',
        'nos-reseaux.md'
      ];
      const files = [...new Set([...this.parseFileList(html), ...knownFiles])];

      for (const file of files.filter(f => f.endsWith('.md'))) {
        try {
          const postResponse = await fetch(`/content/blog/${file}`);
          if (!postResponse.ok) continue;

          const postContent = await postResponse.text();
          const { frontmatter, body } = this.parseFrontMatter(postContent);
          if (!frontmatter.title && !frontmatter.slug) continue;

          frontmatter.body = body;
          this.blogPosts.push(frontmatter);
        } catch (postError) {
          console.warn(`Could not load blog post ${file}:`, postError);
        }
      }

      // Sort by date (newest first)
      this.blogPosts.sort((a, b) => {
        const dateA = new Date(a.publish_date || 0);
        const dateB = new Date(b.publish_date || 0);
        return dateB - dateA;
      });
    } catch (error) {
      console.warn('Could not load blog posts:', error);
      // Fallback to demo data
      this.loadDemoData();
    }
  }

  /**
   * Load products from content/products/[category] folders
   */
  async loadProducts() {
    const fallbackFiles = {
      lab: ['service-diagnostic-pc.md'],
      laptop: [],
      keyboard: ['keychron-k8-brown.md'],
      new: ['macbook-air-m1.md'],
      product: ['rtx-3070-gaming-pc.md'],
      custom: []
    };

    try {
      for (const category of Object.keys(this.products)) {
        this.products[category] = [];

        const response = await fetch(`/content/products/${category}/`);
        const html = response.ok ? await response.text() : '';
        const files = [...new Set([
          ...this.parseFileList(html),
          ...(fallbackFiles[category] || [])
        ])];

        for (const file of files.filter(f => f.endsWith('.md'))) {
          try {
            const productResponse = await fetch(`/content/products/${category}/${file}`);
            if (!productResponse.ok) continue;

            const productContent = await productResponse.text();
            const { frontmatter, body } = this.parseFrontMatter(productContent);
            if (!frontmatter.title && !frontmatter.slug) continue;

            frontmatter.body = body;
            if (!frontmatter.category) frontmatter.category = category;
            this.products[category].push(frontmatter);
          } catch (productError) {
            console.warn(`Could not load product ${category}/${file}:`, productError);
          }
        }
      }
    } catch (error) {
      console.warn('Could not load products:', error);
      // Fallback to demo data
      this.loadDemoData();
    }
  }

  /**
   * Extract file list from directory HTML (GitHub or similar)
   */
  parseFileList(html) {
    const fileRegex = /href="([^"]+\.md)"/g;
    const files = [];
    let match;

    while ((match = fileRegex.exec(html)) !== null) {
      const href = match[1];
      const file = href.split('/').pop();
      if (file && !files.includes(file)) {
        files.push(file);
      }
    }

    return files;
  }

  /**
   * Load demo data (for development/fallback)
   */
  loadDemoData() {
    this.blogPosts = [
      {
        title: 'Pourquoi reconditionner plutôt qu\'acheter neuf',
        slug: 'pourquoi-reconditionner',
        tag: 'Écologie',
        summary: 'Découvrez les avantages environnementaux et économiques du reconditionnement',
        cover_image: '/images/uploads/reconditionner.jpg',
        publish_date: '2025-04-01T10:00:00.000Z'
      }
    ];

    this.products.new = [
      {
        title: 'MacBook Air M1 - Excellent État',
        slug: 'macbook-air-m1',
        category: 'new',
        images: ['/images/uploads/macbook-1.jpg'],
        vinted_url: 'https://www.vinted.fr/items/...',
        ebay_url: 'https://www.ebay.fr/itm/...',
        status: 'À vendre'
      }
    ];

    this.products.keyboard = [
      {
        title: 'Keychron K8 - Switches Brown',
        slug: 'keychron-k8-brown',
        category: 'keyboard',
        images: ['/images/uploads/keyboard-1.jpg'],
        vinted_url: 'https://www.vinted.fr/items/...',
        ebay_url: 'https://www.ebay.fr/itm/...',
        status: 'À vendre'
      }
    ];

    this.products.product = [
      {
        title: 'RTX 3070 Gaming PC',
        slug: 'rtx-3070-gaming-pc',
        category: 'product',
        images: ['/images/uploads/pc-build-1.jpg'],
        vinted_url: 'https://www.vinted.fr/items/...',
        ebay_url: 'https://www.ebay.fr/itm/...',
        status: 'À vendre'
      }
    ];

    this.products.lab = [
      {
        title: 'Service de Diagnostic PC',
        slug: 'service-diagnostic-pc',
        category: 'lab',
        images: ['/images/uploads/diagnostic-1.jpg'],
        status: 'À vendre'
      }
    ];
  }

  /**
   * Initialize data loading
   */
  async init() {
    await this.loadBlogPosts();
    await this.loadProducts();
  }

  /**
   * Get all blog posts
   */
  getBlogPosts() {
    return this.blogPosts;
  }

  /**
   * Get products by category
   */
  getProductsByCategory(category) {
    return this.products[category] || [];
  }

  /**
   * Get all products
   */
  getAllProducts() {
    return Object.values(this.products).flat();
  }

  /**
   * Get specific product by slug
   */
  getProductBySlug(slug) {
    for (const category of Object.values(this.products)) {
      const product = category.find(p => p.slug === slug);
      if (product) return product;
    }
    return null;
  }

  /**
   * Get specific blog post by slug
   */
  getBlogPostBySlug(slug) {
    return this.blogPosts.find(p => p.slug === slug);
  }
}

// Export for use in HTML
const dataLoader = new DataLoader();
