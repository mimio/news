import Image from "next/image"
import { TrendingUp, Award, Zap, Globe } from "lucide-react"
import { NewsTickerTop, NewsTickerBottom } from "@/components/news-ticker"
import { HoverLink } from "@/components/hover-link"
import { CryptoTicker } from "@/components/crypto-ticker"
import { fetchPositiveNews } from "@/lib/fetchNews"

export default async function Home() {
  const newsArticles = await fetchPositiveNews()

  const formatTitle = (title: string) => {
    return title.toUpperCase().slice(0, 60) + (title.length > 60 ? "..." : "")
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono p-2 max-w-6xl mx-auto text-[9px] leading-[13px]">
      <NewsTickerTop articles={newsArticles.slice(0, 5)} />

      <div className="text-[9px] mb-3 flex items-center justify-between">
        <div>
          <HoverLink href="#" className="mr-3">
            GLOW REPORT
          </HoverLink>
          <HoverLink href="#" className="mr-3">
            ABOUT
          </HoverLink>
          <HoverLink href="#" className="mr-3">
            ARCHIVES
          </HoverLink>
          <HoverLink href="#">ADVERTISE</HoverLink>
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
                  <HoverLink key={index} href={article.url} className="uppercase flex items-center gap-1">
                    {index === 0 && <TrendingUp className="w-3 h-3 text-positive" />}
                    {formatTitle(article.title)}
                  </HoverLink>
                ))}
              </div>
            </td>

            <td className="align-top w-1/3 px-2" style={{ verticalAlign: "top" }}>
              <div className="space-y-[5px]">
                <div className="text-center mb-3">
                  <div className="image-fade-in relative group">
                    <Image
                      src={newsArticles[0].imageUrl || "/placeholder.svg?height=250&width=350"}
                      alt={newsArticles[0].title}
                      width={350}
                      height={250}
                      className="border border-black/20 mx-auto mb-1 hover:border-positive transition-colors duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <HoverLink
                    href={newsArticles[0].url}
                    className="text-lg font-bold uppercase block leading-tight mb-1 text-positive hover:text-positive/80 transition-colors duration-300"
                  >
                    {formatTitle(newsArticles[0].title)}
                  </HoverLink>
                  <HoverLink
                    href={newsArticles[0].url}
                    className="text-sm italic hover:text-positive transition-colors duration-300"
                  >
                    {newsArticles[0].source}
                  </HoverLink>
                </div>

                <div className="text-center my-4 select-none glow-on-hover">
                  <h1
                    className="font-['Impact'] text-5xl uppercase inline-block bg-black text-white transform -skew-x-[20deg] relative px-3 py-1"
                    style={{
                      filter: "drop-shadow(-3px 0px 1px rgba(0,0,0,0.3))",
                      textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                    }}
                  >
MIMIO                  </h1>
                </div>

                {newsArticles.slice(10, 20).map((article, index) => (
                  <HoverLink key={index} href={article.url} className="uppercase flex items-center gap-1">
                    {index === 0 && <Award className="w-3 h-3 text-positive" />}
                    {formatTitle(article.title)}
                  </HoverLink>
                ))}
              </div>
            </td>

            <td className="align-top w-1/3 border-l border-black/10 pl-2" style={{ verticalAlign: "top" }}>
              <div className="space-y-[5px]">
                {newsArticles.slice(20, 30).map((article, index) => (
                  <HoverLink key={index} href={article.url} className="uppercase flex items-center gap-1">
                    {index === 0 && <Zap className="w-3 h-3 text-positive" />}
                    {formatTitle(article.title)}
                  </HoverLink>
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

