import fs from 'fs'
import { glob } from 'glob'
import { Feed } from 'feed'
import path from 'path'
import matter from 'gray-matter'
import { BlogPostAnnotation, BlogPost } from 'models/BlogPost'
import { BlogCategory } from 'models/BlogCategory'
import { BlogTag } from 'models/BlogTag'
import { fileNameToUrlSlug, getDirectoryName, getFileNameWithoutExtension } from 'utils/pathUtils'
import { Lazy } from 'utils/Lazy'


export type BlogFeedConfig = {
  origin: string
  title: string
  description: string
  copyright: string
  language?: string
  postUrlGenerator: (post: BlogPost) => string
}

export type BlogRepositoryConfig = {
  postsFilePattern: string
  assetsFilePattern: string
  assetsDestination: string
  assetsUrlTransformer: (rawContent: string) => string
  categories: BlogCategory[]
  tags: BlogTag[]
  feed: BlogFeedConfig
}

export class BlogRepository {
  private readonly blogPosts = new Lazy<BlogPost[]>(() => this.getAllPosts());
  private readonly blogCategories = new Lazy<BlogCategory[]>(() => this.getAllCategoriesForPosts());
  private readonly blogTags = new Lazy<BlogTag[]>(() => this.getAllTagsForPosts());

  constructor(private readonly config: BlogRepositoryConfig) {}


  public getAllPublishedPosts(): BlogPostAnnotation[] {
    return this.blogPosts.value
      .map(BlogRepository.toAnnotation)
      .filter(x => x.published);
  }

  public getAllCategories(): BlogCategory[] {
    return this.blogCategories.value;
  }

  public getAllTags(): BlogTag[] {
    return this.blogTags.value;
  }

  public getPost(year: number, month: number, slug: string): BlogPost {
    return this.blogPosts.value.find(x =>
      new Date(x.postedOn).getFullYear() == year &&
      new Date(x.postedOn).getMonth() == month &&
      x.urlSlug.toLowerCase() === slug.toLowerCase())!;
  }

  public getTag(tagSlug: string): BlogTag {
    return BlogRepository.getTag(tagSlug, this.blogTags);
  }

  public static getTag(tagSlug: string, blogTags: Lazy<ReadonlyArray<BlogTag>>): BlogTag {
    const tag = blogTags.value.find(x => x.urlSlug.toLowerCase() === tagSlug.toLowerCase());

    if (tag) {
      return tag;
    } else {
      return { name: tagSlug, urlSlug: fileNameToUrlSlug(tagSlug) }
    }
  }

  public getPostsForTag(tagSlug: string): BlogPostAnnotation[] {
    return this.blogPosts.value
      .filter(x => x.published)
      .filter(x => x.tags.findIndex(t => t.urlSlug.toLowerCase() == tagSlug.toLowerCase()) != -1)
      .map(BlogRepository.toAnnotation);
  }

  public getCategory(categorySlug: string): BlogCategory {
    return BlogRepository.getCategory(categorySlug, this.blogCategories);
  }

  public static getCategory(categorySlug: string, blogCategories: Lazy<ReadonlyArray<BlogCategory>>): BlogCategory {
    const category = blogCategories.value.find(x => x.urlSlug.toLowerCase() === categorySlug.toLowerCase());

    if (category) {
      return category;
    }

    throw new Error(`The category with the slug '${categorySlug}' is not defined.`);
  }

  public getPostsForCategory(categorySlug: string): BlogPostAnnotation[] {
    return this.blogPosts.value
      .filter(x => x.published)
      .filter(x => x.category.urlSlug.toLowerCase() == categorySlug.toLowerCase())
      .map(BlogRepository.toAnnotation);
  }

