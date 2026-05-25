import { useState } from 'react'
import { useExternalData, useFetch } from '../hooks/useExternalData'
import { getGitHubRepos, getExternalArticles } from '../services/externalApi'

/**
 * Example 1: Automatic data fetching with useExternalData
 */
export function GitHubReposExample() {
  const { data, loading, error } = useExternalData(
    () => getGitHubRepos('facebook'),
    ['facebook']
  )

  if (loading) return <div className="p-4 text-slate-600">Loading repositories...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4">
      <h3 className="font-bold mb-4">Facebook GitHub Repos</h3>
      <div className="space-y-2">
        {data?.slice(0, 5).map((repo: any) => (
          <div key={repo.id} className="border border-slate-200 p-3 rounded">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              {repo.name}
            </a>
            <p className="text-sm text-slate-600">{repo.description}</p>
            <div className="flex gap-4 text-xs text-slate-500 mt-2">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🔀 {repo.forks_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Example 2: Manual API calls with useFetch
 */
export function FetchOnDemandExample() {
  const { data, loading, error, fetch } = useFetch<any[]>()
  const [hasClicked, setHasClicked] = useState(false)

  const handleFetch = async () => {
    try {
      setHasClicked(true)
      await fetch(getExternalArticles)
    } catch (err) {
      console.error('Failed to fetch:', err)
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={handleFetch}
        className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
      >
        Load External Articles
      </button>

      {loading && <div className="mt-4 text-slate-600">Loading...</div>}
      {error && <div className="mt-4 text-red-600">Error: {error}</div>}

      {hasClicked && data && (
        <div className="mt-4 space-y-3">
          {data.slice(0, 5).map((item: any) => (
            <div key={item.id} className="border border-slate-200 p-3 rounded">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
