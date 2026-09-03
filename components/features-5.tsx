import { Activity, DraftingCompass, Mail, Zap, Calculator, FileText, Users2, BarChart3, CheckSquare, Calendar, Target, GitBranch, UserCheck, Clock, Award, TrendingUp as TrendingUpIcon, Package, AlertCircle, BarChart2, RefreshCw } from 'lucide-react'
import Image from 'next/image'

interface FeaturesSectionProps {
    variant?: 'default' | 'accounting' | 'project' | 'hr' | 'stock'
}

export default function FeaturesSection({ variant = 'default' }: FeaturesSectionProps) {
    const content = variant === 'accounting' ? {
        title: 'Professional Accounting Solutions',
        description: 'Streamline your accounting practice with tools designed for managing multiple clients efficiently.',
        features: [
            { icon: Calculator, text: 'Multi-client bookkeeping' },
            { icon: FileText, text: 'Automated financial statements' },
            { icon: Users2, text: 'Client portal access' },
            { icon: BarChart3, text: 'Advanced reporting & analytics' }
        ],
        image: '/moreimages/company instute.jpg'
    } : variant === 'project' ? {
        title: 'Complete Project Management',
        description: 'Deliver projects on time with comprehensive tools for planning, tracking, and team collaboration.',
        features: [
            { icon: CheckSquare, text: 'Task & milestone tracking' },
            { icon: Calendar, text: 'Timeline & Gantt charts' },
            { icon: Target, text: 'Resource allocation' },
            { icon: GitBranch, text: 'Workflow automation' }
        ],
        image: '/moreimages/pryromeeting.jpg'
    } : variant === 'hr' ? {
        title: 'Modern HR Management',
        description: 'Empower your workforce with comprehensive tools for employee management and engagement.',
        features: [
            { icon: UserCheck, text: 'Employee onboarding & records' },
            { icon: Clock, text: 'Time & attendance tracking' },
            { icon: Award, text: 'Performance management' },
            { icon: TrendingUpIcon, text: 'Payroll & benefits administration' }
        ],
        image: '/moreimages/meeting hs.jpg'
    } : variant === 'stock' ? {
        title: 'Smart Inventory Control',
        description: 'Optimize stock levels and reduce costs with intelligent inventory management tools.',
        features: [
            { icon: Package, text: 'Real-time stock tracking' },
            { icon: AlertCircle, text: 'Low stock alerts & reordering' },
            { icon: BarChart2, text: 'Inventory analytics & forecasting' },
            { icon: RefreshCw, text: 'Multi-location management' }
        ],
        image: '/moreimages/pryro shop.jpg'
    } : {
        title: 'Simplified Business Management',
        description: 'Focus on growing your business while Pryro handles the complexity of daily operations.',
        features: [
            { icon: Mail, text: 'Easy invoicing and payment tracking' },
            { icon: Zap, text: 'Real-time financial reporting' },
            { icon: Activity, text: 'Inventory management' },
            { icon: DraftingCompass, text: 'Customer relationship tools' }
        ],
        image: '/moreimages/officeworks.jpg'
    }

    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                    <div className="lg:col-span-2">
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-semibold lg:text-5xl text-gray-900">{content.title}</h2>
                            <p className="mt-6 text-gray-600">{content.description}</p>
                        </div>
                        <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3 text-gray-900">
                            {content.features.map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <li key={index}>
                                        <Icon className="size-5" />
                                        {feature.text}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="border-border/50 relative rounded-[5px] border p-3 lg:col-span-3">
                        <div className="aspect-video relative rounded-[5px] overflow-hidden">
                            <img src={content.image} className="rounded-[5px] w-full h-full object-cover" alt="business management" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