  public static parseBlogPost(filePath: string, rawContent: string, config: BlogRepositoryConfig): BlogPost {
    function getUrlSlugFromFilePath(filePath: string): string {
      const fileNameWithoutExtension = getFileNameWithoutExtension(path.basename(filePath));
      return fileNameToUrlSlug(fileNameWithoutExtension);
    }

    const obj = matter(config.assetsUrlTransformer(rawContent));
    const metadata = obj.data;

    const title = metadata['title'] ?? getFileNameWithoutExtension(path.basename(filePath));
    const urlSlug = getUrlSlugFromFilePath(filePath);
    let category: BlogCategory;
    if (metadata['category']) {
      category = BlogRepository.getCategoryInternal(metadata['category'], config.categories);
    } else {
      const directoryName = getDirectoryName(filePath);
      category = { name: directoryName, urlSlug: fileNameToUrlSlug(directoryName) }
    }

    return {
      id: metadata['id'] ?? urlSlug,
      title: title,
      urlSlug: urlSlug,
      image: metadata['image'] || metadata['preview'] || metadata['hero'] || null,
      published: (/true/i).test(metadata['published']) || (/false/i).test(metadata['draft']),
      postedOn: metadata['postedOn'] || metadata['pubDate'] || metadata['date'] || null,
      modified: metadata['modified'] ?? null,
      description: metadata['description'],
      annotation: obj.content.split('<!--more-->')[0],
      category: category,
      tags: (<string>metadata['tags'] ?? '')
        .split(',')
        .filter(x => x)
        .map(x => BlogRepository.getTagInternal(x.trim(), config.tags)),
      content: obj.content
    };
  }

  public generateFeed(): string {
    const feed = new Feed({
      id: this.config.feed.origin,
      link: this.config.feed.origin,
      ...(this.config.feed)
    });

    this.blogPosts.value.filter(x => x.published).forEach(post => {
      feed.addItem({
        title: post.title,
        description: post.description,
        link: this.config.feed.postUrlGenerator(post),
        date: parseDate(post.postedOn),
        image: `${this.config.feed.origin}${post.image}`
      });
    });

    return feed.rss2();
  }

  public copyAssets() {
    fs.mkdirSync(this.config.assetsDestination, { recursive: true });

    glob.sync(this.config.assetsFilePattern).forEach(filePath => {
      const fileName = path.basename(filePath);
      fs.copyFileSync(filePath, path.join(this.config.assetsDestination, fileName));
    });
  }

  private getAllPosts(): BlogPost[] {
    function sortPosts(a: BlogPost, b: BlogPost) {
     return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime();
    }

    const posts = glob.sync(this.config.postsFilePattern).map(filePath => {
      const rawContent = fs.readFileSync(filePath, 'utf8');
      return BlogRepository.parseBlogPost(filePath, rawContent, this.config);
    });

    posts.sort(sortPosts);
    return posts;
  }

  private getAllCategoriesForPosts(): BlogCategory[] {
    return this.blogPosts.value
      .map(x => x.category)
      .filter((value, index, self) => self.findIndex(x => x.urlSlug === value.urlSlug) === index);
  }

  private getAllTagsForPosts(): BlogTag[] {
    return this.blogPosts.value
      .flatMap(x => x.tags)
      .filter((value, index, self) => self.findIndex(x => x.urlSlug === value.urlSlug) === index);
  }

  private static getCategoryInternal(categorySlug: string, categoriesMap: ReadonlyArray<BlogCategory>): BlogCategory {
    const category = categoriesMap.find(x => x.urlSlug.toLowerCase() === categorySlug.toLowerCase());

    if (category) {
      return category;
    }

    throw new Error(`The category with the slug '${categorySlug}' is not defined.`);
  }

  private static getTagInternal(tagSlug: string, tagsMap: BlogTag[]): BlogTag {
    const tag = tagsMap.find(x => x.urlSlug.toLowerCase() === tagSlug.toLowerCase());

    if (tag) {
      return tag;
    } else {
      return { name: tagSlug, urlSlug: fileNameToUrlSlug(tagSlug) }
    }
  }

  private static toAnnotation(post: BlogPost): BlogPostAnnotation {
    const {content, ...annotation} = post;
    return annotation;
  }
}

function parseDate(date: any) {
  if (date == null) {
    return new Date(0);
  }

  if (date instanceof Date) {
    return date;
  }

  if (typeof date === 'string') {
    return new Date(date);
  }

  return parseDate(date.toString());
}
