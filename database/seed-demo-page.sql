-- =====================================================
-- PRYRO CMS — DEMO PAGE SEED
-- =====================================================
-- Seeds a complete "Services" page using the Solution layout
-- plus realistic analytics data so the dashboard is populated.
--
-- Run once against the pryro_cms database:
--   mysql -u root pryro_cms < database/seed-demo-page.sql
-- =====================================================

USE pryro_cms;

-- =====================================================
-- 1. REGISTER THE PAGE
-- =====================================================
-- Insert or update so the script is safe to re-run.

INSERT INTO pages (slug, title, meta_description, is_published, publish_date, created_by)
VALUES (
  'services',
  'Our Services',
  'Explore the full range of Pryro business management services — from financial management to AI-powered analytics.',
  TRUE,
  NOW(),
  1
)
ON DUPLICATE KEY UPDATE
  title          = VALUES(title),
  meta_description = VALUES(meta_description),
  is_published   = TRUE,
  publish_date   = NOW();

-- =====================================================
-- 2. PAGE DEFINITION (layout template stored in dynamic_content)
--    This is what the CMS editor uses to know which sections/fields exist.
-- =====================================================

INSERT INTO dynamic_content (key_name, value, data_type, description)
VALUES (
  '_page_def__services',
  '{
    "slug":"services",
    "label":"Our Services",
    "icon":"/icon/dashboard icon.png",
    "group":"Custom",
    "layout":"solution",
    "sections":[
      {"id":"hero","label":"Hero Section","fields":[
        {"key":"services_hero_badge",    "label":"Badge Text",    "type":"text"},
        {"key":"services_hero_title",    "label":"Page Title",    "type":"text"},
        {"key":"services_hero_subtitle", "label":"Sub-title",     "type":"textarea"},
        {"key":"services_hero_cta1",     "label":"Button 1 Text", "type":"text"},
        {"key":"services_hero_cta1_url", "label":"Button 1 URL",  "type":"url"},
        {"key":"services_hero_cta2",     "label":"Button 2 Text", "type":"text"},
        {"key":"services_hero_cta2_url", "label":"Button 2 URL",  "type":"url"},
        {"key":"services_hero_image",    "label":"Hero Image",    "type":"image"}
      ]},
      {"id":"features","label":"Features Section","fields":[
        {"key":"services_features_title",    "label":"Section Title", "type":"text"},
        {"key":"services_features_subtitle", "label":"Sub-title",     "type":"textarea"},
        {"key":"services_features_image",    "label":"Image",         "type":"image"},
        {"key":"services_feat1_title",       "label":"Feature 1",     "type":"text"},
        {"key":"services_feat1_desc",        "label":"Feature 1 Desc","type":"textarea"},
        {"key":"services_feat2_title",       "label":"Feature 2",     "type":"text"},
        {"key":"services_feat2_desc",        "label":"Feature 2 Desc","type":"textarea"},
        {"key":"services_feat3_title",       "label":"Feature 3",     "type":"text"},
        {"key":"services_feat3_desc",        "label":"Feature 3 Desc","type":"textarea"},
        {"key":"services_feat4_title",       "label":"Feature 4",     "type":"text"},
        {"key":"services_feat4_desc",        "label":"Feature 4 Desc","type":"textarea"}
      ]},
      {"id":"content","label":"Content Section","fields":[
        {"key":"services_content_title",     "label":"Section Title",    "type":"text"},
        {"key":"services_content_highlight", "label":"Highlighted Text", "type":"textarea"},
        {"key":"services_content_body",      "label":"Body Text",        "type":"textarea"},
        {"key":"services_content_image",     "label":"Image",            "type":"image"},
        {"key":"services_card1_title",       "label":"Card 1 Title",     "type":"text"},
        {"key":"services_card1_body",        "label":"Card 1 Body",      "type":"textarea"},
        {"key":"services_card2_title",       "label":"Card 2 Title",     "type":"text"},
        {"key":"services_card2_body",        "label":"Card 2 Body",      "type":"textarea"}
      ]},
      {"id":"cta","label":"CTA Section","fields":[
        {"key":"services_cta_badge", "label":"Badge",      "type":"text"},
        {"key":"services_cta_title", "label":"Title",      "type":"text"},
        {"key":"services_cta_body",  "label":"Body",       "type":"textarea"},
        {"key":"services_cta_btn",   "label":"Button",     "type":"text"},
        {"key":"services_cta_url",   "label":"Button URL", "type":"url"}
      ]}
    ]
  }',
  'json',
  'Page definition for the Services custom page (solution layout)'
)
ON DUPLICATE KEY UPDATE value = VALUES(value);

