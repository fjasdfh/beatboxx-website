import { Check, Minus } from 'lucide-react'
import type { CompareData } from '@/lib/blog'

function renderCell(value: string | boolean | undefined) {
  if (value === true) return <Check className="w-4 h-4 text-primary mx-auto" aria-label="Yes" />
  if (value === false || value === undefined)
    return <Minus className="w-4 h-4 text-muted-foreground mx-auto" aria-label="No" />
  return <span className="text-sm">{value}</span>
}

export default function CompareTable({ data }: { data: CompareData }) {
  if (!data || !data.columns.length) return null
  return (
    <div className="not-prose my-10 relative rounded-2xl border border-border-light bg-background/60">
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[560px] text-left">
        <thead className="bg-primary-light/20 border-b border-border-light">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-primary">Feature</th>
            {data.columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-primary text-center"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-background/30' : ''}>
              <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
              {data.columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-center text-foreground">
                  {renderCell(row.cells[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-2xl bg-gradient-to-l from-background/90 to-transparent sm:hidden"
      />
    </div>
  )
}
