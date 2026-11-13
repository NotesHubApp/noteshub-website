/**
 * Sizes a post's images before Astro optimises them.
 *
 * Screenshots in posts are captured at 2x, and the Next.js site showed each at
 * half its pixel width (its `srcset` said "1x, 2x" of the same file), never
 * wider than the column. This keeps that size, and gives the browser a set of
 * widths to choose from instead of the original file: a phone downloads a
 * fraction of a 4320-pixel screenshot, and the page reserves each image's
 * space before it loads.
 *
 * Runs before Astro's own image step, which hands these properties to
 * `getImage()`.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import type { Element, Root } from 'hast';
import type { VFile } from 'vfile';
import { visit } from 'unist-util-visit';

/** The text column's width (`--max-content-width` less its padding) and the tallest an image may be, as before. */
const COLUMN = 870;
const MAX_HEIGHT = 900;
const STEPS = [480, 960, 1440];

function isLocal(src: string): boolean {
  return !/^([a-z]+:)?\/\//i.test(src) && !src.startsWith('/') && !src.startsWith('data:');
}

export function rehypePostImages() {
  return async (tree: Root, file: VFile) => {
    const from = file.path ?? (file.history[0] ? fileURLToPath(new URL(file.history[0], 'file://')) : undefined);
    if (!from) return;

    const images: Element[] = [];
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && typeof node.properties.src === 'string' && isLocal(node.properties.src)) {
        images.push(node);
      }
    });

    await Promise.all(
      images.map(async (node) => {
        const src = decodeURI(String(node.properties.src));
        const { width, height } = await sharp(path.resolve(path.dirname(from), src)).metadata();
        if (!width || !height) return;

        // Half the pixels, and short enough that `max-height` never squeezes it.
        const display = Math.round(Math.min(width / 2, (MAX_HEIGHT * width) / height));
        const largest = Math.min(display * 2, width);
        const widths = [...new Set([...STEPS.filter((step) => step < largest), display, largest])].sort((a, b) => a - b);

        // An image whose Markdown has no alt text is described by its caption,
        // for screen readers and image search; the caption shows either way.
        if (!node.properties.alt && node.properties.title) node.properties.alt = String(node.properties.title);

        // Options for `getImage()` as much as attributes: Astro hands it every property.
        Object.assign(node.properties as Record<string, unknown>, {
          width: display,
          height: Math.round((display * height) / width),
          widths,
          sizes: `min(${Math.min(display, COLUMN)}px, calc(100vw - 30px))`,
          loading: 'lazy',
          decoding: 'async',
        });
      }),
    );
  };
}
