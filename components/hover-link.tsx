import Link from "next/link"

export function HoverLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`relative inline-block transition-colors duration-300 ease-in-out hover:text-positive hover:underline ${className}`}
    >
      {children}
    </Link>
  )
}

