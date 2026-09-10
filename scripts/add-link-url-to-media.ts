/**
 * Migration: Add link_url column to media_library table
 * Run with: npx tsx scripts/add-link-url-to-media.ts
 */
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(process.cwd(), '.env.local') })

import { query } from '../lib/db/connection'

async function migrate() {
  try {
    // Check if column already exists
    const cols = await query(`SHOW COLUMNS FROM media_library LIKE 'link_url'`)
    if ((cols as any[]).length > 0) {
      console.log('✓ link_url column already exists — skipping')
      process.exit(0)
    }

    await query(`ALTER TABLE media_library ADD COLUMN link_url VARCHAR(500) NULL DEFAULT NULL AFTER alt_text`)
    console.log('✓ Added link_url column to media_library')
    process.exit(0)
  } catch (err) {
    console.error('Migration failed:', err)
    process.exit(1)
  }
}

migrate()
