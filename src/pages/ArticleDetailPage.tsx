import { ArrowLeft, Edit2, Trash2, Calendar, Clock, Share2, Heart, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Article, FIELD_INFO } from '../types'
import { getArticleURL, copyToClipboard } from '../utils/urls'

interface ArticleDetailPageProps {
  article: Article | undefined
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onBack: () => void
}

export default function ArticleDetailPage({
  article,
  onEdit,
  onDelete,
  onBack,
}: ArticleDetailPageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyURL = async () => {
    if (!article) return
    const success = await copyToClipboard(getArticleURL(article.id))
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-600 mb-4">Article not found</p>
          <button
            onClick={onBack}
            className="text-slate-900 hover:text-slate-700 font-semibold transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    )
  }

  const fieldInfo = FIELD_INFO[article.field]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author}`}
                alt={article.author}
                className="w-12 h-12 rounded-xl border-2 border-slate-200"
              />
              <div>
                <p className="font-bold text-slate-900">{article.author}</p>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="text-sm text-slate-600 flex items-center gap-1 font-medium">
              <Clock className="w-4 h-4" />
              {article.readTime} min read
            </div>

            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-semibold rounded-md">
              {article.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(article.id)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-smooth font-semibold"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this article?')) {
                  onDelete(article.id)
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-smooth font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={handleCopyURL}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-200 transition-smooth font-semibold"
              title="Copy article URL"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Share
                </>
              )}
            </button>
          </div>

          {/* Article URL */}
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-500 font-semibold mb-1">Article URL:</p>
            <p className="text-sm text-slate-700 break-all font-mono">{getArticleURL(article.id)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image - Clean Geometric */}
        <div className="mb-8 rounded-3xl overflow-hidden bg-slate-200 h-96 relative shadow-elevated flex items-center justify-center">
          <div className="text-7xl opacity-30">{fieldInfo.icon}</div>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Article Content - Clean Layout */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-clean mb-8">
          <p className="text-lg text-slate-700 leading-8 whitespace-pre-wrap font-light">
            {article.content}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-200 mb-8"></div>

        {/* Social Actions */}
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-smooth font-semibold">
            <Heart className="w-5 h-5" />
            Like
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-smooth font-semibold">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
