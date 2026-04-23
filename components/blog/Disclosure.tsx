export default function Disclosure({ children }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider text-primary bg-background border border-accent-vibrant/60 px-2 py-0.5 rounded-full shadow-sm">
      {children ?? 'Ours'}
    </span>
  )
}
