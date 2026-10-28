export interface ResourceLinks { paper?: string; code?: string; project?: string }
export interface Publication {
  id: string; title: string; authors: string[]; venue: string; year: number;
  summary: string; thumbnail?: string; thumbnailAlt?: string;
  links: ResourceLinks; placeholder?: boolean;
}
export interface Project {
  id: string; title: string; category: string; description: string;
  tags: string[]; thumbnail?: string; thumbnailAlt?: string;
  links: ResourceLinks; placeholder?: boolean;
}
export interface Update { date: string; text: string; url?: string; placeholder?: boolean }

// 示例均为占位内容，不代表真实成果。支持的链接留空时不渲染。
export const publications: Publication[] = [
  {
    id: 'example-publication', title: 'Your publication title goes here',
    authors: ['Author names to be added'], venue: 'Venue to be added', year: 2026,
    summary: 'A short summary of the research question, method, and key findings will appear here.',
    thumbnail: '/images/research-placeholder.svg', thumbnailAlt: 'Abstract research diagram — publication thumbnail placeholder',
    links: { paper: '', code: '', project: '' }, placeholder: true,
  },
];
export const projects: Project[] = [
  {
    id: 'example-project', title: 'Your research or engineering project', category: 'Research / Engineering',
    description: 'Describe the problem, your contribution, and the outcome. Add a repository or project website when it is ready.',
    tags: ['Topic', 'Method'], thumbnail: '/images/research-placeholder.svg',
    thumbnailAlt: 'Abstract research diagram — project thumbnail placeholder',
    links: { code: '', project: '' }, placeholder: true,
  },
];
export const updates: Update[] = [
  { date: '2026-10-28', text: 'An example update. Replace this with a real announcement, milestone, or new piece of work.', placeholder: true },
];
export const sortedPublications = [...publications].sort((a, b) => b.year - a.year || a.id.localeCompare(b.id));
export const sortedUpdates = [...updates].sort((a, b) => b.date.localeCompare(a.date));
