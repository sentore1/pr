/**
 * One-time admin user setup script
 * Run with: npx ts-node -r tsconfig-paths/register scripts/setup-admin.ts
 * Or:       npx tsx scripts/setup-admin.ts
 */

import { userModel } from '../lib/db/models/user'
import { testConnection, closePool } from '../lib/db/connection'

async function main() {
  console.log('🔧 Pryro CMS — Admin Setup\n')

  const ok = await testConnection()
  if (!ok) {
    console.error('❌  Cannot connect to database. Check your .env.local settings.')
    process.exit(1)
  }

  // Default credentials — change immediately after first login
  const email    = process.env.ADMIN_EMAIL    || 'admin@pryro.com'
  const password = process.env.ADMIN_PASSWORD || 'Admin@1234!'
  const name     = process.env.ADMIN_NAME     || 'Admin'

  // Check if admin already exists
  const existing = await userModel.findByEmail(email)
  if (existing) {
    console.log(`ℹ️  Admin user already exists: ${email}`)
    console.log('   Use the admin panel to change password.\n')
    await closePool()
    return
  }

  const hash = await userModel.hashPassword(password)
  const id   = await userModel.createUser({ email, password_hash: hash, name, role: 'admin' })

  console.log('✅  Admin user created!')
  console.log(`   Email:    ${email}`)
  console.log(`   Password: ${password}`)
  console.log(`   ID:       ${id}`)
  console.log('\n⚠️   CHANGE THE PASSWORD immediately after first login at /admin/login\n')

  await closePool()
}

main().catch(err => { console.error(err); process.exit(1) })
