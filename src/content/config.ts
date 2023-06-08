import { z, defineCollection } from 'astro:content';

const collectionSchemaDefault = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().url().optional(),
  publishDate: z.date(),
  updateDate: z.date().optional(),
})

const allgemein = defineCollection({
  type: 'content',
  schema: collectionSchemaDefault
})

const server = defineCollection({
  type: 'content',
  schema: collectionSchemaDefault
})

export const collections = {
  allgemein,
  server
}
