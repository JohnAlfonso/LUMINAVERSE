import { useState, useEffect } from 'react'

interface UseExternalDataState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/**
 * Hook for fetching data from external APIs
 * Handles loading and error states automatically
 */
export const useExternalData = <T,>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
): UseExternalDataState<T> => {
  const [state, setState] = useState<UseExternalDataState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setState({ data: null, loading: true, error: null })
        const result = await fetchFunction()
        if (isMounted) {
          setState({ data: result, loading: false, error: null })
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
          setState({ data: null, loading: false, error: errorMessage })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return state
}

/**
 * Hook for making API calls with manual trigger
 */
export const useFetch = <T,>() => {
  const [state, setState] = useState<UseExternalDataState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetch = async (fetchFunction: () => Promise<T>) => {
    try {
      setState({ data: null, loading: true, error: null })
      const result = await fetchFunction()
      setState({ data: result, loading: false, error: null })
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setState({ data: null, loading: false, error: errorMessage })
      throw err
    }
  }

  return { ...state, fetch }
}
