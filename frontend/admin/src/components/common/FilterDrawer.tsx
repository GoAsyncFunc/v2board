import React from 'react';
import Button from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import notification from 'antd/lib/notification';
import type { FilterField, FilterItem, FilterValue } from '../../types/filterContracts';
import FilterCondition from './FilterCondition';

const DrawerWithFooter = Drawer as React.ComponentType<
    React.ComponentProps<typeof Drawer> & { footer?: React.ReactNode }
>;

export interface FilterDrawerProps {
    children: React.ReactElement;
    value?: FilterItem[];
    keys: FilterField[];
    onOk: (filter: FilterItem[]) => void;
}

interface FilterDrawerState {
    visible: boolean;
    filter: FilterItem[];
}

export class FilterDrawer extends React.Component<FilterDrawerProps, FilterDrawerState> {
    constructor(props: FilterDrawerProps) {
        super(props);
        this.state = { visible: false, filter: props.value || [] };
    }

    show() {
        this.setState({ visible: true });
    }

    add() {
        const firstField = this.props.keys[0];
        this.setState({
            filter: [
                ...this.state.filter,
                { key: firstField.key, condition: firstField.condition[0], value: '' },
            ],
        });
    }

    changeFilter(index: number, field: keyof FilterItem, value: FilterValue): void {
        const filter = this.state.filter.map((item, itemIndex) => {
            if (itemIndex !== index) return item;
            if (field === 'key') {
                const fieldConfig = this.props.keys.find(
                    (candidate) => candidate.key === value,
                ) as FilterField;
                return {
                    ...item,
                    key: value as string,
                    condition: fieldConfig.condition[0],
                    value: '',
                };
            }
            return { ...item, [field]: value };
        });
        this.setState({ filter });
    }

    apply() {
        if (this.state.filter.some((item) => item.value === '')) {
            notification.error({
                message: '过滤器',
                description: '欲检索内容不能为空',
                duration: 1.5,
            });
            return;
        }
        this.props.onOk(this.state.filter);
        this.setState({ visible: false });
    }

    hide() {
        this.setState({ visible: false });
    }
    remove(index: number): void {
        this.setState({
            filter: this.state.filter.filter((item, itemIndex) => itemIndex !== index),
        });
    }
    reset() {
        this.setState({ filter: [] }, () => this.apply());
    }

    renderFilter(filterItem: FilterItem, index: number): React.ReactElement {
        const fieldConfig =
            this.props.keys.find((field) => field.key === filterItem.key) || this.props.keys[0];
        return (
            <FilterCondition
                key={`${filterItem.key}-${index}`}
                filterItem={filterItem}
                index={index}
                fields={this.props.keys}
                field={fieldConfig}
                onChange={(itemIndex, field, value) => this.changeFilter(itemIndex, field, value)}
                onRemove={(itemIndex) => this.remove(itemIndex)}
            />
        );
    }

    render() {
        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.show() })}
                <DrawerWithFooter
                    title="过滤器"
                    visible={this.state.visible}
                    onClose={() => this.hide()}
                    className="v2board-filter-drawer"
                    footer={<></>}
                >
                    {this.state.filter.map((filterItem, index) =>
                        this.renderFilter(filterItem, index),
                    )}
                    <Button style={{ width: '100%' }} type="primary" onClick={() => this.add()}>
                        <Icon type="plus" /> 添加条件
                    </Button>
                    <div className="v2board-drawer-action">
                        <Button
                            disabled={!this.state.filter.length}
                            type="danger"
                            onClick={() => this.reset()}
                            style={{ float: 'left' }}
                        >
                            重置
                        </Button>
                        <Button style={{ marginRight: 8 }} onClick={() => this.hide()}>
                            取消
                        </Button>
                        <Button
                            disabled={!this.state.filter.length}
                            onClick={() => this.apply()}
                            type="primary"
                        >
                            检索
                        </Button>
                    </div>
                </DrawerWithFooter>
            </>
        );
    }
}

export default FilterDrawer;
