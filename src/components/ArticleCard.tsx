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
      className="group cursor-pointer bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-smooth hover:shadow-elevated"
    >
      {/* Header Section - Clean Geometric Design */}
      <div className="h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden">
        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${fieldInfo.color}`}></div>
        {/* Icon */}
        <div className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
          {fieldInfo.icon}
        </div>
        {/* Top right circle accent */}
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full border-2 border-slate-200 opacity-30 group-hover:opacity-50 transition-opacity"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md`}>
            {article.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3" />
            {article.readTime} min
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-4"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-slate-900">{article.author}</p>
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
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopyURL}
              className="p-2 hover:bg-slate-100 rounded transition-colors"
              title="Copy article URL"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
            <div className="text-slate-400 group-hover:text-slate-900 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* URL Display on hover */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-slate-500 break-all bg-slate-50 p-2 rounded">
            {articleURL}
          </p>
        </div>
      </div>
    </article>
  )
}
