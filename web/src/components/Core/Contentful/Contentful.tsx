import { FC } from 'react';
import { H1 } from '../Text/H1';
import { H2 } from '../Text/H2';
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

interface TextNode {
    nodeType: 'text';
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
                        influencedBy={node.nodeType}
                    />
                ))}
            </>
        );
    } else if (isOrderedListNode(node)) {
        return (
            <ol>
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
        switch (influencedBy) {
            case 'heading-1':
                return <H1>{node.value}</H1>;
            case 'heading-2':
                return <H2>{node.value}</H2>;
            case 'list-item':
                return <li>{node.value}</li>
            default:
                return <Text>{node.value}</Text>;
        }
    } else {
        console.warn('Unhandled node type', node.nodeType);
        return null;
    }
};
