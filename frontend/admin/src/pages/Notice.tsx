import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import type { ColumnProps } from 'antd/lib/table/interface';
import { createReadonlyNoticeColumns, type NoticeRecord } from '../components/NoticeDisplayColumns';
import LoadingContainer from '../components/LoadingContainer';
import MainLayout from '../layouts/MainLayout';
import type { AdminDispatch, AdminRootState } from '../types/store';

const readonlyColumns = createReadonlyNoticeColumns();

interface NoticePageProps {
  dispatch: AdminDispatch;
  notice: {
    notices: NoticeRecord[];
    fetchLoading: boolean;
    saveLoading?: boolean;
  };
}

interface NoticePageState {
  visible: boolean;
  submit: NoticeRecord;
  saveLoading?: boolean;
}

export class NoticePage extends React.Component<NoticePageProps, NoticePageState> {
  state: NoticePageState = { visible: false, submit: {} };

  componentDidMount(): void {
    this.props.dispatch({ type: 'notice/fetch' });
  }

  toggleModal(): void {
    this.setState(({ visible }) => ({ visible: !visible }), () => {
      if (!this.state.visible) this.setState({ submit: {} });
    });
  }

  save(): void {
    this.props.dispatch({
      type: 'notice/save',
      params: { ...this.state.submit },
      callback: () => this.toggleModal(),
    });
  }

  drop(notice: NoticeRecord): void {
    this.props.dispatch({ type: 'notice/drop', id: notice.id });
  }

  updateField<Field extends keyof NoticeRecord>(field: Field, value: NoticeRecord[Field]): void {
    this.setState(({ submit }) => ({ submit: { ...submit, [field]: value } }));
  }

  render() {
    const { notices, fetchLoading } = this.props.notice;
    const columns: ColumnProps<NoticeRecord>[] = [
      readonlyColumns.id,
      {
        title: '显示',
        dataIndex: 'show',
        key: 'show',
        render: (value: boolean, record) => (
          <Switch
            size="small"
            checked={value}
            onChange={() => this.props.dispatch({ type: 'notice/show', id: record.id })}
          />
        ),
      },
      readonlyColumns.title,
      readonlyColumns.created_at,
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'right',
        fixed: 'right',
        render: (_value, record, index) => (
          <div>
            <a
              href="javascript:void(0);"
              onClick={() => this.setState({ submit: notices[index] }, () => this.toggleModal())}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a href="javascript:void(0);" onClick={() => this.drop(record)}>删除</a>
          </div>
        ),
      },
    ];
    return (
      <MainLayout {...this.props} title="公告管理">
        <LoadingContainer loading={fetchLoading}>
          <div className="block block-rounded">
            <div className="bg-white">
              <div style={{ padding: 15 }}>
                <Button onClick={() => this.toggleModal()}>
                  <Icon type="plus" /> 添加公告
                </Button>
              </div>
              <Table<NoticeRecord> tableLayout="auto" dataSource={notices} pagination={false} columns={columns} scroll={{ x: 950 }} />
            </div>
          </div>
        </LoadingContainer>
        <Modal
          title={this.state.submit.id ? '编辑公告' : '新建公告'}
          visible={this.state.visible}
          onCancel={() => this.toggleModal()}
          onOk={() => !this.state.saveLoading && this.save()}
          okText={this.state.saveLoading ? <Icon type="loading" /> : '提交'}
          cancelText="取消"
        >
          <div>
            <div className="form-group">
              <label htmlFor="notice-title">标题</label>
              <Input id="notice-title" placeholder="请输入公告标题" value={this.state.submit.title} onChange={event => this.updateField('title', event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="notice-content">公告内容</label>
              <Input.TextArea id="notice-content" rows={12} value={this.state.submit.content} placeholder="请输入公告内容" onChange={event => this.updateField('content', event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="notice-tags">公告标签</label>
              <Select
                id="notice-tags"
                mode="tags"
                value={this.state.submit.tags || []}
                style={{ width: '100%' }}
                placeholder="输入后回车添加标签"
                onChange={(tags: string[]) => this.updateField('tags', tags.length > 0 ? tags : null)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="notice-image">图片URL</label>
              <Input id="notice-image" placeholder="请输入图片URL" value={this.state.submit.img_url} onChange={event => this.updateField('img_url', event.target.value)} />
            </div>
          </div>
        </Modal>
      </MainLayout>
    );
  }
}

export default connect((state: AdminRootState) => ({ notice: state.notice }))(NoticePage);
