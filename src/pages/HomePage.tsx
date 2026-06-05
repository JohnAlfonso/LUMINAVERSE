import { useState, useMemo } from 'react'
import { Search, ChevronsUpDown, Zap } from 'lucide-react'
import { Article, FieldType, FIELD_INFO, FIELD_CATEGORIES } from '../types'
import Header from '../components/Header'
import ArticleCard from '../components/ArticleCard'

interface HomePageProps {
  articles: Article[]
  selectedField: FieldType
  onFieldChange: (field: FieldType) => void
  onArticleClick: (id: string) => void
  onCreateClick: () => void
}

export default function HomePage({
  articles,
  selectedField,
  onFieldChange,
  onArticleClick,
  onCreateClick,
}: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')

  const fieldArticles = useMemo(() => {
    return articles.filter(a => a.field === selectedField)
  }, [articles, selectedField])

  // const categories = useMemo(() => {
  //   return Array.from(new Set(fieldArticles.map(a => a.category)))
  // }, [fieldArticles])

  const filteredArticles = useMemo(() => {
    let result = fieldArticles

    if (searchTerm) {
      result = result.filter(
        article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      result = result.filter(article => article.category === selectedCategory)
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [fieldArticles, searchTerm, selectedCategory, sortBy])

  const fieldInfo = FIELD_INFO[selectedField]
  const availableCategories = FIELD_CATEGORIES[selectedField]
  const allFields = Object.entries(FIELD_INFO) as [FieldType, typeof FIELD_INFO[FieldType]][]

  return (
    <div className="min-h-screen">
      <Header onCreateClick={onCreateClick} />

      {/* Field Watermark - Glassmorphic */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 text-9xl opacity-5 text-cyan-400">
          {fieldInfo.icon}
        </div>
        <div className="absolute -bottom-40 -left-40 text-8xl opacity-5 text-purple-400">
          {fieldInfo.icon}
        </div>
      </div>

      {/* Field Selector + Search - Glassmorphic */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Dropdown */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-semibold text-cyan-300 mb-2">Field</label>
              <select
                value={selectedField}
                onChange={(e) => {
                  onFieldChange(e.target.value as FieldType)
                  setSelectedCategory(null)
                  setSearchTerm('')
                }}
                className="w-full sm:w-72 px-4 py-3 glass text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-smooth"
              >
                {allFields.map(([field, info]) => (
                  <option key={field} value={field}>
                    {info.icon} {info.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-smooth"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters - Glassmorphic */}
      <section className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap ${
                  selectedCategory === null
                    ? 'glass-glow text-cyan-300'
                    : 'glass text-slate-300 hover:text-cyan-300'
                }`}
              >
                All
              </button>
              {availableCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap ${
                    selectedCategory === category
                      ? 'glass-glow text-magenta-300'
                      : 'glass text-slate-300 hover:text-magenta-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-medium text-slate-400">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              </span>
              <ChevronsUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-3 py-2 glass text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <Zap className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-lg text-slate-400 mb-6 font-medium">No articles found</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory(null)
                }}
                className="px-8 py-3 glass-glow text-white font-semibold rounded-lg hover:shadow-neon transition-smooth"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => onArticleClick(article.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
