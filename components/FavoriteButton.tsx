'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function FavoriteButton({
  id,
  favorited,
}: {
  id: string
  favorited: boolean
}) {
  const [state, setState] = useState(favorited)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading || state) return // 登録済みは解除不可
    setLoading(true)
    await supabase.from('trend_news').update({ favorited: true }).eq('id', id)
    setState(true)
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || state}
      title={state ? 'お気に入り登録済み（削除されません）' : 'お気に入りに登録する'}
      className={`text-xs px-3 py-1 rounded-full border transition-colors disabled:cursor-default ${
        state
          ? 'bg-yellow-400 border-yellow-400 text-white'
          : 'border-gray-300 text-gray-500 hover:border-yellow-400 hover:text-yellow-600'
      }`}
    >
      {state ? '★ お気に入り' : '☆ お気に入り登録'}
    </button>
  )
}
