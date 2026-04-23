import { Info, AlertTriangle, Lightbulb, CheckCircle2, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Variant = 'info' | 'warning' | 'tip' | 'success'

const VARIANTS: Record<Variant, { icon: LucideIcon; className: string; iconClass: string }> = {
  info: {
    icon: Info,
    className: 'bg-primary-light/20 border-primary-light/60',
    iconClass: 'text-primary',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-amber-50 border-amber-200',
    iconClass: 'text-amber-600',
  },
  tip: {
    icon: Lightbulb,
    className: 'bg-accent-vibrant/10 border-accent-vibrant/40',
    iconClass: 'text-primary',
  },
  success: {
    icon: CheckCircle2,
    className: 'bg-primary-light/20 border-primary/30',
    iconClass: 'text-primary',
  },
}

export default function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: Variant
  title?: string
  children: ReactNode
}) {
  const { icon: Icon, className, iconClass } = VARIANTS[variant]
  return (
    <div className={`my-6 flex gap-3 rounded-xl border px-4 py-4 not-prose ${className}`}>
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconClass}`} aria-hidden />
      <div className="text-foreground">
        {title && <p className="font-display font-semibold mb-1">{title}</p>}
        <div className="text-sm leading-relaxed [&>p]:m-0 [&>p+p]:mt-2">{children}</div>
      </div>
    </div>
  )
}
