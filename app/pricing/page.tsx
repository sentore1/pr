'use client'

import { Check, Minus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { SimpleFooter } from '@/components/simple-footer'
import { CmsBlocks } from '@/components/cms-blocks'
import { Header } from '@/components/header'
import { useCMS } from '@/components/cms-provider'
import { DEFAULTS } from '@/lib/page-content'

export default function Pricing() {
  const cms = useCMS()
  const pv: Record<string, string> = { ...DEFAULTS, ...(cms?.pageContent || {}) }

  const [billing, setBilling] = useState<'annually' | 'monthly'>('annually')

  const plans = [
    {
      name:     pv['plan_basic_name']     || 'Basic',
      price:    pv['plan_basic_price']    || '$0',
      period:   pv['plan_basic_period']   || 'Free forever',
      users:    pv['plan_basic_users']    || '2',
      invoices: pv['plan_basic_invoices'] || '100/mo',
      features: [
        pv['plan_basic_feat1'] || 'Time Tracking',
        pv['plan_basic_feat2'] || 'CRM',
      ].filter(Boolean),
      cta:  pv['plan_basic_cta'] || 'Get started',
      link: pv['plan_basic_url'] || 'https://login.pryro.com',
    },
    {
      name:    pv['plan_premium_name']   || 'Premium',
      price:   billing === 'annually' ? (pv['plan_premium_price_annual'] || '$29') : (pv['plan_premium_price_monthly'] || '$50'),
      period:  pv['plan_premium_period'] || 'Per workspace',
      users:   pv['plan_premium_users']  || '20',
      invoices: 'Unlimited',
      features: [
        pv['plan_premium_feat1'] || 'Time Tracking',
        pv['plan_premium_feat2'] || 'CRM',
        pv['plan_premium_feat3'] || 'HR Management',
        pv['plan_premium_feat4'] || 'POS',
        pv['plan_premium_feat5'] || 'AI Reports',
        pv['plan_premium_feat6'] || 'Invoice Link',
      ].filter(Boolean),
      cta:     pv['plan_premium_cta'] || 'Upgrade',
      link:    pv['plan_premium_url'] || 'https://login.pryro.com',
      popular: true as const,
    },
    {
      name:    pv['plan_business_name']   || 'Business',
      price:   billing === 'annually' ? (pv['plan_business_price_annual'] || '$79') : (pv['plan_business_price_monthly'] || '$99'),
      period:  pv['plan_business_period'] || 'Up to 100 users',
      users:   pv['plan_business_users']  || '100',
      invoices: 'Unlimited',
      features: [
        pv['plan_business_feat1'] || 'Everything in Premium',
        pv['plan_business_feat2'] || 'Advanced Security',
        pv['plan_business_feat3'] || 'Phone & Chat Support',
      ].filter(Boolean),
      cta:  pv['plan_business_cta'] || 'Get Business',
      link: pv['plan_business_url'] || 'https://login.pryro.com',
    },
    {
      name:    pv['plan_enterprise_name']   || 'Enterprise',
      price:   pv['plan_enterprise_price']  || 'Custom',
      period:  pv['plan_enterprise_period'] || 'Contact sales',
      users:   pv['plan_enterprise_users']  || 'Unlimited',
      invoices: 'Unlimited',
      features: [
        pv['plan_enterprise_feat1'] || 'Everything in Business',
        pv['plan_enterprise_feat2'] || 'Custom Webhooks',
        pv['plan_enterprise_feat3'] || 'Dedicated Support',
      ].filter(Boolean),
      cta:  pv['plan_enterprise_cta'] || 'Contact sales',
      link: pv['plan_enterprise_url'] || '/contact',
    },
  ]

  const comparisonRows = [
    { name: pv['cmp_row1_name']  || 'Users',             desc: pv['cmp_row1_desc']  || 'Team members with full access',          basic: pv['plan_basic_users'] || '2',         premium: pv['plan_premium_users'] || '20',    business: pv['plan_business_users'] || '100', enterprise: pv['plan_enterprise_users'] || 'Unlimited' },
    { name: pv['cmp_row2_name']  || 'Projects',          desc: pv['cmp_row2_desc']  || 'Active projects you can manage',         basic: 'Unlimited', premium: 'Unlimited', business: 'Unlimited', enterprise: 'Unlimited' },
    { name: pv['cmp_row3_name']  || 'Invoices',          desc: pv['cmp_row3_desc']  || 'Professional invoices per month',        basic: pv['plan_basic_invoices'] || '100/mo',  premium: 'Unlimited', business: 'Unlimited', enterprise: 'Unlimited' },
    { name: pv['cmp_row4_name']  || 'Time Tracking',     desc: pv['cmp_row4_desc']  || 'Log hours and track billable time',      basic: true,  premium: true,  business: true,  enterprise: true },
    { name: pv['cmp_row5_name']  || 'CRM',               desc: pv['cmp_row5_desc']  || 'Manage clients and deal pipelines',      basic: true,  premium: true,  business: true,  enterprise: true },
    { name: pv['cmp_row6_name']  || 'HR Management',     desc: pv['cmp_row6_desc']  || 'Payroll, leaves, employee records',      basic: false, premium: true,  business: true,  enterprise: true },
    { name: pv['cmp_row7_name']  || 'POS',               desc: pv['cmp_row7_desc']  || 'Point-of-sale for retail & hospitality', basic: false, premium: true,  business: true,  enterprise: true },
    { name: pv['cmp_row8_name']  || 'AI Reports',        desc: pv['cmp_row8_desc']  || 'Smart insights generated automatically', basic: false, premium: true,  business: true,  enterprise: true },
    { name: pv['cmp_row9_name']  || 'Invoice Link',      desc: pv['cmp_row9_desc']  || 'Share payment links with clients',       basic: false, premium: true,  business: false, enterprise: true },
    { name: pv['cmp_row10_name'] || 'Custom Webhooks',   desc: pv['cmp_row10_desc'] || 'Connect to external apps via webhooks',  basic: false, premium: false, business: false, enterprise: true },
    { name: pv['cmp_row11_name'] || 'Advanced Security', desc: pv['cmp_row11_desc'] || 'SSO, audit logs and access controls',    basic: false, premium: false, business: true,  enterprise: true },
    { name: pv['cmp_row12_name'] || 'Support',           desc: pv['cmp_row12_desc'] || 'How we help when you need us',           basic: pv['cmp_row12_basic'] || 'Email', premium: pv['cmp_row12_premium'] || 'Priority', business: pv['cmp_row12_business'] || 'Phone & Chat', enterprise: pv['cmp_row12_enterprise'] || 'Dedicated' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ── */}
      <section className="pt-40 pb-16 px-4 bg-white">
        <div className="mx-auto max-w-2xl space-y-5 text-center">
          <div className="text-xs uppercase tracking-[0.15em] text-[#4a5568]">
            {pv['pricing_tag'] || 'PRICING'}
          </div>
          <h1 className="text-4xl font-bold lg:text-5xl text-gray-900 leading-tight">
            {(pv['pricing_hero_title'] || pv['pricing_title'] || 'Simple plans\nfor serious work')
              .split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            {pv['pricing_hero_subtitle'] || 'Pryro is evolving to be more than just software. One platform to manage your entire business — finances, HR, projects, and more.'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-1 bg-black/5 rounded-[9px] p-1">
            <button
              onClick={() => setBilling('annually')}
              className={`text-sm font-medium px-5 py-2 rounded-[6px] transition-all duration-200 ${billing === 'annually' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-white/60'}`}
            >
              Annually
            </button>
            <button
              onClick={() => setBilling('monthly')}
              className={`text-sm font-medium px-5 py-2 rounded-[6px] transition-all duration-200 ${billing === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-white/60'}`}
            >
              Monthly
            </button>
          </div>

        </div>
      </section>

      {/* ── Mobile plan cards ── */}
      <section className="lg:hidden px-4 py-10 bg-white space-y-4 max-w-xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 relative ${
              'popular' in plan ? 'border-blue-500 bg-blue-50/30 shadow-md' : 'border-gray-200 bg-white'
            }`}
          >
            {'popular' in plan && (
              <span className="absolute -top-2.5 right-4 bg-green-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full text-white">
                {billing === 'annually' ? (pv['pricing_save_badge'] || 'Save 20%') : 'Most Popular'}
              </span>
            )}
            <div className="text-center mb-5">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{plan.name}</h3>
              {/* Animate price digits for Premium (idx=1) and Business (idx=2) */}
              {(idx === 1 || idx === 2) ? (
                <div className="text-3xl font-bold text-gray-900 flex items-baseline justify-center gap-0.5">
                  <span className="flex items-center overflow-hidden h-9">
                    {plan.price.split('').map((char, i) => (
                      <span
                        key={`${billing}-${idx}-${i}`}
                        className="inline-block animate-[slideUp_0.3s_ease-out_both]"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="text-base font-normal text-gray-500">/mo</span>
                </div>
              ) : (
                <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">{plan.period}</div>
            </div>
            <div className="space-y-2 mb-5 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Users</span>
                <span className="font-medium text-gray-900">{plan.users}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Projects</span>
                <span className="font-medium text-gray-900">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Invoices</span>
                <span className="font-medium text-gray-900">{plan.invoices}</span>
              </div>
            </div>
            <div className="mb-5">
              <div className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Key Features</div>
              <ul className="space-y-1.5">
                {plan.features.map((feat, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={plan.link}>
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                  'popular' in plan
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {plan.cta}
              </button>
            </Link>
          </div>
        ))}
      </section>

      {/* ── Desktop comparison table ── */}
      <section className="hidden lg:block px-4 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">

          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_repeat(4,1fr)]">
            <div className="p-6 flex flex-col justify-end border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                {pv['pricing_compare_title'] || 'Compare plans'}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                {pv['pricing_compare_subtitle'] || 'Pick the right plan for your team.'}
              </p>
            </div>

            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`p-6 text-center border-b border-l border-gray-200 relative ${idx === 1 ? 'bg-gray-50' : ''}`}
              >
                {idx === 1 && billing === 'annually' && (
                  <span className="absolute top-3 right-3 bg-green-400 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white">
                    {pv['pricing_save_badge'] || 'Save 20%'}
                  </span>
                )}
                <p className="font-semibold text-gray-900 text-sm mb-1">{plan.name}</p>
                {/* Animate price digits on toggle for Premium (idx=1) and Business (idx=2) */}
                {(idx === 1 || idx === 2) ? (
                  <p className="text-2xl font-bold text-gray-900 mt-1 flex items-baseline justify-center gap-0.5">
                    <span className="flex items-center overflow-hidden h-8">
                      {plan.price.split('').map((char, i) => (
                        <span
                          key={`${billing}-${idx}-${i}`}
                          className="inline-block animate-[slideUp_0.3s_ease-out_both]"
                          style={{ animationDelay: `${i * 60}ms` }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                    <span className="text-sm font-normal text-gray-500">/mo</span>
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 mt-1">{plan.price}</p>
                )}
                <p className="text-xs text-gray-500 mt-0.5">{plan.period}</p>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {comparisonRows.map((row) => (
            <div key={row.name} className="grid grid-cols-[1.4fr_repeat(4,1fr)] border-t border-gray-100">
              <div className="p-4 flex items-center gap-3">
                <p className="text-sm font-medium text-gray-900">{row.name}</p>
                <p className="text-xs text-gray-400">{row.desc}</p>
              </div>

              {(['basic', 'premium', 'business', 'enterprise'] as const).map((tier, idx) => (
                <div
                  key={tier}
                  className={`border-l border-gray-100 p-4 flex items-center justify-center text-sm ${idx === 1 ? 'bg-gray-50' : ''}`}
                >
                  {typeof row[tier] === 'boolean'
                    ? row[tier]
                      ? <Check className="w-4 h-4 text-gray-400" />
                      : <Minus className="w-4 h-4 text-gray-300" />
                    : <span className={`text-gray-900 ${idx === 1 ? 'font-medium' : ''}`}>{row[tier] as string}</span>
                  }
                </div>
              ))}
            </div>
          ))}

          {/* CTA row */}
          <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] border-t border-gray-100">
            <div className="p-5">
              <p className="text-sm font-semibold text-gray-900">
                {pv['pricing_cta_heading'] || 'Ready to get started?'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {pv['pricing_cta_subtext'] || 'No credit card required for Basic.'}
              </p>
            </div>
            {plans.map((plan, idx) => (
              <div key={plan.name} className={`border-l border-gray-100 p-4 ${idx === 1 ? 'bg-gray-50' : ''}`}>
                <Link href={plan.link}>
                  <button
                    className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
                      idx === 1
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          {pv['pricing_trust_line'] || 'Trusted by 64,000+ businesses, startups, NGOs, and studios'}
        </p>
      </section>

      <CmsBlocks slug="pricing" />
      <SimpleFooter />
    </div>
  )
}
