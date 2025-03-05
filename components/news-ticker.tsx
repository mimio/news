"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import type { NewsArticle } from "@/types/NewsArticle"

export function NewsTickerTop({ articles }: { articles: NewsArticle[] }) {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (ticker) {
      const clone = ticker.cloneNode(true) as HTMLElement
      ticker.after(clone)

      let animationFrame: number
      let start: number
      const duration = 30000 // 30 seconds for one full rotation
      const animate = (timestamp: number) => {
        if (start === undefined) start = timestamp
        const elapsed = timestamp - start
        const progress = (elapsed % duration) / duration
        ticker.style.transform = `translateX(${-progress * 100}%)`
        clone.style.transform = `translateX(${-progress * 100}%)`
        animationFrame = requestAnimationFrame(animate)
      }
      animationFrame = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="overflow-hidden flex bg-positive/5 py-1 mb-2">
      <div ref={tickerRef} className="whitespace-nowrap inline-block">
        {articles.map((article, index) => (
          <span key={index} className="inline-flex items-center mr-8 text-[9px]">
            <ArrowRight className="w-2 h-2 mr-1 text-positive" />
            {article.title}
          </span>
        ))}
      </div>
    </div>
  )
}

export function NewsTickerBottom() {
  return (
    <div className="mt-4 text-center text-positive/80 text-[9px]">
      <a 
        href="mailto:hello@mimio.co" 
        className="
          font-bold underline
          hover:text-positive 
          transition-all duration-300
          bg-clip-text hover:text-transparent
          hover:bg-gradient-to-r hover:from-emerald-400 hover:via-positive hover:to-emerald-400
          hover:bg-[length:200%_auto]
          hover:animate-shimmer
        "
      >
        Coming soon...
      </a>
    </div>
  )
}

