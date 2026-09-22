import React from 'react';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import Divider from 'antd/lib/divider';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import notification from 'antd/lib/notification';
import Select from 'antd/lib/select';
import moment from 'moment';
import type { FilterField, FilterItem, FilterValue } from '../../types/filter';

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

    renderValueInput(
        filterItem: FilterItem,
        index: number,
        fieldConfig: FilterField,
    ): React.ReactElement {
        if (fieldConfig.type === 'select') {
            const options = fieldConfig.options;
            if (!options) throw new TypeError('Filter select options were not provided');
            return (
                <Select
                    value={filterItem.value || undefined}
                    style={{ width: '100%' }}
                    placeholder="请选择值"
                    onChange={(value) => this.changeFilter(index, 'value', value)}
                >
                    {options.map((option) => (
                        <Select.Option
                            key={`${option.key}-${option.value}`}
                            value={option.value as string | number | undefined}
                        >
                            {option.key}
                        </Select.Option>
                    ))}
                </Select>
            );
        }
        if (fieldConfig.type === 'date') {
            return (
                <DatePicker
                    style={{ width: '100%' }}
                    onChange={(date) => this.changeFilter(index, 'value', date && date.format('X'))}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
            );
        }
        return (
            <Input
                style={{ width: '100%' }}
                value={filterItem.value || undefined}
                placeholder="值"
                onChange={(event) => this.changeFilter(index, 'value', event.target.value)}
            />
        );
    }

    renderFilter(filterItem: FilterItem, index: number): React.ReactElement {
        const fieldConfig =
            this.props.keys.find((field) => field.key === filterItem.key) || this.props.keys[0];
        return (
            <React.Fragment key={`${filterItem.key}-${index}`}>
                <Divider type="horizontal">
                    条件{index + 1}{' '}
                    <Icon
                        type="delete"
                        style={{ color: '#ff4d4f' }}
                        onClick={() => this.remove(index)}
                    />
                </Divider>
                <div className="form-group">
                    <label>字段名</label>
                    <Select
                        value={filterItem.key}
                        style={{ width: '100%' }}
                        onChange={(key) => this.changeFilter(index, 'key', key)}
                    >
                        {this.props.keys.map((field) => (
                            <Select.Option key={field.key} value={field.key}>
                                {field.title}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="form-group">
                    <label>条件</label>
                    <Select
                        value={filterItem.condition}
                        style={{ width: '100%' }}
                        onChange={(condition) => this.changeFilter(index, 'condition', condition)}
                    >
                        {fieldConfig.condition.map((condition) => (
                            <Select.Option key={condition} value={condition}>
                                {condition}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="form-group">
                    <label>欲检索内容</label>
                    {this.renderValueInput(filterItem, index, fieldConfig)}
                </div>
            </React.Fragment>
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
