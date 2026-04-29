import { query } from './db';

async function migrate() {
  console.log('Running migrations...');

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS colleges (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      state VARCHAR(100) NOT NULL,
      type VARCHAR(50) NOT NULL,
      fees_min INTEGER NOT NULL,
      fees_max INTEGER NOT NULL,
      rating DECIMAL(3,1) NOT NULL,
      placement_percentage INTEGER NOT NULL,
      avg_package DECIMAL(5,2) NOT NULL,
      image_url TEXT,
      description TEXT,
      established INTEGER,
      total_students INTEGER,
      website VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      duration VARCHAR(50) NOT NULL,
      fees INTEGER NOT NULL,
      seats INTEGER NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS saved_colleges (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, college_id)
    );
  `);

  console.log('✅ Migrations complete!');
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
