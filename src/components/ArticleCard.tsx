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
      className="group cursor-pointer bg-white border-2 border-slate-200 transition-smooth hover:border-yellow-600 hover:shadow-elevated"
    >
      {/* Header with gold accent line */}
      <div className="h-0.5 bg-gradient-to-r from-slate-200 via-yellow-600 to-slate-200"></div>

      {/* Field Icon - subtle top right */}
      <div className="relative px-6 pt-6 pb-4">
        <div className="absolute top-4 right-4 text-2xl opacity-15">
          {fieldInfo.icon}
        </div>

        {/* Category Badge - classical style */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-yellow-700 bg-yellow-50 px-2 py-1">
            {article.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Zap className="w-3 h-3" />
            {article.readTime} min
          </span>
        </div>

        {/* Title - serif, elegant */}
        <h2 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-yellow-700 transition-colors leading-tight">
          {article.title}
        </h2>

        {/* Excerpt - serif body font */}
        <p className="text-slate-600 text-sm mb-5 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Divider - subtle gold */}
        <div className="w-full h-px bg-gradient-to-r from-slate-200 via-yellow-300 to-slate-200 mb-4"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-slate-900">{article.author}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <CalendarDays className="w-3 h-3" />
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
              className="p-1.5 hover:bg-yellow-50 rounded transition-colors"
              title="Copy article URL"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Clipboard className="w-4 h-4 text-slate-400" />
              )}
            </button>
            <div className="text-slate-400 group-hover:text-yellow-700 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* URL Display on hover */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-slate-500 break-all bg-yellow-50 p-2 rounded">
            {articleURL}
          </p>
        </div>
      </div>
    </article>
  )
}
