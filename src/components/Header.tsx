import { PenTool } from 'lucide-react'

interface HeaderProps {
  onCreateClick: () => void
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 shadow-clean z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                Fieldnotes
              </h1>
              <p className="text-xs text-slate-500 font-medium">Insights across every field</p>
            </div>
          </div>

          {/* Write Button */}
          <button
            onClick={onCreateClick}
            className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-smooth shadow-clean"
          >
            + New
          </button>
        </div>
      </div>
    </header>
  )
}
