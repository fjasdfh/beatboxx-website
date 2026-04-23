import Image from 'next/image'
import { Check, X, Star, ExternalLink } from 'lucide-react'
import type { AppListItem } from '@/lib/blog'
import Disclosure from './Disclosure'

function Rating({ value }: { value: number }) {
  const full = Math.round(value * 2) / 2
  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < full ? 'text-accent-vibrant fill-accent-vibrant' : 'text-muted'}`}
          aria-hidden
        />
      ))}
      <span className="ml-1 text-sm font-medium text-muted-foreground">{value.toFixed(1)}</span>
    </div>
  )
}

export default function AppList({ items }: { items: AppListItem[] }) {
  if (!items?.length) return null
  return (
    <ol className="not-prose my-10 space-y-6 list-none p-0">
      {items.map((item, idx) => (
        <li
          key={item.name}
          className={`relative rounded-2xl border bg-background/60 backdrop-blur-sm p-5 md:p-6 shadow-sm transition-all hover:shadow-md ${
            item.isOurs ? 'border-accent-vibrant/60 ring-1 ring-accent-vibrant/40' : 'border-border-light'
          }`}
        >
          {item.isOurs && (
            <div className="absolute -top-3 left-5">
              <Disclosure />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-start gap-4 md:w-1/3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-display font-bold text-lg flex-shrink-0">
                {idx + 1}
              </div>
              {item.iconUrl && (
                <Image
                  src={item.iconUrl}
                  alt={`${item.name} icon`}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-xl border border-border-light flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <h3 className="font-display font-bold text-xl text-foreground leading-tight">{item.name}</h3>
                {item.tagline && <p className="text-sm text-muted-foreground mt-1">{item.tagline}</p>}
                {typeof item.rating === 'number' && (
                  <div className="mt-2">
                    <Rating value={item.rating} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 grid sm:grid-cols-2 gap-4">
              {item.pros && item.pros.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Pros</p>
                  <ul className="space-y-1.5">
                    {item.pros.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" aria-hidden />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.cons && item.cons.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Cons</p>
                  <ul className="space-y-1.5">
                    {item.cons.map((c) => (
                      <li key={c} className="flex gap-2 text-sm text-foreground">
                        <X className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" aria-hidden />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border-light flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex flex-wrap gap-3 text-muted-foreground">
              {item.priceLabel && <span>💵 {item.priceLabel}</span>}
              {item.operatingSystem && item.operatingSystem.length > 0 && (
                <span>📱 {item.operatingSystem.join(', ')}</span>
              )}
              {item.bestFor && <span>🎯 Best for: {item.bestFor}</span>}
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-accent-vibrant transition-colors"
            >
              Visit {item.name}
              <ExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </li>
      ))}
    </ol>
  )
}
