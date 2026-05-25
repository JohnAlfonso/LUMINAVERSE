export type FieldType = 'tech' | 'selling' | 'shop' | 'production' | 'industry' | 'medical' | 'education' | 'finance' | 'marketing'

export const FIELD_INFO: Record<FieldType, { label: string; color: string; icon: string; description: string }> = {
  tech: { label: 'Technology', color: 'from-blue-500 to-cyan-500', icon: '💻', description: 'Tech innovations & software' },
  selling: { label: 'Sales & Selling', color: 'from-green-500 to-emerald-500', icon: '💰', description: 'Sales strategies & techniques' },
  shop: { label: 'Shopping & Retail', color: 'from-pink-500 to-rose-500', icon: '🛍️', description: 'Retail & e-commerce' },
  production: { label: 'Production', color: 'from-orange-500 to-amber-500', icon: '🏭', description: 'Manufacturing & production' },
  industry: { label: 'Industry', color: 'from-slate-500 to-gray-500', icon: '⚙️', description: 'Industrial solutions' },
  medical: { label: 'Medical & Health', color: 'from-red-500 to-pink-500', icon: '🏥', description: 'Healthcare & wellness' },
  education: { label: 'Education', color: 'from-purple-500 to-indigo-500', icon: '📚', description: 'Learning & development' },
  finance: { label: 'Finance', color: 'from-yellow-500 to-orange-500', icon: '💵', description: 'Financial insights' },
  marketing: { label: 'Marketing', color: 'from-violet-500 to-purple-500', icon: '📢', description: 'Marketing strategies' }
}

export const FIELD_CATEGORIES: Record<FieldType, string[]> = {
  tech: ['AI/ML', 'Web Dev', 'Mobile', 'Cloud', 'DevOps', 'Cybersecurity', 'Data Science'],
  selling: ['B2B Sales', 'B2C Sales', 'Negotiation', 'Lead Generation', 'CRM', 'Sales Funnel', 'Closing Deals'],
  shop: ['E-commerce', 'Retail', 'Customer Service', 'Inventory', 'Pricing', 'Promotions', 'Supply Chain'],
  production: ['Manufacturing', 'Quality Control', 'Supply Chain', 'Automation', 'Lean', 'Six Sigma', 'Safety'],
  industry: ['Industrial IoT', 'Maintenance', 'Equipment', 'Efficiency', 'Sustainability', 'Compliance', 'Robotics'],
  medical: ['Healthcare', 'Medicine', 'Nursing', 'Wellness', 'Nutrition', 'Mental Health', 'Research'],
  education: ['Teaching', 'Online Learning', 'Curriculum', 'Student Success', 'EdTech', 'Training', 'Development'],
  finance: ['Investment', 'Banking', 'Cryptocurrency', 'Insurance', 'Accounting', 'Trading', 'Wealth Management'],
  marketing: ['Content', 'SEO', 'Social Media', 'Email', 'Analytics', 'Branding', 'Advertising']
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  field: FieldType
  category: string
  image?: string
  readTime: number
}

export type SortType = 'newest' | 'oldest' | 'popular'
