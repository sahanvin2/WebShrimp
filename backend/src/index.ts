import express from 'express';
import cors from 'cors';
import { pool } from './db';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Content endpoint
app.get('/api/content', async (req, res) => {
  try {
    const plans = await pool.query('SELECT * FROM pricing_plans ORDER BY id');
    const works = await pool.query('SELECT * FROM portfolio_works ORDER BY id DESC');
    const testimonials = await pool.query('SELECT * FROM testimonials ORDER BY id');
    const posts = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');

    res.json({
      pricingPlans: plans.rows,
      portfolioWorks: works.rows,
      testimonials: testimonials.rows,
      blogPosts: posts.rows
    });
  } catch (error) {
    console.error('Error fetching content', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Setup fallback for generic dynamic pages
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving contact', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
