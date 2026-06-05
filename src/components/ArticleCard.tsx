import { Calendar, Clock, ArrowRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Article, FIELD_INFO } from '../types'
import { getArticleURL, copyToClipboard } from '../utils/urls'

interface ArticleCardProps {
  article: Article
  onClick: () => void
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const [copied, setCopied] = useState(false)
  const fieldInfo = FIELD_INFO[article.field]
  const articleURL = getArticleURL(article.id)

  const handleCopyURL = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const success = await copyToClipboard(articleURL)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-orange-300 transition-smooth hover:shadow-hover relative"
    >
      {/* Left accent bar - gradient sunset colors */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600"></div>

      {/* Header Section - Compact with field icon background */}
      <div className="h-24 bg-gradient-to-br from-orange-100 to-red-50 flex items-center justify-center relative overflow-hidden pl-3">
        {/* Icon */}
        <div className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">
          {fieldInfo.icon}
        </div>
        {/* Corner accent */}
        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 opacity-40"></div>
      </div>

      {/* Content Section - Compact */}
      <div className="p-4">
        {/* Category Badge - Rounded pill */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block px-2 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-900 text-xs font-semibold rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3" />
            {article.readTime} min
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-slate-600 text-xs mb-3 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-3"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-slate-900">{article.author}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Calendar className="w-3 h-3" />
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Action Icons on hover */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopyURL}
              className="p-1.5 hover:bg-orange-100 rounded-full transition-colors"
              title="Copy article URL"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            <div className="text-slate-400 group-hover:text-orange-600 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* URL Display on hover */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-slate-500 break-all bg-orange-50 p-1.5 rounded-lg">
            {articleURL}
          </p>
        </div>
      </div>
    </article>
  )
}
