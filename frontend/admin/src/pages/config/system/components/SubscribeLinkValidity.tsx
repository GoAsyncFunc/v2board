import React from 'react';
import ConfigRow from './ConfigRow';
import type { ConfigChangeHandler, SubscribeConfig } from '../../../../types/configurationValues';

interface SubscribeLinkValidityProps {
    subscribe: SubscribeConfig;
    onChange: ConfigChangeHandler<SubscribeConfig>;
}

export default function SubscribeLinkValidity({
    subscribe,
    onChange,
}: SubscribeLinkValidityProps): React.ReactElement | null {
    if (subscribe.show_subscribe_method != 2) return null;

    return (
        <ConfigRow
            isChildren
            title="订阅链接有效时间(分钟)"
            description="订阅链接获取后经过该时间将失效。"
        >
            <input
                type="text"
                className="form-control"
                placeholder="请输入"
                defaultValue={subscribe.show_subscribe_expire}
                onChange={(event) => onChange('show_subscribe_expire', event.target.value)}
            />
        </ConfigRow>
    );
}
