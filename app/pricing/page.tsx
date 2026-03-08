'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Pricing() {
    const [billing, setBilling] = useState('annual')

    return (
        <div className="min-h-screen bg-white">
            <Header />

        <section className="pt-40 pb-32 px-4 bg-gray-50">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl text-gray-900">Pricing that Scales with You</h1>
                    <p className="text-gray-600">Pryro is evolving to be more than just the software. It supports an entire to the business edge of brain and platforms helping your staff, businesses innovate and grow.</p>
                </div>

                <div className="flex justify-center mt-8">
                    <div className="inline-flex bg-white rounded-full p-1 border border-gray-200">
                        <button onClick={() => setBilling('annual')} className={`px-6 py-2 rounded-full text-sm transition-all ${billing === 'annual' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}>Annual</button>
                        <button onClick={() => setBilling('monthly')} className={`px-6 py-2 rounded-full text-sm transition-all ${billing === 'monthly' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}>Monthly</button>
                    </div>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-5 md:gap-0">
                    <div className="rounded-lg flex flex-col justify-between space-y-8 border border-gray-200 bg-white p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
                        <div className="space-y-4">
                            <div>
                                <h2 className="font-medium text-gray-900">Free</h2>
                                <span className="my-3 block text-2xl font-semibold text-gray-900">$0 / mo</span>
                                <p className="text-gray-500 text-sm">Per user</p>
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full">
                                <Link href="https://login.pryro.com">Get Started</Link>
                            </Button>

                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm text-gray-700">
                                {['Unlimited projects', '2 limited users', 'Time tracking', 'CRM', '100 limited invoice'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3 text-gray-900" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:col-span-3 lg:p-10">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="font-medium text-gray-900">Pro</h2>
                                    <span className="my-3 block text-2xl font-semibold text-gray-900">${billing === 'annual' ? '29' : '50'} / mo</span>
                                    <p className="text-gray-500 text-sm">Per user</p>
                                </div>

                                <Button
                                    asChild
                                    className="w-full">
                                    <Link href="https://login.pryro.com">Get Started</Link>
                                </Button>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-900">Everything in free plus :</div>

                                <ul className="mt-4 list-outside space-y-3 text-sm text-gray-700">
                                    {['Everything in Basic', 'Invoices & payments', 'Expense tracking', ' HR, CRM and POS','AI report',' Envoice Link','Income tracking', 'Scheduling','Priority Support','Custom data import', 'Advanced onboarding', 'Hubspot integration', 'Timesheets'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3 text-gray-900" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
        </div>
    )
}
