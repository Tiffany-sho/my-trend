import { supabase, TrendNews } from '@/lib/supabase'
import FavoriteButton from '@/components/FavoriteButton'

export const dynamic = 'force-dynamic'

export default async function FavoritesPage() {
  const { data: favorites } = await supabase
    .from('trend_news')
    .select('*')
    .eq('favorited', true)
    .order('date', { ascending: false })
    .order('created_at', { ascending: true })

  // Group by date
  const byDate: Record<string, TrendNews[]> = {}
  for (const item of favorites ?? []) {
    if (!byDate[item.date]) byDate[item.date] = []
    byDate[item.date].push(item)
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">お気に入り</h1>
      <p className="text-sm text-gray-500 mb-8">登録した記事は削除されません</p>

      {Object.keys(byDate).length === 0 && (
        <p className="text-gray-400 text-sm">お気に入り登録した記事がありません</p>
      )}

      {Object.entries(byDate).map(([date, items]) => (
        <section key={date} className="mb-10">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 border-b pb-2">
            {date}
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <article key={item.id} className="bg-white rounded-lg border border-yellow-200 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 hover:underline leading-snug"
                  >
                    {item.title}
                  </a>
                  <span className="shrink-0 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>
                <div className="mt-3">
                  <FavoriteButton id={item.id} favorited={item.favorited} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
