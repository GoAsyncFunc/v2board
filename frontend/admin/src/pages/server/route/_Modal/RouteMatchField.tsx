import React from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import type { RouteAction, ServerRouteRecord } from './index';

export function getRouteMatchPlaceholder(action: RouteAction | undefined): string {
    if (action === 'protocol') return 'http\ntls\nquic\nbittorrent';
    if (action === 'block_port') return '53\n443\n1000-2000';
    if (action === 'route_ip' || action === 'block_ip')
        return '127.0.0.1(单一匹配)\n10.0.0.0/8(范围匹配)\ngeoip:cn(预定义列表匹配)';
    return 'example.com(关键字匹配)\ndomain:example.com(子域名匹配)\ngeosite:netflix(预定义域名列表匹配)';
}

export interface RouteMatchFieldProps {
    route: ServerRouteRecord;
    onChange: (patch: Partial<ServerRouteRecord>) => void;
}

export function RouteMatchField({ route, onChange }: RouteMatchFieldProps): React.ReactElement {
    const matchValue = Array.isArray(route.match)
        ? route.match.join('\n')
        : route.match?.split(',')?.join('\n');
    return (
        <div className="form-group">
            <label htmlFor="route-match">
                匹配值
                <a href="https://xtls.github.io/config/routing.html#ruleobject">
                    <Button type="link" />
                    填写参考
                </a>
            </label>
            <Input.TextArea
                id="route-match"
                rows={5}
                placeholder={getRouteMatchPlaceholder(route.action)}
                value={matchValue}
                onChange={(event) => onChange({ match: event.target.value?.split('\n') })}
            />
        </div>
    );
}
