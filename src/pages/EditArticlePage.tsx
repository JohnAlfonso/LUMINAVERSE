import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Article, FIELD_CATEGORIES, FIELD_INFO } from '../types'

interface EditArticlePageProps {
  article: Article | undefined
  onSave: (article: Partial<Article>) => void
  onCancel: () => void
}

export default function EditArticlePage({
  article,
  onSave,
  onCancel,
}: EditArticlePageProps) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    readTime: 5,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        author: article.author,
        category: article.category,
        readTime: article.readTime,
      })
    }
  }, [article])

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-600 mb-4">Article not found</p>
          <button
            onClick={onCancel}
            className="text-slate-900 hover:text-slate-700 font-semibold transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  const fieldInfo = FIELD_INFO[article.field]
  const categories = FIELD_CATEGORIES[article.field]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required'
    if (!formData.content.trim()) newErrors.content = 'Content is required'
    if (!formData.author.trim()) newErrors.author = 'Author name is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSave(formData)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-clean p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200">
            <div className="text-5xl">{fieldInfo.icon}</div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Edit {fieldInfo.label} Story</h1>
              <p className="text-slate-600">Update your article details</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Story Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter an engaging title"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-smooth ${
                  errors.title ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Write a brief summary of your story"
                rows={2}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-smooth resize-none ${
                  errors.excerpt ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {errors.excerpt && (
                <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Full Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Write your complete story here..."
                rows={12}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-smooth resize-none ${
                  errors.content ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {errors.content && (
                <p className="text-red-600 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="Your name"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-smooth ${
                  errors.author ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {errors.author && (
                <p className="text-red-600 text-sm mt-1">{errors.author}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-smooth"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Estimated Read Time (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      readTime: parseInt(e.target.value) || 5,
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-smooth"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-smooth shadow-clean"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-900 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 transition-smooth"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
