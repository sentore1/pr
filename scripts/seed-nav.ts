/**
 * Seed navigation data — restores all header nav items and dropdowns
 * Run: npx tsx scripts/seed-nav.ts
 */
import { transaction } from '../lib/db/connection'
import { closePool } from '../lib/db/connection'

async function seed() {
  console.log('Seeding navigation…')

  await transaction(async (conn) => {
    // Wipe existing items for menu 1
    await conn.execute('DELETE FROM navigation_items WHERE menu_id = 1')

    // ── Products (with dropdown) ──────────────────────────────────────
    const [p1] = await conn.execute(
      `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
       VALUES (1, NULL, 'Products', '/products', '', '_self', 1, 1)`
    ) as any
    const productsId = p1.insertId

    const productChildren = [
      { label: 'Features',      url: '/features',      icon: '/icon/dashboard icon.png' },
      { label: 'Pricing',       url: '/pricing',       icon: '/icon/budget icon.png' },
      { label: 'AI Calculator', url: '/ai-calculator', icon: '/icon/ai business review icon.png' },
      { label: 'Documentation', url: '/documentation', icon: '/icon/document icon.png' },
      { label: 'API',           url: '/api',           icon: '/icon/0code icon.png' },
    ]
    for (let i = 0; i < productChildren.length; i++) {
      const c = productChildren[i]
      await conn.execute(
        `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
         VALUES (1, ?, ?, ?, ?, '_self', ?, 1)`,
        [productsId, c.label, c.url, c.icon, i]
      )
    }

    // ── Solutions (with dropdown) ─────────────────────────────────────
    const [p2] = await conn.execute(
      `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
       VALUES (1, NULL, 'Solutions', '/solutions', '', '_self', 2, 1)`
    ) as any
    const solutionsId = p2.insertId

    const solutionChildren = [
      { label: 'Small Business',   url: '/small-business',          icon: '/icon/business coach icon.png' },
      { label: 'Accountants',      url: '/accountants-bookkeepers', icon: '/icon/accounting icon.png' },
      { label: 'Project',          url: '/project',                 icon: '/icon/project icon.png' },
      { label: 'Human Resource',   url: '/human-resource',          icon: '/icon/HR icon.png' },
      { label: 'Stock Management', url: '/stock-management',        icon: '/icon/Inventory icon.png' },
      { label: 'CRM',              url: '/customer-relation',       icon: '/icon/CRM icon.png' },
      { label: 'Self-employed',    url: '/self-employed',           icon: '/icon/0coder icon.png' },
      { label: 'Non-profit',       url: '/non-profit',              icon: '/icon/help desk icon.png' },
      { label: 'Hospitality',      url: '/hospitality',             icon: '/icon/pos icon.png' },
      { label: 'Construction',     url: '/construction',            icon: '/icon/manufacturers icon.png' },
      { label: 'Logistic',         url: '/logistic',                icon: '/icon/logistic icon.png' },
      { label: 'Marketing Mail',   url: '/marketing-mail',          icon: '/icon/ai email icon.png' },
      { label: 'Marketing Call',   url: '/marketing-call',          icon: '/icon/cold call icon.png' },
      { label: 'AI Enterprise',    url: '/ai-enterprise',           icon: '/icon/ai interprise icon.png' },
    ]
    for (let i = 0; i < solutionChildren.length; i++) {
      const c = solutionChildren[i]
      await conn.execute(
        `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
         VALUES (1, ?, ?, ?, ?, '_self', ?, 1)`,
        [solutionsId, c.label, c.url, c.icon, i]
      )
    }

    // ── Top-level: About ──────────────────────────────────────────────
    await conn.execute(
      `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
       VALUES (1, NULL, 'About', '/about', '', '_self', 3, 1)`
    )

    // ── Top-level: Contact (CTA) ──────────────────────────────────────
    await conn.execute(
      `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
       VALUES (1, NULL, 'Contact', '/contact', '', '_self', 4, 1)`
    )

    // ── Top-level: Log in (CTA) ───────────────────────────────────────
    await conn.execute(
      `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
       VALUES (1, NULL, 'Log in', 'https://login.pryro.com', '', '_blank', 5, 1)`
    )
  })

  console.log('✅  Navigation seeded successfully')
  console.log('   Products dropdown:  5 items')
  console.log('   Solutions dropdown: 14 items')
  console.log('   Top-level:          About, Contact, Log in')
}

seed()
  .then(() => closePool())
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1) })
