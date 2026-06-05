import { useState, useMemo } from 'react'
import { Search, ChevronsUpDown } from 'lucide-react'
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
    <div className="min-h-screen relative">
      <Header onCreateClick={onCreateClick} />

      {/* Field Watermark - Classical */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-3">
        <div className="absolute -top-32 -right-32 text-9xl text-slate-400">
          {fieldInfo.icon}
        </div>
        <div className="absolute -bottom-40 -left-32 text-8xl text-slate-400">
          {fieldInfo.icon}
        </div>
      </div>

      {/* Field Selector + Search - Classical Layout */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Dropdown on left */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">Field</label>
              <select
                value={selectedField}
                onChange={(e) => {
                  onFieldChange(e.target.value as FieldType)
                  setSelectedCategory(null)
                  setSearchTerm('')
                }}
                className="w-full sm:w-72 px-4 py-3 bg-white border border-slate-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-smooth shadow-subtle"
              >
                {allFields.map(([field, info]) => (
                  <option key={field} value={field}>
                    {info.icon} {info.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search on right */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-smooth"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="bg-white border-t-2 border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
        </div>
      </div>

      {/* Category Filters - Classical */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-2 font-medium uppercase tracking-wider text-sm transition-smooth whitespace-nowrap border-b-2 ${
                  selectedCategory === null
                    ? 'text-yellow-600 border-b-yellow-600'
                    : 'text-slate-600 border-b-transparent hover:text-slate-900'
                }`}
              >
                All
              </button>
              {availableCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 font-medium uppercase tracking-wider text-sm transition-smooth whitespace-nowrap border-b-2 ${
                    selectedCategory === category
                      ? 'text-yellow-600 border-b-yellow-600'
                      : 'text-slate-600 border-b-transparent hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-medium text-slate-600">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              </span>
              <ChevronsUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-3 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 pt-6">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600 mb-6 font-medium">No articles found</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory(null)
                }}
                className="px-8 py-3 bg-slate-900 text-white uppercase tracking-wide font-medium rounded hover:bg-slate-800 transition-smooth shadow-elevated text-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
