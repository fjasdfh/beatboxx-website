import { absoluteUrl, postUrl, SITE_URL, type Post } from './blog'

function blogPostingNode(post: Post) {
  return {
    '@type': 'BlogPosting',
    '@id': `${postUrl(post)}#blogposting`,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.coverImage),
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Beatboxx',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/web-app-manifest-512x512.png` },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(post) },
    articleSection: post.category,
    keywords: post.tags.join(', '),
  }
}

function itemListNode(post: Post) {
  if (!post.appList || post.appList.length === 0) return null
  return {
    '@type': 'ItemList',
    '@id': `${postUrl(post)}#itemlist`,
    name: post.title,
    numberOfItems: post.appList.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: post.appList.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: item.url,
      item: {
        '@type': 'SoftwareApplication',
        name: item.name,
        description: item.tagline,
        url: item.url,
        operatingSystem: item.operatingSystem?.join(', '),
        applicationCategory: item.applicationCategory ?? 'MusicApplication',
        ...(typeof item.price === 'number'
          ? {
              offers: {
                '@type': 'Offer',
                price: item.price,
                priceCurrency: item.priceCurrency ?? 'USD',
              },
            }
          : {}),
        ...(typeof item.rating === 'number'
          ? {
              review: {
                '@type': 'Review',
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: item.rating,
                  bestRating: 5,
                },
                author: { '@type': 'Organization', name: post.author },
              },
            }
          : {}),
      },
    })),
  }
}

function faqPageNode(post: Post) {
  if (!post.faq || post.faq.length === 0) return null
  return {
    '@type': 'FAQPage',
    '@id': `${postUrl(post)}#faq`,
    mainEntity: post.faq.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: { '@type': 'Answer', text: qa.answer },
    })),
  }
}

export function schemaForPost(post: Post): object {
  const nodes: object[] = [blogPostingNode(post)]
  if (post.type === 'listicle') {
    const list = itemListNode(post)
    if (list) nodes.push(list)
    const faq = faqPageNode(post)
    if (faq) nodes.push(faq)
  }
  if (nodes.length === 1) {
    return { '@context': 'https://schema.org', ...nodes[0] }
  }
  return { '@context': 'https://schema.org', '@graph': nodes }
}
