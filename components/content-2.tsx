import { Cpu, Zap, Shield, Lock, Users, Briefcase } from 'lucide-react'
import Image from 'next/image'

interface ContentSectionProps {
    variant?: 'default' | 'accounting' | 'project' | 'hr' | 'stock'
}

export default function ContentSection({ variant = 'default' }: ContentSectionProps) {
    const content = variant === 'accounting' ? {
        title: 'The Pryro ecosystem brings together powerful accounting tools.',
        description1: 'Pryro is more than just software. ',
        highlight: 'It\'s a complete accounting practice management platform',
        description2: ' — designed to help accountants and bookkeepers serve their clients better.',
        description3: 'From client onboarding to financial reporting, Pryro provides the tools and features helping accounting professionals manage multiple clients efficiently and deliver exceptional service.',
        features: [
            { icon: Shield, title: 'Secure', description: 'Bank-level security to protect sensitive client financial data.' },
            { icon: Zap, title: 'Efficient', description: 'Automate repetitive tasks and focus on high-value client work.' }
        ],
        image: '/99.png'
    } : variant === 'project' ? {
        title: 'The Pryro ecosystem brings together powerful project management tools.',
        description1: 'Pryro is more than just software. ',
        highlight: 'It\'s a complete project management platform',
        description2: ' — designed to help teams deliver projects successfully.',
        description3: 'From project planning to delivery, Pryro provides the tools and features helping teams collaborate effectively, track progress, and meet deadlines consistently.',
        features: [
            { icon: Zap, title: 'Agile', description: 'Flexible workflows that adapt to your team\'s methodology.' },
            { icon: Cpu, title: 'Integrated', description: 'All project tools in one platform for seamless collaboration.' }
        ],
        image: '/66.png'
    } : variant === 'hr' ? {
        title: 'The Pryro ecosystem brings together powerful HR tools.',
        description1: 'Pryro is more than just software. ',
        highlight: 'It\'s a complete human resource management platform',
        description2: ' — designed to help HR teams manage their workforce effectively.',
        description3: 'From recruitment to retirement, Pryro provides the tools and features helping HR professionals streamline operations, engage employees, and build stronger teams.',
        features: [
            { icon: Users, title: 'People-First', description: 'Tools designed to enhance employee experience and engagement.' },
            { icon: Zap, title: 'Automated', description: 'Streamline HR processes from onboarding to payroll management.' }
        ],
        image: '/11112.png'
    } : variant === 'stock' ? {
        title: 'The Pryro ecosystem brings together powerful inventory tools.',
        description1: 'Pryro is more than just software. ',
        highlight: 'It\'s a complete inventory management platform',
        description2: ' — designed to help businesses optimize their stock levels.',
        description3: 'From stock tracking to demand forecasting, Pryro provides the tools and features helping businesses reduce costs, prevent stockouts, and improve inventory turnover.',
        features: [
            { icon: Briefcase, title: 'Organized', description: 'Multi-location tracking with real-time visibility across warehouses.' },
            { icon: Zap, title: 'Smart', description: 'AI-powered forecasting to optimize reorder points and stock levels.' }
        ],
        image: '/77.png'
    } : {
        title: 'The Pryro ecosystem brings together powerful business tools.',
        description1: 'Pryro is more than just software. ',
        highlight: 'It\'s a complete business management platform',
        description2: ' — designed to help businesses grow.',
        description3: 'From financial management to customer relations, Pryro provides the tools and features helping businesses operate efficiently and scale successfully.',
        features: [
            { icon: Zap, title: 'Fast', description: 'Quick setup and intuitive interface to get your business running smoothly.' },
            { icon: Cpu, title: 'Powerful', description: 'Comprehensive features to manage every aspect of your business.' }
        ],
        image: '/dashboard-screenshot.png'
    }

    return (
        <section className="py-32 md:py-64">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-gray-900">{content.title}</h2>
                <div className="relative">
                    <div className="relative z-10 space-y-4 md:w-1/2">
                        <p className="text-gray-600">
                            {content.description1}<span className="font-medium text-gray-900">{content.highlight}</span>{content.description2}
                        </p>
                        <p className="text-gray-600">{content.description3}</p>

                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            {content.features.map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Icon className="size-4" />
                                            <h3 className="text-sm font-medium text-gray-900">{feature.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="md:mask-l-from-35% md:mask-l-to-55% mt-12 h-fit md:absolute md:-inset-y-12 md:inset-x-0 md:mt-0">
                        <div className="border-border/50 relative rounded-[5px] border border-dotted p-2">
                            <img
                                src={content.image}
                                className="rounded-[5px]"
                                alt="dashboard"
                                width={1207}
                                height={929}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
