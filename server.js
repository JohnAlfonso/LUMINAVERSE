/**
 * Simple Express server for LUMINAVERSE
 * Serves static files and provides API for articles
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8010;
const ARTICLES_FILE = path.join(__dirname, 'public', 'articles.json');
const DIST_ARTICLES_FILE = path.join(__dirname, 'dist', 'articles.json');

// Keep dist/articles.json in sync with public/articles.json
const syncArticles = () => {
  try {
    const data = fs.readFileSync(ARTICLES_FILE, 'utf8');
    fs.writeFileSync(DIST_ARTICLES_FILE, data, 'utf8');
  } catch (error) {
    console.error('Error syncing articles:', error);
  }
};

// Valid article fields — mirror of FieldType in src/types/index.ts
const VALID_FIELDS = ['tech', 'selling', 'shop', 'production', 'industry', 'medical', 'education', 'finance', 'marketing'];

// Default category per field — first entry of FIELD_CATEGORIES in src/types/index.ts
const DEFAULT_CATEGORY = {
  tech: 'AI/ML',
  selling: 'B2B Sales',
  shop: 'E-commerce',
  production: 'Manufacturing',
  industry: 'Industrial IoT',
  medical: 'Healthcare',
  education: 'Teaching',
  finance: 'Investment',
  marketing: 'Content',
};

// Default field used when none (or an unrecognized one) is supplied.
const DEFAULT_FIELD = 'tech';

// Friendly labels / synonyms -> internal field code (matched case-insensitively).
const FIELD_ALIASES = {
  technology: 'tech',
  sales: 'selling',
  'sales & selling': 'selling',
  'sales and selling': 'selling',
  shopping: 'shop',
  'shopping & retail': 'shop',
  'shopping and retail': 'shop',
  retail: 'shop',
  industrial: 'industry',
  health: 'medical',
  healthcare: 'medical',
  'medical & health': 'medical',
  'medical and health': 'medical',
  financial: 'finance',
};

// Normalize any incoming field value to a valid code. Never rejects:
// accepts codes ("tech"), labels ("Technology"), and synonyms; anything
// unrecognized (or missing) falls back to DEFAULT_FIELD so creation never fails on field.
const normalizeField = (raw) => {
  if (typeof raw !== 'string' || !raw.trim()) return DEFAULT_FIELD;
  const key = raw.trim().toLowerCase();
  if (VALID_FIELDS.includes(key)) return key;
  return FIELD_ALIASES[key] || DEFAULT_FIELD;
};

// Build a short excerpt (~160 chars, trimmed at a word boundary) from full content
const makeExcerpt = (content) => {
  const text = content.replace(/\s+/g, ' ').trim();
  if (text.length <= 160) return text;
  const cut = text.slice(0, 157);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + '...';
};

// Estimate reading time in minutes (~200 words/min, minimum 1)
const estimateReadTime = (content) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Random date 4–5 months before today, as YYYY-MM-DD.
// Window stays relative to the current date so it's always ~4–5 months back.
const randomBackdate = () => {
  const start = new Date(); // 5 months ago (earliest)
  start.setMonth(start.getMonth() - 5);
  const end = new Date();   // 4 months ago (latest)
  end.setMonth(end.getMonth() - 4);
  const ts = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(ts).toISOString().split('T')[0];
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes

/**
 * GET /api/articles - Get all articles
 */
app.get('/api/articles', (req, res) => {
  try {
    const data = fs.readFileSync(ARTICLES_FILE, 'utf8');
    const articles = JSON.parse(data);
    res.json(articles);
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ error: 'Failed to read articles' });
  }
});

/**
 * POST /api/articles - Add new article
 *
 * Required:  title, content, author
 * Optional:  field (default "tech"), category (default per-field), excerpt,
 *            date, readTime, image, id
 * Any omitted optional field is auto-generated so the article renders correctly.
 */
app.post('/api/articles', (req, res) => {
  try {
    const body = req.body || {};
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    const author = typeof body.author === 'string' ? body.author.trim() : '';

    // Validate required fields
    if (!title || !content || !author) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['title', 'content', 'author'],
      });
    }

    // Field is optional and never blocks creation: accept a code ("tech"),
    // a friendly label ("Technology"), or a synonym; anything else -> default.
    const field = normalizeField(body.field);

    // Build a complete, render-ready article — auto-fill anything not supplied
    const article = {
      id: body.id ? String(body.id) : Date.now().toString(),
      title,
      excerpt: typeof body.excerpt === 'string' && body.excerpt.trim()
        ? body.excerpt.trim()
        : makeExcerpt(content),
      content,
      author,
      date: body.date || randomBackdate(),
      field,
      category: body.category || DEFAULT_CATEGORY[field],
      readTime: Number.isFinite(body.readTime) ? body.readTime : estimateReadTime(content),
    };
    if (body.image) article.image = body.image;

    // Read existing articles
    let articles = [];
    if (fs.existsSync(ARTICLES_FILE)) {
      const data = fs.readFileSync(ARTICLES_FILE, 'utf8');
      articles = JSON.parse(data);
    }

    // Add new article
    articles.push(article);

    // Save to file
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf8');
    syncArticles();

    // Build the public link to the new article.
    // Uses PUBLIC_BASE_URL if set, otherwise the domain/proto the request came in on.
    const baseUrl = (process.env.PUBLIC_BASE_URL
      || `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`).replace(/\/+$/, '');
    const url = `${baseUrl}/article/${article.id}`;

    res.status(201).json({ success: true, article, url });
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

/**
 * PUT /api/articles/:id - Update article
 */
app.put('/api/articles/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Read existing articles
    let articles = [];
    if (fs.existsSync(ARTICLES_FILE)) {
      const data = fs.readFileSync(ARTICLES_FILE, 'utf8');
      articles = JSON.parse(data);
    }

    // Find and update article
    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    articles[index] = { ...articles[index], ...updatedData };

    // Save to file
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf8');
    syncArticles();

    res.json({ success: true, article: articles[index] });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

/**
 * DELETE /api/articles/:id - Delete article
 */
app.delete('/api/articles/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Read existing articles
    let articles = [];
    if (fs.existsSync(ARTICLES_FILE)) {
      const data = fs.readFileSync(ARTICLES_FILE, 'utf8');
      articles = JSON.parse(data);
    }

    // Find and remove article
    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    articles.splice(index, 1);

    // Save to file
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf8');
    syncArticles();

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * SPA fallback - serve index.html for all unmatched routes
 */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Sync articles on startup
syncArticles();

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 LUMINAVERSE server running on port ${PORT}

  Local (this app, plain HTTP):  http://localhost:${PORT}/

  Public (served via nginx + HTTPS — use these in a browser):
    https://luminaverse.keen333.cloud/
    https://angel0215.com/

  API:  POST https://angel0215.com/api/articles

  NOTE: Do NOT use https://<domain>:${PORT} — port ${PORT} is plain HTTP only.
        Public visitors should use the https:// URLs above (port 443, no port number).
`);
});
