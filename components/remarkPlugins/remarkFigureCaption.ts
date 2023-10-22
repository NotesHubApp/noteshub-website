import { Data, Node, Parent } from 'unist'

import type { Plugin } from 'unified'
import { Root } from 'mdast'
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'
import { whitespace } from 'hast-util-whitespace'

type FigureCaption = {}

export const remarkFigureCaption: Plugin<[FigureCaption?], Root> = (options = {}) => {
	return (tree) => {
		// Unwrap the images inside Paragraphs
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!hasOnlyImages(node)) {
				return
			}

			remove(node, 'text')
      remove(node, 'break')

      if (parent && index) {
        parent.children.splice(index, 1, ...node.children)
      }

			return index
		})

		// Wrap image nodes in figure
		visit(tree, (node) => isImageWithTitle(node), (node, index, parent) => {
      if (parent && isImageWithCaption(parent)) {
        return
      }

      const figure = createNodes(node)
      const nodeAny = node as any

      nodeAny.type = figure.type
      nodeAny.children = figure.children
      nodeAny.data = figure.data
		})
	}
}

const createNodes = (imageNode: any) => {
  const figchildren = [
    {
      type: 'text',
      value: imageNode.title,
    },
  ]

	const figCaption = {
		type: 'figcaption',
		children: figchildren,
		data: {
			hName: 'figcaption'
		},
	}

	const figure = {
		type: 'figure',
		children: [{...imageNode}, figCaption],
		data: {
			hName: 'figure'
		},
	}

	return figure
}

const hasOnlyImages = (node: Parent) => {
	return node.children.every((child) => {
		return child.type === 'image' || child.type === 'break' || whitespace(child)
	})
}

const isImageNodeWithTitle = (node: Node<Data>) => {
	return node.type === 'image' &&
    ('title' in node) &&
    Boolean(node.title) &&
    ('url' in node)
}

const isHTMLImageNode = (node: Node<Data>) => {
	return (node.type === 'html') &&
    ('title' in node) &&
    Boolean(node.title) &&
    ('value' in node) &&
    (typeof node.value === 'string') &&
    /^<img\s/.test(node.value)
}

const isImageWithTitle = (node: Node<Data>) => {
	return isImageNodeWithTitle(node) || isHTMLImageNode(node)
}

const isImageWithCaption = (parent: Parent) => {
	return (
		parent.type === 'figure' &&
		parent.children.some((child) => child.type === 'figcaption')
	)
}
