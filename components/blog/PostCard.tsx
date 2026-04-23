import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { formatPublishedDate, type Post } from '@/lib/blog'

export default function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border-light bg-background/60 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] bg-primary-light/20 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-primary bg-background/90 backdrop-blur px-2.5 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.description}</p>

        <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" aria-hidden />
            {formatPublishedDate(post.publishedAt)}
          </span>
          <span>{post.readingTime}</span>
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
          Read article
          <ArrowRight className="w-4 h-4" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
