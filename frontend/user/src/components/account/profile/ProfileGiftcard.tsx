import React from 'react';
import Button from 'antd/lib/button';
import { formatMessage } from '../../../locales/i18n';

interface ProfileGiftcardProps {
    giftcardRef: React.RefObject<HTMLInputElement>;
    loading?: boolean;
    onRedeem: () => void;
}

export default function ProfileGiftcard({ giftcardRef, loading, onRedeem }: ProfileGiftcardProps) {
    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-md-12">
                <div className="block block-rounded">
                    <div className="block-header block-header-default">
                        <h3 className="block-title">{formatMessage({ id: '礼品卡' })}</h3>
                    </div>
                    <div className="block-content">
                        <div className="row push">
                            <div className="col-lg-8 col-xl-5">
                                <div className="form-group">
                                    <input
                                        ref={giftcardRef}
                                        className="form-control"
                                        placeholder={formatMessage({ id: '请输入礼品卡' })}
                                        autoComplete="one-time-code"
                                    />
                                </div>
                                <Button type="primary" onClick={onRedeem} loading={loading}>
                                    {formatMessage({ id: '兑换' })}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
