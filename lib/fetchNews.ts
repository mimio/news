import type { NewsArticle } from "@/types/NewsArticle"

const POSITIVE_CATEGORIES = [
  "Folklore",
  "Fairy_tales",
  "Fables",
  "Moral_tales",
  "Wisdom_literature",
  "Parables",
  "Traditional_stories",
  "Positive_psychology",
  "Life_lessons",
  "Inspirational_literature"
]

async function fetchWikipediaArticle(category: string): Promise<any[]> {
  try {
    // First, get articles from the category
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:${category}&cmlimit=20&cmtype=page&origin=*`
    )
    
    if (!response.ok) {
      throw new Error("Failed to fetch Wikipedia articles")
    }
    
    const data = await response.json()
    return data.query?.categorymembers || []
  } catch (error) {
    console.error("Error fetching category members:", error)
    return []
  }
}

async function getArticleDetails(pageId: string): Promise<any> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=${pageId}&prop=extracts|pageimages|info&exintro=true&pithumbsize=500&inprop=url&origin=*`
    )
    
    if (!response.ok) {
      throw new Error("Failed to fetch article details")
    }
    
    const data = await response.json()
    const page = data.query?.pages?.[pageId]
    
    if (!page) {
      throw new Error("No page data found")
    }
    
    // Extract a clean text snippet without HTML tags
    const extract = page.extract ? page.extract.replace(/<\/?[^>]+(>|$)/g, "") : ""
    
    return {
      ...page,
      extract: extract.slice(0, 200) + (extract.length > 200 ? "..." : "") // Get first 200 chars
    }
  } catch (error) {
    console.error("Error fetching article details:", error)
    return null
  }
}

export async function fetchPositiveNews(): Promise<NewsArticle[]> {
  try {
    // Get a random category
    const category = POSITIVE_CATEGORIES[Math.floor(Math.random() * POSITIVE_CATEGORIES.length)]
    
    // Fetch articles from the category
    const articles = await fetchWikipediaArticle(category)
    
    if (!articles.length) {
      console.warn("No articles found for category:", category)
      return []
    }
    
    // Get details for each article
    const articlePromises = articles.map(async (article: any) => {
      try {
        const details = await getArticleDetails(article.pageid.toString())
        
        if (!details) {
          return null
        }
        
        return {
          title: article.title,
          url: details.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`,
          source: `Wikipedia - ${category.replace(/_/g, " ")}`,
          publishedAt: new Date(),
          imageUrl: details.thumbnail?.source || null,
          description: details.extract || ""
        }
      } catch (error) {
        console.error("Error processing article:", article.title, error)
        return null
      }
    })
    
    const results = await Promise.all(articlePromises)
    return results.filter((article): article is NewsArticle => article !== null)
  } catch (error) {
    console.error("Error fetching Wikipedia articles:", error)
    return []
  }
}

