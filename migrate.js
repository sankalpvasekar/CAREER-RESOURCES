const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  try {
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS payment_done BOOLEAN DEFAULT false');
    await pool.query('ALTER TABLE users DROP COLUMN IF EXISTS is_blocked');
    await pool.query('ALTER TABLE users DROP COLUMN IF EXISTS device_switch_count');
    console.log('✅ Migration complete: payment_done added, is_blocked & device_switch_count dropped.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}
migrate();
