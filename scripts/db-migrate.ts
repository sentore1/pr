/**
 * Database migration runner
 * Reads database/schema.sql and applies it to the configured MySQL database
 * Run: npx tsx scripts/db-migrate.ts
 */

import { createConnection } from 'mysql2/promise'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { config } from '../lib/config'

async function run() {
  console.log('🗄️  Pryro CMS — Database Migration\n')
  console.log(`Connecting to ${config.database.host}:${config.database.port}/${config.database.name}…`)

  // Connect without database first so we can create it
  const conn = await createConnection({
    host:     config.database.host,
    port:     config.database.port,
    user:     config.database.user,
    password: config.database.password,
    multipleStatements: true,
  })

  // Read schema
  const schemaPath = join(process.cwd(), 'database', 'schema.sql')
  const schema = await readFile(schemaPath, 'utf-8')

  console.log('Running schema.sql…')
  await conn.query(schema)
  console.log('✅  Schema applied successfully\n')

  // Ask about seed data
  const runSeed = process.argv.includes('--seed')
  if (runSeed) {
    const seedPath = join(process.cwd(), 'database', 'seed.sql')
    const seed = await readFile(seedPath, 'utf-8')
    console.log('Running seed.sql…')
    await conn.query(seed)
    console.log('✅  Seed data inserted\n')
  } else {
    console.log('ℹ️  Skipping seed data. Run with --seed to include it.\n')
  }

  await conn.end()
  console.log('Migration complete.')
}

run().catch(err => { console.error('Migration failed:', err); process.exit(1) })
