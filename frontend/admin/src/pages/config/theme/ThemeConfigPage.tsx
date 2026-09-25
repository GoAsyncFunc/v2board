import React from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { post } from '../../../services/request';
import { isSuccessfulResponse } from '../../../types/apiContracts';
import ConnectedThemeConfigEditor, { ThemeConfigEditor } from './components/ThemeConfigEditor';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type { ThemeState } from '../../../types/theme';

interface ThemePageProps {
    dispatch: AdminDispatch;
    theme: ThemeState;
}

export class ThemePage extends React.Component<ThemePageProps> {
    componentDidMount(): void {
        this.props.dispatch({ type: 'theme/getThemes' });
    }

    async activateTheme(themeKey: string): Promise<void> {
        const response = await post(`/${window.settings.secure_path}/config/save`, {
            frontend_theme: themeKey,
        });
        if (isSuccessfulResponse(response)) this.props.dispatch({ type: 'theme/getThemes' });
    }

    render(): React.ReactNode {
        const { themes, active } = this.props.theme;
        return (
            <MainLayout {...this.props} loading={Object.keys(themes).length <= 0} title="主题配置">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="alert alert-warning mb-0 mb-md-4" role="alert">
                            <p className="mb-0">
                                如果你采用前后分离的方式部署V2board，那么主题配置将不会生效。了解{' '}
                                <b>
                                    <a href="https://docs.v2board.com/use/advanced.html#%E5%89%8D%E7%AB%AF%E5%88%86%E7%A6%BB">
                                        前后分离
                                    </a>
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
                {Object.keys(themes).map((themeKey) => {
                    const theme = themes[themeKey];
                    return (
                        <div
                            key={themeKey}
                            className="block block-transparent bg-image mb-0 mb-md-3 bg-primary"
                            style={{
                                backgroundImage:
                                    'url(https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)',
                            }}
                        >
                            <div className="block-content block-content-full bg-gd-white-op-l">
                                <div className="d-md-flex justify-content-md-between align-items-md-center">
                                    <div className="p-2 py-4">
                                        <h3 className="font-size-h4 font-w400 text-black mb-1">
                                            {theme.name}
                                        </h3>
                                        <p className="text-black-75 mb-0">{theme.description}</p>
                                    </div>
                                    <div className="p-2 py-4">
                                        <button
                                            type="button"
                                            className="btn btn-sm rounded-pill btn-outline-light px-3 mr-2"
                                            onClick={() => this.activateTheme(themeKey)}
                                            disabled={active === themeKey}
                                        >
                                            {active === themeKey ? '当前主题' : '激活主题'}
                                        </button>
                                        <ConnectedThemeConfigEditor
                                            themeKey={themeKey}
                                            themeName={theme.name}
                                            configs={theme.configs}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-sm rounded-pill btn-outline-light px-3"
                                            >
                                                主题设置
                                            </button>
                                        </ConnectedThemeConfigEditor>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </MainLayout>
        );
    }
}

export { ThemeConfigEditor };

export default connect((state: AdminRootState) => ({ theme: state.theme }))(ThemePage);
