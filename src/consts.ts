export const SITE_TITLE = 'Olis.tech';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const BLOG_CATEGORIES: {
  id: string;
  name: string;
}[] = [
  {
    id: 'projects',
    name: 'Projects',
  },
  {
    id: 'web-development',
    name: 'Web Development',
  },
  {
    id: 'programming',
    name: 'Programming',
  },
  {
    id: 'tools',
    name: 'Tools',
  },
  {
    id: 'other',
    name: 'Other',
  },
]

export const BLOG_CATEGORIES_IDS = BLOG_CATEGORIES.map((category) => category.id) as [string, ...string[]];
