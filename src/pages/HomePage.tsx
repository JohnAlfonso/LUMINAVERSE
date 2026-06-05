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

  const availableCategories = FIELD_CATEGORIES[selectedField]
  const allFields = Object.entries(FIELD_INFO) as [FieldType, typeof FIELD_INFO[FieldType]][]

  return (
    <div className="min-h-screen bg-white">
      <Header onCreateClick={onCreateClick} />

      {/* Field Selector + Search - Bold Minimal */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 border-b-2 border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-end">
            {/* Dropdown */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-black text-gray-800 mb-2 tracking-widest uppercase">Field</label>
              <select
                value={selectedField}
                onChange={(e) => {
                  onFieldChange(e.target.value as FieldType)
                  setSelectedCategory(null)
                  setSearchTerm('')
                }}
                className="w-full sm:w-80 px-4 py-3 bg-white border-2 border-gray-700 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-smooth"
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5 font-bold" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-700 text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-smooth"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters - Bold Minimal */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 border-b-2 border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-2 font-bold text-sm uppercase tracking-wider transition-smooth border-2 ${
                  selectedCategory === null
                    ? 'bg-red-600 text-white border-red-600 shadow-bold'
                    : 'bg-white text-gray-800 border-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600'
                }`}
              >
                All
              </button>
              {availableCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 font-bold text-sm uppercase tracking-wider transition-smooth border-2 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white border-red-600 shadow-bold'
                      : 'bg-white text-gray-800 border-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-bold text-gray-800">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'ARTICLE' : 'ARTICLES'}
              </span>
              <ChevronsUpDown className="w-4 h-4 text-gray-700 font-bold" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-4 py-2 bg-white border-2 border-gray-700 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-black text-gray-800 mb-6">NO ARTICLES FOUND</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory(null)
                }}
                className="px-8 py-3 bg-red-600 text-white font-black uppercase tracking-wider shadow-bold hover:shadow-red transition-smooth"
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
