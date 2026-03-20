'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function InterestButtons({
  id,
  interested,
}: {
  id: string
  interested: boolean | null
}) {
  const [state, setState] = useState<boolean | null>(interested)
  const [loading, setLoading] = useState(false)

  const handleClick = async (value: boolean) => {
    if (loading) return
    const next = state === value ? null : value
    setLoading(true)
    await supabase.from('trend_news').update({ interested: next }).eq('id', id)
    setState(next)
    setLoading(false)
  }

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => handleClick(true)}
        disabled={loading}
        className={`text-xs px-3 py-1 rounded-full border transition-colors disabled:opacity-50 ${
          state === true
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 text-gray-500 hover:border-green-400 hover:text-green-600'
        }`}
      >
        気になる
      </button>
      <button
        onClick={() => handleClick(false)}
        disabled={loading}
        className={`text-xs px-3 py-1 rounded-full border transition-colors disabled:opacity-50 ${
          state === false
            ? 'bg-gray-400 border-gray-400 text-white'
            : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600'
        }`}
      >
        スキップ
      </button>
    </div>
  )
}
