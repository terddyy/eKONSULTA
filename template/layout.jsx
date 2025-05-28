import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "E-Konsulta - AI Medical Assistant",
  description:
    "Get 24/7 medical guidance and symptom analysis from our advanced AI medical assistant. Free, secure, and always available.",
  keywords: "AI medical assistant, health consultation, symptom checker, medical advice, telemedicine",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