-- =====================================================
-- 3. PAGE CONTENT (all editable field values)
-- =====================================================

-- Hero section
INSERT INTO dynamic_content (key_name, value, data_type) VALUES
  ('services_hero_badge',    'Everything your business needs',                                          'text'),
  ('services_hero_title',    'Business Services Built for Growth',                                      'text'),
  ('services_hero_subtitle', 'From financial management to AI-powered analytics — Pryro brings every critical business service into one unified platform, so your team can focus on what matters.',
                                                                                                        'text'),
  ('services_hero_cta1',     'Get Started Free',                                                        'text'),
  ('services_hero_cta1_url', 'https://login.pryro.com',                                                 'text'),
  ('services_hero_cta2',     'Book a Demo',                                                             'text'),
  ('services_hero_cta2_url', '/contact',                                                                'text')
ON DUPLICATE KEY UPDATE value = VALUES(value);

-- Features section
INSERT INTO dynamic_content (key_name, value, data_type) VALUES
  ('services_features_title',    'What We Offer',                                                         'text'),
  ('services_features_subtitle', 'A complete suite of tools designed for modern businesses of every size.', 'text'),
  ('services_feat1_title',       'Financial Management',                                                    'text'),
  ('services_feat1_desc',        'Full double-entry accounting, invoicing, expense tracking, bank reconciliation, and real-time P&L — all in one place.',
                                                                                                            'text'),
  ('services_feat2_title',       'HR & Payroll',                                                            'text'),
  ('services_feat2_desc',        'Manage employee records, attendance, leave, payroll runs, and compliance documents without switching apps.',
                                                                                                            'text'),
  ('services_feat3_title',       'Inventory & Stock Control',                                               'text'),
  ('services_feat3_desc',        'Track stock levels in real time, automate reorder points, manage multiple warehouses, and eliminate manual counts.',
                                                                                                            'text'),
  ('services_feat4_title',       'AI-Powered Analytics',                                                    'text'),
  ('services_feat4_desc',        'Turn your data into decisions. Predictive forecasting, automated reports, and natural-language queries — no data team required.',
                                                                                                            'text')
ON DUPLICATE KEY UPDATE value = VALUES(value);

-- Content section
INSERT INTO dynamic_content (key_name, value, data_type) VALUES
  ('services_content_title',     'One Platform. Every Service.',                                             'text'),
  ('services_content_highlight', 'Stop duct-taping disconnected tools together.',                            'text'),
  ('services_content_body',      'Pryro integrates every core business function — accounting, HR, CRM, inventory, projects, and analytics — so data flows seamlessly and your team always has the full picture. No more CSV exports, no more mismatched reports, no more waiting on IT.',
                                                                                                             'text'),
  ('services_card1_title',       '99.9% Uptime SLA',                                                        'text'),
  ('services_card1_body',        'Enterprise-grade infrastructure with automatic failover and 24/7 monitoring keeps your business running around the clock.',
                                                                                                             'text'),
  ('services_card2_title',       'Onboarding in Under a Day',                                                'text'),
  ('services_card2_body',        'Our guided setup wizard and dedicated onboarding team get your data migrated and your team trained in hours, not weeks.',
                                                                                                             'text')
ON DUPLICATE KEY UPDATE value = VALUES(value);

