/**
 * Images in a post, as the Next.js site laid them out and NotesHub's own
 * preview does: a paragraph holding only images gives way to the images
 * themselves, and an image with a title, `![alt](./shot.webp "Caption")`,
 * becomes a <figure> captioned with that title.
 *
 * Ported from the old site's remarkFigureCaption, without its two helper
 * packages.
 */
import type { Image, Paragraph, PhrasingContent, Root, RootContent } from 'mdast';
import { visit, SKIP } from 'unist-util-visit';

function isBlank(node: PhrasingContent): boolean {
  return node.type === 'break' || (node.type === 'text' && node.value.trim() === '');
}

function hasOnlyImages(node: Paragraph): boolean {
  return node.children.some((child) => child.type === 'image') && node.children.every((child) => child.type === 'image' || isBlank(child));
}

export function remarkFigureCaption() {
  return (tree: Root) => {
    // Unwrap paragraphs that hold only images, so each image stands on its own.
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index === undefined || !hasOnlyImages(node)) return;
      const images = node.children.filter((child): child is Image => child.type === 'image');
      parent.children.splice(index, 1, ...(images as unknown as RootContent[]));
      return [SKIP, index + images.length];
    });

    // Wrap every image with a title in a figure, the title as its caption.
    visit(tree, 'image', (node, index, parent) => {
      if (!parent || index === undefined || !node.title) return;
      if ((parent as { data?: { hName?: string } }).data?.hName === 'figure') return;
      const figure = {
        type: 'figure',
        data: { hName: 'figure' },
        children: [
          { ...node },
          { type: 'figcaption', data: { hName: 'figcaption' }, children: [{ type: 'text', value: node.title }] },
        ],
      };
      parent.children.splice(index, 1, figure as unknown as PhrasingContent);
      return SKIP;
    });
  };
}
