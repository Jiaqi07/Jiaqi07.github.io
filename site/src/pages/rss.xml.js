import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Alan Chen / writing',
    description:
      'Research notes, build logs, and writeups on robot learning, reinforcement learning, and building things.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.title,
      pubDate: p.date,
      description: p.description,
      link: `/blog/${p.slug}`,
      categories: p.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
