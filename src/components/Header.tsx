import { Sparkles } from 'lucide-react'

interface HeaderProps {
  onCreateClick: () => void
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="sticky top-0 glass shadow-glass z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Glassmorphic */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 glass-glow rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-magenta-400 bg-clip-text text-transparent">
                Prism
              </h1>
              <p className="text-xs text-slate-400 font-medium">Insights across every field</p>
            </div>
          </div>

          {/* Write Button - Glassmorphic */}
          <button
            onClick={onCreateClick}
            className="px-6 py-2.5 glass-glow text-white font-semibold rounded-lg hover:shadow-neon transition-smooth"
          >
            + New
          </button>
        </div>
      </div>
    </header>
  )
}
