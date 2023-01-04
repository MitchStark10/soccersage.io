import { FC } from 'react';

import { Text } from '../Text/Text';

interface DocumentNode {
    nodeType: 'document';
    content: Node[];
}

const isDocumentNode = (node: Node): node is DocumentNode =>
    node.nodeType === 'document';

interface ParagraphNode {
    nodeType: 'paragraph';
    content: Node[];
}

const isParagraphNode = (node: Node): node is ParagraphNode =>
    node.nodeType === 'paragraph';

interface UnderlineMark {
    type: 'underline';
}

type Mark = UnderlineMark;
interface TextNode {
    nodeType: 'text';
    marks: Mark[];
    value: string;
}

const isTextNode = (node: Node): node is TextNode => node.nodeType === 'text';

interface Heading1Node {
    nodeType: 'heading-1';
    content: Node[];
}

const isHeading1Node = (node: Node): node is Heading1Node =>
    node.nodeType === 'heading-1';

interface Heading2Node {
    nodeType: 'heading-2';
    content: Node[];
}

const isHeading2Node = (node: Node): node is Heading2Node =>
    node.nodeType === 'heading-2';

interface OrderedListNode {
    nodeType: 'ordered-list';
    content: Node[];
}

const isOrderedListNode = (node: Node): node is OrderedListNode =>
    node.nodeType === 'ordered-list';

interface ListItemNode {
    nodeType: 'list-item';
    content: Node[];
}

const isListItemNode = (node: Node): node is ListItemNode =>
    node.nodeType === 'list-item';

interface UnknownNode {
    nodeType: 'unknown';
}

type Node =
    | DocumentNode
    | TextNode
    | ParagraphNode
    | Heading1Node
    | Heading2Node
    | OrderedListNode
    | ListItemNode
    | UnknownNode;

interface Props {
    node?: Node;
    influencedBy?: Node['nodeType'];
}

export const Contentful: FC<Props> = ({ node, influencedBy }) => {
    console.log('rendering', node?.nodeType);
    if (!node) {
        return null;
    } else if (
        isDocumentNode(node) ||
        isParagraphNode(node) ||
        isHeading1Node(node) ||
        isHeading2Node(node) ||
        isListItemNode(node)
    ) {
        return (
            <>
                {node.content.map((content, index) => (
                    <Contentful
                        key={index}
                        node={content}
                        influencedBy={
                            isParagraphNode(node) ? influencedBy : node.nodeType
                        }
                    />
                ))}
            </>
        );
    } else if (isOrderedListNode(node)) {
        return (
            <ol className="list-decimal mx-5">
                {node.content.map((content, index) => (
                    <Contentful
                        key={index}
                        node={content}
                        influencedBy={node.nodeType}
                    />
                ))}
            </ol>
        );
    } else if (isTextNode(node)) {
        let className = '';
        if (node.marks.map((mark) => mark.type).includes('underline')) {
            className += 'underline';
        }

        if (node)
            switch (influencedBy) {
                case 'heading-1':
                    return (
                        <Text As="h1" className={className}>
                            {node.value}
                        </Text>
                    );
                case 'heading-2':
                    return (
                        <Text As="h2" textAlign="left">
                            {node.value}
                        </Text>
                    );
                case 'list-item':
                    return <li className={className}>{node.value}</li>;
                default:
                    return <Text className={className}>{node.value}</Text>;
            }
        console.warn('Unhandled node type', node.nodeType);
        return null;
    }
};
