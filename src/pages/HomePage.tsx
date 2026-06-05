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
    <div className="min-h-screen">
      <Header onCreateClick={onCreateClick} />

      {/* Hero Section - Gradient accent bar + field title */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600"></div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl">{fieldInfo.icon}</div>
                <h2 className="text-3xl font-black text-slate-900">
                  {fieldInfo.label}
                </h2>
              </div>
              <p className="text-slate-600 text-sm ml-14">
                {fieldInfo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Field Selector - Horizontal scrollable pills */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
            {allFields.map(([field, info]) => (
              <button
                key={field}
                onClick={() => {
                  onFieldChange(field)
                  setSelectedCategory(null)
                  setSearchTerm('')
                }}
                className={`group flex-shrink-0 px-4 py-2 rounded-full font-semibold transition-smooth whitespace-nowrap text-sm ${
                  selectedField === field
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white shadow-hover'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300'
                }`}
              >
                <span className="mr-1">{info.icon}</span>
                {info.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar - Compact */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-smooth"
            />
          </div>
        </div>
      </section>

      {/* Filters & Sort - Compact inline */}
      <section className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 flex-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold transition-smooth whitespace-nowrap border-l-4 ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-l-red-600'
                    : 'bg-white text-slate-700 border border-slate-200 border-l-slate-300 hover:border-orange-300'
                }`}
              >
                All
              </button>
              {availableCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold transition-smooth whitespace-nowrap border-l-4 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-l-red-600'
                      : 'bg-white text-slate-700 border border-slate-200 border-l-orange-300 hover:border-orange-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-medium text-slate-600">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              </span>
              <ChevronsUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              <p className="text-lg text-slate-600 mb-4">No articles found</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory(null)
                }}
                className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white rounded-full hover:shadow-hover transition-smooth font-semibold"
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
