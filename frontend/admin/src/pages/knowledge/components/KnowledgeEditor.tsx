import React from 'react';
import Button from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';
import MarkdownIt from 'markdown-it';
import Loadable from 'react-loadable';
import type MarkdownEditorComponent from 'react-markdown-editor-lite';
import { connect } from 'react-redux';
import { settings } from '../../../config/adminSettings';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { KnowledgeRecord, KnowledgeState } from '../../../types/knowledge';

type MarkdownEditorProps = React.ComponentProps<typeof MarkdownEditorComponent>;

const MarkdownEditor: React.ComponentType<MarkdownEditorProps> = Loadable({
    loader: () =>
        import('../../../components/common/MarkdownEditor').then((module) => module.default),
    loading: () => null,
});
const markdownRenderer = new MarkdownIt({ html: true, linkify: true, typographer: true });

export interface KnowledgeEditorProps {
    children: React.ReactElement;
    dispatch: AdminDispatch;
    id?: string | number;
    knowledge: KnowledgeState;
}

interface KnowledgeEditorState {
    visible: boolean;
}

export class KnowledgeEditor extends React.Component<KnowledgeEditorProps, KnowledgeEditorState> {
    state: KnowledgeEditorState = { visible: false };
    editorKey = Math.random();

    formChange<Field extends keyof KnowledgeRecord>(
        field: Field,
        value: KnowledgeRecord[Field],
    ): void {
        this.props.dispatch({
            type: 'knowledge/setState',
            payload: { knowledge: { ...this.props.knowledge.knowledge, [field]: value } },
        });
    }

    show(): void {
        if (this.props.id) this.props.dispatch({ type: 'knowledge/fetchById', id: this.props.id });
        this.editorKey = Math.random();
        this.setState({ visible: true });
    }

    hide(): void {
        this.props.dispatch({ type: 'knowledge/setState', payload: { knowledge: {} } });
        this.setState({ visible: false });
    }

    save(): void {
        this.props.dispatch({
            type: 'knowledge/save',
            callback: () => message.success('保存成功'),
        });
    }

    render(): React.ReactNode {
        const { visible } = this.state;
        const { knowledge } = this.props;
        const article = knowledge.knowledge;

        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.show() })}
                <Drawer
                    width="80%"
                    visible={visible}
                    title={this.props.id ? '编辑知识' : '新增知识'}
                    onClose={() => this.hide()}
                >
                    {knowledge.fetchByIdLoading ? (
                        <Icon type="loading" />
                    ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="knowledge-title">标题</label>
                                <Input
                                    id="knowledge-title"
                                    placeholder="请输入知识标题"
                                    value={article.title}
                                    onChange={(event) =>
                                        this.formChange('title', event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="knowledge-category">分类</label>
                                <Input
                                    id="knowledge-category"
                                    placeholder="请输入分类，分类将会自动归集"
                                    value={article.category}
                                    onChange={(event) =>
                                        this.formChange('category', event.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="knowledge-language">语言</label>
                                <Select
                                    id="knowledge-language"
                                    placeholder="请选择知识语言"
                                    defaultValue={String(article.language || 1)}
                                    style={{ width: '100%' }}
                                    value={
                                        article.language === undefined
                                            ? undefined
                                            : String(article.language)
                                    }
                                    onChange={(language: string) =>
                                        this.formChange('language', language)
                                    }
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
                                    key={this.editorKey}
                                    style={{ height: '500px' }}
                                    renderHTML={(text: string) => markdownRenderer.render(text)}
                                    value={article.body}
                                    onChange={(editor: { text: string; html: string }) =>
                                        this.formChange('body', editor.text)
                                    }
                                    config={{
                                        view: {
                                            menu: true,
                                            md: true,
                                            fullScreen: true,
                                            hideMenu: true,
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    <div className="v2board-drawer-action">
                        <Button style={{ marginRight: 8 }} onClick={() => this.hide()}>
                            取消
                        </Button>
                        <Button
                            loading={knowledge.saveLoading}
                            onClick={() => this.save()}
                            type="primary"
                        >
                            提交
                        </Button>
                    </div>
                </Drawer>
            </>
        );
    }
}

const ConnectedKnowledgeEditor = connect((state: AdminRootState) => ({
    knowledge: state.knowledge,
}))(KnowledgeEditor);

export default ConnectedKnowledgeEditor;
