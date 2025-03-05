// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Extend window interface with Google Analytics properties
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return
  
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)
}

// Track page views
export const pageView = (url: string) => {
  if (typeof window === 'undefined') return
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Track specific events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window === 'undefined') return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
} 