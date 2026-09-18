import React from 'react';
import Modal from '../Modal.js';
import { Button, Drawer } from '../ui.js';
import { QRCode } from '../content.js';
import { copyToClipboard, isAndroid, isAppleMobile, isIPadDesktopMode, isMac, isMobile, isWindows } from '../siteHelpers.js';
import { formatMessage } from '../i18n.js';
import { push } from '../routerHistory.js';
import { subscribeStyles as styles } from '../subscribeStyles.js';

export default class SubscribeImporter extends React.Component {
  state = { showSubscribe: false, showQrSubscribe: false };

  getImportLinks() {
    const subscribeUrl = this.props.subscribeUrl;
    const title = window.settings.title;
    const links = [
      { title: 'Hiddify', href: `hiddify://import/${subscribeUrl}&flag=sing#${title}` },
      { title: 'Sing-box', href: `sing-box://import-remote-profile?url=${encodeURIComponent(subscribeUrl)}#${title}` },
    ];
    if (isAppleMobile() || isIPadDesktopMode()) {
      links.push(
        { title: 'Shadowrocket', href: `shadowrocket://add/sub://${window.btoa(`${subscribeUrl}&flag=shadowrocket`).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}?remark=${title}` },
        { title: 'QuantumultX', href: `quantumult-x:///update-configuration?remote-resource=${encodeURI(JSON.stringify({ server_remote: [`${subscribeUrl}, tag=${title}`] }))}` },
        { title: 'Surge', href: `surge:///install-config?url=${encodeURIComponent(subscribeUrl)}&name=${title}` },
        { title: 'Stash', href: `stash://install-config?url=${encodeURIComponent(subscribeUrl)}&name=${title}` },
      );
    }
    if (isMac()) links.push({ title: 'ClashX', href: `clash://install-config?url=${encodeURIComponent(subscribeUrl)}&name=${title}` });
    if (isWindows()) links.push({ title: 'ClashMeta', href: `clash://install-config?url=${encodeURIComponent(`${subscribeUrl}&flag=meta`)}&name=${title}` });
    if (isAndroid()) {
      links.push(
        { title: 'NekoBox For Android', href: `clash://install-config?url=${encodeURIComponent(`${subscribeUrl}&flag=meta`)}&name=${title}` },
        { title: 'ClashMeta For Android', href: `clash://install-config?url=${encodeURIComponent(`${subscribeUrl}&flag=meta`)}&name=${title}` },
        { title: 'Surfboard', href: `surge:///install-config?url=${encodeURIComponent(subscribeUrl)}&name=${title}` },
      );
    }
    return links;
  }

  renderSubscribeBox() {
    const { subscribeUrl } = this.props;
    return (
      <div className={styles.oneClickSubscribe}>
        <div className={`${styles.item} subsrcibe-for-link`} onClick={() => copyToClipboard(subscribeUrl)}>
          <div><i className="fa fa-copy mr-2" /></div>
          <div>{formatMessage({ id: '复制订阅地址' })}</div>
        </div>
        <div className={`${styles.item} subscribe-for-qrcode`} onClick={() => this.setState({ showQrSubscribe: true })}>
          <div><i className="fa fa-qrcode mr-2" /></div>
          <div>{formatMessage({ id: '扫描二维码订阅' })}</div>
        </div>
        {this.getImportLinks().map(link => (
          <div className={`${styles.item} ${link.title.replace(' ', '-').toLowerCase()}`} key={link.title} onClick={() => { window.location.href = link.href; }}>
            <div><img src={`${window.settings?.assets_path || ''}/./images/icon/${link.title}.png`} /></div>
            <div>{formatMessage({ id: '导入到' })} {link.title}</div>
          </div>
        ))}
        <div style={{ padding: 10 }}>
          <Button size="large" block type="primary" onClick={() => push('/knowledge')}>
            {formatMessage({ id: '不会使用，查看使用教程' })}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { children, subscribeUrl } = this.props;
    const { showSubscribe, showQrSubscribe } = this.state;
    const qrModal = (
      <Modal closable={false} centered width={300} visible={showQrSubscribe} footer={false} style={{ textAlign: 'center' }} onCancel={() => this.setState({ showQrSubscribe: false })} zIndex={2000}>
        <QRCode value={subscribeUrl} renderAs="canvas" />
        <div style={{ marginTop: 10 }}>{formatMessage({ id: '使用支持扫码的客户端进行订阅' })}</div>
      </Modal>
    );
    return (
      <>
        {React.cloneElement(children, { onClick: () => this.setState({ showSubscribe: true }) })}
        {qrModal}
        {isMobile() ? (
          <Drawer placement="bottom" closable={false} visible={showSubscribe} footer={false} width={300} onClose={() => this.setState({ showSubscribe: false })} bodyStyle={{ padding: 0 }}>
            {this.renderSubscribeBox()}
          </Drawer>
        ) : (
          <Modal visible={showSubscribe} closable={false} footer={false} width={300} centered onCancel={() => this.setState({ showSubscribe: false })} bodyStyle={{ padding: 0 }}>
            {this.renderSubscribeBox()}
          </Modal>
        )}
      </>
    );
  }
}
