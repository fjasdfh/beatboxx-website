import type { Metadata } from 'next'
import PostCard from '@/components/blog/PostCard'
import { getAllPosts, SITE_URL, BLOG_BASE_PATH } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — Beatboxx',
  description:
    'Beatboxing tutorials, app tips, and honest comparisons of the best beatbox tools and apps. Learn, record, and level up with Beatboxx.',
  alternates: { canonical: `${SITE_URL}${BLOG_BASE_PATH}` },
  openGraph: {
    title: 'The Beatboxx Blog',
    description:
      'Beatboxing tutorials, app tips, and honest comparisons of the best beatbox tools and apps.',
    url: `${SITE_URL}${BLOG_BASE_PATH}`,
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-24">
      <div className="max-w-6xl mx-auto">
        <header className="max-w-2xl mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Beatboxx Journal</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            Tutorials, app tips, and honest comparisons.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Deep-dives on beatboxing technique, product updates from the Beatboxx team, and straightforward
            reviews of the tools and apps in the space.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet — check back soon.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
