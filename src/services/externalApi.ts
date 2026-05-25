// Example: Fetching data from external APIs

// 1. WEATHER API - Get weather data
export const getWeather = async (_city: string) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=40&longitude=-74&current=temperature_2m,weather_code`
    )
    if (!response.ok) throw new Error('Failed to fetch weather')
    return await response.json()
  } catch (error) {
    console.error('Weather API error:', error)
    throw error
  }
}

// 2. NEWS API - Get articles from external news source
export const getExternalNews = async (field: string) => {
  try {
    // Example: Using NewsAPI.org (requires API key)
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${field}&sortBy=publishedAt&pageSize=10`,
      {
        headers: {
          'Authorization': 'YOUR_API_KEY_HERE',
        },
      }
    )
    if (!response.ok) throw new Error('Failed to fetch news')
    return await response.json()
  } catch (error) {
    console.error('News API error:', error)
    throw error
  }
}

// 3. GITHUB API - Fetch public repositories
export const getGitHubRepos = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)
    if (!response.ok) throw new Error('Failed to fetch repos')
    return await response.json()
  } catch (error) {
    console.error('GitHub API error:', error)
    throw error
  }
}

// 4. JSON PLACEHOLDER - Mock API for testing
export const getExternalArticles = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) throw new Error('Failed to fetch articles')
    return await response.json()
  } catch (error) {
    console.error('External articles error:', error)
    throw error
  }
}

// 5. UNSPLASH API - Fetch free images
export const getImages = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=10`,
      {
        headers: {
          'Authorization': `Client-ID YOUR_UNSPLASH_ACCESS_KEY`,
        },
      }
    )
    if (!response.ok) throw new Error('Failed to fetch images')
    return await response.json()
  } catch (error) {
    console.error('Unsplash API error:', error)
    throw error
  }
}
