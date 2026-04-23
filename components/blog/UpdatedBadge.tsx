import { Clock3 } from 'lucide-react'
import { formatUpdatedLabel, type Post } from '@/lib/blog'

export default function UpdatedBadge({ post }: { post: Pick<Post, 'publishedAt' | 'updatedAt'> }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary-light/30 border border-primary-light/60 px-3 py-1 rounded-full">
      <Clock3 className="w-3.5 h-3.5" aria-hidden />
      Updated {formatUpdatedLabel(post)}
    </span>
  )
}
