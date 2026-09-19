import React from 'react';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import MainLayout from '../layouts/MainLayout.jsx';
import { post } from '../services/request.js';
import type { AdminDispatch } from '../types/store';

type ThemeConfigValue = string | number | boolean | null | undefined;
type ThemeConfigParams = Record<string, ThemeConfigValue>;

function toInputValue(value: ThemeConfigValue): string | number | undefined {
  if (value === null || value === undefined) return undefined;
  return typeof value === 'boolean' ? String(value) : value;
}

interface ThemeField {
  field_name: string;
  field_type: 'select' | 'input' | 'textarea' | string;
  label: string;
  placeholder?: string;
  select_options?: Record<string, string>;
}

interface ThemeDefinition {
  name: string;
  description?: string;
  configs?: ThemeField[];
}

interface ThemeState {
  themes: Record<string, ThemeDefinition>;
  active?: string;
  saveThemeConfigLoading?: boolean;
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

interface ThemeRootState {
  theme: ThemeState;
}

export class ThemeConfigEditor extends React.Component<ThemeConfigEditorProps, ThemeConfigEditorState> {
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
      return <Select style={{ width: '100%' }} placeholder={field.placeholder} value={value} onChange={nextValue => this.setParam(field.field_name, nextValue)}>
        {Object.keys(field.select_options || {}).map(option => <Select.Option key={option} value={option}>{field.select_options?.[option]}</Select.Option>)}
      </Select>;
    }
    if (field.field_type === 'input') {
      return <Input placeholder={field.placeholder} value={toInputValue(value)} onChange={event => this.setParam(field.field_name, event.target.value)} />;
    }
    if (field.field_type === 'textarea') {
      return <Input.TextArea rows={5} placeholder={field.placeholder} value={toInputValue(value)} onChange={event => this.setParam(field.field_name, event.target.value)} />;
    }
    return null;
  }

  render() {
    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.show() })}
      <Modal onCancel={() => this.hide()} title={`配置${this.props.themeName}主题`} visible={this.state.visible} okButtonProps={{ loading: this.props.theme.saveThemeConfigLoading }} onOk={() => this.save()}>
        {(this.props.configs || []).map(field => <div className="form-group" key={field.field_name}><label>{field.label}</label>{this.renderField(field)}</div>)}
      </Modal>
    </>;
  }
}

const ConnectedThemeConfigEditor = connect((state: ThemeRootState) => ({ theme: state.theme }))(ThemeConfigEditor);

interface ThemePageProps {
  dispatch: AdminDispatch;
  theme: ThemeState;
}

export class ThemePage extends React.Component<ThemePageProps> {
  componentDidMount() {
    this.props.dispatch({ type: 'theme/getThemes' });
  }

  async activateTheme(themeKey: string): Promise<void> {
    const response = await post(`/${window.settings.secure_path}/config/save`, { frontend_theme: themeKey });
    if (response.code === 200) this.props.dispatch({ type: 'theme/getThemes' });
  }

  render() {
    const { themes, active } = this.props.theme;
    return <MainLayout {...this.props} loading={Object.keys(themes).length <= 0} title="主题配置">
      <div className="row"><div className="col-lg-12"><div className="alert alert-warning mb-0 mb-md-4" role="alert"><p className="mb-0">如果你采用前后分离的方式部署V2board，那么主题配置将不会生效。了解 <b><a href="https://docs.v2board.com/use/advanced.html#%E5%89%8D%E7%AB%AF%E5%88%86%E7%A6%BB">前后分离</a></b></p></div></div></div>
      {Object.keys(themes).map(themeKey => {
        const theme = themes[themeKey];
        return <div key={themeKey} className="block block-transparent bg-image mb-0 mb-md-3 bg-primary" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)' }}>
          <div className="block-content block-content-full bg-gd-white-op-l"><div className="d-md-flex justify-content-md-between align-items-md-center">
            <div className="p-2 py-4"><h3 className="font-size-h4 font-w400 text-black mb-1">{theme.name}</h3><p className="text-black-75 mb-0">{theme.description}</p></div>
            <div className="p-2 py-4">
              <button type="button" className="btn btn-sm rounded-pill btn-outline-light px-3 mr-2" onClick={() => this.activateTheme(themeKey)} disabled={active === themeKey}>{active === themeKey ? '当前主题' : '激活主题'}</button>
              <ConnectedThemeConfigEditor themeKey={themeKey} themeName={theme.name} configs={theme.configs}><button type="button" className="btn btn-sm rounded-pill btn-outline-light px-3">主题设置</button></ConnectedThemeConfigEditor>
            </div>
          </div></div>
        </div>;
      })}
    </MainLayout>;
  }
}

export default connect((state: ThemeRootState) => ({ theme: state.theme }))(ThemePage);
