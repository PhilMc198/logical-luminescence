import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    readingTime: z.number(),
    excerpt: z.string(),
    featured: z.boolean().optional(),
    cognitive_domains: z.array(z.string()),
    ai_applications: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'research']),
    image: z.string().optional(),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    industry: z.string(),
    company_name: z.string().optional(),
    company_size: z.enum(['small', 'medium', 'large', 'enterprise']),
    challenge: z.string(),
    solution: z.string(),
    outcome: z.string(),
    duration_weeks: z.number().optional(),
    metrics: z.array(z.object({
      name: z.string(),
      before: z.string(),
      after: z.string(),
      improvement: z.number(),
      description: z.string().optional(),
    })),
    ai_tools: z.array(z.string()),
    key_takeaways: z.array(z.string()),
    image: z.string().optional(),
  }),
});

const frameworks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    framework_type: z.enum(['decision_matrix', 'process', 'assessment', 'checklist', 'model', 'strategy']),
    use_case: z.string(),
    time_to_complete: z.number(),
    downloadable: z.string().optional(), // Path to PDF/DOCX
    image: z.string().optional(),
  }),
});

const exercises = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    duration: z.number(), // minutes
    exercise_type: z.enum(['reflection', 'interactive', 'practice', 'assessment', 'meditation']),
    materials_needed: z.array(z.string()),
    learning_objectives: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = {
  insights,
  'case-studies': caseStudies,
  frameworks,
  exercises,
};