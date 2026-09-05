/**
 * Seed all /public/icon/*.png into the media_library table
 * so they appear in Media and can be picked in the nav editor.
 * Run: npx tsx scripts/seed-icons-to-media.ts
 */
import { query, insert, closePool } from '../lib/db/connection'
import { statSync } from 'fs'
import { join } from 'path'

const ICONS = [
  { file: '0code icon.png',              name: 'Code',                folder: 'icons' },
  { file: '0coder icon.png',             name: 'Coder',               folder: 'icons' },
  { file: 'accounting icon.png',         name: 'Accounting',          folder: 'icons' },
  { file: 'ai business review icon.png', name: 'AI Business Review',  folder: 'icons' },
  { file: 'ai email icon.png',           name: 'AI Email',            folder: 'icons' },
  { file: 'ai interprise icon.png',      name: 'AI Enterprise',       folder: 'icons' },
  { file: 'budget icon.png',             name: 'Budget',              folder: 'icons' },
  { file: 'business coach icon.png',     name: 'Business Coach',      folder: 'icons' },
  { file: 'business review icon2.png',   name: 'Business Review',     folder: 'icons' },
  { file: 'cold call icon.png',          name: 'Cold Call',           folder: 'icons' },
  { file: 'COO icon.png',               name: 'COO',                 folder: 'icons' },
  { file: 'CRM icon.png',               name: 'CRM',                 folder: 'icons' },
  { file: 'dashboard icon.png',         name: 'Dashboard',           folder: 'icons' },
  { file: 'disccuss icon.png',          name: 'Discussion',          folder: 'icons' },
  { file: 'document icon.png',          name: 'Document',            folder: 'icons' },
  { file: 'ecommerce icon.png',         name: 'E-commerce',          folder: 'icons' },
  { file: 'help desk icon.png',         name: 'Help Desk',           folder: 'icons' },
  { file: 'HR icon.png',               name: 'HR',                  folder: 'icons' },
  { file: 'icon image.png',            name: 'Icon Image',          folder: 'icons' },
  { file: 'inventory icon 2.png',      name: 'Inventory 2',         folder: 'icons' },
  { file: 'Inventory icon.png',        name: 'Inventory',           folder: 'icons' },
  { file: 'knowledge icon.png',        name: 'Knowledge',           folder: 'icons' },
  { file: 'knowledge icon2.png',       name: 'Knowledge 2',         folder: 'icons' },
  { file: 'lawyer icon.png',           name: 'Lawyer',              folder: 'icons' },
  { file: 'logistic icon 2.png',       name: 'Logistics 2',         folder: 'icons' },
  { file: 'logistic icon.png',         name: 'Logistics',           folder: 'icons' },
  { file: 'manufacturers icon.png',    name: 'Manufacturers',       folder: 'icons' },
  { file: 'pharmacy icon.png',         name: 'Pharmacy',            folder: 'icons' },
  { file: 'pos icon.png',              name: 'POS',                 folder: 'icons' },
  { file: 'project icon.png',          name: 'Project',             folder: 'icons' },
  { file: 'purchase icon.png',         name: 'Purchase',            folder: 'icons' },
  { file: 'research system icon.png',  name: 'Research System',     folder: 'icons' },
  { file: 'sales icon.png',            name: 'Sales',               folder: 'icons' },
  { file: 'signuture icon.png',        name: 'Signature',           folder: 'icons' },
  { file: 'SOP icon.png',             name: 'SOP',                 folder: 'icons' },
  { file: 'subscription icon.png',    name: 'Subscription',        folder: 'icons' },
  { file: 'Tender icon.png',          name: 'Tender',              folder: 'icons' },
]

async function main() {
  console.log('🖼️  Seeding icons into media_library...\n')
  let inserted = 0, skipped = 0

  for (const icon of ICONS) {
    const fileUrl = `/icon/${icon.file}`
    const filePath = `icon/${icon.file}`

    // Skip if already seeded
    const existing = await query(
      'SELECT id FROM media_library WHERE file_url = ?',
      [fileUrl]
    ) as any[]

    if (existing.length > 0) { skipped++; continue }

    // Get file size from disk
    let fileSize = 0
    try {
      const stat = statSync(join(process.cwd(), 'public', 'icon', icon.file))
      fileSize = stat.size
    } catch {}

    await insert(
      `INSERT INTO media_library
       (filename, original_filename, file_path, file_url, mime_type, file_size, alt_text, title, folder, uploaded_by)
       VALUES (?, ?, ?, ?, 'image/png', ?, ?, ?, ?, 1)`,
      [
        icon.file,
        icon.file,
        filePath,
        fileUrl,
        fileSize,
        icon.name,
        icon.name,
        icon.folder,
      ]
    )
    console.log(`  ✓ ${icon.name}`)
    inserted++
  }

  console.log(`\n✅  Done! Inserted: ${inserted}, Skipped: ${skipped}`)
  console.log('   Icons are now visible in /admin/media under the "icons" folder.')
}

main().then(() => closePool()).catch(e => { console.error(e); process.exit(1) })
