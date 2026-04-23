import { getAllPosts, SITE_URL, BLOG_BASE_PATH, postUrl } from '@/lib/blog'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const posts = getAllPosts(false).slice(0, 20)
  const updated = posts[0]?.updatedAt ?? posts[0]?.publishedAt ?? new Date().toISOString()

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.publishedAt).toUTCString()
      const link = postUrl(post)
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <author>noreply@beatboxx.app (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Beatboxx Blog</title>
    <link>${SITE_URL}${BLOG_BASE_PATH}</link>
    <description>Tutorials, app tips, and honest comparisons of the best beatbox tools and apps.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}${BLOG_BASE_PATH}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