-- CTA section
INSERT INTO dynamic_content (key_name, value, data_type) VALUES
  ('services_cta_badge', 'Start Today',                                                                      'text'),
  ('services_cta_title', 'Ready to Simplify Your Business?',                                                 'text'),
  ('services_cta_body',  'Join 64,000+ businesses that trust Pryro to run their operations. Try it free for 30 days — no credit card required.',
                                                                                                             'text'),
  ('services_cta_btn',   'Start Free Trial',                                                                 'text'),
  ('services_cta_url',   'https://login.pryro.com',                                                          'text')
ON DUPLICATE KEY UPDATE value = VALUES(value);

-- =====================================================
-- 4. ANALYTICS — realistic page_views data
--    Simulates 90 days of traffic across multiple pages
--    so the analytics dashboard has real charts to show.
-- =====================================================

-- Helper: seed 90 days of mixed traffic.
-- We use a cross-join trick to generate ~1,200 rows quickly.

INSERT INTO page_views (page_slug, page_title, referrer, device_type, browser, session_id, viewed_at)
SELECT
  slug,
  title,
  referrer,
  device_type,
  browser,
  CONCAT('sess-', FLOOR(RAND() * 400)),          -- ~400 unique sessions
  DATE_SUB(DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 90) DAY), INTERVAL FLOOR(RAND() * 86400) SECOND)
FROM (
  -- Pages to distribute views across
  SELECT 'home'      AS slug, 'Home — Pryro'            AS title UNION ALL
  SELECT 'about'     AS slug, 'About Pryro'             AS title UNION ALL
  SELECT 'features'  AS slug, 'Features'                AS title UNION ALL
  SELECT 'pricing'   AS slug, 'Pricing'                 AS title UNION ALL
  SELECT 'services'  AS slug, 'Our Services'            AS title UNION ALL
  SELECT 'contact'   AS slug, 'Contact'                 AS title
) pages
CROSS JOIN (
  -- Referrers
  SELECT NULL            AS referrer UNION ALL
  SELECT 'google.com'    AS referrer UNION ALL
  SELECT 'twitter.com'   AS referrer UNION ALL
  SELECT 'linkedin.com'  AS referrer UNION ALL
  SELECT 'github.com'    AS referrer
) refs
CROSS JOIN (
  -- Devices
  SELECT 'desktop' AS device_type, 'Chrome'  AS browser UNION ALL
  SELECT 'desktop' AS device_type, 'Firefox' AS browser UNION ALL
  SELECT 'mobile'  AS device_type, 'Safari'  AS browser UNION ALL
  SELECT 'mobile'  AS device_type, 'Chrome'  AS browser UNION ALL
  SELECT 'tablet'  AS device_type, 'Safari'  AS browser
) devices
-- Limit total rows; the cross-join gives 6×5×5 = 150 base rows,
-- we duplicate 8× to get ~1,200 rows spread across 90 days.
CROSS JOIN (
  SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
  UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
) multiplier
LIMIT 1200;

-- =====================================================
-- 5. USER SESSIONS matching the page_views session IDs
-- =====================================================

INSERT IGNORE INTO user_sessions (session_id, first_page, last_page, page_count, referrer, started_at)
SELECT DISTINCT
  session_id,
  page_slug,
  page_slug,
  FLOOR(RAND() * 4) + 1,
  referrer,
  viewed_at
FROM page_views
WHERE session_id IS NOT NULL
ORDER BY viewed_at DESC
LIMIT 400;

-- =====================================================
-- 6. SITEMAP ENTRY for the new page
-- =====================================================

INSERT INTO sitemaps (url, changefreq, priority, is_active)
VALUES ('/services', 'weekly', 0.8, TRUE)
ON DUPLICATE KEY UPDATE is_active = TRUE;

-- =====================================================
-- DONE
-- =====================================================
-- After running this script:
--   • Visit http://localhost:3000/services  → live rendered page
--   • Admin › Pages › All Pages            → "Our Services" row, Published
--   • Admin › Pages › Edit Page Content    → Custom group › Our Services
--   • Admin › Analytics                    → charts populated with 90-day data
-- =====================================================
