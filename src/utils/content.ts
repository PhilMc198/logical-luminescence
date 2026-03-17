import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

// ─── Types (re-exported for convenience) ──────────────────────────────────

export type Essay        = CollectionEntry<'essays'>;
export type Practice     = CollectionEntry<'practices'>;
export type ReadingItem  = CollectionEntry<'reading-list'>;
export type Page         = CollectionEntry<'pages'>;

export type Pillar =
  | 'inner-life'
  | 'technological-reality'
  | 'power-and-economy'
  | 'adaptation-and-agency';

// ─── Pillar metadata ───────────────────────────────────────────────────────

export const pillars: Record<Pillar, { label: string; description: string }> = {
  'inner-life': {
    label: 'The inner life',
    description: 'Contemplative practice, self-knowledge, and the examined life as foundations for navigating change.',
  },
  'technological-reality': {
    label: 'The technological reality',
    description: 'Honest, non-hyped assessment of AI and autonomous systems and what their proliferation actually means.',
  },
  'power-and-economy': {
    label: 'Power and political economy',
    description: 'Wealth concentration, democratic accountability, and the structural stakes of a civilisational disruption.',
  },
  'adaptation-and-agency': {
    label: 'Adaptation and agency',
    description: 'How individuals and communities find genuine agency and flourishing within the transition.',
  },
};

// ─── Essay queries ─────────────────────────────────────────────────────────

export async function getAllEssays(): Promise<Essay[]> {
  const essays = await getCollection('essays', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return essays.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
}

export async function getFeaturedEssays(): Promise<Essay[]> {
  const essays = await getAllEssays();
  return essays.filter((e) => e.data.featured);
}

export async function getEssaysByPillar(pillar: Pillar): Promise<Essay[]> {
  const essays = await getAllEssays();
  return essays.filter((e) => e.data.pillar === pillar);
}

export async function getEssayBySlug(slug: string): Promise<Essay | undefined> {
  return getEntry('essays', slug);
}

// ─── Practice queries ──────────────────────────────────────────────────────

export async function getAllPractices(): Promise<Practice[]> {
  const practices = await getCollection('practices', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return practices.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
}

export async function getPracticesByPillar(pillar: Pillar): Promise<Practice[]> {
  const practices = await getAllPractices();
  return practices.filter((p) => p.data.pillar === pillar);
}

// ─── Reading list queries ──────────────────────────────────────────────────

export async function getAllReadingItems(): Promise<ReadingItem[]> {
  const items = await getCollection('reading-list', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return items.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
}

export async function getEssentialReading(): Promise<ReadingItem[]> {
  const items = await getAllReadingItems();
  return items.filter((i) => i.data.weight === 'essential');
}

export async function getReadingByPillar(pillar: Pillar): Promise<ReadingItem[]> {
  const items = await getAllReadingItems();
  return items.filter((i) => i.data.pillar === pillar);
}

// ─── Page queries ──────────────────────────────────────────────────────────

export async function getPage(slug: string): Promise<Page | undefined> {
  const pages = await getCollection('pages');
  return pages.find((p) => p.id === slug);
}

// ─── Cross-content: related content resolver ───────────────────────────────
// Given an essay, resolve its related essays and practices as full entries.

export async function resolveRelated(essay: Essay): Promise<{
  essays: Essay[];
  practices: Practice[];
}> {
  const [allEssays, allPractices] = await Promise.all([
    getAllEssays(),
    getAllPractices(),
  ]);

  return {
    essays: allEssays.filter((e) =>
      essay.data.relatedEssays.includes(e.slug)
    ),
    practices: allPractices.filter((p) =>
      essay.data.relatedPractices.includes(p.slug)
    ),
  };
}
