'use client'

import { useRouter, usePathname } from 'next/navigation'

export const CATEGORIES = [
  '計算物理・シミュレーション',
  'プログラミング・開発',
  'AI・機械学習',
  '数学・アルゴリズム',
  '効率化・生産性',
]

export default function CategoryFilter({ selected }: { selected?: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (cat: string | null) => {
    router.push(cat ? `${pathname}?category=${encodeURIComponent(cat)}` : pathname)
  }

  return (
    <div className="flex gap-2 flex-wrap mb-8">
      <button
        onClick={() => handleClick(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !selected ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'
        }`}
      >
        すべて
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === cat
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border hover:bg-gray-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
