/**
 * Reset admin password to a working bcrypt hash
 * Run: npx tsx scripts/reset-admin-password.ts
 */
import { userModel } from '../lib/db/models/user'
import { testConnection, closePool } from '../lib/db/connection'

async function main() {
  const ok = await testConnection()
  if (!ok) { console.error('DB connection failed'); process.exit(1) }

  const email    = 'admin@pryro.com'
  const password = 'Admin@1234!'

  const user = await userModel.findByEmail(email)
  if (!user) {
    // Create fresh
    const hash = await userModel.hashPassword(password)
    await userModel.createUser({ email, password_hash: hash, name: 'Admin', role: 'admin' })
    console.log('✅  Admin user created')
  } else {
    // Reset password
    await userModel.updatePassword(user.id, password)
    console.log('✅  Admin password reset')
  }

  console.log(`\nLogin at: http://localhost:3000/admin/login`)
  console.log(`Email:    ${email}`)
  console.log(`Password: ${password}`)

  await closePool()
}

main().catch(e => { console.error(e); process.exit(1) })
