import type { Root, Element } from 'hast'
import { type Plugin } from 'unified'
import { visit } from 'unist-util-visit';
import { toString as nodeToString } from 'hast-util-to-string';
import { canHighlight, highlight } from 'components/common/markdownPreview/syntaxHighlight';


type RehypePrismOptions = {
  ignoreMissing?: boolean
}

const rehypePrismPlugin: Plugin<[RehypePrismOptions?], Root> = (options = {}) => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (parent == null || !('tagName' in parent)) {
        return;
      }

      if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
        return;
      }

      const lang = getLanguage(node);

      if (lang === null || !canHighlight(lang)) {
        return;
      }

      let result;
      try {
        if (!parent.properties) {
          parent.properties = {};
        }
        parent.properties.className = (parent.properties.className as string[] || []).concat(
          'language-' + lang
        );
        result = highlight(nodeToString(node), lang);
      } catch (err) {
        const message = (err as { message: string }).message;
        if (options.ignoreMissing && /Unknown language/.test(message)) {
          return;
        }
        throw err;
      }

      node.children = result.children;
    });
  }
}

function getLanguage(node: Element) {
  const className = node.properties?.className as string[] || [];

  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase();
    }
  }

  return null;
}

export default rehypePrismPlugin;
