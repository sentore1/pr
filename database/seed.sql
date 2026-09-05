-- =====================================================
-- PRYRO CMS SEED DATA
-- =====================================================
-- Sample data for testing and initial setup
-- =====================================================

USE pryro_cms;

-- =====================================================
-- NAVIGATION DATA
-- =====================================================

-- Main header navigation items
INSERT INTO navigation_items (menu_id, parent_id, label, url, sort_order, is_active) VALUES
(1, NULL, 'Products', '/products', 1, TRUE),
(1, NULL, 'Solutions', '/solutions', 2, TRUE),
(1, NULL, 'About', '/about', 3, TRUE),
(1, NULL, 'Contact', '/contact', 4, TRUE),
(1, NULL, 'Log in', 'https://login.pryro.com', 5, TRUE);

-- Products submenu
INSERT INTO navigation_items (menu_id, parent_id, label, url, sort_order, is_active)
SELECT 1, id, 'Features', '/features', 1, TRUE FROM navigation_items WHERE label = 'Products' AND parent_id IS NULL;

INSERT INTO navigation_items (menu_id, parent_id, label, url, sort_order, is_active)
SELECT 1, id, 'Pricing', '/pricing', 2, TRUE FROM navigation_items WHERE label = 'Products' AND parent_id IS NULL;

INSERT INTO navigation_items (menu_id, parent_id, label, url, sort_order, is_active)
SELECT 1, id, 'Documentation', '/documentation', 3, TRUE FROM navigation_items WHERE label = 'Products' AND parent_id IS NULL;

-- Footer navigation items
INSERT INTO navigation_items (menu_id, parent_id, label, url, sort_order, is_active) VALUES
(2, NULL, 'Privacy Policy', '/privacy', 1, TRUE),
(2, NULL, 'Terms of Service', '/terms', 2, TRUE),
(2, NULL, 'Cookie Settings', '/cookies', 3, TRUE);

-- =====================================================
-- LOGOS
-- =====================================================

INSERT INTO logos (name, image_url, alt_text, width, height, position, link_url, is_active) VALUES
('Header Logo', '/pryro logo.png', 'Pryro', 120, 32, 'header', '/', TRUE),
('Footer Logo', '/pryro logo.png', 'Pryro', 120, 32, 'footer', '/', TRUE),
('Mobile Logo', '/pryro logo.png', 'Pryro', 100, 28, 'mobile', '/', TRUE);

-- =====================================================
-- FOOTER CONTENT
-- =====================================================

INSERT INTO footer_sections (name, sort_order, is_active) VALUES
('Solutions', 1, TRUE),
('Product', 2, TRUE),
('Company', 3, TRUE),
('Contact', 4, TRUE);

INSERT INTO footer_links (section_id, label, url, sort_order, is_active)
SELECT id, 'Small Business', '/small-business', 1, TRUE FROM footer_sections WHERE name = 'Solutions'
UNION ALL
SELECT id, 'Accountants', '/accountants-bookkeepers', 2, TRUE FROM footer_sections WHERE name = 'Solutions'
UNION ALL
SELECT id, 'Project Management', '/project', 3, TRUE FROM footer_sections WHERE name = 'Solutions'
UNION ALL
SELECT id, 'HR & Payroll', '/human-resource', 4, TRUE FROM footer_sections WHERE name = 'Solutions'
UNION ALL
SELECT id, 'Stock Management', '/stock-management', 5, TRUE FROM footer_sections WHERE name = 'Solutions';

INSERT INTO footer_links (section_id, label, url, sort_order, is_active)
SELECT id, 'Features', '/features', 1, TRUE FROM footer_sections WHERE name = 'Product'
UNION ALL
SELECT id, 'Pricing', '/pricing', 2, TRUE FROM footer_sections WHERE name = 'Product'
UNION ALL
SELECT id, 'Documentation', '/documentation', 3, TRUE FROM footer_sections WHERE name = 'Product'
UNION ALL
SELECT id, 'API', '/api', 4, TRUE FROM footer_sections WHERE name = 'Product';

INSERT INTO footer_links (section_id, label, url, sort_order, is_active)
SELECT id, 'About', '/about', 1, TRUE FROM footer_sections WHERE name = 'Company'
UNION ALL
SELECT id, 'Careers', '/careers', 2, TRUE FROM footer_sections WHERE name = 'Company'
UNION ALL
SELECT id, 'Contact', '/contact', 3, TRUE FROM footer_sections WHERE name = 'Company';

INSERT INTO footer_content (key_name, content) VALUES
('copyright_text', '© 2026 Pryro. All rights reserved.'),
('tagline', 'Empowering businesses worldwide with intelligent ERP solutions and automation.'),
('whatsapp_number', '250788715075');

-- =====================================================
-- SAMPLE CONTENT BLOCKS
-- =====================================================

