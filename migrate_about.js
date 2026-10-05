const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  try {
    console.log('Running migration: Adding about/disclaimer columns...');
    await pool.query(`
      ALTER TABLE admins_data ADD COLUMN IF NOT EXISTS about_content TEXT DEFAULT '';
      ALTER TABLE admins_data ADD COLUMN IF NOT EXISTS disclaimer_content TEXT DEFAULT '';
    `);
    console.log('✅ Migration successful: about_content and disclaimer_content added.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}
migrate();
