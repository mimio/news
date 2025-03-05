import type { NewsArticle } from "@/types/NewsArticle"

const API_KEY = '0fe42f90da344bf18446de3e6fb9ed82'
const API_URL = "https://newsapi.org/v2/everything"

const POSITIVE_KEYWORDS = [
  "breakthrough",
  "success",
  "achievement",
  "innovation",
  "progress",
  "improvement",
  "growth",
  "recovery",
  "solution",
  "positive",
  "sustainable",
  "renewable",
  "clean energy",
  "conservation",
  "peace",
  "cooperation",
  "discovery",
  "advancement",
  "cure",
  "prosperity",
  "harmony",
  "triumph",
  "milestone",
  "record-breaking",
]

export async function fetchPositiveNews(): Promise<NewsArticle[]> {
  const keyword = POSITIVE_KEYWORDS[Math.floor(Math.random() * POSITIVE_KEYWORDS.length)]
  const response = await fetch(`${API_URL}?q=${keyword}&apiKey=${API_KEY}&language=en&sortBy=publishedAt`)

  if (!response.ok) {
    throw new Error("Failed to fetch news")
  }

  const data = await response.json()
  return data.articles.map((article: any) => ({
    title: article.title,
    url: article.url,
    source: article.source.name,
    publishedAt: new Date(article.publishedAt),
    imageUrl: article.urlToImage, // Add this line
  }))
}

