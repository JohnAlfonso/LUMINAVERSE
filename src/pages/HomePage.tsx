import { useState, useMemo } from 'react'
import { Search, ArrowUpDown } from 'lucide-react'
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
    <div className="min-h-screen bg-slate-50">
      <Header onCreateClick={onCreateClick} />

      {/* Field Selector - Clean Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">Select Field</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
            {allFields.map(([field, info]) => (
              <button
                key={field}
                onClick={() => {
                  onFieldChange(field)
                  setSelectedCategory(null)
                  setSearchTerm('')
                }}
                className={`group p-3 rounded-xl transition-smooth border-2 flex flex-col items-center gap-2 ${
                  selectedField === field
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-2xl">{info.icon}</div>
                <div className="text-xs font-semibold leading-tight text-center hidden sm:block">
                  {info.label.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section - Clean Design */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{fieldInfo.icon}</div>
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-1">
                  {fieldInfo.label}
                </h2>
                <p className="text-slate-600">
                  {fieldInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters - Clean Layout */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-smooth"
            />
          </div>

          {/* Category Filters - Clean Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-smooth border ${
                selectedCategory === null
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              All
            </button>
            {availableCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-smooth border ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-600">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
            </p>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600 mb-4">No articles found</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory(null)
                }}
                className="inline-block px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-smooth font-semibold"
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
