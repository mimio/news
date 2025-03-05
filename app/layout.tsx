import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "mimio | portland, oregon",
  description: "Portland-based creative design and development studio crafting innovative digital experiences. Specializing in web design, development, and creative technology solutions.",
  keywords: [
    "creative design",
    "web development",
    "Portland",
    "Oregon",
    "design studio",
    "digital agency",
    "creative technology",
    "web design",
    "UI/UX design",
    "brand development"
  ],
  openGraph: {
    title: "mimio | portland, oregon",
    description: "Portland-based creative design and development studio crafting innovative digital experiences. Specializing in web design, development, and creative technology solutions.",
    url: "https://mimio.co",
    siteName: "mimio",
    // images: [
    //   {
    //     url: "/og-image.jpg", // You'll need to add this image to your public folder
    //     width: 1200,
    //     height: 630,
    //     alt: "MIMIO - Creative Design & Development Studio"
    //   }
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mimio | portland, oregon",
    description: "Portland-based creative design and development studio crafting innovative digital experiences. Specializing in web design, development, and creative technology solutions.",
    // images: ["/og-image.jpg"], // Same image as OpenGraph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: "https://mimio.co",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
