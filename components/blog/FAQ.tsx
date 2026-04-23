'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/blog'

export default function FAQ({ items, heading = 'Frequently asked questions' }: { items: FaqItem[]; heading?: string }) {
  if (!items?.length) return null
  return (
    <section className="not-prose my-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display font-bold text-2xl md:text-3xl mb-6 text-foreground">
        {heading}
      </h2>
      <Accordion.Root type="multiple" className="space-y-2">
        {items.map((qa, i) => (
          <Accordion.Item
            key={qa.question}
            value={`faq-${i}`}
            className="rounded-xl border border-border-light bg-background/60 overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground hover:bg-primary-light/10 transition-colors">
                <span>{qa.question}</span>
                <ChevronDown
                  className="w-5 h-5 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=open]:animate-fade-in">
              <div className="px-5 pb-4 pt-0 text-foreground/80 leading-relaxed">{qa.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}
