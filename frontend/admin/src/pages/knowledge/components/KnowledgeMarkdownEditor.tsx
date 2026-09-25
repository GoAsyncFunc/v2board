import React from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';

type KnowledgeMarkdownEditorProps = React.ComponentProps<typeof MarkdownEditor>;

export default function KnowledgeMarkdownEditor(
    props: KnowledgeMarkdownEditorProps,
): React.ReactElement {
    return <MarkdownEditor {...props} />;
}
