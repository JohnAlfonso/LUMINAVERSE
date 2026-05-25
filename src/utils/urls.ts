/**
 * URL utilities for article routing
 */

export const getArticleURL = (articleId: string, baseURL?: string): string => {
  const base = baseURL || window.location.origin
  return `${base}/article/${articleId}`
}

export const getArticleEditURL = (articleId: string, baseURL?: string): string => {
  const base = baseURL || window.location.origin
  return `${base}/edit/${articleId}`
}

export const getHomeURL = (field?: string, baseURL?: string): string => {
  const base = baseURL || window.location.origin
  if (field) {
    return `${base}/?field=${field}`
  }
  return base
}

export const getCreateURL = (field?: string, baseURL?: string): string => {
  const base = baseURL || window.location.origin
  if (field) {
    return `${base}/create?field=${field}`
  }
  return `${base}/create`
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}