INSERT INTO content_blocks (page_id, block_type, title, content, settings, sort_order, is_active) VALUES
(1, 'hero', 'Streamline everything effortlessly', 
 'Complete ERP solution with AI-powered insights. Manage finance, inventory, HR, and operations in one unified platform.',
 '{"background": "linear-gradient(to bottom, #0072FD 0%, #E5EDFC 100%)", "textColor": "#ffffff", "buttonText": "Start Free Trial", "buttonUrl": "https://login.pryro.com"}',
 1, TRUE),
(1, 'features', 'Enterprise Technology', 
 'Every business process optimized',
 '{"features": [{"title": "Financial Management", "description": "Complete accounting, invoicing, and financial reporting", "icon": "Receipt"}, {"title": "Real-time Analytics", "description": "24/7 business intelligence with instant insights", "icon": "BarChart3"}]}',
 2, TRUE),
(1, 'pricing', 'Simple plans for serious work', 
 'Pick the right plan for your team',
 '{"plans": [{"name": "Basic", "price": "$0", "features": ["2 users", "Unlimited projects", "100 invoices/mo"]}, {"name": "Premium", "price": "$29", "features": ["20 users", "Unlimited projects", "Unlimited invoices"]}]}',
 3, TRUE),
(1, 'cta', 'Join thousands of successful businesses', 
 'Together, we\'re building smarter enterprises. Start optimizing your operations today.',
 '{"buttonText": "Get Started Today", "buttonUrl": "https://login.pryro.com", "background": "#0072FD"}',
 4, TRUE);

-- =====================================================
-- DYNAMIC CONTENT
-- =====================================================

INSERT INTO dynamic_content (key_name, value, data_type, description) VALUES
('hero_title', 'Streamline everything effortlessly', 'text', 'Homepage hero title'),
('hero_subtitle', 'Complete ERP solution with AI-powered insights', 'text', 'Homepage hero subtitle'),
('cta_button_text', 'Start Free Trial', 'text', 'Primary CTA button text'),
('cta_button_url', 'https://login.pryro.com', 'text', 'Primary CTA button URL'),
('testimonial_count', '7', 'number', 'Number of testimonials to display'),
('features_enabled', 'true', 'boolean', 'Show features section');

-- =====================================================
-- SEO SETTINGS
-- =====================================================

INSERT INTO seo_settings (page_id, meta_title, meta_description, meta_keywords, og_title, og_description, og_image, canonical_url, robots) VALUES
(1, 'Pryro — Business Management Platform | ERP Software', 
 'Streamline your business operations with our comprehensive ERP solution. Manage finance, inventory, HR, and operations in one unified platform.',
 'ERP, business management, accounting software, inventory management, HR software, project management',
 'Pryro — Business Management Platform',
 'Complete ERP solution with AI-powered insights',
 '/og-image.png',
 'https://pryro.com',
 'index, follow');

-- =====================================================
-- SITEMAP ENTRIES
-- =====================================================

INSERT INTO sitemaps (url, changefreq, priority, is_active) VALUES
('/', 'daily', 1.0, TRUE),
('/about', 'monthly', 0.8, TRUE),
('/features', 'weekly', 0.9, TRUE),
('/pricing', 'weekly', 0.9, TRUE),
('/contact', 'monthly', 0.7, TRUE),
('/documentation', 'weekly', 0.8, TRUE),
('/small-business', 'monthly', 0.7, TRUE),
('/accountants-bookkeepers', 'monthly', 0.7, TRUE),
('/project', 'monthly', 0.7, TRUE),
('/human-resource', 'monthly', 0.7, TRUE);

-- =====================================================
-- SAMPLE FORMS
-- =====================================================

INSERT INTO forms (name, description, settings, success_message, is_active) VALUES
('Contact Form', 'General contact form', 
 '{"fields": [{"name": "name", "type": "text", "required": true}, {"name": "email", "type": "email", "required": true}, {"name": "message", "type": "textarea", "required": true}]}',
 'Thank you for contacting us! We will get back to you soon.', TRUE),
('Demo Request', 'Request a demo form',
 '{"fields": [{"name": "name", "type": "text", "required": true}, {"name": "email", "type": "email", "required": true}, {"name": "company", "type": "text", "required": true}, {"name": "phone", "type": "tel", "required": false}]}',
 'Thank you! We will contact you shortly to schedule a demo.', TRUE);

-- =====================================================
-- SAMPLE ANALYTICS DATA (for testing)
-- =====================================================

-- Generate sample page views for the last 30 days
INSERT INTO page_views (page_slug, page_title, device_type, viewed_at)
SELECT 
    'home',
    'Homepage',
    CASE FLOOR(RAND() * 3)
        WHEN 0 THEN 'desktop'
        WHEN 1 THEN 'mobile'
        ELSE 'tablet'
    END,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY)
FROM 
    (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) t1,
    (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) t2,
    (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) t3
LIMIT 500;

-- =====================================================
-- END OF SEED DATA
-- =====================================================
