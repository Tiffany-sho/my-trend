import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'トレンドニュース',
  description: '計算物理・プログラミング・AI・数学・効率化の最新トレンド',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
