import { defineCollection, z } from 'astro:content';

// ─── Shared schemas ────────────────────────────────────────────────────────

const pillar = z.enum(['inner-life', 'technological-reality', 'power-and-economy', 'adaptation-and-agency']);

const baseContent = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  pillar: pillar.optional(),
  tags: z.array(z.string()).default([]),
  ogImage: z.string().optional(),
});

// ─── Essays ────────────────────────────────────────────────────────────────
// Long-form analytical and reflective writing. The primary content type.

const essaysCollection = defineCollection({
  type: 'content',
  schema: baseContent.extend({
    subtitle: z.string().optional(),

    // Reading time is auto-calculated at build time (see utils/readingTime.ts)
    // but can be overridden here if needed
    readingTimeOverride: z.number().int().positive().optional(),

    // Controls whether this essay is featured on the homepage
    featured: z.boolean().default(false),

    // For multi-part series
    series: z.object({
      name: z.string(),
      part: z.number().int().positive(),
      total: z.number().int().positive().optional(),
    }).optional(),

    // Cross-references to other content
    relatedEssays: z.array(z.string()).default([]),  // slugs
    relatedPractices: z.array(z.string()).default([]), // slugs

    // Optional pullquote to surface on index/card views
    pullquote: z.string().optional(),
  }),
});

// ─── Practices ────────────────────────────────────────────────────────────
// Shorter, more practical pieces: meditations, exercises, frameworks.

const practicesCollection = defineCollection({
  type: 'content',
  schema: baseContent.extend({
    // How long the practice itself takes (not reading time)
    duration: z.object({
      value: z.number().positive(),
      unit: z.enum(['minutes', 'days', 'weeks', 'ongoing']),
    }).optional(),

    // Difficulty / prior knowledge assumed
    level: z.enum(['entry', 'developing', 'established']).default('entry'),

    // What tradition or framework this draws from, if any
    tradition: z.string().optional(),

    relatedEssays: z.array(z.string()).default([]),
  }),
});

// ─── Reading List ──────────────────────────────────────────────────────────
// Curated external references: books, papers, articles, videos.

const readingListCollection = defineCollection({
  type: 'content',
  schema: baseContent.extend({
    // The external resource being recommended
    resource: z.object({
      author: z.string(),
      year: z.number().int().min(1900).max(2100).optional(),
      type: z.enum(['book', 'article', 'paper', 'video', 'podcast', 'website']),
      url: z.string().url().optional(),
      publisher: z.string().optional(),
    }),

    // Why it's here — a short editorial note (separate from description)
    whyItMatters: z.string(),

    // How strongly recommended
    weight: z.enum(['essential', 'recommended', 'supplementary']).default('recommended'),

    relatedEssays: z.array(z.string()).default([]),
  }),
});

// ─── Pages ────────────────────────────────────────────────────────────────
// Standalone content-managed pages: Start Here, About, etc.
// These are not listed in feeds but are managed as MDX for easy editing.

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.coerce.date().optional(),
    // Pages can have a featured pullquote shown in the hero
    pullquote: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

// ─── Export ────────────────────────────────────────────────────────────────

export const collections = {
  essays: essaysCollection,
  practices: practicesCollection,
  'reading-list': readingListCollection,
  pages: pagesCollection,
};
