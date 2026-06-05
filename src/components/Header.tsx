import { Volume2 } from 'lucide-react'

interface HeaderProps {
  onCreateClick: () => void
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b-2 border-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          {/* Logo - Bold Minimal */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center">
              <Volume2 className="w-7 h-7 text-white font-bold" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-black tracking-tight">CLARION</h1>
              <p className="text-xs text-black font-bold tracking-widest uppercase">Insights Across Every Field</p>
            </div>
          </div>

          {/* Write Button - Bold */}
          <button
            onClick={onCreateClick}
            className="px-8 py-3 bg-red-600 text-white font-black uppercase tracking-wider shadow-bold hover:shadow-red transition-smooth text-sm"
          >
            + New Article
          </button>
        </div>
      </div>
    </header>
  )
}
