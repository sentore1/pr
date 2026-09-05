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
  // Hero
  hero_title_line1:        'Streamline',
  hero_title_line2:        'effortlessly',
  hero_subtitle:           'Complete ERP solution with AI-powered insights. Manage finance, inventory, HR, and operations in one unified platform.',
  hero_cta_primary:        'Start Free Trial',
  hero_cta_primary_url:    'https://login.pryro.com',
  hero_cta_secondary:      'Book a Demo',
  hero_cta_secondary_url:  '/demo',
  hero_dashboard_image:    '/dashboard-screenshot.png',
  hero_background:         'linear-gradient(to bottom, #0072FD 0%, #0274FD 11%, #0376FC 22%, #097AFC 33%, #0E7EFC 44%, #1986FC 55%, #3393FC 66%, #4CA0FC 77%, #7FBAFC 88%, #E5EDFC 100%)',

  // Logos bar
  logos_headline:          'Trusted by leading enterprises worldwide',

  // Metrics
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

  // Devices
  devices_label:           'SEAMLESS ACROSS DEVICES',
  devices_title:           'Work from anywhere,\nstay in sync',
  devices_image_mobile:    '/image switch 1.png',
  devices_image_web:       '/image switch 2.png',
  devices_btn_mobile:      'Mobile App',
  devices_btn_web:         'Web App',

  // Features
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

  // Meet Pryro
  meet_title:              'Meet Pryro, business\nmanagement, finally simple.',

  // Pricing
  pricing_tag:             'PRICING',
  pricing_title:           'Simple plans\nfor serious work',
  plan_basic_price:        '$0',
  plan_premium_price_monthly: '$50',
  plan_premium_price_annual:  '$29',
  plan_business_price_monthly: '$99',
  plan_business_price_annual:  '$79',

  // Testimonials
  testimonials_title:      'Finally, one platform that actually\nruns our whole operation',
  testimonials_name:       'Kofi',
  testimonials_role:       'CEO, Accra Fresh Foods',

  // CTA
  cta_tag:                 'Transform your business',
  cta_title:               'Join thousands of successful businesses',
  cta_body:                "Together, we're building smarter enterprises. Start optimizing your operations today.",
  cta_button_text:         'Get Started Today',
  cta_button_url:          'https://login.pryro.com',
}
