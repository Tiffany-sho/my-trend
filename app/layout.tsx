import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'トレンドニュース',
  description: '計算物理・プログラミング・AI・数学・効率化の最新トレンド',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200">
          <nav className="max-w-3xl mx-auto px-4 py-3 flex gap-6">
            <a href="/trend" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              トレンド
            </a>
            <a href="/favorites" className="text-sm font-medium text-gray-700 hover:text-yellow-500">
              ★ お気に入り
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
