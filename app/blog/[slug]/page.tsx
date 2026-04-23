import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Calendar, User, ArrowLeft, Download } from 'lucide-react'

import {
  getAllSlugs,
  getPostBySlug,
  postUrl,
  formatPublishedDate,
  SITE_URL,
} from '@/lib/blog'
import { mdxComponents } from '@/lib/mdx-components'
import { schemaForPost } from '@/lib/listicle-schema'
import UpdatedBadge from '@/components/blog/UpdatedBadge'
import AppList from '@/components/blog/AppList'
import FAQ from '@/components/blog/FAQ'
import CompareTable from '@/components/blog/CompareTable'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const url = postUrl(post)
  const image = post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`

  return {
    title: `${post.title} — Beatboxx Blog`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.coverImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
  }
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const schema = schemaForPost(post)

  return (
    <article className="pt-20 md:pt-12 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          All posts
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary-light/30 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            {post.type === 'listicle' && <UpdatedBadge post={post} />}
            {post.draft && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                Draft
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{post.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4" aria-hidden />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden />
              {formatPublishedDate(post.publishedAt)}
            </span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-border-light">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {post.type === 'listicle' && post.appList && <AppList items={post.appList} />}
        {post.type === 'listicle' && post.compare && <CompareTable data={post.compare} />}
        {post.type === 'listicle' && post.faq && <FAQ items={post.faq} />}

        <aside className="mt-16 rounded-2xl border border-primary-light/60 bg-primary-light/20 p-6 md:p-8 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground">Record your own beats.</h2>
          <p className="mt-2 text-muted-foreground">
            Beatboxx is a privacy-first recorder and organizer for beatboxers. 100% on-device, free to start.
          </p>
          <Link
            href="/#download"
            className="mt-5 inline-flex items-center gap-2 bg-primary text-background font-medium px-5 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            <Download className="w-4 h-4" />
            Get Beatboxx
          </Link>
        </aside>
      </div>
    </article>
  )
}
