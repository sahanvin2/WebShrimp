CREATE TABLE IF NOT EXISTS pricing_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price VARCHAR(50) NOT NULL,
  description TEXT,
  features JSONB,
  is_popular BOOLEAN DEFAULT FALSE,
  button_text VARCHAR(50) DEFAULT 'Choose Plan'
);

CREATE TABLE IF NOT EXISTS portfolio_works (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  feedback TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar_url TEXT
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  excerpt TEXT NOT NULL,
  date DATE NOT NULL,
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy data to populate the frontend
INSERT INTO pricing_plans (name, price, description, features, is_popular)
VALUES 
('Starter', 'LKR 25,000', 'Perfect for personal or small projects.', '["5 Pages Website", "Responsive Design", "Basic SEO", "Contact Form"]', false),
('Business', 'LKR 60,000', 'Best for businesses and companies.', '["Up to 10 Pages", "Responsive Design", "SEO Optimized", "Contact Form", "Social Media Integration"]', true),
('E-Commerce', 'LKR 120,000', 'Complete solution for online stores.', '["Up to 20 Products", "Payment Gateway", "Order Management", "SEO Optimized", "Support & Training"]', false),
('Custom', 'Contact Us', 'Need something unique? We got you!', '["Unlimited Pages", "Custom Features", "Advanced Functionality", "Priority Support"]', false)
ON CONFLICT DO NOTHING;
