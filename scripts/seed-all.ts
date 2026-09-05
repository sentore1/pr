/**
 * Full seed script — seeds ALL tables needed for the admin dashboard
 * Run: npx tsx scripts/seed-all.ts
 */
import { query, insert, update, transaction, closePool } from '../lib/db/connection'

async function main() {
  console.log('🌱  Seeding all CMS data...\n')

  // ── 1. Pages ─────────────────────────────────────────────────────────────
  console.log('📄  Pages...')
  const pages = [
    { slug: 'home',                    title: 'Home',                       meta: 'The main landing page' },
    { slug: 'about',                   title: 'About',                      meta: 'About Pryro' },
    { slug: 'features',                title: 'Features',                   meta: 'Product features' },
    { slug: 'pricing',                 title: 'Pricing',                    meta: 'Pricing plans' },
    { slug: 'contact',                 title: 'Contact',                    meta: 'Contact us' },
    { slug: 'documentation',           title: 'Documentation',              meta: 'Docs and guides' },
    { slug: 'small-business',          title: 'Small Business',             meta: 'Small business solution' },
    { slug: 'accountants-bookkeepers', title: 'Accountants & Bookkeepers',  meta: 'Accounting solution' },
    { slug: 'project',                 title: 'Project Management',         meta: 'Project management' },
    { slug: 'human-resource',          title: 'Human Resource',             meta: 'HR solution' },
    { slug: 'stock-management',        title: 'Stock Management',           meta: 'Inventory solution' },
    { slug: 'customer-relation',       title: 'CRM',                        meta: 'Customer relationship management' },
    { slug: 'self-employed',           title: 'Self-employed',              meta: 'Freelancer solution' },
    { slug: 'non-profit',              title: 'Non-profit',                 meta: 'Non-profit solution' },
    { slug: 'hospitality',             title: 'Hospitality',                meta: 'Hospitality solution' },
    { slug: 'construction',            title: 'Construction',               meta: 'Construction solution' },
    { slug: 'logistic',                title: 'Logistics',                  meta: 'Logistics solution' },
    { slug: 'marketing-mail',          title: 'Marketing Mail',             meta: 'Email marketing' },
    { slug: 'marketing-call',          title: 'Marketing Call',             meta: 'Call marketing' },
    { slug: 'ai-enterprise',           title: 'AI Enterprise',              meta: 'AI enterprise solution' },
    { slug: 'ai-calculator',           title: 'AI Calculator',              meta: 'AI savings calculator' },
    { slug: 'privacy',                 title: 'Privacy Policy',             meta: 'Privacy policy' },
    { slug: 'terms',                   title: 'Terms of Service',           meta: 'Terms of service' },
  ]

  for (const p of pages) {
    const existing = await query('SELECT id FROM pages WHERE slug = ?', [p.slug]) as any[]
    if (existing.length === 0) {
      await insert(
        `INSERT INTO pages (slug, title, meta_description, is_published, created_by) VALUES (?, ?, ?, 1, 1)`,
        [p.slug, p.title, p.meta]
      )
      process.stdout.write('  ✓ ' + p.title + '\n')
    } else {
      // Update is_published so they show up
      await update('UPDATE pages SET is_published = 1, title = ?, meta_description = ? WHERE slug = ?', [p.title, p.meta, p.slug])
      process.stdout.write('  ~ ' + p.title + ' (updated)\n')
    }
  }

  // ── 2. SEO global settings ────────────────────────────────────────────────
  console.log('\n🔍  SEO...')
  const seoExists = await query('SELECT id FROM seo_settings WHERE page_id IS NULL') as any[]
  if (seoExists.length === 0) {
    await insert(
      `INSERT INTO seo_settings 
       (page_id, meta_title, meta_description, meta_keywords, og_title, og_description, og_image, canonical_url, robots)
       VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Pryro — Business Management Platform | ERP Software',
        'Streamline your business operations with our comprehensive ERP solution. Manage finance, inventory, HR, and operations in one unified platform.',
        'ERP, business management, accounting software, inventory management, HR software, project management',
        'Pryro — Business Management Platform',
        'Complete ERP solution with AI-powered insights',
        '/og-image.png',
        'https://pryro.com',
        'index, follow',
      ]
    )
    console.log('  ✓ Global SEO settings seeded')
  } else {
    console.log('  ~ SEO already exists')
  }

  // ── 3. Sitemap entries ────────────────────────────────────────────────────
  console.log('\n🗺️  Sitemap...')
  const sitemapEntries = [
    { url: '/',                          changefreq: 'daily',   priority: 1.0 },
    { url: '/about',                     changefreq: 'monthly', priority: 0.8 },
    { url: '/features',                  changefreq: 'weekly',  priority: 0.9 },
    { url: '/pricing',                   changefreq: 'weekly',  priority: 0.9 },
    { url: '/contact',                   changefreq: 'monthly', priority: 0.7 },
    { url: '/documentation',             changefreq: 'weekly',  priority: 0.8 },
    { url: '/small-business',            changefreq: 'monthly', priority: 0.7 },
    { url: '/accountants-bookkeepers',   changefreq: 'monthly', priority: 0.7 },
    { url: '/project',                   changefreq: 'monthly', priority: 0.7 },
    { url: '/human-resource',            changefreq: 'monthly', priority: 0.7 },
    { url: '/stock-management',          changefreq: 'monthly', priority: 0.7 },
    { url: '/customer-relation',         changefreq: 'monthly', priority: 0.7 },
    { url: '/ai-enterprise',             changefreq: 'monthly', priority: 0.7 },
    { url: '/ai-calculator',             changefreq: 'weekly',  priority: 0.8 },
  ]

  for (const entry of sitemapEntries) {
    const exists = await query('SELECT id FROM sitemaps WHERE url = ?', [entry.url]) as any[]
    if (exists.length === 0) {
      await insert(
        `INSERT INTO sitemaps (url, changefreq, priority, is_active) VALUES (?, ?, ?, 1)`,
        [entry.url, entry.changefreq, entry.priority]
      )
    }
  }
  console.log(`  ✓ ${sitemapEntries.length} sitemap entries`)

  // ── 4. System settings ────────────────────────────────────────────────────
  console.log('\n⚙️  System settings...')
  const systemSettings = [
    { key: 'site_name',          value: 'Pryro',                              type: 'string',  public: 1 },
    { key: 'site_tagline',       value: 'Business management, finally simple', type: 'string', public: 1 },
    { key: 'analytics_enabled',  value: 'true',                               type: 'boolean', public: 0 },
    { key: 'maintenance_mode',   value: 'false',                              type: 'boolean', public: 0 },
  ]
  for (const s of systemSettings) {
    const exists = await query('SELECT id FROM system_settings WHERE setting_key = ?', [s.key]) as any[]
    if (exists.length === 0) {
      await insert(
        `INSERT INTO system_settings (setting_key, setting_value, data_type, is_public) VALUES (?, ?, ?, ?)`,
        [s.key, s.value, s.type, s.public]
      )
    }
  }
  console.log('  ✓ System settings seeded')

  // ── 5. Style settings ─────────────────────────────────────────────────────
  console.log('\n🎨  Style settings...')
  const styleSettings = [
    { category: 'colors',   property: 'primary',    value: '#0072FD' },
    { category: 'colors',   property: 'secondary',  value: '#4a5568' },
    { category: 'colors',   property: 'background', value: '#ffffff' },
    { category: 'colors',   property: 'text',       value: '#0f1117' },
    { category: 'fonts',    property: 'heading',    value: 'serif' },
    { category: 'fonts',    property: 'body',       value: 'sans-serif' },
    { category: 'fonts',    property: 'size_base',  value: '16px' },
    { category: 'borders',  property: 'radius',     value: '5px' },
    { category: 'borders',  property: 'radius_btn', value: '5px' },
    { category: 'spacing',  property: 'base',       value: '1rem' },
    { category: 'gradient', property: 'hero_from',  value: '#0072FD' },
    { category: 'gradient', property: 'hero_to',    value: '#E5EDFC' },
  ]
  for (const s of styleSettings) {
    const exists = await query(
      'SELECT id FROM style_settings WHERE category = ? AND property = ?',
      [s.category, s.property]
    ) as any[]
    if (exists.length === 0) {
      await insert(
        `INSERT INTO style_settings (category, property, value) VALUES (?, ?, ?)`,
        [s.category, s.property, s.value]
      )
    }
  }
  console.log('  ✓ Style settings seeded')

  // ── 6. Footer content ─────────────────────────────────────────────────────
  console.log('\n🦶  Footer content...')
  const footerContent = [
    { key: 'copyright_text', content: '© 2026 Pryro. All rights reserved.' },
    { key: 'tagline',        content: 'Empowering businesses worldwide with intelligent ERP solutions and automation.' },
    { key: 'whatsapp_number',content: '250788715075' },
  ]
  for (const f of footerContent) {
    const exists = await query('SELECT id FROM footer_content WHERE key_name = ?', [f.key]) as any[]
    if (exists.length === 0) {
      await insert('INSERT INTO footer_content (key_name, content) VALUES (?, ?)', [f.key, f.content])
    } else {
      await update('UPDATE footer_content SET content = ? WHERE key_name = ?', [f.content, f.key])
    }
  }
  console.log('  ✓ Footer content seeded')

  // ── 7. Logos ──────────────────────────────────────────────────────────────
  console.log('\n🖼️  Logos...')
  const logoCount = await query('SELECT COUNT(*) as c FROM logos') as any[]
  if (logoCount[0].c === 0) {
    await insert(
      `INSERT INTO logos (name, image_url, alt_text, position, link_url, is_active) VALUES
       ('Header Logo', '/pryro logo.png', 'Pryro', 'header', '/', 1),
       ('Footer Logo', '/pryro logo.png', 'Pryro', 'footer', '/', 1),
       ('Mobile Logo', '/pryro logo.png', 'Pryro', 'mobile', '/', 1)`,
      []
    )
    console.log('  ✓ 3 logos seeded')
  } else {
    console.log(`  ~ ${logoCount[0].c} logos already exist`)
  }

  // ── 8. Sample page views for analytics ───────────────────────────────────
  console.log('\n📊  Sample analytics data...')
  const viewCount = await query('SELECT COUNT(*) as c FROM page_views') as any[]
  if (viewCount[0].c === 0) {
    const slugs = ['/', '/about', '/features', '/pricing', '/contact']
    const devices = ['desktop', 'mobile', 'tablet']
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge']
    let inserted = 0
    for (let d = 0; d < 30; d++) {
      const date = new Date()
      date.setDate(date.getDate() - d)
      const viewsThisDay = Math.floor(Math.random() * 40) + 10
      for (let v = 0; v < viewsThisDay; v++) {
        const slug = slugs[Math.floor(Math.random() * slugs.length)]
        const device = devices[Math.floor(Math.random() * devices.length)]
        const browser = browsers[Math.floor(Math.random() * browsers.length)]
        const sessionId = `sess_${d}_${v}_${Math.random().toString(36).slice(2, 8)}`
        await insert(
          `INSERT INTO page_views (page_slug, page_title, device_type, browser, session_id, viewed_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [slug, slug === '/' ? 'Home' : slug.replace('/', ''), device, browser, sessionId, date.toISOString().slice(0, 19).replace('T', ' ')]
        )
        inserted++
      }
    }
    console.log(`  ✓ ${inserted} sample page views seeded`)
  } else {
    console.log(`  ~ ${viewCount[0].c} page views already exist`)
  }

  // ── 9. Navigation menu ────────────────────────────────────────────────────
  console.log('\n🧭  Navigation menu...')
  const menuCount = await query('SELECT COUNT(*) as c FROM navigation_menus') as any[]
  if (menuCount[0].c === 0) {
    await insert(
      `INSERT INTO navigation_menus (name, position, is_active) VALUES ('Main Navigation', 'header', 1), ('Footer Navigation', 'footer', 1)`,
      []
    )
    console.log('  ✓ Menus created')
  } else {
    console.log(`  ~ ${menuCount[0].c} menus already exist`)
  }

  console.log('\n✅  All data seeded successfully!')
  console.log('   Now run: npm run seed:nav  (to seed navigation items)')
}

main()
  .then(() => closePool())
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1) })
