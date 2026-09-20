import React from "react";
import Modal from 'antd/lib/modal';
import { QRCode } from "../../vendor/content.js";
import { formatMessage } from "../../vendor/i18n.js";

interface PaymentQrModalProps {
    onCancel: () => void;
    payUrl?: string;
    visible?: boolean;
}

export default function PaymentQrModal({ visible, payUrl, onCancel }: PaymentQrModalProps) {
    return (
        <Modal
            className="v2board-payment-qrcode"
            maskClosable={true}
            closable={false}
            centered={true}
            onCancel={onCancel}
            width={300}
            visible={visible}
            footer={
                <div style={{ textAlign: "center" }}>
                    {formatMessage({ id: "等待支付中" })}
                </div>
            }
        >
            {payUrl && <QRCode renderAs="svg" size="250" value={payUrl} />}
        </Modal>
    );
}
