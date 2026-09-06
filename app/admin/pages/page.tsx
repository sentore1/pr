"use client"

import { useEffect, useState } from 'react'
import {
  Save, Eye, EyeOff, Upload, ChevronRight, ExternalLink,
  RefreshCw, Plus, Trash2, Edit2, Check, X, FileText, Layout,
  Search, Layers, Globe
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DEFINITIONS — every page with every editable field
// ─────────────────────────────────────────────────────────────────────────────
type FieldType = 'text' | 'textarea' | 'image' | 'url' | 'color'

interface Field {
  key: string
  label: string
  type: FieldType
  hint?: string
}

interface PageDef {
  slug: string
  label: string
  icon: string
  group: string
  layout?: string
  sections: { id: string; label: string; fields: Field[] }[]
}

const PAGE_DEFS: PageDef[] = [
  // ── LANDING PAGE ───────────────────────────────────────────────────────────
  {
    slug: 'home', label: 'Home / Landing', icon: '/icon/dashboard icon.png', group: 'Main',
    sections: [
      {
        id: 'hero', label: 'Hero Section', fields: [
          { key: 'hero_title_line1',        label: 'Headline Line 1',         type: 'text',     hint: 'e.g. Streamline' },
          { key: 'hero_title_line2',        label: 'Headline Line 2',         type: 'text',     hint: 'e.g. effortlessly' },
          { key: 'hero_subtitle',           label: 'Sub-headline',            type: 'textarea', hint: 'Short description below the headline' },
          { key: 'hero_cta_primary',        label: 'Primary Button Text',     type: 'text',     hint: 'e.g. Start Free Trial' },
          { key: 'hero_cta_primary_url',    label: 'Primary Button URL',      type: 'url',      hint: 'https://login.pryro.com' },
          { key: 'hero_cta_secondary',      label: 'Secondary Button Text',   type: 'text',     hint: 'e.g. Book a Demo' },
          { key: 'hero_cta_secondary_url',  label: 'Secondary Button URL',    type: 'url',      hint: '/demo' },
          { key: 'hero_dashboard_image',    label: 'Dashboard Image',         type: 'image',    hint: 'Main hero screenshot' },
          { key: 'hero_background',         label: 'Background Gradient/Color', type: 'text',   hint: 'CSS gradient or hex color' },
        ]
      },
      {
        id: 'metrics', label: 'Metrics / Stats', fields: [
          { key: 'metrics_title',    label: 'Section Title',      type: 'text' },
          { key: 'metrics_subtitle', label: 'Sub-title',          type: 'textarea' },
          { key: 'metric_1_value',   label: 'Stat 1 Value',       type: 'text',  hint: '64K+' },
          { key: 'metric_1_label',   label: 'Stat 1 Label',       type: 'text',  hint: 'ACTIVE USERS' },
          { key: 'metric_1_desc',    label: 'Stat 1 Sub',         type: 'text',  hint: 'worldwide' },
          { key: 'metric_2_value',   label: 'Stat 2 Value',       type: 'text',  hint: '2.4M' },
          { key: 'metric_2_label',   label: 'Stat 2 Label',       type: 'text' },
          { key: 'metric_2_desc',    label: 'Stat 2 Sub',         type: 'text' },
          { key: 'metric_3_value',   label: 'Stat 3 Value',       type: 'text',  hint: '38%' },
          { key: 'metric_3_label',   label: 'Stat 3 Label',       type: 'text' },
          { key: 'metric_3_desc',    label: 'Stat 3 Sub',         type: 'text' },
          { key: 'metric_4_value',   label: 'Stat 4 Value',       type: 'text',  hint: '99.9%' },
          { key: 'metric_4_label',   label: 'Stat 4 Label',       type: 'text' },
          { key: 'metric_4_desc',    label: 'Stat 4 Sub',         type: 'text' },
        ]
      },
      {
        id: 'features', label: 'Features Section', fields: [
          { key: 'features_tag',     label: 'Tag Label',          type: 'text',  hint: 'ENTERPRISE TECHNOLOGY' },
          { key: 'features_title',   label: 'Section Title',      type: 'text' },
          { key: 'features_body',    label: 'Description',        type: 'textarea' },
          { key: 'features_f1_title',label: 'Feature 1 Title',    type: 'text' },
          { key: 'features_f1_desc', label: 'Feature 1 Desc',     type: 'textarea' },
          { key: 'features_f2_title',label: 'Feature 2 Title',    type: 'text' },
          { key: 'features_f2_desc', label: 'Feature 2 Desc',     type: 'textarea' },
          { key: 'features_f3_title',label: 'Feature 3 Title',    type: 'text' },
          { key: 'features_f3_desc', label: 'Feature 3 Desc',     type: 'textarea' },
          { key: 'features_f4_title',label: 'Feature 4 Title',    type: 'text' },
          { key: 'features_f4_desc', label: 'Feature 4 Desc',     type: 'textarea' },
        ]
      },
      {
        id: 'pricing_section', label: 'Pricing Section', fields: [
          { key: 'pricing_tag',      label: 'Tag Label',          type: 'text' },
          { key: 'pricing_title',    label: 'Section Title',      type: 'text' },
          { key: 'pricing_compare_title',    label: 'Compare Heading',        type: 'text',     hint: 'Compare plans' },
          { key: 'pricing_compare_subtitle', label: 'Compare Sub-heading',    type: 'text',     hint: 'Pick the right plan for your team.' },
          { key: 'pricing_trust_line',       label: 'Trust Line',             type: 'text',     hint: 'Trusted by 64,000+ businesses…' },
          { key: 'pricing_save_badge',       label: '"Save" Badge Text',      type: 'text',     hint: 'Save 20%' },
          { key: 'pricing_cta_heading',      label: 'CTA Row Heading',        type: 'text',     hint: 'Ready to get started?' },
          { key: 'pricing_cta_subtext',      label: 'CTA Row Sub-text',       type: 'text',     hint: 'No credit card required for Basic.' },
          // Basic plan
          { key: 'plan_basic_name',          label: 'Basic — Plan Name',      type: 'text',     hint: 'Basic' },
          { key: 'plan_basic_price',         label: 'Basic — Price',          type: 'text',     hint: '$0' },
          { key: 'plan_basic_period',        label: 'Basic — Period',         type: 'text',     hint: 'Free forever' },
          { key: 'plan_basic_users',         label: 'Basic — Users',          type: 'text',     hint: '2' },
          { key: 'plan_basic_invoices',      label: 'Basic — Invoices',       type: 'text',     hint: '100/mo' },
          { key: 'plan_basic_cta',           label: 'Basic — Button Text',    type: 'text',     hint: 'Get started' },
          { key: 'plan_basic_url',           label: 'Basic — Button URL',     type: 'url',      hint: 'https://login.pryro.com' },
          // Premium plan
          { key: 'plan_premium_name',              label: 'Premium — Plan Name',    type: 'text',   hint: 'Premium' },
          { key: 'plan_premium_price_annual',      label: 'Premium — Annual Price', type: 'text',   hint: '$29' },
          { key: 'plan_premium_price_monthly',     label: 'Premium — Monthly Price',type: 'text',   hint: '$50' },
          { key: 'plan_premium_period',            label: 'Premium — Period',       type: 'text',   hint: 'Per workspace' },
          { key: 'plan_premium_users',             label: 'Premium — Users',        type: 'text',   hint: '20' },
          { key: 'plan_premium_cta',               label: 'Premium — Button Text',  type: 'text',   hint: 'Upgrade' },
          { key: 'plan_premium_url',               label: 'Premium — Button URL',   type: 'url',    hint: 'https://login.pryro.com' },
          // Business plan
          { key: 'plan_business_name',             label: 'Business — Plan Name',    type: 'text',   hint: 'Business' },
          { key: 'plan_business_price_annual',     label: 'Business — Annual Price', type: 'text',   hint: '$79' },
          { key: 'plan_business_price_monthly',    label: 'Business — Monthly Price',type: 'text',   hint: '$99' },
          { key: 'plan_business_period',           label: 'Business — Period',       type: 'text',   hint: 'Up to 100 users' },
          { key: 'plan_business_users',            label: 'Business — Users',        type: 'text',   hint: '100' },
          { key: 'plan_business_cta',              label: 'Business — Button Text',  type: 'text',   hint: 'Get Business' },
          { key: 'plan_business_url',              label: 'Business — Button URL',   type: 'url',    hint: 'https://login.pryro.com' },
          // Enterprise plan
          { key: 'plan_enterprise_name',           label: 'Enterprise — Plan Name',  type: 'text',   hint: 'Enterprise' },
          { key: 'plan_enterprise_price',          label: 'Enterprise — Price',      type: 'text',   hint: 'Custom' },
          { key: 'plan_enterprise_period',         label: 'Enterprise — Period',     type: 'text',   hint: 'Contact sales' },
          { key: 'plan_enterprise_users',          label: 'Enterprise — Users',      type: 'text',   hint: 'Unlimited' },
          { key: 'plan_enterprise_cta',            label: 'Enterprise — Button Text',type: 'text',   hint: 'Contact sales' },
          { key: 'plan_enterprise_url',            label: 'Enterprise — Button URL', type: 'url',    hint: '/contact' },
          // Plan feature bullets (shown on mobile cards)
          { key: 'plan_basic_feat1',      label: 'Basic — Feature 1',       type: 'text', hint: 'Time Tracking' },
          { key: 'plan_basic_feat2',      label: 'Basic — Feature 2',       type: 'text', hint: 'CRM' },
          { key: 'plan_premium_feat1',    label: 'Premium — Feature 1',     type: 'text', hint: 'Time Tracking' },
          { key: 'plan_premium_feat2',    label: 'Premium — Feature 2',     type: 'text', hint: 'CRM' },
          { key: 'plan_premium_feat3',    label: 'Premium — Feature 3',     type: 'text', hint: 'HR Management' },
          { key: 'plan_premium_feat4',    label: 'Premium — Feature 4',     type: 'text', hint: 'POS' },
          { key: 'plan_premium_feat5',    label: 'Premium — Feature 5',     type: 'text', hint: 'AI Reports' },
          { key: 'plan_premium_feat6',    label: 'Premium — Feature 6',     type: 'text', hint: 'Invoice Link' },
          { key: 'plan_business_feat1',   label: 'Business — Feature 1',    type: 'text', hint: 'Everything in Premium' },
          { key: 'plan_business_feat2',   label: 'Business — Feature 2',    type: 'text', hint: 'Advanced Security' },
          { key: 'plan_business_feat3',   label: 'Business — Feature 3',    type: 'text', hint: 'Phone & Chat Support' },
          { key: 'plan_enterprise_feat1', label: 'Enterprise — Feature 1',  type: 'text', hint: 'Everything in Business' },
          { key: 'plan_enterprise_feat2', label: 'Enterprise — Feature 2',  type: 'text', hint: 'Custom Webhooks' },
          { key: 'plan_enterprise_feat3', label: 'Enterprise — Feature 3',  type: 'text', hint: 'Dedicated Support' },
          // Comparison table row names & descriptions
          { key: 'cmp_row1_name',  label: 'Table Row 1 — Name', type: 'text', hint: 'Users' },
          { key: 'cmp_row1_desc',  label: 'Table Row 1 — Desc', type: 'text', hint: 'Team members with full access' },
          { key: 'cmp_row2_name',  label: 'Table Row 2 — Name', type: 'text', hint: 'Projects' },
          { key: 'cmp_row2_desc',  label: 'Table Row 2 — Desc', type: 'text', hint: 'Active projects you can manage' },
          { key: 'cmp_row3_name',  label: 'Table Row 3 — Name', type: 'text', hint: 'Invoices' },
          { key: 'cmp_row3_desc',  label: 'Table Row 3 — Desc', type: 'text', hint: 'Professional invoices per month' },
          { key: 'cmp_row4_name',  label: 'Table Row 4 — Name', type: 'text', hint: 'Time Tracking' },
          { key: 'cmp_row4_desc',  label: 'Table Row 4 — Desc', type: 'text', hint: 'Log hours and track billable time' },
          { key: 'cmp_row5_name',  label: 'Table Row 5 — Name', type: 'text', hint: 'CRM' },
          { key: 'cmp_row5_desc',  label: 'Table Row 5 — Desc', type: 'text', hint: 'Manage clients and deal pipelines' },
          { key: 'cmp_row6_name',  label: 'Table Row 6 — Name', type: 'text', hint: 'HR Management' },
          { key: 'cmp_row6_desc',  label: 'Table Row 6 — Desc', type: 'text', hint: 'Payroll, leaves, employee records' },
          { key: 'cmp_row7_name',  label: 'Table Row 7 — Name', type: 'text', hint: 'POS' },
          { key: 'cmp_row7_desc',  label: 'Table Row 7 — Desc', type: 'text', hint: 'Point-of-sale for retail & hospitality' },
          { key: 'cmp_row8_name',  label: 'Table Row 8 — Name', type: 'text', hint: 'AI Reports' },
          { key: 'cmp_row8_desc',  label: 'Table Row 8 — Desc', type: 'text', hint: 'Smart insights generated automatically' },
          { key: 'cmp_row9_name',  label: 'Table Row 9 — Name', type: 'text', hint: 'Invoice Link' },
          { key: 'cmp_row9_desc',  label: 'Table Row 9 — Desc', type: 'text', hint: 'Share payment links with clients' },
          { key: 'cmp_row10_name', label: 'Table Row 10 — Name', type: 'text', hint: 'Custom Webhooks' },
          { key: 'cmp_row10_desc', label: 'Table Row 10 — Desc', type: 'text', hint: 'Connect to external apps via webhooks' },
          { key: 'cmp_row11_name', label: 'Table Row 11 — Name', type: 'text', hint: 'Advanced Security' },
          { key: 'cmp_row11_desc', label: 'Table Row 11 — Desc', type: 'text', hint: 'SSO, audit logs and access controls' },
          { key: 'cmp_row12_name', label: 'Table Row 12 — Name', type: 'text', hint: 'Support' },
          { key: 'cmp_row12_desc', label: 'Table Row 12 — Desc', type: 'text', hint: 'How we help when you need us' },
          { key: 'cmp_row12_basic',      label: 'Support — Basic value',      type: 'text', hint: 'Email' },
          { key: 'cmp_row12_premium',    label: 'Support — Premium value',    type: 'text', hint: 'Priority' },
          { key: 'cmp_row12_business',   label: 'Support — Business value',   type: 'text', hint: 'Phone & Chat' },
          { key: 'cmp_row12_enterprise', label: 'Support — Enterprise value', type: 'text', hint: 'Dedicated' },
        ]
      },
      {
        id: 'project', label: 'Project Management Section', fields: [
          { key: 'project_tag',      label: 'Tag Label',       type: 'text',     hint: 'PROJECT MANAGEMENT' },
          { key: 'project_title',    label: 'Section Title',   type: 'text',     hint: 'Keep every project moving forward' },
          { key: 'project_body',     label: 'Description',     type: 'textarea' },
          { key: 'project_cta',      label: 'Button Text',     type: 'text',     hint: 'Get Started' },
          { key: 'project_cta_url',  label: 'Button URL',      type: 'url',      hint: 'https://login.pryro.com' },
          { key: 'project_feat1',    label: 'Feature 1 Label', type: 'text',     hint: 'Tasks' },
          { key: 'project_feat2',    label: 'Feature 2 Label', type: 'text',     hint: 'Time tracking' },
          { key: 'project_feat3',    label: 'Feature 3 Label', type: 'text',     hint: 'Timesheets' },
          { key: 'project_feat4',    label: 'Feature 4 Label', type: 'text',     hint: 'Reports' },
        ]
      },
      {
        id: 'financial', label: 'Financial Management Section', fields: [
          { key: 'financial_tag',      label: 'Tag Label',       type: 'text',     hint: 'FINANCIAL MANAGEMENT' },
          { key: 'financial_title',    label: 'Section Title',   type: 'text',     hint: 'Track income, get paid, stress less' },
          { key: 'financial_body',     label: 'Description',     type: 'textarea' },
          { key: 'financial_cta',      label: 'Button Text',     type: 'text',     hint: 'Get Started' },
          { key: 'financial_cta_url',  label: 'Button URL',      type: 'url',      hint: 'https://login.pryro.com' },
          { key: 'financial_feat1',    label: 'Feature 1 Label', type: 'text',     hint: 'Invoicing' },
          { key: 'financial_feat2',    label: 'Feature 2 Label', type: 'text',     hint: 'Budgets' },
          { key: 'financial_feat3',    label: 'Feature 3 Label', type: 'text',     hint: 'Forecasting' },
          { key: 'financial_feat4',    label: 'Feature 4 Label', type: 'text',     hint: 'Integrations' },
        ]
      },
      {
        id: 'meet', label: 'Meet Pryro Section', fields: [
          { key: 'meet_title',           label: 'Headline',               type: 'textarea', hint: 'Meet Pryro, business\nmanagement, finally simple.' },
          { key: 'business_cards_title', label: 'Business Cards Heading', type: 'text',     hint: 'Built for every part of your business' },
        ]
      },
      {
        id: 'testimonials', label: 'Testimonials Section', fields: [
          { key: 'testimonials_title',   label: 'Section Headline',  type: 'textarea', hint: 'Finally, one platform that actually\nruns our whole operation' },
          { key: 'testimonials_name',    label: 'Featured Name',     type: 'text',     hint: 'Kofi' },
          { key: 'testimonials_role',    label: 'Featured Role',     type: 'text',     hint: 'CEO, Accra Fresh Foods' },
          { key: 'testimonial_1_text',   label: 'Testimonial 1 Text', type: 'textarea' },
          { key: 'testimonial_1_name',   label: 'Testimonial 1 Name', type: 'text',     hint: 'Amara' },
          { key: 'testimonial_1_role',   label: 'Testimonial 1 Role', type: 'text',     hint: 'Founder, Dakar Studio Co.' },
          { key: 'testimonial_2_text',   label: 'Testimonial 2 Text', type: 'textarea' },
          { key: 'testimonial_2_name',   label: 'Testimonial 2 Name', type: 'text',     hint: 'Ngozi' },
          { key: 'testimonial_2_role',   label: 'Testimonial 2 Role', type: 'text',     hint: 'MD, Eze Logistics Ltd.' },
          { key: 'testimonial_3_text',   label: 'Testimonial 3 Text', type: 'textarea' },
          { key: 'testimonial_3_name',   label: 'Testimonial 3 Name', type: 'text',     hint: 'Kwame' },
          { key: 'testimonial_3_role',   label: 'Testimonial 3 Role', type: 'text',     hint: 'Director, Asante Build Group' },
          { key: 'testimonial_4_text',   label: 'Testimonial 4 Text', type: 'textarea' },
          { key: 'testimonial_4_name',   label: 'Testimonial 4 Name', type: 'text',     hint: 'Fatou' },
          { key: 'testimonial_4_role',   label: 'Testimonial 4 Role', type: 'text',     hint: 'Finance Lead, Camara Trading' },
          { key: 'testimonial_5_text',   label: 'Testimonial 5 Text', type: 'textarea' },
          { key: 'testimonial_5_name',   label: 'Testimonial 5 Name', type: 'text',     hint: 'James' },
          { key: 'testimonial_5_role',   label: 'Testimonial 5 Role', type: 'text',     hint: 'COO, Okonkwo & Partners' },
          { key: 'testimonial_6_text',   label: 'Testimonial 6 Text', type: 'textarea' },
          { key: 'testimonial_6_name',   label: 'Testimonial 6 Name', type: 'text',     hint: 'Aissatou' },
          { key: 'testimonial_6_role',   label: 'Testimonial 6 Role', type: 'text',     hint: 'Operations Manager, Bah Retail' },
          { key: 'testimonial_7_text',   label: 'Testimonial 7 Text', type: 'textarea' },
          { key: 'testimonial_7_name',   label: 'Testimonial 7 Name', type: 'text',     hint: 'Emmanuel' },
          { key: 'testimonial_7_role',   label: 'Testimonial 7 Role', type: 'text',     hint: 'Executive Director, Hope Forward NGO' },
        ]
      },
      {
        id: 'cta', label: 'CTA Section', fields: [
          { key: 'cta_tag',         label: 'Tag Label',     type: 'text' },
          { key: 'cta_title',       label: 'Headline',      type: 'text' },
          { key: 'cta_body',        label: 'Body Text',     type: 'textarea' },
          { key: 'cta_button_text', label: 'Button Text',   type: 'text' },
          { key: 'cta_button_url',  label: 'Button URL',    type: 'url' },
        ]
      },
    ]
  },

  // ── ABOUT ──────────────────────────────────────────────────────────────────
  {
    slug: 'about', label: 'About', icon: '/icon/business coach icon.png', group: 'Main',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'about_hero_title',    label: 'Page Title',    type: 'text',     hint: 'About Pryro' },
          { key: 'about_hero_subtitle', label: 'Sub-title',     type: 'textarea', hint: 'Empowering businesses worldwide...' },
        ]
      },
      {
        id: 'story', label: 'Our Story', fields: [
          { key: 'about_story_title', label: 'Section Title', type: 'text',     hint: 'Our Story' },
          { key: 'about_story_p1',    label: 'Paragraph 1',   type: 'textarea' },
          { key: 'about_story_p2',    label: 'Paragraph 2',   type: 'textarea' },
          { key: 'about_story_p3',    label: 'Paragraph 3',   type: 'textarea' },
        ]
      },
      {
        id: 'values', label: 'Our Values', fields: [
          { key: 'about_values_title',   label: 'Section Title', type: 'text' },
          { key: 'about_value_1_title',  label: 'Value 1 Title', type: 'text',     hint: 'Mission-Driven' },
          { key: 'about_value_1_desc',   label: 'Value 1 Desc',  type: 'textarea' },
          { key: 'about_value_2_title',  label: 'Value 2 Title', type: 'text',     hint: 'Customer-First' },
          { key: 'about_value_2_desc',   label: 'Value 2 Desc',  type: 'textarea' },
          { key: 'about_value_3_title',  label: 'Value 3 Title', type: 'text',     hint: 'Innovation' },
          { key: 'about_value_3_desc',   label: 'Value 3 Desc',  type: 'textarea' },
          { key: 'about_value_4_title',  label: 'Value 4 Title', type: 'text',     hint: 'Security & Trust' },
          { key: 'about_value_4_desc',   label: 'Value 4 Desc',  type: 'textarea' },
        ]
      },
      {
        id: 'cta', label: 'CTA (Careers)', fields: [
          { key: 'about_cta_badge',   label: 'Badge Text',    type: 'text', hint: "We're Hiring" },
          { key: 'about_cta_title',   label: 'Title',         type: 'text', hint: 'Join Our Team' },
          { key: 'about_cta_body',    label: 'Body',          type: 'textarea' },
          { key: 'about_cta_btn',     label: 'Button Text',   type: 'text', hint: 'View Open Positions' },
          { key: 'about_cta_url',     label: 'Button URL',    type: 'url',  hint: '/careers' },
        ]
      },
    ]
  },

  // ── FEATURES ───────────────────────────────────────────────────────────────
  {
    slug: 'features', label: 'Features', icon: '/icon/budget icon.png', group: 'Main',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'features_hero_title',    label: 'Headline',   type: 'text' },
          { key: 'features_hero_subtitle', label: 'Sub-title',  type: 'textarea' },
          { key: 'features_hero_image',    label: 'Hero Image', type: 'image' },
        ]
      },
      {
        id: 'plans', label: 'Plans & Payments', fields: [
          { key: 'features_plans_title', label: 'Section Title', type: 'text' },
          { key: 'features_plans_body',  label: 'Body',          type: 'textarea' },
          { key: 'features_plans_image', label: 'Image',         type: 'image' },
        ]
      },
      {
        id: 'dashboard', label: 'Dashboard & Insights', fields: [
          { key: 'features_dashboard_title', label: 'Section Title', type: 'text' },
          { key: 'features_dashboard_body',  label: 'Body',          type: 'textarea' },
          { key: 'features_dashboard_image', label: 'Image',         type: 'image' },
        ]
      },
      {
        id: 'hr', label: 'HR Management', fields: [
          { key: 'features_hr_title', label: 'Section Title', type: 'text' },
          { key: 'features_hr_body',  label: 'Body',          type: 'textarea' },
          { key: 'features_hr_image', label: 'Image',         type: 'image' },
        ]
      },
      {
        id: 'accounting', label: 'Accounting & Finance', fields: [
          { key: 'features_accounting_title', label: 'Section Title', type: 'text' },
          { key: 'features_accounting_body',  label: 'Body',          type: 'textarea' },
          { key: 'features_accounting_image', label: 'Image',         type: 'image' },
        ]
      },
      {
        id: 'cta', label: 'CTA', fields: [
          { key: 'features_cta_title', label: 'CTA Title', type: 'text' },
          { key: 'features_cta_body',  label: 'CTA Body',  type: 'textarea' },
          { key: 'features_cta_btn',   label: 'Button',    type: 'text' },
          { key: 'features_cta_url',   label: 'Button URL',type: 'url' },
        ]
      },
    ]
  },

  // ── PRICING ────────────────────────────────────────────────────────────────
  {
    slug: 'pricing', label: 'Pricing', icon: '/icon/subscription icon.png', group: 'Main',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'pricing_hero_title',    label: 'Page Title', type: 'text',     hint: 'Pricing that Scales with You' },
          { key: 'pricing_hero_subtitle', label: 'Sub-title',  type: 'textarea' },
        ]
      },
      {
        id: 'plans', label: 'Plans', fields: [
          { key: 'pricing_free_price',    label: 'Free Plan Price',     type: 'text', hint: '$0' },
          { key: 'pricing_pro_monthly',   label: 'Pro Monthly Price',   type: 'text', hint: '$50' },
          { key: 'pricing_pro_annual',    label: 'Pro Annual Price',    type: 'text', hint: '$29' },
          { key: 'pricing_cta_url',       label: 'CTA Button URL',      type: 'url',  hint: 'https://login.pryro.com' },
        ]
      },
    ]
  },

  // ── CONTACT ────────────────────────────────────────────────────────────────
  {
    slug: 'contact', label: 'Contact', icon: '/icon/cold call icon.png', group: 'Main',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'contact_hero_title',    label: 'Page Title', type: 'text',     hint: 'Get in Touch' },
          { key: 'contact_hero_subtitle', label: 'Sub-title',  type: 'textarea' },
        ]
      },
      {
        id: 'info', label: 'Contact Info', fields: [
          { key: 'contact_email_sales',   label: 'Sales Email',    type: 'text', hint: 'sales@pryro.com' },
          { key: 'contact_email_support', label: 'Support Email',  type: 'text', hint: 'support@pryro.com' },
          { key: 'contact_phone',         label: 'Phone Number',   type: 'text', hint: '+250 788 715 075' },
          { key: 'contact_hours',         label: 'Business Hours', type: 'text', hint: '24/7 am-0:00pm EST' },
          { key: 'contact_address',       label: 'Office Address', type: 'textarea', hint: '1 kn 78 Nyarugenge Street, Kigali, Rwanda' },
        ]
      },
    ]
  },

  // ── SOLUTION PAGES ─────────────────────────────────────────────────────────
  ...([
    { slug: 'small-business',          label: 'Small Business',         icon: '/icon/business coach icon.png',    badge: 'Trusted by 10,000+ small businesses' },
    { slug: 'accountants-bookkeepers', label: 'Accountants',            icon: '/icon/accounting icon.png',        badge: 'Professional Accounting Tools' },
    { slug: 'human-resource',          label: 'Human Resource',         icon: '/icon/HR icon.png',                badge: 'HR Management Platform' },
    { slug: 'project',                 label: 'Project Management',     icon: '/icon/project icon.png',           badge: 'Project Management Tools' },
    { slug: 'stock-management',        label: 'Stock Management',       icon: '/icon/Inventory icon.png',         badge: 'Inventory & Stock Control' },
    { slug: 'customer-relation',       label: 'CRM',                    icon: '/icon/CRM icon.png',               badge: 'Customer Relationship Management' },
    { slug: 'self-employed',           label: 'Self-employed',          icon: '/icon/0coder icon.png',            badge: 'Tools for Freelancers' },
    { slug: 'non-profit',              label: 'Non-profit',             icon: '/icon/help desk icon.png',         badge: 'Non-profit Management' },
    { slug: 'hospitality',             label: 'Hospitality',            icon: '/icon/pos icon.png',               badge: 'Hospitality Management' },
    { slug: 'construction',            label: 'Construction',           icon: '/icon/manufacturers icon.png',     badge: 'Construction Management' },
    { slug: 'logistic',                label: 'Logistics',              icon: '/icon/logistic icon.png',          badge: 'Logistics & Supply Chain' },
    { slug: 'marketing-mail',          label: 'Marketing Mail',         icon: '/icon/ai email icon.png',          badge: 'Email Marketing Platform' },
    { slug: 'marketing-call',          label: 'Marketing Call',         icon: '/icon/cold call icon.png',         badge: 'Call Marketing Platform' },
    { slug: 'ai-enterprise',           label: 'AI Enterprise',          icon: '/icon/ai interprise icon.png',     badge: 'AI Enterprise Solution' },
    { slug: 'ai-calculator',           label: 'AI Calculator',          icon: '/icon/ai business review icon.png',badge: 'AI Savings Calculator' },
  ] as { slug: string; label: string; icon: string; badge: string }[]).map(p => ({
    slug: p.slug,
    label: p.label,
    icon: p.icon,
    group: 'Solutions',
    sections: [
      {
        id: 'hero', label: 'Hero Section', fields: [
          { key: `${p.slug}_hero_badge`,    label: 'Badge Text',        type: 'text' as FieldType, hint: p.badge },
          { key: `${p.slug}_hero_title`,    label: 'Page Title',        type: 'text' as FieldType, hint: `Pryro for ${p.label}` },
          { key: `${p.slug}_hero_subtitle`, label: 'Sub-title',         type: 'textarea' as FieldType },
          { key: `${p.slug}_hero_cta1`,     label: 'Button 1 Text',     type: 'text' as FieldType, hint: 'Get Started' },
          { key: `${p.slug}_hero_cta1_url`, label: 'Button 1 URL',      type: 'url' as FieldType,  hint: '/demo' },
          { key: `${p.slug}_hero_cta2`,     label: 'Button 2 Text',     type: 'text' as FieldType, hint: 'Contact Sales' },
          { key: `${p.slug}_hero_cta2_url`, label: 'Button 2 URL',      type: 'url' as FieldType,  hint: '/contact' },
        ]
      },
      {
        id: 'features', label: 'Features Section', fields: [
          { key: `${p.slug}_features_title`,   label: 'Section Title',   type: 'text' as FieldType },
          { key: `${p.slug}_features_subtitle`,label: 'Section Sub',     type: 'textarea' as FieldType },
          { key: `${p.slug}_features_image`,   label: 'Section Image',   type: 'image' as FieldType },
          { key: `${p.slug}_feat1_title`,      label: 'Feature 1 Title', type: 'text' as FieldType },
          { key: `${p.slug}_feat1_desc`,       label: 'Feature 1 Desc',  type: 'textarea' as FieldType },
          { key: `${p.slug}_feat2_title`,      label: 'Feature 2 Title', type: 'text' as FieldType },
          { key: `${p.slug}_feat2_desc`,       label: 'Feature 2 Desc',  type: 'textarea' as FieldType },
          { key: `${p.slug}_feat3_title`,      label: 'Feature 3 Title', type: 'text' as FieldType },
          { key: `${p.slug}_feat3_desc`,       label: 'Feature 3 Desc',  type: 'textarea' as FieldType },
          { key: `${p.slug}_feat4_title`,      label: 'Feature 4 Title', type: 'text' as FieldType },
          { key: `${p.slug}_feat4_desc`,       label: 'Feature 4 Desc',  type: 'textarea' as FieldType },
        ]
      },
      {
        id: 'content', label: 'Content Section', fields: [
          { key: `${p.slug}_content_title`,    label: 'Section Title',   type: 'text' as FieldType },
          { key: `${p.slug}_content_highlight`,label: 'Highlighted Text',type: 'textarea' as FieldType },
          { key: `${p.slug}_content_body`,     label: 'Body Text',       type: 'textarea' as FieldType },
          { key: `${p.slug}_content_image`,    label: 'Section Image',   type: 'image' as FieldType },
          { key: `${p.slug}_card1_title`,      label: 'Card 1 Title',    type: 'text' as FieldType },
          { key: `${p.slug}_card1_body`,       label: 'Card 1 Body',     type: 'textarea' as FieldType },
          { key: `${p.slug}_card2_title`,      label: 'Card 2 Title',    type: 'text' as FieldType },
          { key: `${p.slug}_card2_body`,       label: 'Card 2 Body',     type: 'textarea' as FieldType },
        ]
      },
      {
        id: 'cta', label: 'CTA Section', fields: [
          { key: `${p.slug}_cta_badge`,  label: 'Badge',      type: 'text' as FieldType },
          { key: `${p.slug}_cta_title`,  label: 'Title',      type: 'text' as FieldType },
          { key: `${p.slug}_cta_body`,   label: 'Body',       type: 'textarea' as FieldType },
          { key: `${p.slug}_cta_btn`,    label: 'Button',     type: 'text' as FieldType, hint: 'Get Started Free' },
          { key: `${p.slug}_cta_url`,    label: 'Button URL', type: 'url' as FieldType,  hint: '/contact' },
        ]
      },
    ]
  })),
]

