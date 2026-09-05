/**
 * Seed all page content into dynamic_content table
 * This pulls the existing hardcoded values from every page
 * and inserts them so the CMS editor shows real content.
 * Run: npx tsx scripts/seed-page-content.ts
 */

import { query, insert, update, closePool } from '../lib/db/connection'

const ALL_CONTENT: Record<string, string> = {

  // ─── HOME / LANDING PAGE ──────────────────────────────────────────────────
  hero_title_line1:        'Streamline',
  hero_title_line2:        'effortlessly',
  hero_subtitle:           'Complete ERP solution with AI-powered insights. Manage finance, inventory, HR, and operations in one unified platform.',
  hero_cta_primary:        'Start Free Trial',
  hero_cta_primary_url:    'https://login.pryro.com',
  hero_cta_secondary:      'Book a Demo',
  hero_cta_secondary_url:  '/demo',
  hero_dashboard_image:    '/dashboard-screenshot.png',
  hero_background:         'linear-gradient(to bottom, #0072FD 0%, #0274FD 11%, #0376FC 22%, #097AFC 33%, #0E7EFC 44%, #1986FC 55%, #3393FC 66%, #4CA0FC 77%, #7FBAFC 88%, #E5EDFC 100%)',

  metrics_title:           'Business Performance at Scale',
  metrics_subtitle:        'Trusted by enterprises and NGO worldwide. Powered by intelligent automation.',
  metric_1_value:          '64K+',
  metric_1_label:          'ACTIVE USERS',
  metric_1_desc:           'worldwide',
  metric_2_value:          '2.4M',
  metric_2_label:          'FINANCIAL ENTRIES PROCESSED',
  metric_2_desc:           'monthly',
  metric_3_value:          '38%',
  metric_3_label:          'COST REDUCTION',
  metric_3_desc:           'average savings',
  metric_4_value:          '99.9%',
  metric_4_label:          'UPTIME',
  metric_4_desc:           'reliability',

  features_tag:            'ENTERPRISE TECHNOLOGY',
  features_title:          'Every business process optimized',
  features_body:           'Our AI-powered ERP platform automates workflows, manages inventory, tracks finances, and provides real-time analytics—giving you complete control of your business.',
  features_f1_title:       'Financial Management',
  features_f1_desc:        'Complete accounting, invoicing, and financial reporting with automated reconciliation and real-time cash flow tracking.',
  features_f2_title:       'Real-time Analytics',
  features_f2_desc:        '24/7 business intelligence with instant insights into sales, expenses, inventory levels, and team performance.',
  features_f3_title:       'Inventory Management',
  features_f3_desc:        'Track stock levels, manage suppliers, and automate reorder points across multiple warehouse locations.',
  features_f4_title:       'HR & Payroll',
  features_f4_desc:        'Manage employees, attendance, leave requests, and run payroll seamlessly with full compliance built in.',

  pricing_tag:             'PRICING',
  pricing_title:           'Simple plans\nfor serious work',
  plan_basic_price:        '$0',
  plan_premium_price_annual:   '$29',
  plan_premium_price_monthly:  '$50',
  plan_business_price_annual:  '$79',
  plan_business_price_monthly: '$99',

  cta_tag:                 'Transform your business',
  cta_title:               'Join thousands of successful businesses',
  cta_body:                "Together, we're building smarter enterprises. Start optimizing your operations today.",
  cta_button_text:         'Get Started Today',
  cta_button_url:          'https://login.pryro.com',

  meet_title:              'Meet Pryro, business\nmanagement, finally simple.',

  logos_headline:          'Trusted by leading enterprises worldwide',

  devices_label:           'SEAMLESS ACROSS DEVICES',
  devices_title:           'Work from anywhere,\nstay in sync',
  devices_btn_mobile:      'Mobile App',
  devices_btn_web:         'Web App',

  testimonials_title:      'Finally, one platform that actually\nruns our whole operation',
  testimonials_name:       'Kofi',
  testimonials_role:       'CEO, Accra Fresh Foods',

  // ─── ABOUT PAGE ───────────────────────────────────────────────────────────
  about_hero_title:        'About Pryro',
  about_hero_subtitle:     'Empowering businesses worldwide with intelligent, integrated solutions.',

  about_story_title:       'Our Story',
  about_story_p1:          'Founded in 2020, Pryro was born from a vision to solve one of business\'s biggest challenges: fragmented systems that don\'t work together.',
  about_story_p2:          'Our founders, experienced entrepreneurs themselves, understood the pain of juggling multiple platforms for ERP, HRM, CRM, accounting, and project management. They knew there had to be a better way.',
  about_story_p3:          'Today, Pryro serves over 64,000 businesses across 2 continents, helping them streamline operations and focus on what matters most — growth.',

  about_values_title:      'Our Values',
  about_value_1_title:     'Mission-Driven',
  about_value_1_desc:      'We exist to empower businesses through innovative technology solutions that make complex operations simple.',
  about_value_2_title:     'Customer-First',
  about_value_2_desc:      'Your success is our success. We listen, adapt, and deliver solutions that genuinely solve your problems.',
  about_value_3_title:     'Innovation',
  about_value_3_desc:      'Constantly pushing boundaries to stay ahead of tomorrow\'s challenges and bring you cutting-edge capabilities.',
  about_value_4_title:     'Security & Trust',
  about_value_4_desc:      'Enterprise-grade protection with complete transparency. Your data is always safe, always yours.',

  about_cta_badge:         "We're Hiring",
  about_cta_title:         'Join Our Team',
  about_cta_body:          "We're building the future of business software. If you're passionate about creating solutions that make a real difference, we'd love to hear from you.",
  about_cta_btn:           'View Open Positions',
  about_cta_url:           '/careers',

  // ─── FEATURES PAGE ────────────────────────────────────────────────────────
  features_hero_title:     'The Pryro ecosystem brings together powerful tools',
  features_hero_subtitle:  'Empower your team with workflows that adapt to your business — not the other way around.',
  features_hero_image:     '/125902.jpg',

  features_plans_title:    'Create Plans & Manage Payments',
  features_plans_body:     'Streamline your billing with automated invoicing, subscription management, and payment tracking all in one place.',
  features_plans_image:    '/849234.jpg',

  features_dashboard_title: 'Dashboard & Insights',
  features_dashboard_body:  'Get a complete picture of your business with real-time analytics, custom reports, and AI-powered forecasts.',
  features_dashboard_image: '/images/2149851004.jpg',

  features_hr_title:       'Human Resource Management',
  features_hr_body:        'From hiring to retiring — manage your entire workforce lifecycle with automated payroll, leave management, and performance tracking.',
  features_hr_image:       '/images/77570.jpg',

  features_accounting_title: 'Accounting & Finance',
  features_accounting_body:  'Bank-grade accounting with automated reconciliation, multi-currency support, tax compliance, and real-time financial statements.',
  features_accounting_image: '/images/25164.jpg',

  features_cta_title:      'Ready to streamline your business?',
  features_cta_body:       'Join thousands of businesses using Pryro to manage their operations more efficiently.',
  features_cta_btn:        'Start Free Trial',
  features_cta_url:        '/demo',

  // ─── PRICING PAGE ─────────────────────────────────────────────────────────
  pricing_hero_title:      'Pricing that Scales with You',
  pricing_hero_subtitle:   'Pryro is evolving to be more than just the software you use today. Start free and scale as your business grows.',
  pricing_free_price:      '$0',
  pricing_pro_monthly:     '$50',
  pricing_pro_annual:      '$29',
  pricing_cta_url:         'https://login.pryro.com',

  // ─── CONTACT PAGE ─────────────────────────────────────────────────────────
  contact_hero_title:      'Get in Touch',
  contact_hero_subtitle:   "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  contact_email_sales:     'sales@pryro.com',
  contact_email_support:   'support@pryro.com',
  contact_phone:           '+250 788 715 075',
  contact_hours:           '24/7 am-0:00pm EST',
  contact_address:         '1 kn 78 Nyarugenge Street, Kigali, Rwanda',

  // ─── SMALL BUSINESS ───────────────────────────────────────────────────────
  'small-business_hero_badge':    'Trusted by 10,000+ small businesses',
  'small-business_hero_title':    'Pryro for Small Business',
  'small-business_hero_subtitle': 'Everything you need to run your small business efficiently. Manage finances, inventory, customers, and employees from one powerful platform.',
  'small-business_hero_cta1':     'Get Started',
  'small-business_hero_cta1_url': 'https://login.pryro.com',
  'small-business_hero_cta2':     'Book a Demo',
  'small-business_hero_cta2_url': '/demo',
  'small-business_features_title':    'Simplified Business Management',
  'small-business_features_subtitle': 'Focus on growing your business while Pryro handles the complexity.',
  'small-business_cta_title':    'Ready to grow your business?',
  'small-business_cta_body':     'Join thousands of small businesses that trust Pryro to run their operations.',
  'small-business_cta_btn':      'Get Started Free',
  'small-business_cta_url':      '/contact',

  // ─── ACCOUNTANTS ──────────────────────────────────────────────────────────
  'accountants-bookkeepers_hero_badge':    'Professional Accounting Tools',
  'accountants-bookkeepers_hero_title':    'Pryro for Accountants & Bookkeepers',
  'accountants-bookkeepers_hero_subtitle': 'Professional accounting tools designed for accountants and bookkeepers. Manage multiple clients with ease and deliver exceptional service.',
  'accountants-bookkeepers_hero_cta1':     'Get Started',
  'accountants-bookkeepers_hero_cta1_url': '/demo',
  'accountants-bookkeepers_hero_cta2':     'Contact Sales',
  'accountants-bookkeepers_hero_cta2_url': '/contact',
  'accountants-bookkeepers_features_title':    'Professional Accounting Solutions',
  'accountants-bookkeepers_features_subtitle': 'Streamline your accounting practice with tools designed for managing multiple clients efficiently.',

  // ─── HUMAN RESOURCE ───────────────────────────────────────────────────────
  'human-resource_hero_title':    'Pryro for Human Resources',
  'human-resource_hero_subtitle': 'Streamline HR operations from recruitment to retirement. Manage employees, payroll, attendance, and performance all in one place.',
  'human-resource_hero_cta1':     'Get Started',
  'human-resource_hero_cta1_url': '/demo',
  'human-resource_hero_cta2':     'Contact Sales',
  'human-resource_hero_cta2_url': '/contact',
  'human-resource_features_title':    'Modern HR Management',
  'human-resource_features_subtitle': 'Empower your workforce with comprehensive tools that streamline every HR process.',

  // ─── PROJECT MANAGEMENT ───────────────────────────────────────────────────
  'project_hero_badge':    'Project Management Tools',
  'project_hero_title':    'Pryro for Project Management',
  'project_hero_subtitle': 'Keep every project on track with powerful planning, collaboration, and reporting tools built for modern teams.',
  'project_hero_cta1':     'Get Started',
  'project_hero_cta1_url': '/demo',
  'project_hero_cta2':     'Contact Sales',
  'project_hero_cta2_url': '/contact',

  // ─── STOCK MANAGEMENT ─────────────────────────────────────────────────────
  'stock-management_hero_badge':    'Inventory & Stock Control',
  'stock-management_hero_title':    'Pryro for Stock Management',
  'stock-management_hero_subtitle': 'Take full control of your inventory with real-time tracking, automated reorder points, and multi-location support.',
  'stock-management_hero_cta1':     'Get Started',
  'stock-management_hero_cta1_url': '/demo',
  'stock-management_hero_cta2':     'Contact Sales',
  'stock-management_hero_cta2_url': '/contact',

  // ─── CRM ──────────────────────────────────────────────────────────────────
  'customer-relation_hero_badge':    'CRM Platform',
  'customer-relation_hero_title':    'Pryro CRM',
  'customer-relation_hero_subtitle': 'Build stronger customer relationships, manage leads, track deals, and close more business with an intelligent CRM built into your ERP.',
  'customer-relation_hero_cta1':     'Get Started',
  'customer-relation_hero_cta1_url': '/demo',
  'customer-relation_hero_cta2':     'Contact Sales',
  'customer-relation_hero_cta2_url': '/contact',

  // ─── SELF EMPLOYED ────────────────────────────────────────────────────────
  'self-employed_hero_badge':    'For Freelancers & Consultants',
  'self-employed_hero_title':    'Pryro for Self-employed',
  'self-employed_hero_subtitle': 'Everything a freelancer or consultant needs — invoicing, time tracking, expense management, and client management in one simple tool.',
  'self-employed_hero_cta1':     'Get Started Free',
  'self-employed_hero_cta1_url': 'https://login.pryro.com',
  'self-employed_hero_cta2':     'Learn More',
  'self-employed_hero_cta2_url': '/features',

  // ─── NON-PROFIT ───────────────────────────────────────────────────────────
  'non-profit_hero_badge':    'Non-profit Management',
  'non-profit_hero_title':    'Pryro for Non-profits',
  'non-profit_hero_subtitle': 'Manage your mission-driven organization with purpose-built tools for grant tracking, donor management, volunteer coordination, and financial reporting.',
  'non-profit_hero_cta1':     'Get Started',
  'non-profit_hero_cta1_url': '/demo',
  'non-profit_hero_cta2':     'Contact Sales',
  'non-profit_hero_cta2_url': '/contact',

  // ─── HOSPITALITY ──────────────────────────────────────────────────────────
  'hospitality_hero_badge':    'Hospitality Management',
  'hospitality_hero_title':    'Pryro for Hospitality',
  'hospitality_hero_subtitle': 'Run your hotel, restaurant, or hospitality business with integrated POS, reservations, inventory, staff management, and financial reporting.',
  'hospitality_hero_cta1':     'Get Started',
  'hospitality_hero_cta1_url': '/demo',
  'hospitality_hero_cta2':     'Contact Sales',
  'hospitality_hero_cta2_url': '/contact',

  // ─── CONSTRUCTION ─────────────────────────────────────────────────────────
  'construction_hero_badge':    'Construction Management',
  'construction_hero_title':    'Pryro for Construction',
  'construction_hero_subtitle': 'Manage projects, subcontractors, materials, budgets, and timelines from a single platform built for the construction industry.',
  'construction_hero_cta1':     'Get Started',
  'construction_hero_cta1_url': '/demo',
  'construction_hero_cta2':     'Contact Sales',
  'construction_hero_cta2_url': '/contact',

  // ─── LOGISTICS ────────────────────────────────────────────────────────────
  'logistic_hero_badge':    'Logistics & Supply Chain',
  'logistic_hero_title':    'Pryro for Logistics',
  'logistic_hero_subtitle': 'Optimize your supply chain with real-time fleet tracking, route planning, warehouse management, and delivery analytics.',
  'logistic_hero_cta1':     'Get Started',
  'logistic_hero_cta1_url': '/demo',
  'logistic_hero_cta2':     'Contact Sales',
  'logistic_hero_cta2_url': '/contact',

  // ─── MARKETING MAIL ───────────────────────────────────────────────────────
  'marketing-mail_hero_badge':    'Email Marketing Platform',
  'marketing-mail_hero_title':    'Pryro Marketing Mail',
  'marketing-mail_hero_subtitle': 'Create, send, and track email campaigns that drive results. Built-in templates, audience segmentation, and performance analytics.',
  'marketing-mail_hero_cta1':     'Get Started',
  'marketing-mail_hero_cta1_url': '/demo',
  'marketing-mail_hero_cta2':     'Contact Sales',
  'marketing-mail_hero_cta2_url': '/contact',

  // ─── MARKETING CALL ───────────────────────────────────────────────────────
  'marketing-call_hero_badge':    'Call Marketing Platform',
  'marketing-call_hero_title':    'Pryro Marketing Call',
  'marketing-call_hero_subtitle': 'Power your outbound sales with automated dialing, call scripts, lead scoring, and conversion tracking all in one platform.',
  'marketing-call_hero_cta1':     'Get Started',
  'marketing-call_hero_cta1_url': '/demo',
  'marketing-call_hero_cta2':     'Contact Sales',
  'marketing-call_hero_cta2_url': '/contact',

  // ─── AI ENTERPRISE ────────────────────────────────────────────────────────
  'ai-enterprise_hero_badge':    'AI Enterprise Solution',
  'ai-enterprise_hero_title':    'Pryro AI Enterprise',
  'ai-enterprise_hero_subtitle': 'Supercharge your enterprise with AI-powered automation, predictive analytics, intelligent document processing, and smart workflow optimization.',
  'ai-enterprise_hero_cta1':     'Get Started',
  'ai-enterprise_hero_cta1_url': '/demo',
  'ai-enterprise_hero_cta2':     'Contact Sales',
  'ai-enterprise_hero_cta2_url': '/contact',

  // ─── AI CALCULATOR ────────────────────────────────────────────────────────
  'ai-calculator_hero_badge':    'AI Savings Calculator',
  'ai-calculator_hero_title':    'Calculate Your Savings with Pryro',
  'ai-calculator_hero_subtitle': 'See how much time and money your business could save by switching to Pryro. Enter your details and get an instant AI-powered estimate.',
  'ai-calculator_hero_cta1':     'Start Free Trial',
  'ai-calculator_hero_cta1_url': 'https://login.pryro.com',
  'ai-calculator_hero_cta2':     'Book a Demo',
  'ai-calculator_hero_cta2_url': '/demo',
}

async function main() {
  console.log('🌱  Seeding page content into dynamic_content table...\n')
  let inserted = 0
  let updated = 0

  for (const [key, value] of Object.entries(ALL_CONTENT)) {
    const existing = await query(
      'SELECT id FROM dynamic_content WHERE key_name = ?',
      [key]
    ) as any[]

    if (existing.length > 0) {
      await update(
        'UPDATE dynamic_content SET value = ? WHERE key_name = ?',
        [value, key]
      )
      updated++
    } else {
      await insert(
        `INSERT INTO dynamic_content (key_name, value, data_type) VALUES (?, ?, 'text')`,
        [key, value]
      )
      inserted++
    }
  }

  console.log(`✅  Done!`)
  console.log(`   Inserted: ${inserted} new keys`)
  console.log(`   Updated:  ${updated} existing keys`)
  console.log(`   Total:    ${Object.keys(ALL_CONTENT).length} keys\n`)
  console.log('   Reload /admin/pages → Edit Page Content to see all values.')
}

main()
  .then(() => closePool())
  .catch(e => { console.error('❌ Failed:', e); process.exit(1) })
