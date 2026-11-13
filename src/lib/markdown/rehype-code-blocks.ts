/**
 * Gives every code block in a post the old CodeBlock's two buttons, written
 * into the page at build: word wrap, and copy for a block with a language.
 * They start hidden, and src/scripts/code-blocks.ts shows each when it works —
 * copy where the clipboard is available, wrap only while a line overflows.
 *
 * Runs after Prism, so a highlighted block already carries `language-…`.
 */
import type { Element, ElementContent, Root } from 'hast';
import { visit, SKIP } from 'unist-util-visit';

const WRAP =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 19h6v-2H4zM20 5H4v2h16zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3 3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4"></path></svg>';
const COPY =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-idle><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"></path></svg>';
const DONE =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-done hidden><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path></svg>';

function hasLanguage(node: Element): boolean {
  const classes = node.properties.className;
  return Array.isArray(classes) && classes.some((name) => String(name).startsWith('language-'));
}

function button(label: string, action: string, icon: string): ElementContent {
  return {
    type: 'element',
    tagName: 'button',
    properties: { type: 'button', ariaLabel: label, dataAction: action, hidden: true },
    children: [{ type: 'raw', value: icon } as unknown as ElementContent],
  };
}

export function rehypeCodeBlocks() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'pre' || !parent || index === undefined) return;
      const buttons = [button('Toggle word wrap', 'wrap', WRAP), ...(hasLanguage(node) ? [button('Copy code to clipboard', 'copy', COPY + DONE)] : [])];
      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['code-block'] },
        children: [node, { type: 'element', tagName: 'div', properties: { className: ['code-buttons'] }, children: buttons }],
      };
      parent.children.splice(index, 1, wrapper);
      return SKIP;
    });
  };
}