const PAGE_GROUPS = ['Main', 'Solutions']

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT TEMPLATES — used when creating a new custom page
// ─────────────────────────────────────────────────────────────────────────────
type LayoutTemplate = 'solution' | 'about-style' | 'custom'

const LAYOUT_OPTIONS: { id: LayoutTemplate; label: string; description: string }[] = [
  { id: 'solution',    label: 'Solution Page',   description: 'Hero · Features · Content · CTA — same layout as solution pages' },
  { id: 'about-style', label: 'About-style Page', description: 'Hero · Story sections · Values · CTA' },
  { id: 'custom',      label: 'Custom Page',      description: 'Hero · Rich body text · CTA — flexible general-purpose layout' },
]

function buildPageDef(slug: string, title: string, layout: LayoutTemplate): PageDef {
  const s = slug  // shorthand
  const label = title

  if (layout === 'solution') {
    return {
      slug, label, icon: '/icon/dashboard icon.png', group: 'Custom', layout: 'solution',
      sections: [
        { id: 'hero', label: 'Hero Section', fields: [
          { key: `${s}_hero_badge`,    label: 'Badge Text',    type: 'text' },
          { key: `${s}_hero_title`,    label: 'Page Title',    type: 'text' },
          { key: `${s}_hero_subtitle`, label: 'Sub-title',     type: 'textarea' },
          { key: `${s}_hero_cta1`,     label: 'Button 1 Text', type: 'text', hint: 'Get Started' },
          { key: `${s}_hero_cta1_url`, label: 'Button 1 URL',  type: 'url' },
          { key: `${s}_hero_cta2`,     label: 'Button 2 Text', type: 'text', hint: 'Contact Sales' },
          { key: `${s}_hero_cta2_url`, label: 'Button 2 URL',  type: 'url' },
          { key: `${s}_hero_image`,    label: 'Hero Image',    type: 'image' },
        ]},
        { id: 'features', label: 'Features Section', fields: [
          { key: `${s}_features_title`,    label: 'Section Title', type: 'text' },
          { key: `${s}_features_subtitle`, label: 'Sub-title',     type: 'textarea' },
          { key: `${s}_features_image`,    label: 'Image',         type: 'image' },
          { key: `${s}_feat1_title`,       label: 'Feature 1',     type: 'text' },
          { key: `${s}_feat1_desc`,        label: 'Feature 1 Desc',type: 'textarea' },
          { key: `${s}_feat2_title`,       label: 'Feature 2',     type: 'text' },
          { key: `${s}_feat2_desc`,        label: 'Feature 2 Desc',type: 'textarea' },
          { key: `${s}_feat3_title`,       label: 'Feature 3',     type: 'text' },
          { key: `${s}_feat3_desc`,        label: 'Feature 3 Desc',type: 'textarea' },
          { key: `${s}_feat4_title`,       label: 'Feature 4',     type: 'text' },
          { key: `${s}_feat4_desc`,        label: 'Feature 4 Desc',type: 'textarea' },
        ]},
        { id: 'content', label: 'Content Section', fields: [
          { key: `${s}_content_title`,     label: 'Section Title',    type: 'text' },
          { key: `${s}_content_highlight`, label: 'Highlighted Text', type: 'textarea' },
          { key: `${s}_content_body`,      label: 'Body Text',        type: 'textarea' },
          { key: `${s}_content_image`,     label: 'Image',            type: 'image' },
          { key: `${s}_card1_title`,       label: 'Card 1 Title',     type: 'text' },
          { key: `${s}_card1_body`,        label: 'Card 1 Body',      type: 'textarea' },
          { key: `${s}_card2_title`,       label: 'Card 2 Title',     type: 'text' },
          { key: `${s}_card2_body`,        label: 'Card 2 Body',      type: 'textarea' },
        ]},
        { id: 'cta', label: 'CTA Section', fields: [
          { key: `${s}_cta_badge`, label: 'Badge',      type: 'text' },
          { key: `${s}_cta_title`, label: 'Title',      type: 'text' },
          { key: `${s}_cta_body`,  label: 'Body',       type: 'textarea' },
          { key: `${s}_cta_btn`,   label: 'Button',     type: 'text', hint: 'Get Started' },
          { key: `${s}_cta_url`,   label: 'Button URL', type: 'url' },
        ]},
      ],
    }
  }

  if (layout === 'about-style') {
    return {
      slug, label, icon: '/icon/business coach icon.png', group: 'Custom', layout: 'about-style',
      sections: [
        { id: 'hero', label: 'Hero', fields: [
          { key: `${s}_hero_title`,    label: 'Page Title', type: 'text' },
          { key: `${s}_hero_subtitle`, label: 'Sub-title',  type: 'textarea' },
          { key: `${s}_hero_image`,    label: 'Hero Image', type: 'image' },
        ]},
        { id: 'story', label: 'Story / Introduction', fields: [
          { key: `${s}_story_title`, label: 'Section Title', type: 'text' },
          { key: `${s}_story_p1`,    label: 'Paragraph 1',   type: 'textarea' },
          { key: `${s}_story_p2`,    label: 'Paragraph 2',   type: 'textarea' },
          { key: `${s}_story_p3`,    label: 'Paragraph 3',   type: 'textarea' },
          { key: `${s}_story_image`, label: 'Section Image', type: 'image' },
        ]},
        { id: 'values', label: 'Values / Highlights', fields: [
          { key: `${s}_values_title`,   label: 'Section Title',  type: 'text' },
          { key: `${s}_value1_title`,   label: 'Item 1 Title',   type: 'text' },
          { key: `${s}_value1_desc`,    label: 'Item 1 Desc',    type: 'textarea' },
          { key: `${s}_value2_title`,   label: 'Item 2 Title',   type: 'text' },
          { key: `${s}_value2_desc`,    label: 'Item 2 Desc',    type: 'textarea' },
          { key: `${s}_value3_title`,   label: 'Item 3 Title',   type: 'text' },
          { key: `${s}_value3_desc`,    label: 'Item 3 Desc',    type: 'textarea' },
          { key: `${s}_value4_title`,   label: 'Item 4 Title',   type: 'text' },
          { key: `${s}_value4_desc`,    label: 'Item 4 Desc',    type: 'textarea' },
        ]},
        { id: 'cta', label: 'CTA', fields: [
          { key: `${s}_cta_badge`, label: 'Badge',      type: 'text' },
          { key: `${s}_cta_title`, label: 'Title',      type: 'text' },
          { key: `${s}_cta_body`,  label: 'Body',       type: 'textarea' },
          { key: `${s}_cta_btn`,   label: 'Button',     type: 'text' },
          { key: `${s}_cta_url`,   label: 'Button URL', type: 'url' },
        ]},
      ],
    }
  }

  // custom
  return {
    slug, label, icon: '/icon/document icon.png', group: 'Custom', layout: 'custom',
    sections: [
      { id: 'hero', label: 'Hero', fields: [
        { key: `${s}_hero_title`,    label: 'Page Title',   type: 'text' },
        { key: `${s}_hero_subtitle`, label: 'Sub-title',    type: 'textarea' },
        { key: `${s}_hero_badge`,    label: 'Badge / Tag',  type: 'text' },
        { key: `${s}_hero_image`,    label: 'Hero Image',   type: 'image' },
        { key: `${s}_hero_cta_text`, label: 'CTA Text',     type: 'text' },
        { key: `${s}_hero_cta_url`,  label: 'CTA URL',      type: 'url' },
      ]},
      { id: 'body', label: 'Body Content', fields: [
        { key: `${s}_body_title`,  label: 'Section Title', type: 'text' },
        { key: `${s}_body_text1`,  label: 'Body Block 1',  type: 'textarea' },
        { key: `${s}_body_text2`,  label: 'Body Block 2',  type: 'textarea' },
        { key: `${s}_body_text3`,  label: 'Body Block 3',  type: 'textarea' },
        { key: `${s}_body_image1`, label: 'Image 1',       type: 'image' },
        { key: `${s}_body_image2`, label: 'Image 2',       type: 'image' },
      ]},
      { id: 'cta', label: 'CTA', fields: [
        { key: `${s}_cta_title`, label: 'CTA Title',  type: 'text' },
        { key: `${s}_cta_body`,  label: 'CTA Body',   type: 'textarea' },
        { key: `${s}_cta_btn`,   label: 'Button',     type: 'text' },
        { key: `${s}_cta_url`,   label: 'Button URL', type: 'url' },
      ]},
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT EXPORT — tab switcher
// ─────────────────────────────────────────────────────────────────────────────
export default function PagesPage() {
  const [tab, setTab] = useState<'list' | 'editor'>('list')
  const [editorRefreshKey, setEditorRefreshKey] = useState(0)

  function openEditorWithRefresh() {
    setEditorRefreshKey(k => k + 1)
    setTab('editor')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pages</h1>
          <p className="text-sm text-gray-500 mt-1">Manage pages and edit content across the site</p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setTab('list')}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${tab === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            <FileText className="w-3.5 h-3.5" /> All Pages
          </button>
          <button onClick={() => setTab('editor')}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${tab === 'editor' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            <Layout className="w-3.5 h-3.5" /> Edit Page Content
          </button>
        </div>
      </div>

      {tab === 'list' ? <PagesList onPageCreated={openEditorWithRefresh} /> : <PageEditor key={editorRefreshKey} />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE LIST
// ─────────────────────────────────────────────────────────────────────────────
interface Page {
  id: number; slug: string; title: string
  meta_description: string | null; is_published: boolean; updated_at: string
}

function PagesList({ onPageCreated }: { onPageCreated: () => void }) {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [newLayout, setNewLayout] = useState<LayoutTemplate>('solution')
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editSlug, setEditSlug] = useState('')
  const [editMeta, setEditMeta] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => { load() }, [])
  async function load() {
    setLoading(true)
    const d = await fetch('/api/admin/pages').then(r => r.json())
    if (d.success) setPages(d.data || [])
    setLoading(false)
  }
  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  async function create() {
    if (!newTitle || !newSlug) return
    setSaving(true)
    const d = await fetch('/api/admin/pages', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, slug: newSlug }),
    }).then(r => r.json())
    if (d.success) {
      // Persist the page definition (layout template) to dynamic_content so
      // the editor can show it without any code changes.
      const pageDef = buildPageDef(newSlug, newTitle, newLayout)
      await fetch('/api/admin/page-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: { [`_page_def__${newSlug}`]: JSON.stringify(pageDef) } }),
      })
      flash('✓ Page created — go to "Edit Page Content" to fill in content')
      setShowAdd(false); setNewTitle(''); setNewSlug(''); setNewLayout('solution')
      load()
      onPageCreated()
    } else {
      flash('✗ ' + d.error)
    }
    setSaving(false)
  }

  async function togglePublish(page: Page) {
    await fetch(`/api/admin/pages/${page.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !page.is_published }),
    })
    flash(`✓ ${page.is_published ? 'Unpublished' : 'Published'}`)
    load()
  }

  async function saveEdit(id: number) {
    setSaving(true)
    await fetch(`/api/admin/pages/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, slug: editSlug, meta_description: editMeta }),
    })
    flash('✓ Saved'); setEditingId(null); load(); setSaving(false)
  }

  async function deletePage(id: number, title: string) {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
    flash('✓ Deleted'); load()
  }

  const filtered = pages.filter(p =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pages…"
            className="text-sm outline-none flex-1" />
        </div>
        <div className="flex gap-3 items-center ml-auto">
          {msg && <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</span>}
          <button onClick={() => setShowAdd(v => !v)}
            className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Plus className="w-3.5 h-3.5" /> New Page
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-white border border-blue-200 rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h2 className="font-semibold text-gray-800 text-sm">New Page</h2>
          </div>

          {/* Title + Slug */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Title</label>
              <input value={newTitle}
                onChange={e => { setNewTitle(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) }}
                placeholder="Services" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">URL Slug</label>
              <div className="flex items-center gap-1 border border-gray-200 rounded-md px-3 py-2">
                <span className="text-xs text-gray-400 flex-shrink-0">/</span>
                <input value={newSlug} onChange={e => setNewSlug(e.target.value)} placeholder="services"
                  className="flex-1 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Layout picker */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Page Layout</label>
            <div className="grid grid-cols-3 gap-2">
              {LAYOUT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setNewLayout(opt.id)}
                  className={`text-left p-3 rounded-lg border-2 transition-colors ${newLayout === opt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  <p className={`text-xs font-semibold mb-1 ${newLayout === opt.id ? 'text-blue-700' : 'text-gray-700'}`}>
                    {opt.label}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-snug">{opt.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button onClick={create} disabled={saving || !newTitle || !newSlug}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
              {saving ? 'Creating…' : 'Create'}
            </button>
            <button onClick={() => setShowAdd(false)} className="text-sm border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_110px_100px_130px] gap-x-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
          {['Title / Slug', 'Status', 'Updated', 'Actions'].map(h => (
            <span key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {loading ? (
          <div className="divide-y divide-gray-50">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="grid grid-cols-[1fr_110px_100px_130px] gap-x-4 px-5 py-4">
                {[...Array(4)].map((_, j) => <div key={j} className="h-4 bg-gray-100 rounded animate-pulse" />)}
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-400 px-5 py-10 text-center">No pages found.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map(page => (
              <div key={page.id}>
                {editingId === page.id ? (
                  <div className="px-5 py-4 space-y-3 bg-blue-50/40">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Title</label>
                        <input value={editTitle} onChange={e => setEditTitle(e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Slug</label>
                        <input value={editSlug} onChange={e => setEditSlug(e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Meta Description</label>
                        <input value={editMeta} onChange={e => setEditMeta(e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(page.id)} disabled={saving}
                        className="flex items-center gap-1 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md">
                        <Check className="w-3 h-3" /> {saving ? '…' : 'Save'}
                      </button>
                      <button onClick={() => setEditingId(null)}
                        className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50">
                        <X className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-[1fr_110px_100px_130px] gap-x-4 px-5 py-3.5 hover:bg-gray-50 items-center">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{page.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">/{page.slug}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium w-fit ${page.is_published ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      {page.is_published ? 'Published' : 'Draft'}
                    </span>
                    <p className="text-xs text-gray-400">{new Date(page.updated_at).toLocaleDateString()}</p>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditingId(page.id); setEditTitle(page.title); setEditSlug(page.slug); setEditMeta(page.meta_description || '') }}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => togglePublish(page)}
                        className={`p-1.5 rounded transition-colors ${page.is_published ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}
                        title={page.is_published ? 'Unpublish' : 'Publish'}>
                        {page.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                      <a href={`/${page.slug === 'home' ? '' : page.slug}`} target="_blank"
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button onClick={() => deletePage(page.id, page.title)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE CONTENT EDITOR — every page, every section, every field
// ─────────────────────────────────────────────────────────────────────────────
function PageEditor() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [allPageDefs, setAllPageDefs] = useState<PageDef[]>(PAGE_DEFS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [uploading, setUploading] = useState<string | null>(null)
  const [activePage, setActivePage] = useState('home')
  const [activeSection, setActiveSection] = useState('hero')
  const [search, setSearch] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const d = await fetch('/api/admin/page-content').then(r => r.json())
    if (d.success) {
      const map: Record<string, string> = {}
      const customDefs: PageDef[] = []
      for (const row of (d.data || [])) {
        map[row.key_name] = row.value ?? ''
        // Detect saved page definitions (keys like _page_def__my-slug)
        if (row.key_name.startsWith('_page_def__') && row.value) {
          try {
            const def = JSON.parse(row.value) as PageDef
            // Only add if not already in built-in PAGE_DEFS
            if (!PAGE_DEFS.find(p => p.slug === def.slug)) {
              customDefs.push(def)
            }
          } catch { /* skip malformed */ }
        }
      }
      setValues(map)
      if (customDefs.length > 0) {
        setAllPageDefs([...PAGE_DEFS, ...customDefs])
      }
    }
    setLoading(false)
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }
  function set(key: string, val: string) { setValues(p => ({ ...p, [key]: val })) }

  async function save() {
    setSaving(true)
    // Collect only the keys that belong to the currently active page so we
    // don't blast the entire values map (which includes _page_def__ blobs and
    // every other page's fields) on every click.
    const pageKeys = currentPageDef
      ? new Set(currentPageDef.sections.flatMap(s => s.fields.map(f => f.key)))
      : null
    const payload = pageKeys
      ? Object.fromEntries(Object.entries(values).filter(([k]) => pageKeys.has(k)))
      : values
    const d = await fetch('/api/admin/page-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: payload, slug: activePage }),
    }).then(r => r.json())
    flash(d.success ? '✓ Saved — refresh site to see changes' : '✗ ' + d.error)
    setSaving(false)
  }

  async function uploadImage(key: string, file: File) {
    setUploading(key)
    const form = new FormData()
    form.append('file', file); form.append('folder', 'pages')
    const d = await fetch('/api/admin/media/upload', { method: 'POST', body: form }).then(r => r.json())
    if (d.success) set(key, d.data.file_url)
    setUploading(null)
  }

  const filteredPages = allPageDefs.filter(p =>
    !search || p.label.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase())
  )

  const currentPageDef = allPageDefs.find(p => p.slug === activePage)
  const currentSection = currentPageDef?.sections.find(s => s.id === activeSection)

  // When switching page, reset to first section
  function switchPage(slug: string) {
    setActivePage(slug)
    const def = allPageDefs.find(p => p.slug === slug)
    if (def?.sections.length) setActiveSection(def.sections[0].id)
  }

  // All groups present in the merged defs
  const allGroups = Array.from(new Set(allPageDefs.map(p => p.group)))

  return (
    <div className="flex gap-4" style={{ height: 'calc(100vh - 13rem)' }}>

      {/* ── Column 1: Page list ── */}
      <aside className="w-52 flex-shrink-0 bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
        <div className="px-3 py-2.5 border-b border-gray-100">
          <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1">
            <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find page…"
              className="text-xs outline-none flex-1 min-w-0" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {allGroups.map(group => {
            const groupPages = filteredPages.filter(p => p.group === group)
            if (!groupPages.length) return null
            return (
              <div key={group}>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-1.5 mt-1">{group}</p>
                {groupPages.map(p => (
                  <button key={p.slug} onClick={() => switchPage(p.slug)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${activePage === p.slug ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    {p.group === 'Custom'
                      ? <Globe className="w-4 h-4 flex-shrink-0 text-purple-400" />
                      : <img src={p.icon} alt="" className="w-4 h-4 object-contain flex-shrink-0" />}
                    <span className="text-xs font-medium truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      </aside>

      {/* ── Column 2: Section list ── */}
      <aside className="w-44 flex-shrink-0 bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
        <div className="px-3 py-2.5 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500">Sections</p>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {currentPageDef?.sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${activeSection === s.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-xs font-medium truncate">{s.label}</span>
              {activeSection === s.id && <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0" />}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Column 3: Field editor ── */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            {currentPageDef && (
              <>
                {currentPageDef.group === 'Custom'
                  ? <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  : <img src={currentPageDef.icon} alt="" className="w-4 h-4 object-contain flex-shrink-0" />}
                <span className="text-sm font-semibold text-gray-700 truncate">{currentPageDef.label}</span>
                <span className="text-gray-300 flex-shrink-0">›</span>
                <span className="text-sm text-gray-500 truncate">{currentSection?.label}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {msg && <span className={`text-xs px-2 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</span>}
            <a href={`/${activePage === 'home' ? '' : activePage}`} target="_blank"
              className="flex items-center gap-1 text-xs border border-gray-200 px-2.5 py-1.5 rounded hover:bg-gray-50">
              <ExternalLink className="w-3 h-3" /> View
            </a>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50">
              <Save className="w-3 h-3" /> {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3.5 w-24 bg-gray-100 rounded animate-pulse" />
                  <div className="h-9 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : currentSection ? (
            <div className="space-y-5 max-w-2xl">
              {currentSection.fields.map(field => (
                <div key={field.key}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    {field.hint && <span className="text-xs text-gray-400">{field.hint}</span>}
                  </div>

                  {field.type === 'image' && (
                    <div className="space-y-2">
                      {values[field.key] && (
                        <img src={values[field.key]} alt="" className="h-20 rounded-lg border border-gray-200 object-cover" />
                      )}
                      <div className="flex gap-2">
                        <label className={`flex items-center gap-2 cursor-pointer text-xs px-3 py-2 rounded border transition-colors ${uploading === field.key ? 'bg-gray-100 text-gray-400 border-gray-200' : 'text-blue-600 border-blue-200 hover:bg-blue-50'}`}>
                          <Upload className="w-3.5 h-3.5" />
                          {uploading === field.key ? 'Uploading…' : 'Upload'}
                          <input type="file" accept="image/*" className="hidden" disabled={!!uploading}
                            onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(field.key, f) }} />
                        </label>
                        <input value={values[field.key] ?? ''} onChange={e => set(field.key, e.target.value)}
                          placeholder="Or paste URL"
                          className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
                      </div>
                    </div>
                  )}

                  {field.type === 'textarea' && (
                    <textarea value={values[field.key] ?? ''} onChange={e => set(field.key, e.target.value)} rows={3}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none" />
                  )}

                  {(field.type === 'text' || field.type === 'url' || field.type === 'color') && (
                    <div className="flex gap-2">
                      {field.type === 'color' && (
                        <input type="color" value={values[field.key] || '#000000'} onChange={e => set(field.key, e.target.value)}
                          className="w-10 h-9 border border-gray-200 rounded p-0.5 cursor-pointer flex-shrink-0" />
                      )}
                      <input type={field.type === 'url' ? 'url' : 'text'} value={values[field.key] ?? ''}
                        onChange={e => set(field.key, e.target.value)}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-gray-100">
                <button onClick={save} disabled={saving}
                  className="flex items-center gap-2 bg-blue-600 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'Saving…' : `Save ${currentSection.label}`}
                </button>
                <p className="text-xs text-gray-400 mt-1.5">Saved values override the defaults on the live site.</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Select a page and section to edit.</p>
          )}
        </div>
      </div>
    </div>
  )
}
