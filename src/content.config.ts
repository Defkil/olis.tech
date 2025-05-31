import {glob} from 'astro/loaders';
import {defineCollection, z} from 'astro:content';
import {BLOG_CATEGORIES_IDS} from "./consts.ts";

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		category: z.enum(BLOG_CATEGORIES_IDS),
	}),
});

export const collections = { blog };
