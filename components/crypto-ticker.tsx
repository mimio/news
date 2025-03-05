"use client"

import { useEffect, useState } from "react"

const cryptos = [
  { id: "bitcoin", symbol: "BTC", color: "#F7931A" },
  { id: "ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "solana", symbol: "SOL", color: "#00FFA3" },
  { id: "sui", symbol: "SUI", color: "#6fbcf0" },
]

interface CryptoData {
  [key: string]: {
    usd: number
    usd_24h_change: number
  }
}

export function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoData>({})
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/crypto')
        
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setPrices(data)
        setError(false)
      } catch (error) {
        console.error("Failed to fetch crypto prices:", error)
        setError(true)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return null // Hide the ticker if there's an error
  }

  return (
    <div className="flex items-center space-x-2 text-[8px]">
      {cryptos.map((crypto) => (
        <span
          key={crypto.id}
          className="flex items-center px-1 py-0.5 rounded"
          style={{ backgroundColor: crypto.color }}
        >
          <span className="font-bold text-white">{crypto.symbol}</span>
          <span className="ml-1 text-white">${prices[crypto.id]?.usd.toFixed(2) || "---"}</span>
          <span className={`ml-1 ${prices[crypto.id]?.usd_24h_change > 0 ? "text-green-300" : "text-red-300"}`}>
            {prices[crypto.id]?.usd_24h_change ? prices[crypto.id].usd_24h_change.toFixed(2) + "%" : ""}
          </span>
        </span>
      ))}
    </div>
  )
}

