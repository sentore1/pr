import { update, closePool } from '../lib/db/connection'

async function fix() {
  await update(
    `UPDATE footer_content SET content = ? WHERE key_name = 'copyright_text'`,
    ['© 2026 Pryro. All rights reserved.']
  )
  console.log('✅ Copyright encoding fixed')
  await closePool()
}

fix().catch(e => { console.error(e); process.exit(1) })
