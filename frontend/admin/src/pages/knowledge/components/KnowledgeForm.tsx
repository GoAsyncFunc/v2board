import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import MarkdownIt from 'markdown-it';
import Loadable from 'react-loadable';
import type MarkdownEditorComponent from 'react-markdown-editor-lite';
import { settings } from '../../../config/adminSettings';
import type { KnowledgeRecord } from '../../../types/knowledgeContracts';

type MarkdownEditorProps = React.ComponentProps<typeof MarkdownEditorComponent>;

const MarkdownEditor: React.ComponentType<MarkdownEditorProps> = Loadable({
    loader: () =>
        import('../../../components/common/MarkdownEditor').then((module) => module.default),
    loading: () => null,
});
const markdownRenderer = new MarkdownIt({ html: true, linkify: true, typographer: true });

interface KnowledgeFormProps {
    article: KnowledgeRecord;
    editorKey: number;
    onChange: <Field extends keyof KnowledgeRecord>(
        field: Field,
        value: KnowledgeRecord[Field],
    ) => void;
}

export default function KnowledgeForm({
    article,
    editorKey,
    onChange,
}: KnowledgeFormProps): React.ReactElement {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="knowledge-title">标题</label>
                <Input
                    id="knowledge-title"
                    placeholder="请输入知识标题"
                    value={article.title}
                    onChange={(event) => onChange('title', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="knowledge-category">分类</label>
                <Input
                    id="knowledge-category"
                    placeholder="请输入分类，分类将会自动归集"
                    value={article.category}
                    onChange={(event) => onChange('category', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="knowledge-language">语言</label>
                <Select
                    id="knowledge-language"
                    placeholder="请选择知识语言"
                    defaultValue={String(article.language || 1)}
                    style={{ width: '100%' }}
                    value={article.language === undefined ? undefined : String(article.language)}
                    onChange={(language: string) => onChange('language', language)}
                >
                    {Object.keys(settings.i18nText)
                        .sort()
                        .map((language) => (
                            <Select.Option key={language} value={language}>
                                {settings.i18nText[language]}
                            </Select.Option>
                        ))}
                </Select>
            </div>
            <div className="form-group">
                <label>内容</label>
                <MarkdownEditor
                    key={editorKey}
                    style={{ height: '500px' }}
                    renderHTML={(text: string) => markdownRenderer.render(text)}
                    value={article.body}
                    onChange={(editor: { text: string; html: string }) =>
                        onChange('body', editor.text)
                    }
                    config={{ view: { menu: true, md: true, fullScreen: true, hideMenu: true } }}
                />
            </div>
        </div>
    );
}
