import { CalendarDays, Zap, ChevronRight, Clipboard, CheckCircle } from 'lucide-react'
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
      className="group cursor-pointer bg-white border border-slate-200 rounded-3xl overflow-hidden transition-smooth hover:shadow-glow hover:border-purple-300"
    >
      {/* Header Section - Elliptical with circular icon */}
      <div className="relative h-28 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center overflow-hidden">
        {/* Circular glow background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 blur-2xl"></div>
        </div>
        {/* Icon */}
        <div className="relative text-4xl opacity-40 group-hover:opacity-60 transition-opacity animate-float">
          {fieldInfo.icon}
        </div>
        {/* Elliptical accent */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 opacity-30"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Category Badge - Circular pill */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Zap className="w-3 h-3" />
            {article.readTime} min
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-slate-600 text-xs mb-3 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Divider - soft */}
        <div className="w-full h-px bg-gradient-to-r from-slate-200 via-purple-200 to-slate-200 mb-3"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-slate-900">{article.author}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <CalendarDays className="w-3 h-3" />
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Action Icons on hover - Circular */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopyURL}
              className="p-1.5 hover:bg-purple-100 rounded-full transition-colors"
              title="Copy article URL"
            >
              {copied ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Clipboard className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            <div className="text-slate-400 group-hover:text-purple-600 transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* URL Display on hover */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-slate-500 break-all bg-purple-50 p-1.5 rounded-lg">
            {articleURL}
          </p>
        </div>
      </div>
    </article>
  )
}
