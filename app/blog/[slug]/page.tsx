import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Calendar, User, ArrowLeft, Download } from 'lucide-react'

import {
  absoluteUrl,
  getAllSlugs,
  getPostBySlug,
  postUrl,
  formatPublishedDate,
} from '@/lib/blog'
import { schemaForPost } from '@/lib/listicle-schema'
import AnimatedButton from '@/components/AnimatedButton'
import UpdatedBadge from '@/components/blog/UpdatedBadge'
import AppList from '@/components/blog/AppList'
import FAQ from '@/components/blog/FAQ'
import CompareTable from '@/components/blog/CompareTable'
import Callout from '@/components/blog/Callout'

const mdxComponents = { Callout }

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
  const image = absoluteUrl(post.coverImage)

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
  const isListicle = post.type === 'listicle'

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
            {isListicle && <UpdatedBadge post={post} />}
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

        {isListicle && (
          <>
            {post.appList && <AppList items={post.appList} />}
            {post.compare && <CompareTable data={post.compare} />}
            {post.faq && <FAQ items={post.faq} />}
          </>
        )}

        <aside className="mt-16 rounded-2xl border border-primary-light/60 bg-primary-light/20 p-8 md:p-10 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground">Record your own beats.</h2>
          <p className="mt-2 mb-6 text-muted-foreground">
            Beatboxx is a privacy-first recorder and organizer for beatboxers. 100% on-device, free to start.
          </p>
          <AnimatedButton href="/#download" variant="primary" size="md">
            <Download className="w-4 h-4" />
            Get Beatboxx
          </AnimatedButton>
        </aside>
      </div>
    </article>
  )
}
