import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export const SITE_URL = 'https://beatboxx.app'
export const BLOG_BASE_PATH = '/blog'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export type PostType = 'article' | 'listicle'

export interface AppListItem {
  name: string
  tagline?: string
  iconUrl?: string
  screenshotUrl?: string
  url: string
  operatingSystem?: string[]
  applicationCategory?: string
  priceLabel?: string
  price?: number
  priceCurrency?: string
  rating?: number
  pros?: string[]
  cons?: string[]
  isOurs?: boolean
  bestFor?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface CompareColumn {
  key: string
  label: string
}

export interface CompareRow {
  label: string
  cells: Record<string, string | boolean>
}

export interface CompareData {
  columns: CompareColumn[]
  rows: CompareRow[]
}

export interface Post {
  slug: string
  type: PostType
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author: string
  coverImage: string
  coverImageAlt: string
  category: string
  tags: string[]
  draft: boolean
  content: string
  readingTime: string
  appList?: AppListItem[]
  faq?: FaqItem[]
  compare?: CompareData
}

const REQUIRED_FIELDS = [
  'title',
  'description',
  'publishedAt',
  'author',
  'coverImage',
  'coverImageAlt',
  'category',
  'tags',
] as const

function parsePost(filePath: string): Post {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const filename = path.basename(filePath)

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      throw new Error(`Blog post "${filename}" is missing required frontmatter field: ${field}`)
    }
  }

  const type: PostType = data.type === 'listicle' ? 'listicle' : 'article'
  const slug: string = data.slug || filename.replace(/\.mdx?$/, '')

  if (type === 'listicle' && !Array.isArray(data.appList)) {
    throw new Error(`Listicle post "${filename}" requires an "appList" array in frontmatter`)
  }

  const stats = readingTime(content)

  return {
    slug,
    type,
    title: String(data.title),
    description: String(data.description),
    publishedAt: toIsoDate(data.publishedAt, filename, 'publishedAt'),
    updatedAt: data.updatedAt ? toIsoDate(data.updatedAt, filename, 'updatedAt') : undefined,
    author: String(data.author),
    coverImage: String(data.coverImage),
    coverImageAlt: String(data.coverImageAlt),
    category: String(data.category),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    content,
    readingTime: stats.text,
    appList: Array.isArray(data.appList) ? (data.appList as AppListItem[]) : undefined,
    faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : undefined,
    compare:
      data.compare && Array.isArray(data.compare.columns) && Array.isArray(data.compare.rows)
        ? (data.compare as CompareData)
        : undefined,
  }
}

function toIsoDate(input: unknown, filename: string, field: string): string {
  if (input instanceof Date) return input.toISOString().slice(0, 10)
  if (typeof input === 'string' && /^\d{4}-\d{2}-\d{2}/.test(input)) return input.slice(0, 10)
  throw new Error(`Blog post "${filename}" has invalid ${field}: expected YYYY-MM-DD, got ${String(input)}`)
}

let cachedPosts: Post[] | null = null

function readAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts
  if (!fs.existsSync(CONTENT_DIR)) {
    cachedPosts = []
    return cachedPosts
  }
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f))
  cachedPosts = files
    .map((f) => parsePost(path.join(CONTENT_DIR, f)))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  return cachedPosts
}

export function getAllPosts(includeDrafts = process.env.NODE_ENV !== 'production'): Post[] {
  const posts = readAllPosts()
  return includeDrafts ? posts : posts.filter((p) => !p.draft)
}

export function getPostBySlug(slug: string): Post | undefined {
  return readAllPosts().find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}

export function postUrl(post: Post): string {
  return `${SITE_URL}${BLOG_BASE_PATH}/${post.slug}`
}

export function formatPublishedDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatUpdatedLabel(post: Pick<Post, 'publishedAt' | 'updatedAt'>): string {
  const d = new Date(post.updatedAt ?? post.publishedAt)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}
