import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Table } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Modal } from '../vendor/Modal.js';
import { Divider } from '../vendor/Divider.js';
import { Switch } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Sortable } from '../vendor/ui.js';
import { Drawer } from '../vendor/ui.js';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import { message } from '../vendor/ui.js';
import { settings } from '../vendor/adminSettings.js';
import { LoadingContainer } from '../vendor/ui.js';
import { loadable, resolveDefaultExport } from '../vendor/utilities.js';
import { MarkdownIt } from '../vendor/utilities.js';
import MainLayout from '../layouts/MainLayout.jsx';
import { createReadonlyKnowledgeColumns } from '../components/KnowledgeDisplayColumns.ts';

import '../vendor/iconStyles.js';

const readonlyColumns = createReadonlyKnowledgeColumns();
const MarkdownEditor = loadable({
  loader: () => import('../components/MarkdownEditor.jsx').then(resolveDefaultExport),
  loading: () => null,
});
const markdownRenderer = new MarkdownIt({ html: true, linkify: true, typographer: true });

export class KnowledgeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  formChange(field, value) {
    this.props.dispatch({
      type: 'knowledge/setState',
      payload: { knowledge: { ...this.props.knowledge.knowledge, [field]: value } },
    });
  }

  show() {
    if (this.props.id) this.props.dispatch({ type: 'knowledge/fetchById', id: this.props.id });
    this.editorKey = Math.random();
    this.setState({ visible: true });
  }

  hide() {
    this.props.dispatch({ type: 'knowledge/setState', payload: { knowledge: {} } });
    this.setState({ visible: false });
  }

  save() {
    this.props.dispatch({ type: 'knowledge/save', callback: () => message.success('保存成功') });
  }

  render() {
    const { visible } = this.state;
    const { knowledge } = this.props;
    const article = knowledge.knowledge;

    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.show() })}
      <Drawer width="80%" visible={visible} title={this.props.id ? '编辑知识' : '新增知识'} id="knowledge" onClose={() => this.hide()}>
        {knowledge.fetchByIdLoading ? <Icon type="loading" /> : <div>
          <div className="form-group"><label htmlFor="knowledge-title">标题</label><Input id="knowledge-title" placeholder="请输入知识标题" value={article.title} onChange={event => this.formChange('title', event.target.value)} /></div>
          <div className="form-group"><label htmlFor="knowledge-category">分类</label><Input id="knowledge-category" placeholder="请输入分类，分类将会自动归集" value={article.category} onChange={event => this.formChange('category', event.target.value)} /></div>
          <div className="form-group"><label htmlFor="knowledge-language">语言</label><Select id="knowledge-language" placeholder="请选择知识语言" defaultValue={article.language || 1} style={{ width: '100%' }} value={article.language} onChange={language => this.formChange('language', language)}>{Object.keys(settings.i18nText).sort().map(language => <Select.Option key={language} value={language}>{settings.i18nText[language]}</Select.Option>)}</Select></div>
          <div className="form-group"><label>内容</label><MarkdownEditor key={this.editorKey} style={{ height: '500px' }} renderHTML={text => markdownRenderer.render(text)} value={article.body} onChange={editor => this.formChange('body', editor.text)} config={{ view: { menu: true, md: true, fullScreen: true, hideMenu: true } }} /></div>
        </div>}
        <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.hide()}>取消</Button><Button loading={knowledge.saveLoading} onClick={() => this.save()} type="primary">提交</Button></div>
      </Drawer>
    </>;
  }
}

const ConnectedKnowledgeEditor = connect(state => ({ knowledge: state.knowledge }))(KnowledgeEditor);

export class KnowledgePage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'knowledge/fetch' });
    this.props.dispatch({ type: 'knowledge/getCategory' });
  }

  show(id) {
    this.props.dispatch({ type: 'knowledge/show', id });
  }

  drop(article) {
    this.props.dispatch({ type: 'knowledge/drop', id: article.id });
  }

  render() {
    const { knowledge } = this.props;
    const columns = [
      { title: '排序', dataIndex: 'sort', key: 'sort', render: () => <Icon type="menu" style={{ cursor: 'move' }} /> },
      readonlyColumns.id,
      { title: '显示', dataIndex: 'show', key: 'show', render: (visible, article) => <Switch size="small" checked={visible} onChange={() => this.show(article.id)} /> },
      readonlyColumns.title,
      readonlyColumns.category,
      readonlyColumns.updated_at,
      {
        title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right',
        render: (value, article) => <>
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
            <Table tableLayout="auto" dataSource={knowledge.knowledges} pagination={false} columns={columns} scroll={{ x: 750 }} />
          </Sortable>
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect(state => ({ knowledge: state.knowledge }))(KnowledgePage);
