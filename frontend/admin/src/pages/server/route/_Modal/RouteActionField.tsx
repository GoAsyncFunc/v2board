import React from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import { settings } from '../../../../config/adminSettings';
import type { RouteAction, ServerRouteRecord } from './index';

export const ROUTE_ACTIONS: RouteAction[] = [
    'block',
    'block_ip',
    'block_port',
    'protocol',
    'dns',
    'route',
    'route_ip',
    'default_out',
];

export interface RouteActionFieldProps {
    route: ServerRouteRecord;
    onChange: (patch: Partial<ServerRouteRecord>) => void;
}

export function RouteActionField({ route, onChange }: RouteActionFieldProps): React.ReactElement {
    const usesOutbound =
        route.action === 'route' || route.action === 'route_ip' || route.action === 'default_out';
    return (
        <>
            <div className="form-group">
                <label htmlFor="route-action">动作</label>
                <Select
                    id="route-action"
                    value={route.action}
                    placeholder="请选择动作"
                    style={{ width: '100%' }}
                    onChange={(action: RouteAction) => onChange({ action })}
                >
                    {ROUTE_ACTIONS.map((action) => (
                        <Select.Option key={action} value={action}>
                            {settings.routeActionText[action]}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            {route.action === 'dns' && (
                <div className="form-group">
                    <label htmlFor="route-dns">DNS服务器</label>
                    <Input
                        id="route-dns"
                        placeholder="请输入用于解析的DNS服务器地址"
                        value={route.action_value}
                        onChange={(event) => onChange({ action_value: event.target.value })}
                    />
                </div>
            )}
            {usesOutbound && (
                <div className="form-group">
                    <label htmlFor="route-outbound">
                        Xray出站配置
                        <a href="https://xtls.github.io/config/outbound.html">
                            <Button type="link" />
                            填写参考
                        </a>
                    </label>
                    <Input.TextArea
                        id="route-outbound"
                        rows={8}
                        placeholder={JSON.stringify(
                            {
                                tag: 'ss_out',
                                sendThrough: '0.0.0.0',
                                protocol: 'shadowsocks',
                                settings: {
                                    email: 'love@xray.com',
                                    address: '8.8.8.8',
                                    port: 5555,
                                    method: 'chacha20-ietf-poly1305',
                                    password: 'abcdefghijklmnopqrstuvwxyz',
                                    level: 0,
                                },
                            },
                            null,
                            4,
                        )}
                        value={route.action_value}
                        onChange={(event) => onChange({ action_value: event.target.value })}
                    />
                </div>
            )}
        </>
    );
}
