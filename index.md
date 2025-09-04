---
# SEO metadata (for SSGs that support front matter)
# If not using a static site generator, implement these in your HTML head

# Basic
title: "Beatboxx — Recorder & Organizer for Beatboxers"
description: "Organize beatbox ideas, tag techniques, build routines, and prep battle rounds. 100% on-device, privacy-first. iOS & Android."
canonical_url: "https://beatboxx.app/"
lang: en

# Open Graph / Twitter
og_title: "Beatboxx — Recorder & Organizer for Beatboxers"
og_description: "Organize beatbox ideas, tag techniques, build routines, and prep battle rounds. 100% on-device, privacy-first."
og_type: "website"
og_url: "https://beatboxx.app/"
og_image: "/og.png"  # TODO: add final image path
twitter_card: "summary_large_image"
# twitter_site: "@your_handle"  # optional
---

# Beatboxx: Recorder & Organizer for Beatboxers

Organize beats. Build routines. Win battles.

Beatboxx is the first beatbox app built specifically for beatboxers — from beginners to world-stage competitors. Capture every idea, tag techniques, and turn your best material into battle-ready routines.

[Download on iOS]({{APP_STORE_URL}}) · [Download on Android]({{PLAY_STORE_URL}}) · [Follow on Instagram](https://www.instagram.com/beatboxxapp/)

—

## Why Beatboxx (vs. Voice Memos)
- Find relevant ideas fast with intelligent tags (technique, energy, tempo, mood)
- Build setlists that flow: pin best takes, reorder ideas, and preview transitions
- Prepare your battle rounds, stage by stage — without messy notes or scrolling
- 100% on-device, privacy-first. No account. No tracking.

## Built for Beatboxers
Beatboxx understands your creative process:
- Capture every idea quickly
- Tag by technique (e.g., lip rolls, inward bass), energy, tempo, and mood
- Search combinations like “technical + trap” or locate “build-ups” and “drops” instantly
- Group ideas into routines and reorder them until the flow is perfect

## Smart Beat Discovery (Tagging & Search)
- Tag what matters: techniques, energy, tempo, mood, sections (intro, build-up, drop)
- Powerful queries: “technical + trap”, “build-up → drop”, “high-energy hip hop”
- Quick-listen: jump to any part when you forget the starting melody

## Genre-Based Organization
- Create routine folders: Trap Routines, Hip Hop Battles, DnB Performances
- Pin your best takes at the top of each routine
- Drag to reorder for perfect flow — never lose a great beat again

## Battle Preparation — From Elim to Finals
A dedicated Battle Prep space to plan material by round:
- Organize sets by stage: Elimination → Quarterfinal → Semifinal → Final
- Prepare alternates and backups for each round
- Add custom sections for special formats
- Keep quick notes for cues and transitions

Example structure:
- Elimination: High-impact opener → Technical mid → Signature drop
- Quarterfinal: Genre switch (Trap) → Build-up → Clean finisher
- Semifinal: Crowd-interaction intro → Increase energy → Power drop
- Final: Best-of medley → High-speed tech → Explosive closer

## Privacy-First by Design
- 100% on-device: recordings, tags, routines — all stored locally
- No cloud uploads, no tracking, no analytics SDKs, no account required
- Optional backups to your private iCloud/Google Drive folder
- Restore with everything still in its place

Privacy Policy: /privacy
Terms of Use: /terms
Support page: https://sites.google.com/view/beatboxx-app/home

## Supporting the Community
Beatboxx is free. Optional donations are available — 80% goes directly back to the beatbox community (events, judges, venues).

## Testimonials
> “I’m way more organized with my stuff now.”
>
> “Mate you have no idea how much it will change me and mostly my beginner beatbox friends who also want to beatbox in the high levels.”

## Design & Accessibility
- Light Theme: background #F5F3E6, text #373A2C
- Accent palette: #D4EC9D, #526526, #AEB29E
- Dark mode available

—

## FAQ

### How is Beatboxx different from Voice Memos?
Voice Memos records audio. Beatboxx organizes your beatbox. Tag techniques and sections, search combinations like “technical + trap,” build routines with pinned best takes, and prep battle sets by round — all in one place.

### Can I tag by technique and mood/tempo?
Yes. Tag techniques (e.g., lip rolls, inward bass), energy, tempo, mood, and structural sections (intro, build-up, drop). You can filter or search using any combination.

### How do I prepare for different battle stages?
Use the Battle Prep tab to create Elim → Quarterfinal → Semifinal → Final rounds, add alternates, notes, and ordering. Quick-listen lets you recall starting melodies instantly.

### Is everything private and offline?
Yes. Beatboxx is 100% on-device by default — no cloud, no tracking, no account. You control optional backups to your own iCloud/Google Drive folder.

### Is Beatboxx free? How do donations work?
Beatboxx is free. Donations are optional, and 80% goes directly back to the beatbox community (events, judges, venues).

### Will there be iOS/Android parity? What’s on the roadmap?
Both platforms are supported. We prioritize parity; near-term roadmap includes usability refinements and routine-building improvements. Follow Instagram for updates.

### Can I import existing voice memos?
Yes. Import recordings from your device or Files. Tag, sort, and add them to routines just like new recordings.

—

## Get Beatboxx
[Download on iOS]({{APP_STORE_URL}}) · [Download on Android]({{PLAY_STORE_URL}}) · [Follow on Instagram](https://www.instagram.com/beatboxxapp/)

Support: dev.apollonbeatbox@gmail.com

—

<!-- JSON-LD: SoftwareApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Beatboxx: Recorder & Organizer",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "Music",
  "description": "Beatboxx is the beatbox recorder and routine organizer for beatboxers. Tag techniques, find drops, build battle rounds, and perform with confidence. 100% on-device.",
  "url": "https://beatboxx.app/",
  "image": "https://beatboxx.app/og.png",
  "sameAs": [
    "https://www.instagram.com/beatboxxapp/"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "category": "Free"
  },
  "privacyPolicy": "https://beatboxx.app/privacy",
  "termsOfService": "https://beatboxx.app/terms",
  "downloadUrl": [
    "https://apps.apple.com/app/id{{APP_STORE_ID}}",
    "https://play.google.com/store/apps/details?id={{PLAY_STORE_ID}}"
  ],
  "isAccessibleForFree": true
}
</script>

<!-- JSON-LD: FAQPage -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is Beatboxx different from Voice Memos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beatboxx lets you tag techniques and sections, search combinations (e.g., 'technical + trap'), build routines with pinned best takes, and prepare battle rounds by stage — all 100% on-device."
      }
    },
    {
      "@type": "Question",
      "name": "Can I tag by technique and mood/tempo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Tag techniques (lip rolls, inward bass), energy, tempo, mood, and structural sections like intro, build-up, and drop, then search or filter by any combination."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prepare for different battle stages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the Battle Prep tab to set up Elim → Quarterfinal → Semifinal → Final rounds, add alternates and notes, and reorder material for perfect flow."
      }
    },
    {
      "@type": "Question",
      "name": "Is everything private and offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Beatboxx stores recordings and data on your device. No cloud, no tracking, no account. Optional backups go to your private iCloud/Google Drive."
      }
    },
    {
      "@type": "Question",
      "name": "Is Beatboxx free? How do donations work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beatboxx is free. Optional donations are available; 80% supports the beatbox community — events, judges, and venues."
      }
    },
    {
      "@type": "Question",
      "name": "Will there be iOS/Android parity? What’s on the roadmap?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both platforms are supported with a focus on parity. The roadmap includes usability and routine-building improvements. Follow Instagram for updates."
      }
    },
    {
      "@type": "Question",
      "name": "Can I import existing voice memos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Import from your device or Files and organize with tags and routines."
      }
    }
  ]
}
</script>

