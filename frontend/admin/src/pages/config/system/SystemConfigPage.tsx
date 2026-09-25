import React from 'react';
import { connect } from 'react-redux';
import message from 'antd/lib/message';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import SystemConfigTabs from './components/SystemConfigTabs';
import { showMailTestResult } from './components/MailTestResult';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type {
    AdminConfigState,
    ConfigGroupKey,
    ConfigValue,
} from '../../../types/configurationValues';

interface SystemConfigPageProps {
    dispatch: AdminDispatch;
    config: AdminConfigState;
    plan: AdminRootState['plan'];
}

interface SystemConfigPageState {
    tabs?: string;
}

export class SystemConfigPage extends React.Component<
    SystemConfigPageProps,
    SystemConfigPageState
> {
    inputDelayTimer: ReturnType<typeof setTimeout> | null = null;

    componentDidMount() {
        this.props.dispatch({ type: 'config/fetch' });
        this.props.dispatch({ type: 'plan/fetch' });
        this.props.dispatch({ type: 'config/getEmailTemplate' });
        this.props.dispatch({ type: 'config/getThemeTemplate' });
    }

    set(parentKey: ConfigGroupKey, field: string, value: ConfigValue): void {
        const config = this.props.config;
        this.props.dispatch({
            type: 'config/setState',
            payload: { [parentKey]: { ...config[parentKey], [field]: value } },
        });
        if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
        this.inputDelayTimer = setTimeout(() => {
            this.inputDelayTimer = null;
            this.props.dispatch({
                type: 'config/save',
                parentKey,
                complete: () => message.success('保存成功'),
            });
        }, 1500);
    }

    render() {
        const { config, plan } = this.props;
        return (
            <MainLayout {...this.props} title="系统配置">
                <div
                    className={`mb-0 block border-bottom ${config.fetchLoading ? 'block-mode-loading' : ''}`}
                >
                    <SystemConfigTabs
                        config={config}
                        plans={plan.plans}
                        onChange={(group, field, value) => this.set(group, field, value)}
                        onChangeTab={(tabs) => this.setState({ tabs })}
                        onTestSendMail={() =>
                            this.props.dispatch({
                                type: 'config/testSendMail',
                                complete: showMailTestResult,
                            })
                        }
                        onSetWebhook={() =>
                            this.props.dispatch({
                                type: 'config/setTelegramWebhook',
                                complete: () => message.success('webhook 设置成功'),
                            })
                        }
                    />
                </div>
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({ plan: state.plan, config: state.config }))(
    SystemConfigPage,
);
