import { BookOpen } from 'lucide-react'

interface HeaderProps {
  onCreateClick: () => void
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b-2 border-slate-200 shadow-clean z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          {/* Logo - Classical */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <BookOpen className="w-7 h-7 text-slate-900 mb-1" />
              <div className="w-6 h-0.5 bg-gradient-to-r from-slate-900 to-yellow-600"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-widest">Essence</h1>
              <p className="text-xs text-slate-600 tracking-wider uppercase font-medium">Insights across every field</p>
            </div>
          </div>

          {/* Write Button - Classical */}
          <button
            onClick={onCreateClick}
            className="px-7 py-3 bg-slate-900 text-white font-semibold uppercase tracking-wide rounded hover:bg-slate-800 transition-smooth shadow-elevated text-sm"
          >
            + New Article
          </button>
        </div>
      </div>
    </header>
  )
}
