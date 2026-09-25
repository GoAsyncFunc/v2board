import React from 'react';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import type { AdminDispatch, AdminRootState } from '../../../../types/storeContracts';
import type {
    ThemeConfigParams,
    ThemeConfigValue,
    ThemeField,
    ThemeState,
} from '../../../../types/theme';

function toInputValue(value: ThemeConfigValue): string | number | undefined {
    if (value === null || value === undefined) return undefined;
    return typeof value === 'boolean' ? String(value) : value;
}

interface ThemeConfigEditorProps {
    children: React.ReactElement;
    configs?: ThemeField[];
    dispatch: AdminDispatch;
    theme: ThemeState;
    themeKey: string;
    themeName: string;
}

interface ThemeConfigEditorState {
    params: ThemeConfigParams;
    visible: boolean;
}

export class ThemeConfigEditor extends React.Component<
    ThemeConfigEditorProps,
    ThemeConfigEditorState
> {
    constructor(props: ThemeConfigEditorProps) {
        super(props);
        this.state = { params: {}, visible: false };
    }

    setParam(field: string, value: ThemeConfigValue): void {
        this.setState({ params: { ...this.state.params, [field]: value } });
    }

    show(): void {
        this.setState({ visible: true });
        this.props.dispatch({
            type: 'theme/getThemeConfig',
            name: this.props.themeKey,
            complete: (params: ThemeConfigParams) => this.setState({ params }),
        });
    }

    hide(): void {
        this.setState({ visible: false, params: {} });
    }

    save(): void {
        const config = window.btoa(unescape(encodeURIComponent(JSON.stringify(this.state.params))));
        this.props.dispatch({
            type: 'theme/saveThemeConfig',
            config,
            name: this.props.themeKey,
            complete: () => message.success('保存成功'),
        });
    }

    renderField(field: ThemeField): React.ReactNode {
        const value = this.state.params[field.field_name];
        if (field.field_type === 'select') {
            return (
                <Select
                    style={{ width: '100%' }}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(nextValue) => this.setParam(field.field_name, nextValue)}
                >
                    {Object.keys(field.select_options || {}).map((option) => (
                        <Select.Option key={option} value={option}>
                            {field.select_options?.[option]}
                        </Select.Option>
                    ))}
                </Select>
            );
        }
        if (field.field_type === 'input') {
            return (
                <Input
                    placeholder={field.placeholder}
                    value={toInputValue(value)}
                    onChange={(event) => this.setParam(field.field_name, event.target.value)}
                />
            );
        }
        if (field.field_type === 'textarea') {
            return (
                <Input.TextArea
                    rows={5}
                    placeholder={field.placeholder}
                    value={toInputValue(value)}
                    onChange={(event) => this.setParam(field.field_name, event.target.value)}
                />
            );
        }
        return null;
    }

    render() {
        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.show() })}
                <Modal
                    onCancel={() => this.hide()}
                    title={`配置${this.props.themeName}主题`}
                    visible={this.state.visible}
                    okButtonProps={{ loading: this.props.theme.saveThemeConfigLoading }}
                    onOk={() => this.save()}
                >
                    {(this.props.configs || []).map((field) => (
                        <div className="form-group" key={field.field_name}>
                            <label>{field.label}</label>
                            {this.renderField(field)}
                        </div>
                    ))}
                </Modal>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({ theme: state.theme }))(ThemeConfigEditor);
