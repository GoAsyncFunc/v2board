import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import Modal from '../vendor/Modal.js';
import Icon from '../vendor/Icon.js';
import copyText from '../vendor/clipboard.js';
import { formatMessage } from '../vendor/i18n.js';

class TelegramBindModal extends React.Component {
  state = { visible: false };

  toggle = () => {
    this.setState(({ visible }) => ({ visible: !visible }), () => {
      if (this.state.visible) this.props.dispatch({ type: 'telegram/getBotInfo' });
    });
  };

  render() {
    const { children, telegram, user } = this.props;
    const { visible } = this.state;
    const bot = telegram.botInfo || {};
    const subscribeUrl = user.subscribe?.subscribe_url;
    return (
      <>
        {React.cloneElement(children, { onClick: this.toggle })}
        <Modal
          title={formatMessage({ id: '绑定Telegram' })}
          visible={visible}
          okText={formatMessage({ id: '我知道了' })}
          cancelButtonProps={{ hidden: true }}
          onOk={this.toggle}
          onCancel={this.toggle}
        >
          {bot.username ? (
            <>
              <h2 className="content-heading pt-1"><Icon type="arrow-right" theme="outlined" /> {formatMessage({ id: '第一步' })}</h2>
              <div>{formatMessage({ id: '打开Telegram搜索' })} <a href={`https://t.me/${bot.username}`}>@{bot.username}</a></div>
              <h2 className="content-heading"><Icon type="arrow-right" theme="outlined" /> {formatMessage({ id: '第二步' })}</h2>
              <div>
                {formatMessage({ id: '向机器人发送你的' })}<br />
                <code onClick={() => copyText(`/bind ${subscribeUrl}`)}>/bind {subscribeUrl}</code>
              </div>
            </>
          ) : <Icon type="loading" style={{ fontSize: 16 }} />}
        </Modal>
      </>
    );
  }
}

export default connect(state => ({ telegram: state.telegram, user: state.user }))(TelegramBindModal);
