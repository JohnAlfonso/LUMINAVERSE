import { CalendarDays, Zap, ChevronRight, Clipboard, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { Article } from '../types'
import { getArticleURL, copyToClipboard } from '../utils/urls'

interface ArticleCardProps {
  article: Article
  onClick: () => void
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const [copied, setCopied] = useState(false)
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
      className="group cursor-pointer bg-white border-2 border-gray-700 overflow-hidden transition-smooth hover:shadow-bold"
    >
      {/* Header - Bold accent */}
      <div className="h-2 bg-red-600"></div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge - Bold */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block px-3 py-1 bg-gray-800 text-white text-xs font-black rounded">
            {article.category}
          </span>
          <span className="text-xs text-gray-700 flex items-center gap-1 font-bold">
            <Zap className="w-3 h-3" />
            {article.readTime} MIN
          </span>
        </div>

        {/* Title - Bold, Large */}
        <h2 className="text-lg font-black text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-800 text-sm mb-4 line-clamp-2 font-medium">
          {article.excerpt}
        </p>

        {/* Divider - Bold */}
        <div className="w-full h-2 bg-gray-700 mb-4"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-black text-gray-900">{article.author}</p>
            <p className="text-xs text-gray-700 flex items-center gap-1 font-bold">
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
              className="p-1.5 hover:bg-red-100 transition-colors"
              title="Copy article URL"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Clipboard className="w-4 h-4 text-gray-700" />
              )}
            </button>
            <div className="text-gray-700 group-hover:text-red-600 transition-colors">
              <ChevronRight className="w-4 h-4 font-bold" />
            </div>
          </div>
        </div>

        {/* URL Display on hover */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity pt-4 border-t-2 border-gray-700">
          <p className="text-xs text-gray-700 break-all font-mono font-bold">
            {articleURL}
          </p>
        </div>
      </div>
    </article>
  )
}
