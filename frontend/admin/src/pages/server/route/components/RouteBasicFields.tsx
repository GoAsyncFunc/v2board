import React from 'react';
import Input from 'antd/lib/input';
import type { ServerRouteRecord } from './RouteEditor';

export interface RouteBasicFieldsProps {
    route: ServerRouteRecord;
    onChange: (patch: Partial<ServerRouteRecord>) => void;
}

export function RouteBasicFields({ route, onChange }: RouteBasicFieldsProps): React.ReactElement {
    return (
        <div className="form-group">
            <label htmlFor="route-remarks">备注</label>
            <Input
                id="route-remarks"
                placeholder="请输入备注"
                value={route.remarks}
                onChange={(event) => onChange({ remarks: event.target.value })}
            />
        </div>
    );
}
