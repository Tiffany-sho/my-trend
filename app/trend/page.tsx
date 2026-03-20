import { supabase, TrendNews } from '@/lib/supabase'
import CategoryFilter from '@/components/CategoryFilter'
import InterestButtons from '@/components/InterestButtons'

export const dynamic = 'force-dynamic'

export default async function TrendPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  const query = supabase
    .from('trend_news')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: true })

  const { data: trends } = category
    ? await query.eq('category', category)
    : await query

  // Group by date
  const byDate: Record<string, TrendNews[]> = {}
  for (const item of trends ?? []) {
    if (!byDate[item.date]) byDate[item.date] = []
    byDate[item.date].push(item)
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">トレンドニュース</h1>
      <p className="text-sm text-gray-500 mb-6">計算物理・プログラミング・AI・数学・効率化の最新動向</p>

      <CategoryFilter selected={category} />

      {Object.keys(byDate).length === 0 && (
        <p className="text-gray-400 text-sm">データがありません</p>
      )}

      {Object.entries(byDate).map(([date, items]) => (
        <section key={date} className="mb-10">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 border-b pb-2">
            {date}
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <article key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
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
                <InterestButtons id={item.id} interested={item.interested} />
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
