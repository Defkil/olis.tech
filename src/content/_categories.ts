import { z } from "astro:content";

export const categories: CategoryData[] = [
  {
    title: "Allgemein",
    collection: "allgemein",
    description: "Allgemeine Informationen",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Meine Projekte",
    collection: "projekte",
    description: "Meine Projekte",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Webentwicklung",
    collection: "webentwicklung",
    description: "Webentwicklung Informationen",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Programmierung",
    collection: "programmierung",
    description: "Programmierung Informationen",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Tools",
    collection: "tools",
    description: "Tools Informationen",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Linux",
    collection: "linux",
    description: "Linux Informationen",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Sonstiges",
    collection: "sonstiges",
    description: "Sonstiges",
    image: "https://via.placeholder.com/150",
  },
];

export const categorySchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().url().optional(),
  publishDate: z.date(),
  updateDate: z.date().optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export interface CategoryData<T extends CategorySchema = CategorySchema> {
  title: string;
  collection: string;
  description: string;
  image: string;
  custom?: {
    layout: string;
    schema: T;
  };
}

export const getCategoryData = (categoryName: string): CategoryData => {
  const category = categories.find((category) => category.collection === categoryName);
  if (!category) {
    throw new Error(`Category ${categoryName} not found`);
  }
  return category;
};
