import React from 'react';
import Button from 'antd/lib/button';
import { formatMessage } from '../../../locales/i18n';

export default function ProfileSecurityReset({ onReset }: { onReset: () => void }) {
    return (
        <div className="block block-rounded">
            <div className="block-header block-header-default">
                <h3 className="block-title">{formatMessage({ id: '重置订阅信息' })}</h3>
            </div>
            <div className="block-content">
                <div className="row push">
                    <div className="col-md-12">
                        <div className="alert alert-warning mb-3" role="alert">
                            {formatMessage({ id: '重置订阅提示信息' })}
                        </div>
                        <Button type="danger" onClick={onReset}>
                            {formatMessage({ id: '重置' })}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
