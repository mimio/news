import { NextResponse } from 'next/server'

const cryptos = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "solana", symbol: "SOL" },
  { id: "sui", symbol: "SUI" },
]

export async function GET() {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptos.map((c) => c.id).join(",")}&vs_currencies=usd&include_24hr_change=true`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto prices")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching crypto prices:", error)
    return NextResponse.json(
      { error: "Failed to fetch crypto prices" },
      { status: 500 }
    )
  }
} 