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
      className="group cursor-pointer glass-glow rounded-xl overflow-hidden transition-smooth hover:shadow-neon relative"
    >
      {/* Header - Gradient glassmorphic */}
      <div className="h-28 bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 glass-strong"></div>
        {/* Icon */}
        <div className="relative text-4xl opacity-30 group-hover:opacity-50 transition-opacity">
          {fieldInfo.icon}
        </div>
        {/* Accent glow */}
        <div className="absolute top-2 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 opacity-10 blur-xl"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge - Glass effect */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 glass text-xs font-semibold rounded-lg text-cyan-300">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <Zap className="w-3 h-3 text-cyan-300" />
            {article.readTime} min
          </span>
        </div>

        {/* Title - vibrant */}
        <h2 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-slate-400 text-xs mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Divider - subtle glass */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-white">{article.author}</p>
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
              className="p-1.5 hover:glass rounded-lg transition-colors"
              title="Copy article URL"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Clipboard className="w-4 h-4 text-slate-400" />
              )}
            </button>
            <div className="text-slate-400 group-hover:text-cyan-300 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* URL Display on hover */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-slate-400 break-all glass p-2 rounded-lg">
            {articleURL}
          </p>
        </div>
      </div>
    </article>
  )
}
