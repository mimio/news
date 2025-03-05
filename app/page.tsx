
import { Award, Zap, Globe, BookOpen } from "lucide-react"
import { NewsTickerTop, NewsTickerBottom } from "@/components/news-ticker"
import { HoverLink } from "@/components/hover-link"
import { CryptoTicker } from "@/components/crypto-ticker"
import { fetchPositiveNews } from "@/lib/fetchNews"
import { FallbackImage } from "@/components/FallbackImage"

const DEFAULT_ARTICLE = {
  title: "Welcome to Daily Tales",
  url: "#",
  source: "Daily Tales",
  publishedAt: new Date(),
  imageUrl: "/placeholder.jpg",
  description: "Discover inspiring stories, wisdom tales, and positive narratives from around the world."
}

export default async function Home() {
  let newsArticles = await fetchPositiveNews()
  
  // Ensure we always have at least one article
  if (!newsArticles || newsArticles.length === 0) {
    newsArticles = [DEFAULT_ARTICLE]
  }

  const formatTitle = (title: string) => {
    return title.toUpperCase().slice(0, 60) + (title.length > 60 ? "..." : "")
  }

  // Get the featured article (first article or default)
  const featuredArticle = newsArticles[0] || DEFAULT_ARTICLE

  return (
    <div className="min-h-screen bg-white text-black font-mono p-2 max-w-6xl mx-auto text-[9px] leading-[13px]">
      <NewsTickerTop articles={newsArticles.slice(0, 5)} />

      <div className="text-[9px] mb-3 flex items-center justify-between">
        <div>
          <HoverLink href="#" className="mr-3">
            DAILY WISDOM
          </HoverLink>
          <HoverLink href="#" className="mr-3">
            STORIES
          </HoverLink>
          <HoverLink href="#" className="mr-3">
            FOLKLORE
          </HoverLink>
          <HoverLink href="#">SHARE A TALE</HoverLink>
        </div>
        <div className="flex items-center space-x-4">
          <CryptoTicker />
          <div className="text-positive flex items-center">
            <Globe className="w-3 h-3 mr-1" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="align-top w-1/3 border-r border-black/10 pr-2" style={{ verticalAlign: "top" }}>
              <div className="space-y-[5px]">
                {newsArticles.slice(0, 10).map((article, index) => (
                  <div key={index} className="mb-4">
                    <HoverLink href={article.url} className="uppercase flex items-center gap-1 mb-1">
                      {index === 0 && <BookOpen className="w-3 h-3 text-positive" />}
                      {formatTitle(article.title)}
                    </HoverLink>
                    <p className="text-[8px] text-gray-600 italic">{article.description}</p>
                  </div>
                ))}
              </div>
            </td>

            <td className="align-top w-1/3 px-2" style={{ verticalAlign: "top" }}>
              <div className="space-y-[5px]">
                <div className="text-center mb-3">
                  <div className="image-fade-in relative group">
                    <FallbackImage
                      src={featuredArticle.imageUrl || "/placeholder.jpg"}
                      topic={featuredArticle.title}
                      alt={featuredArticle.title}
                      width={350}
                      height={250}
                      className="border border-black/20 mx-auto mb-1 hover:border-positive transition-colors duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <HoverLink
                    href={featuredArticle.url}
                    className="text-lg font-bold uppercase block leading-tight mb-1 text-positive hover:text-positive/80 transition-colors duration-300"
                  >
                    {formatTitle(featuredArticle.title)}
                  </HoverLink>
                  <p className="text-[8px] text-gray-600 italic mb-2">{featuredArticle.description}</p>
                  <HoverLink
                    href={featuredArticle.url}
                    className="text-sm italic hover:text-positive transition-colors duration-300"
                  >
                    {featuredArticle.source}
                  </HoverLink>
                </div>

                <div className="text-center my-4 select-none glow-on-hover relative">
                  <h1
                    className="absolute top-0 left-0 font-['Impact'] text-5xl uppercase inline-block bg-black text-white transform -skew-x-[20deg] relative px-3 py-1"
                    style={{
                      filter: "drop-shadow(-3px 0px 1px rgba(0,0,0,0.3))",
                      textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                    }}
                  >
                    DAILY TALES
                  </h1>
                  {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <h4
                    className="absolute top-0 left-0 font-['Impact'] text-2xs uppercase inline-block bg-black text-white transform -skew-x-[20deg] relative px-3 py-1"
                    style={{
                      filter: "drop-shadow(-3px 0px 1px rgba(0,0,0,0.3))",
                      textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                      }}
                    >
                      mimio
                    </h4>
                  </div> */}
                </div>

                {newsArticles.slice(10, 20).map((article, index) => (
                  <div key={index} className="mb-4">
                    <HoverLink href={article.url} className="uppercase flex items-center gap-1 mb-1">
                      {index === 0 && <Award className="w-3 h-3 text-positive" />}
                      {formatTitle(article.title)}
                    </HoverLink>
                    <p className="text-[8px] text-gray-600 italic">{article.description}</p>
                  </div>
                ))}
              </div>
            </td>

            <td className="align-top w-1/3 border-l border-black/10 pl-2" style={{ verticalAlign: "top" }}>
              <div className="space-y-[5px]">
                {newsArticles.slice(20, 30).map((article, index) => (
                  <div key={index} className="mb-4">
                    <HoverLink href={article.url} className="uppercase flex items-center gap-1 mb-1">
                      {index === 0 && <Zap className="w-3 h-3 text-positive" />}
                      {formatTitle(article.title)}
                    </HoverLink>
                    <p className="text-[8px] text-gray-600 italic">{article.description}</p>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <NewsTickerBottom />
    </div>
  )
}

