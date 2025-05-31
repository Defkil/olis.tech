export const STARTED_PROGRAMMING_IN_YEARS = new Date().getFullYear() - 2009;
export const SITE_TITLE = 'Olis.tech';
export const SITE_DESCRIPTION = 'I\'m Oli, a passionate developer with ' + STARTED_PROGRAMMING_IN_YEARS + '+ years of experience exploring the digital world. This blog shares insights on web development, software engineering and hardware tinkering.';

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
