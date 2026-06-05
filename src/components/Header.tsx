import { Star } from 'lucide-react'

interface HeaderProps {
  onCreateClick: () => void
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 shadow-clean z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Circular */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 rounded-full flex items-center justify-center shadow-glow">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                Nebula
              </h1>
              <p className="text-xs text-slate-500 font-medium">Insights across every field</p>
            </div>
          </div>

          {/* Write Button - Circular pill */}
          <button
            onClick={onCreateClick}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white font-semibold rounded-full hover:shadow-glow transition-smooth"
          >
            + New
          </button>
        </div>
      </div>
    </header>
  )
}
