import fs from 'fs'
import glob from 'glob'
import path from 'path'
import matter from 'gray-matter'
import { BlogPostAnnotation, BlogPost } from 'models/BlogPost'
import { BlogCategory } from 'models/BlogCategory'
import { BlogTag } from 'models/BlogTag'
import blogCategoriesInternal from 'data/blogCategories'
import blogTagsInternal from 'data/blogTags'
import { fileNameToUrlSlug, getDirectoryName, getFileNameWithoutExtension } from 'utils/pathUtils'
import { Lazy } from 'utils/Lazy'


export class BlogRepository {
  private static readonly postsFilePattern = 'data/posts/**/*.md';
  private static readonly blogPosts = new Lazy<BlogPost[]>(() => BlogRepository.getAllPosts(BlogRepository.postsFilePattern));
  private static readonly blogCategories = new Lazy<BlogCategory[]>(() => BlogRepository.getAllCategories());
  private static readonly blogTags = new Lazy<BlogTag[]>(() => BlogRepository.getAllTags());

  public getAllPublishedPosts(): BlogPostAnnotation[] {
    return BlogRepository.blogPosts.value
      .map(BlogRepository.toAnnotation)
      .filter(x => x.published);
  }

  public getAllCategories(): BlogCategory[] {
    return BlogRepository.blogCategories.value;
  }

  public getAllTags(): BlogTag[] {
    return BlogRepository.blogTags.value;
  }

  public getPost(year: number, month: number, slug: string): BlogPost {
    return BlogRepository.blogPosts.value.find(x =>
      new Date(x.postedOn).getFullYear() == year &&
      new Date(x.postedOn).getMonth() == month &&
      x.urlSlug.toLowerCase() === slug.toLowerCase())!;
  }

  public getTag(tagSlug: string): BlogTag {
    return BlogRepository.getTag(tagSlug);
  }

  public static getTag(tagSlug: string): BlogTag {
    const tag = BlogRepository.blogTags.value.find(x => x.urlSlug.toLowerCase() === tagSlug.toLowerCase());

    if (tag) {
      return tag;
    } else {
      return { name: tagSlug, urlSlug: fileNameToUrlSlug(tagSlug) }
    }
  }

  public getPostsForTag(tagSlug: string): BlogPostAnnotation[] {
    return BlogRepository.blogPosts.value
      .filter(x => x.published)
      .filter(x => x.tags.findIndex(t => t.urlSlug.toLowerCase() == tagSlug.toLowerCase()) != -1)
      .map(BlogRepository.toAnnotation);
  }

  public getCategory(categorySlug: string): BlogCategory {
    return BlogRepository.getCategory(categorySlug);
  }

  public static getCategory(categorySlug: string): BlogCategory {
    const category = BlogRepository.blogCategories.value.find(x => x.urlSlug.toLowerCase() === categorySlug.toLowerCase());

    if (category) {
      return category;
    }

    throw new Error(`The category with the slug '${categorySlug}' is not defined.`);
  }

  public getPostsForCategory(categorySlug: string): BlogPostAnnotation[] {
    return BlogRepository.blogPosts.value
      .filter(x => x.published)
      .filter(x => x.category.urlSlug.toLowerCase() == categorySlug.toLowerCase())
      .map(BlogRepository.toAnnotation);
  }

  public static parseBlogPost(filePath: string, rawContent: string): BlogPost {
    function getUrlSlugFromFilePath(filePath: string): string {
      const fileNameWithoutExtension = getFileNameWithoutExtension(path.basename(filePath));
      return fileNameToUrlSlug(fileNameWithoutExtension);
    }

    const obj = matter(rawContent);
    const metadata = obj.data;

    const title = metadata['title'] ?? getFileNameWithoutExtension(path.basename(filePath));
    const urlSlug = getUrlSlugFromFilePath(filePath);
    let category: BlogCategory;
    if (metadata['category']) {
      category = this.getCategoryInternal(metadata['category']);
    } else {
      const directoryName = getDirectoryName(filePath);
      category = { name: directoryName, urlSlug: fileNameToUrlSlug(directoryName) }
    }

    return {
      id: metadata['id'] ?? urlSlug,
      title: title,
      urlSlug: urlSlug,
      image: metadata['image'] ?? null,
      published: (/true/i).test(metadata['published']),
      postedOn: metadata['postedOn'],
      modified: metadata['modified'] ?? null,
      description: metadata['description'],
      annotation: obj.content.split('<!--more-->')[0],
      category: category,
      tags: (<string>metadata['tags'] ?? '')
        .split(',')
        .filter(x => x)
        .map(x => this.getTagInternal(x.trim())),
      content: obj.content
    };
  }

  private static getAllPosts(postsFilePattern: string): BlogPost[] {
    function sortPosts(a: BlogPost, b: BlogPost) {
     return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime();
    }

    var posts = glob.sync(postsFilePattern).map(filePath => {
      const rawContent = fs.readFileSync(filePath, 'utf8');
      return BlogRepository.parseBlogPost(filePath, rawContent);
    });

    posts.sort(sortPosts);
    return posts;
  }

  private static getAllCategories(): BlogCategory[] {
    return BlogRepository.blogPosts.value
      .map(x => x.category)
      .filter((value, index, self) => self.findIndex(x => x.urlSlug === value.urlSlug) === index);
  }

  private static getAllTags(): BlogTag[] {
    return BlogRepository.blogPosts.value
      .flatMap(x => x.tags)
      .filter((value, index, self) => self.findIndex(x => x.urlSlug === value.urlSlug) === index);
  }

  private static getCategoryInternal(categorySlug: string): BlogCategory {
    const category = blogCategoriesInternal.find(x => x.urlSlug.toLowerCase() === categorySlug.toLowerCase());

    if (category) {
      return category;
    }

    throw new Error(`The category with the slug '${categorySlug}' is not defined.`);
  }

  private static getTagInternal(tagSlug: string): BlogTag {
    const tag = blogTagsInternal.find(x => x.urlSlug.toLowerCase() === tagSlug.toLowerCase());

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
