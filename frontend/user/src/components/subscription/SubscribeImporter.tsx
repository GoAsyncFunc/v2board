import React from 'react';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';
import message from 'antd/lib/message';
import QRCode from 'qrcode.react';
import {
    copyToClipboard,
    isAndroid,
    isAppleMobile,
    isIPadDesktopMode,
    isMac,
    isMobile,
    isWindows,
} from '../../utils/siteHelpers';
import { formatMessage } from '../../locales/i18n';
import history from '../../app/routerHistory';
import { subscribeImporterStyles as styles } from '../../styles/subscribeImporter';

interface SubscribeImporterProps {
    children: React.ReactElement;
    subscribeUrl?: string;
}

export default class SubscribeImporter extends React.Component<SubscribeImporterProps> {
    state = { showSubscribe: false, showQrSubscribe: false };

    copySubscribeUrl(): void {
        copyToClipboard(this.props.subscribeUrl ?? '');
        message.success(formatMessage({ id: '复制成功' }));
    }

    getImportLinks() {
        const subscribeUrl = String(this.props.subscribeUrl);
        const title = window.settings.title;
        const links = [
            { title: 'Hiddify', href: `hiddify://import/${subscribeUrl}&flag=sing#${title}` },
            {
                title: 'Sing-box',
                href: `sing-box://import-remote-profile?url=${encodeURIComponent(subscribeUrl)}#${title}`,
            },
        ];
        if (isAppleMobile() || isIPadDesktopMode()) {
            links.push(
                {
                    title: 'Shadowrocket',
                    href: `shadowrocket://add/sub://${window.btoa(`${subscribeUrl}&flag=shadowrocket`).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}?remark=${title}`,
                },
                {
                    title: 'QuantumultX',
                    href: `quantumult-x:///update-configuration?remote-resource=${encodeURI(JSON.stringify({ server_remote: [`${subscribeUrl}, tag=${title}`] }))}`,
                },
                {
                    title: 'Surge',
                    href: `surge:///install-config?url=${encodeURIComponent(subscribeUrl)}&name=${title}`,
                },
                {
                    title: 'Stash',
                    href: `stash://install-config?url=${encodeURIComponent(subscribeUrl)}&name=${title}`,
                },
            );
        }
        if (isMac())
            links.push({
                title: 'ClashX',
                href: `clash://install-config?url=${encodeURIComponent(subscribeUrl)}&name=${title}`,
            });
        if (isWindows())
            links.push({
                title: 'ClashMeta',
                href: `clash://install-config?url=${encodeURIComponent(`${subscribeUrl}&flag=meta`)}&name=${title}`,
            });
        if (isAndroid()) {
            links.push(
                {
                    title: 'NekoBox For Android',
                    href: `clash://install-config?url=${encodeURIComponent(`${subscribeUrl}&flag=meta`)}&name=${title}`,
                },
                {
                    title: 'ClashMeta For Android',
                    href: `clash://install-config?url=${encodeURIComponent(`${subscribeUrl}&flag=meta`)}&name=${title}`,
                },
                {
                    title: 'Surfboard',
                    href: `surge:///install-config?url=${encodeURIComponent(subscribeUrl)}&name=${title}`,
                },
            );
        }
        return links;
    }

    renderSubscribeBox() {
        const subscribeUrl = this.props.subscribeUrl ?? '';
        return (
            <div className={styles.oneClickSubscribe}>
                <div
                    className={`${styles.item} subsrcibe-for-link`}
                    onClick={() => this.copySubscribeUrl()}
                >
                    <div>
                        <i className="fa fa-copy mr-2" />
                    </div>
                    <div>{formatMessage({ id: '复制订阅地址' })}</div>
                </div>
                <div
                    className={`${styles.item} subscribe-for-qrcode`}
                    onClick={() => this.setState({ showQrSubscribe: true })}
                >
                    <div>
                        <i className="fa fa-qrcode mr-2" />
                    </div>
                    <div>{formatMessage({ id: '扫描二维码订阅' })}</div>
                </div>
                {this.getImportLinks().map((link) => (
                    <div
                        className={`${styles.item} ${link.title.replace(' ', '-').toLowerCase()}`}
                        key={link.title}
                        onClick={() => {
                            window.location.href = link.href;
                        }}
                    >
                        <div>
                            <img
                                src={`${window.settings?.assets_path || ''}/./images/icon/${link.title}.png`}
                            />
                        </div>
                        <div>
                            {formatMessage({ id: '导入到' })} {link.title}
                        </div>
                    </div>
                ))}
                <div style={{ padding: 10 }}>
                    <Button
                        size="large"
                        block
                        type="primary"
                        onClick={() => history.push('/knowledge')}
                    >
                        {formatMessage({ id: '不会使用，查看使用教程' })}
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        const { children } = this.props;
        const subscribeUrl = this.props.subscribeUrl ?? '';
        const { showSubscribe, showQrSubscribe } = this.state;
        const qrModal = (
            <Modal
                closable={false}
                centered
                width={300}
                visible={showQrSubscribe}
                footer={false}
                style={{ textAlign: 'center' }}
                onCancel={() => this.setState({ showQrSubscribe: false })}
                zIndex={2000}
            >
                <QRCode value={subscribeUrl} renderAs="canvas" />
                <div style={{ marginTop: 10 }}>
                    {formatMessage({ id: '使用支持扫码的客户端进行订阅' })}
                </div>
            </Modal>
        );
        return (
            <>
                {React.cloneElement(children, {
                    onClick: () => this.setState({ showSubscribe: true }),
                })}
                {qrModal}
                {isMobile() ? (
                    <Drawer
                        {...{ footer: false }}
                        placement="bottom"
                        closable={false}
                        visible={showSubscribe}
                        width={300}
                        onClose={() => this.setState({ showSubscribe: false })}
                        bodyStyle={{ padding: 0 }}
                    >
                        {this.renderSubscribeBox()}
                    </Drawer>
                ) : (
                    <Modal
                        visible={showSubscribe}
                        closable={false}
                        footer={false}
                        width={300}
                        centered
                        onCancel={() => this.setState({ showSubscribe: false })}
                        bodyStyle={{ padding: 0 }}
                    >
                        {this.renderSubscribeBox()}
                    </Modal>
                )}
            </>
        );
    }
}
