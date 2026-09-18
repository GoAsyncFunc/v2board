import React from 'react';
import { connect } from '../reactRedux.js';
import Modal from '../Modal.js';
import Icon from '../Icon.js';
import { Input } from '../ui.js';

class GroupEditor extends React.Component {
  state = {
    submit: { ...(this.props.record || {}) },
    visible: false,
  };

  show = () => this.setState({ visible: true });
  hide = () => this.setState({ visible: false });
  updateName = event => this.setState(({ submit }) => ({ submit: { ...submit, name: event.target.value } }));

  save = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'serverGroup/save',
      params: { ...this.state.submit },
      callback: this.hide,
    });
  };

  render() {
    const { children, serverGroup } = this.props;
    const { submit, visible } = this.state;
    const loading = serverGroup.fetchLoading;
    return (
      <>
        {React.cloneElement(children, { onClick: this.show })}
        <Modal
          title={submit.id ? '编辑组' : '创建组'}
          visible={visible}
          onCancel={this.hide}
          onOk={loading ? undefined : this.save}
          okText={loading ? <Icon type="loading" /> : '提交'}
          cancelText="取消"
        >
          <div className="form-group">
            <label htmlFor="server-group-name">组名</label>
            <Input id="server-group-name" placeholder="请输入组名" value={submit.name} onChange={this.updateName} />
          </div>
        </Modal>
      </>
    );
  }
}

export default connect(state => ({ serverGroup: state.serverGroup }))(GroupEditor);
