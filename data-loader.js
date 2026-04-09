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
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { frontmatter: {}, body: '' };

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
      const files = this.parseFileList(html);

      for (const file of files.filter(f => f.endsWith('.md'))) {
        const postResponse = await fetch(`/content/blog/${file}`);
        const postContent = await postResponse.text();
        const { frontmatter, body } = this.parseFrontMatter(postContent);

        frontmatter.body = body;
        this.blogPosts.push(frontmatter);
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
    try {
      for (const category of Object.keys(this.products)) {
        const response = await fetch(`/content/products/${category}/`);
        const html = await response.text();
        const files = this.parseFileList(html);

        for (const file of files.filter(f => f.endsWith('.md'))) {
          const productResponse = await fetch(`/content/products/${category}/${file}`);
          const productContent = await productResponse.text();
          const { frontmatter, body } = this.parseFrontMatter(productContent);

          frontmatter.body = body;
          this.products[category].push(frontmatter);
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
    const fileRegex = /href="[^"]*\/([\w\-\.]+\.md)"/g;
    const files = [];
    let match;

    while ((match = fileRegex.exec(html)) !== null) {
      files.push(match[1]);
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
