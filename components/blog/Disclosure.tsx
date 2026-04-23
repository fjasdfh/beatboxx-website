import { ShieldCheck } from 'lucide-react'

export default function Disclosure({ children }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-primary bg-accent-vibrant/20 border border-accent-vibrant/40 px-2.5 py-1 rounded-full">
      <ShieldCheck className="w-3 h-3" aria-hidden />
      {children ?? 'Our app — honest listing'}
    </span>
  )
}
