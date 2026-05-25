import { useEffect, useState } from 'react'
import { FieldType } from './types'
import { useArticles } from './hooks/useArticles'
import HomePage from './pages/HomePage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import CreateArticlePage from './pages/CreateArticlePage'
import EditArticlePage from './pages/EditArticlePage'

type PageType = 'home' | 'detail' | 'create' | 'edit'

interface PageState {
  type: PageType
  articleId?: string
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>({ type: 'home' })
  const [selectedField, setSelectedField] = useState<FieldType>('tech')
  const { articles, addArticle, updateArticle, deleteArticle, getArticleById } = useArticles()

  // Handle URL routing
  useEffect(() => {
    const path = window.location.pathname
    const params = new URLSearchParams(window.location.search)

    // Parse URL routes
    if (path === '/') {
      setCurrentPage({ type: 'home' })
    } else if (path.startsWith('/article/')) {
      const articleId = path.replace('/article/', '')
      setCurrentPage({ type: 'detail', articleId })
    } else if (path === '/create') {
      setCurrentPage({ type: 'create' })
    } else if (path.startsWith('/edit/')) {
      const articleId = path.replace('/edit/', '')
      setCurrentPage({ type: 'edit', articleId })
    }

    // Get field from query param
    const fieldParam = params.get('field')
    if (fieldParam && ['tech', 'selling', 'shop', 'production', 'industry', 'medical', 'education', 'finance', 'marketing'].includes(fieldParam)) {
      setSelectedField(fieldParam as FieldType)
    }
  }, [])

  const updateURL = (page: PageState) => {
    let path = '/'
    if (page.type === 'home') {
      path = `/?field=${selectedField}`
    } else if (page.type === 'detail' && page.articleId) {
      path = `/article/${page.articleId}`
    } else if (page.type === 'create') {
      path = `/create?field=${selectedField}`
    } else if (page.type === 'edit' && page.articleId) {
      path = `/edit/${page.articleId}`
    }
    window.history.pushState({}, '', path)
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const navigateTo = (page: PageState) => {
    updateURL(page)
  }

  const handleCreateArticle = (articleData: any) => {
    addArticle(articleData)
    navigateTo({ type: 'home' })
  }

  const handleUpdateArticle = (id: string, articleData: any) => {
    updateArticle(id, articleData)
    navigateTo({ type: 'detail', articleId: id })
  }

  const handleDeleteArticle = (id: string) => {
    deleteArticle(id)
    navigateTo({ type: 'home' })
  }

  const handleFieldChange = (field: FieldType) => {
    setSelectedField(field)
    updateURL({ type: 'home' })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {currentPage.type === 'home' && (
        <HomePage
          articles={articles}
          selectedField={selectedField}
          onFieldChange={handleFieldChange}
          onArticleClick={(id) => navigateTo({ type: 'detail', articleId: id })}
          onCreateClick={() => navigateTo({ type: 'create' })}
        />
      )}

      {currentPage.type === 'detail' && currentPage.articleId && (
        <ArticleDetailPage
          article={getArticleById(currentPage.articleId)}
          onEdit={(id) => navigateTo({ type: 'edit', articleId: id })}
          onDelete={(id) => handleDeleteArticle(id)}
          onBack={() => navigateTo({ type: 'home' })}
        />
      )}

      {currentPage.type === 'create' && (
        <CreateArticlePage
          field={selectedField}
          onSave={handleCreateArticle}
          onCancel={() => navigateTo({ type: 'home' })}
        />
      )}

      {currentPage.type === 'edit' && currentPage.articleId && (
        <EditArticlePage
          article={getArticleById(currentPage.articleId)}
          onSave={(data) => handleUpdateArticle(currentPage.articleId!, data)}
          onCancel={() => navigateTo({ type: 'detail', articleId: currentPage.articleId })}
        />
      )}
    </div>
  )
}

export default App
