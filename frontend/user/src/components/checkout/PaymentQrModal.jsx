import React from "react";
import { Modal } from "../../vendor/Modal.js";
import { QRCode } from "../../vendor/content.js";
import { formatMessage } from "../../vendor/i18n.js";

export default function PaymentQrModal({ visible, payUrl, onCancel }) {
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
