import React from 'react';
import Icon from 'antd/lib/icon';
import type { PlanRecord } from '../../../types/planContracts';

// Keep raw children: concatenating/interpolating would change null, objects and arrays.
export function renderPlanCount(count: PlanRecord['count']) {
    return (
        <React.Fragment>
            <Icon type="user" style={{ cursor: 'move' }} /> {count}
        </React.Fragment>
    );
}
export function renderPlanTraffic(traffic: PlanRecord['transfer_enable']) {
    return (
        <React.Fragment>
            {traffic}
            {' GB'}
        </React.Fragment>
    );
}
export function displayDeviceLimit(limit: PlanRecord['device_limit']): React.ReactNode {
    return limit !== null ? limit : '-';
}

export function createPlanResourceColumns() {
    return {
        name: { title: '名称', dataIndex: 'name', key: 'name' },
        count: { title: '统计', dataIndex: 'count', key: 'count', render: renderPlanCount },
        transfer_enable: {
            title: '流量',
            dataIndex: 'transfer_enable',
            key: 'transfer_enable',
            render: renderPlanTraffic,
        },
        device_limit: {
            title: '设备数限制',
            dataIndex: 'device_limit',
            key: 'device_limit',
            render: displayDeviceLimit,
        },
    };
}
