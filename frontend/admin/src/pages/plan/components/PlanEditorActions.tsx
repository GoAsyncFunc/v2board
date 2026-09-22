import React from 'react';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Tooltip from 'antd/lib/tooltip';

export interface PlanEditorActionsProps {
    saveLoading?: boolean;
    onForceUpdateChange: (value: boolean) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

export function PlanEditorActions({
    saveLoading,
    onForceUpdateChange,
    onCancel,
    onSubmit,
}: PlanEditorActionsProps): React.ReactElement {
    return (
        <div className="v2board-drawer-action">
            <div style={{ float: 'left', marginTop: 5 }}>
                <Tooltip
                    title="勾选后变更的流量、限速、权限组将应用到该套餐下的用户"
                    placement="top"
                >
                    <Checkbox onChange={(event) => onForceUpdateChange(event.target.checked)}>
                        强制更新到用户
                    </Checkbox>
                </Tooltip>
            </div>
            <Button style={{ marginRight: 8 }} onClick={onCancel}>
                取消
            </Button>
            <Button loading={saveLoading} onClick={onSubmit} type="primary">
                提交
            </Button>
        </div>
    );
}
