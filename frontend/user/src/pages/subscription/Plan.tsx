import React from 'react';
import Empty from 'antd/lib/empty';
import MainLayout from '../../layouts/MainLayout';
import { connect } from 'react-redux';
import { formatMessage } from '../../locales/i18n';
import PlanCard, { getUnitPriceTag, matchesPlanTab } from '../../components/subscription/PlanCard';
import type { CatalogPlan, PlanTab } from '../../types/planContracts';
import type { UserDispatch, UserRootState } from '../../types/storeContracts';
const message = (id: string): string => formatMessage({ id });

interface PlanStateProps {
    plan: { plans: CatalogPlan[]; fetchLoading: boolean };
    comm: { config: { currency_symbol?: string } };
}

export class PlanPage extends React.Component<
    PlanStateProps & { dispatch: UserDispatch },
    { tabs: PlanTab }
> {
    state: { tabs: PlanTab } = { tabs: 0 };
    componentDidMount() {
        this.props.dispatch({ type: 'plan/fetch' });
        this.props.dispatch({ type: 'comm/config' });
    }
    getUnitPriceTag(plan: CatalogPlan) {
        return getUnitPriceTag(plan);
    }
    render() {
        const { plans, fetchLoading } = this.props.plan;
        const { currency_symbol } = this.props.comm.config;
        return (
            <MainLayout {...this.props} title={message('购买订阅')}>
                <main id="main-container">
                    <div className="content content-full">
                        <h2 className="font-weight-normal mb-4 m-3 mx-xl-0 mt-xl-0 mt-4">
                            {message('选择最适合你的计划')}
                        </h2>
                        <div className="mb-3 font-size-sm mt-3 m-3 mx-xl-0">
                            <span className="v2board-plan-tabs border-primary text-primary">
                                <span
                                    className={
                                        this.state.tabs === 0 ? 'active bg-primary' : undefined
                                    }
                                    onClick={() => this.setState({ tabs: 0 })}
                                >
                                    {message('全部')}
                                </span>
                                <span
                                    className={
                                        this.state.tabs === 1 ? 'active bg-primary' : undefined
                                    }
                                    onClick={() => this.setState({ tabs: 1 })}
                                >
                                    {message('按周期')}
                                </span>
                                <span
                                    className={
                                        this.state.tabs === 2 ? 'active bg-primary' : undefined
                                    }
                                    onClick={() => this.setState({ tabs: 2 })}
                                >
                                    {message('按流量')}
                                </span>
                            </span>
                        </div>
                        {plans.length <= 0 ? (
                            fetchLoading ? (
                                <div className="spinner-grow text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )
                        ) : (
                            <div className="row">
                                {plans
                                    .filter((plan) => matchesPlanTab(plan, this.state.tabs))
                                    .map((plan) => (
                                        <PlanCard
                                            key={Math.random()}
                                            plan={plan}
                                            currencySymbol={currency_symbol}
                                        />
                                    ))}
                            </div>
                        )}
                    </div>
                </main>
            </MainLayout>
        );
    }
}
export default connect(({ plan, comm }: UserRootState) => ({ plan, comm }))(PlanPage);
