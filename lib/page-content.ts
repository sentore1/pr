/**
 * Page content helpers
 * Reads dynamic_content values fetched via /api/cms/data and falls back
 * to the hardcoded defaults that were originally in the page.
 */

export type PageValues = Record<string, string>

export function pc(values: PageValues, key: string, fallback: string = ''): string {
  return values?.[key] ?? fallback
}

export const DEFAULTS: PageValues = {
  // ── Hero ──────────────────────────────────────────────────────────────────
  hero_title_line1:        'Streamline',
  hero_title_line2:        'effortlessly',
  hero_subtitle:           'Complete ERP solution with AI-powered insights. Manage finance, inventory, HR, and operations in one unified platform.',
  hero_cta_primary:        'Start Free Trial',
  hero_cta_primary_url:    'https://login.pryro.com',
  hero_cta_secondary:      'Book a Demo',
  hero_cta_secondary_url:  '/demo',
  hero_dashboard_image:    '/dashboard-screenshot.png',
  hero_background:         'linear-gradient(to bottom, #0072FD 0%, #0274FD 11%, #0376FC 22%, #097AFC 33%, #0E7EFC 44%, #1986FC 55%, #3393FC 66%, #4CA0FC 77%, #7FBAFC 88%, #E5EDFC 100%)',

  // ── Logos bar ─────────────────────────────────────────────────────────────
  logos_headline:          'Trusted by leading enterprises worldwide',

  // ── Metrics ───────────────────────────────────────────────────────────────
  metrics_title:           'Business Performance at Scale',
  metrics_subtitle:        'Trusted by enterprises and NGO worldwide. Powered by intelligent automation.',
  metric_1_label:          'ACTIVE USERS',
  metric_1_value:          '64K+',
  metric_1_desc:           'worldwide',
  metric_2_label:          'FINANCIAL ENTRIES PROCESSED',
  metric_2_value:          '2.4M',
  metric_2_desc:           'monthly',
  metric_3_label:          'COST REDUCTION',
  metric_3_value:          '38%',
  metric_3_desc:           'average savings',
  metric_4_label:          'UPTIME',
  metric_4_value:          '99.9%',
  metric_4_desc:           'reliability',

  // ── Devices ───────────────────────────────────────────────────────────────
  devices_label:           'SEAMLESS ACROSS DEVICES',
  devices_title:           'Work from anywhere,\nstay in sync',
  devices_image_mobile:    '/image switch 1.png',
  devices_image_web:       '/image switch 2.png',
  devices_btn_mobile:      'Mobile App',
  devices_btn_web:         'Web App',

  // ── Project Management section ────────────────────────────────────────────
  project_tag:             'PROJECT MANAGEMENT',
  project_title:           'Keep every project moving forward',
  project_body:            'Plan, organize, and collaborate your work - all in one place. Track progress, manage resources, and achieve your business goals.',
  project_cta:             'Get Started',
  project_cta_url:         'https://login.pryro.com',
  project_feat1:           'Tasks',
  project_feat2:           'Time tracking',
  project_feat3:           'Timesheets',
  project_feat4:           'Reports',

  // ── Financial Management section ──────────────────────────────────────────
  financial_tag:           'FINANCIAL MANAGEMENT',
  financial_title:         'Track income, get paid, stress less',
  financial_body:          'Create detailed invoices, track payments, and monitor your business finances. Keep track of your revenue, expenses, and cash flow all in one place.',
  financial_cta:           'Get Started',
  financial_cta_url:       'https://login.pryro.com',
  financial_feat1:         'Invoicing',
  financial_feat2:         'Budgets',
  financial_feat3:         'Forecasting',
  financial_feat4:         'Integrations',

  // ── Features (narrative section) ──────────────────────────────────────────
  features_tag:            'ENTERPRISE TECHNOLOGY',
  features_title:          'Every business process optimized',
  features_body:           'Our AI-powered ERP platform automates workflows, manages inventory, tracks finances, and provides real-time analytics.',
  features_f1_title:       'Financial Management',
  features_f1_desc:        'Complete accounting, invoicing, and financial reporting',
  features_f2_title:       'Real-time Analytics',
  features_f2_desc:        '24/7 business intelligence with instant insights',
  features_f3_title:       'Inventory Management',
  features_f3_desc:        'Track stock levels and supply chain across locations',
  features_f4_title:       'HR & Payroll',
  features_f4_desc:        'Manage employees, attendance, and payroll seamlessly',

  // ── Business cards headline ───────────────────────────────────────────────
  business_cards_title:    'Built for every part of your business',

  // ── Meet Pryro (AI showcase) ──────────────────────────────────────────────
  meet_title:              'Meet Pryro, business\nmanagement, finally simple.',

  // ── Pricing ───────────────────────────────────────────────────────────────
  pricing_tag:             'PRICING',
  pricing_title:           'Simple plans\nfor serious work',
  pricing_compare_title:   'Compare plans',
  pricing_compare_subtitle:'Pick the right plan for your team.',
  pricing_trust_line:      'Trusted by 64,000+ businesses, startups, NGOs, and studios',
  pricing_save_badge:      'Save 20%',
  pricing_cta_heading:     'Ready to get started?',
  pricing_cta_subtext:     'No credit card required for Basic.',
  // Basic plan
  plan_basic_name:         'Basic',
  plan_basic_price:        '$0',
  plan_basic_period:       'Free forever',
  plan_basic_users:        '2',
  plan_basic_invoices:     '100/mo',
  plan_basic_cta:          'Get started',
  plan_basic_url:          'https://login.pryro.com',
  // Premium plan
  plan_premium_name:            'Premium',
  plan_premium_price_annual:    '$29',
  plan_premium_price_monthly:   '$50',
  plan_premium_period:          'Per workspace',
  plan_premium_users:           '20',
  plan_premium_cta:             'Upgrade',
  plan_premium_url:             'https://login.pryro.com',
  // Business plan
  plan_business_name:           'Business',
  plan_business_price_annual:   '$79',
  plan_business_price_monthly:  '$99',
  plan_business_period:         'Up to 100 users',
  plan_business_users:          '100',
  plan_business_cta:            'Get Business',
  plan_business_url:            'https://login.pryro.com',
  // Enterprise plan
  plan_enterprise_name:         'Enterprise',
  plan_enterprise_price:        'Custom',
  plan_enterprise_period:       'Contact sales',
  plan_enterprise_users:        'Unlimited',
  plan_enterprise_cta:          'Contact sales',
  plan_enterprise_url:          '/contact',

  // ── Testimonials ──────────────────────────────────────────────────────────
  testimonials_title:      'Finally, one platform that actually\nruns our whole operation',
  testimonials_name:       'Kofi',
  testimonials_role:       'CEO, Accra Fresh Foods',
  testimonial_1_text:      'We used to manage invoices in Excel and chase payments over WhatsApp. Pryro cleaned all that up in the first week. Our clients noticed the difference immediately.',
  testimonial_1_name:      'Amara',
  testimonial_1_role:      'Founder, Dakar Studio Co.',
  testimonial_2_text:      'Our accountant recommended we try Pryro and it was the best decision we made this year. Payroll, expenses, and reports all in one place.',
  testimonial_2_name:      'Ngozi',
  testimonial_2_role:      'MD, Eze Logistics Ltd.',
  testimonial_3_text:      "I run a small construction firm and keeping track of projects, staff, and suppliers was a nightmare. Pryro made it manageable. I actually know what's going on now.",
  testimonial_3_name:      'Kwame',
  testimonial_3_role:      'Director, Asante Build Group',
  testimonial_4_text:      "The invoicing and CRM features alone justified the switch. We've reduced unpaid invoices by over 60% since going live three months ago.",
  testimonial_4_name:      'Fatou',
  testimonial_4_role:      'Finance Lead, Camara Trading',
  testimonial_5_text:      'Setting it up took less than a day. The HR module handles leave requests and payroll automatically. My team stopped complaining about admin work.',
  testimonial_5_name:      'James',
  testimonial_5_role:      'COO, Okonkwo & Partners',
  testimonial_6_text:      'We manage stock across three branches and Pryro keeps everything in sync. Low stock alerts have basically eliminated stockouts for us.',
  testimonial_6_name:      'Aissatou',
  testimonial_6_role:      'Operations Manager, Bah Retail',
  testimonial_7_text:      'As a non-profit we needed something affordable that still did everything. Pryro fit perfectly - donor tracking, expense reports, and team management all covered.',
  testimonial_7_name:      'Emmanuel',
  testimonial_7_role:      'Executive Director, Hope Forward NGO',

  // ── Pricing — plan feature bullets (mobile cards) ────────────────────────
  plan_basic_feat1:             'Time Tracking',
  plan_basic_feat2:             'CRM',
  plan_premium_feat1:           'Time Tracking',
  plan_premium_feat2:           'CRM',
  plan_premium_feat3:           'HR Management',
  plan_premium_feat4:           'POS',
  plan_premium_feat5:           'AI Reports',
  plan_premium_feat6:           'Invoice Link',
  plan_business_feat1:          'Everything in Premium',
  plan_business_feat2:          'Advanced Security',
  plan_business_feat3:          'Phone & Chat Support',
  plan_enterprise_feat1:        'Everything in Business',
  plan_enterprise_feat2:        'Custom Webhooks',
  plan_enterprise_feat3:        'Dedicated Support',

  // ── Pricing — comparison table row names & descriptions ───────────────────
  cmp_row1_name:   'Users',             cmp_row1_desc:   'Team members with full access',
  cmp_row2_name:   'Projects',          cmp_row2_desc:   'Active projects you can manage',
  cmp_row3_name:   'Invoices',          cmp_row3_desc:   'Professional invoices per month',
  cmp_row4_name:   'Time Tracking',     cmp_row4_desc:   'Log hours and track billable time',
  cmp_row5_name:   'CRM',               cmp_row5_desc:   'Manage clients and deal pipelines',
  cmp_row6_name:   'HR Management',     cmp_row6_desc:   'Payroll, leaves, employee records',
  cmp_row7_name:   'POS',               cmp_row7_desc:   'Point-of-sale for retail & hospitality',
  cmp_row8_name:   'AI Reports',        cmp_row8_desc:   'Smart insights generated automatically',
  cmp_row9_name:   'Invoice Link',      cmp_row9_desc:   'Share payment links with clients',
  cmp_row10_name:  'Custom Webhooks',   cmp_row10_desc:  'Connect to external apps via webhooks',
  cmp_row11_name:  'Advanced Security', cmp_row11_desc:  'SSO, audit logs and access controls',
  cmp_row12_name:  'Support',           cmp_row12_desc:  'How we help when you need us',
  // Support text values per plan (rows that show text instead of ✓/✗)
  cmp_row12_basic:      'Email',
  cmp_row12_premium:    'Priority',
  cmp_row12_business:   'Phone & Chat',
  cmp_row12_enterprise: 'Dedicated',
  cta_tag:                 'Transform your business',
  cta_title:               'Join thousands of successful businesses',
  cta_body:                "Together, we're building smarter enterprises. Start optimizing your operations today.",
  cta_button_text:         'Get Started Today',
  cta_button_url:          'https://login.pryro.com',
}
