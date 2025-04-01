import { client } from "./sanity";
import { BlogOverview, FullBlog, BlogOverviewSchema, FullBlogSchema } from "./types";

const CACHE_TTL = 60 * 60; // 1 hour in seconds

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

function isCacheValid<T>(entry: CacheEntry<T> | undefined): boolean {
  if (!entry) return false;
  return Date.now() - entry.timestamp < CACHE_TTL * 1000;
}

export async function getBlogOverviews(): Promise<BlogOverview[]> {
  const cacheKey = "blog-overviews";
  const cachedEntry = cache.get(cacheKey);

  if (cachedEntry && isCacheValid(cachedEntry)) {
    return cachedEntry.data;
  }

  try {
    const query = `*[_type == 'blog'] | order(_createdAt desc){
      title,
      "currentSlug": slug.current,
      author,
      category,
      type,
    }`;

    const data = await client.fetch(query);
    const validatedData = data.map((item: any) => BlogOverviewSchema.parse(item));

    cache.set(cacheKey, {
      data: validatedData,
      timestamp: Date.now(),
    });

    return validatedData;
  } catch (error) {
    console.error("Error fetching blog overviews:", error);
    throw new Error("Failed to fetch blog overviews");
  }
}

export async function getBlogBySlug(slug: string): Promise<FullBlog> {
  const cacheKey = `blog-${slug}`;
  const cachedEntry = cache.get(cacheKey);

  if (cachedEntry && isCacheValid(cachedEntry)) {
    return cachedEntry.data;
  }

  try {
    const query = `
      *[_type == "blog" && slug.current == $slug] {
        title,
        "currentSlug": slug.current,
        author,
        biographyText,
        biographyName,
        date,
        language,
        citation,
        category,
        content,
        footnotes
      }[0]`;

    const data = await client.fetch(query, { slug });
    const validatedData = FullBlogSchema.parse(data);

    cache.set(cacheKey, {
      data: validatedData,
      timestamp: Date.now(),
    });

    return validatedData;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    throw new Error("Failed to fetch blog article");
  }
}

export function clearCache() {
  cache.clear();
} 