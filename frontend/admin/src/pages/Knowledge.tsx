import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import type { ColumnProps } from 'antd/lib/table/interface';
import MarkdownIt from 'markdown-it';
import Loadable from 'react-loadable';
import type MarkdownEditorComponent from 'react-markdown-editor-lite';
import { createReadonlyKnowledgeColumns, type KnowledgeRecord } from '../components/KnowledgeDisplayColumns';
import LoadingContainer from '../components/LoadingContainer';
import Sortable from '../components/Sortable';
import MainLayout from '../layouts/MainLayout';
import type { AdminDispatch, AdminRootState } from '../types/store';
import type { KnowledgeState } from '../types/knowledge';
import { settings } from '../config/adminSettings';

type MarkdownEditorProps = React.ComponentProps<typeof MarkdownEditorComponent>;

const readonlyColumns = createReadonlyKnowledgeColumns();
const MarkdownEditor: React.ComponentType<MarkdownEditorProps> = Loadable({
  loader: () => import('../components/MarkdownEditor').then(module => module.default),
  loading: () => null,
});
const markdownRenderer = new MarkdownIt({ html: true, linkify: true, typographer: true });

interface KnowledgeEditorProps {
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

  formChange<Field extends keyof KnowledgeRecord>(field: Field, value: KnowledgeRecord[Field]): void {
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
    this.props.dispatch({ type: 'knowledge/save', callback: () => message.success('保存成功') });
  }

  render() {
    const { visible } = this.state;
    const { knowledge } = this.props;
    const article = knowledge.knowledge;

    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.show() })}
      <Drawer width="80%" visible={visible} title={this.props.id ? '编辑知识' : '新增知识'} onClose={() => this.hide()}>
        {knowledge.fetchByIdLoading ? <Icon type="loading" /> : <div>
          <div className="form-group"><label htmlFor="knowledge-title">标题</label><Input id="knowledge-title" placeholder="请输入知识标题" value={article.title} onChange={event => this.formChange('title', event.target.value)} /></div>
          <div className="form-group"><label htmlFor="knowledge-category">分类</label><Input id="knowledge-category" placeholder="请输入分类，分类将会自动归集" value={article.category} onChange={event => this.formChange('category', event.target.value)} /></div>
          <div className="form-group"><label htmlFor="knowledge-language">语言</label><Select id="knowledge-language" placeholder="请选择知识语言" defaultValue={String(article.language || 1)} style={{ width: '100%' }} value={article.language === undefined ? undefined : String(article.language)} onChange={(language: string) => this.formChange('language', language)}>{Object.keys(settings.i18nText).sort().map(language => <Select.Option key={language} value={language}>{settings.i18nText[language]}</Select.Option>)}</Select></div>
          <div className="form-group"><label>内容</label><MarkdownEditor key={this.editorKey} style={{ height: '500px' }} renderHTML={(text: string) => markdownRenderer.render(text)} value={article.body} onChange={(editor: { text: string; html: string }) => this.formChange('body', editor.text)} config={{ view: { menu: true, md: true, fullScreen: true, hideMenu: true } }} /></div>
        </div>}
        <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.hide()}>取消</Button><Button loading={knowledge.saveLoading} onClick={() => this.save()} type="primary">提交</Button></div>
      </Drawer>
    </>;
  }
}

const ConnectedKnowledgeEditor = connect((state: AdminRootState) => ({ knowledge: state.knowledge }))(KnowledgeEditor);

interface KnowledgePageProps {
  dispatch: AdminDispatch;
  knowledge: KnowledgeState;
}

export class KnowledgePage extends React.Component<KnowledgePageProps> {
  componentDidMount(): void {
    this.props.dispatch({ type: 'knowledge/fetch' });
    this.props.dispatch({ type: 'knowledge/getCategory' });
  }

  show(id: string | number | undefined): void {
    this.props.dispatch({ type: 'knowledge/show', id });
  }

  drop(article: KnowledgeRecord): void {
    this.props.dispatch({ type: 'knowledge/drop', id: article.id });
  }

  render() {
    const { knowledge } = this.props;
    const columns: ColumnProps<KnowledgeRecord>[] = [
      { title: '排序', dataIndex: 'sort', key: 'sort', render: () => <Icon type="menu" style={{ cursor: 'move' }} /> },
      readonlyColumns.id,
      { title: '显示', dataIndex: 'show', key: 'show', render: (visible: boolean, article) => <Switch size="small" checked={visible} onChange={() => this.show(article.id)} /> },
      readonlyColumns.title,
      readonlyColumns.category,
      readonlyColumns.updated_at,
      {
        title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right',
        render: (_value, article) => <>
          <ConnectedKnowledgeEditor id={article.id}><a href="javascript:void(0);">编辑</a></ConnectedKnowledgeEditor>
          <Divider type="vertical" />
          <a href="javascript:void(0);" onClick={() => Modal.confirm({ title: '警告', content: '确定要删除该条项目吗？', onOk: () => this.drop(article), okText: '确定', cancelText: '取消' })}>删除</a>
        </>,
      },
    ];

    return <MainLayout {...this.props} title="知识库管理">
      <LoadingContainer loading={knowledge.fetchLoading}>
        <div className="block border-bottom"><div className="bg-white">
          <div style={{ padding: 15 }}><ConnectedKnowledgeEditor><Button><Icon type="plus" />新增</Button></ConnectedKnowledgeEditor></div>
          <Sortable onDragEnd={(fromIndex, toIndex) => this.props.dispatch({ type: 'knowledge/sort', fromIndex, toIndex })} nodeSelector="tr" handleSelector="i">
            <Table<KnowledgeRecord> tableLayout="auto" dataSource={knowledge.knowledges} pagination={false} columns={columns} scroll={{ x: 750 }} />
          </Sortable>
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect((state: AdminRootState) => ({ knowledge: state.knowledge }))(KnowledgePage);
