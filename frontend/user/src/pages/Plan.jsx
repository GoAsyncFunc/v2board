import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { c as connect } from '../vendor/reactRedux.js';
import { formatMessage } from '../vendor/i18n.js';
import PlanCard, { getUnitPriceTag, matchesPlanTab } from '../components/PlanCard.jsx';
const message = id => formatMessage({ id });

export class PlanPage extends React.Component {
  state = { tabs: 0 };
  componentDidMount() {
    this.props.dispatch({ type: 'plan/fetch' });
    this.props.dispatch({ type: 'comm/config' });
  }
  getUnitPriceTag(plan) { return getUnitPriceTag(plan); }
  render() {
    const { plans } = this.props.plan;
    const { currency_symbol } = this.props.comm.config;
    return (
      <MainLayout {...this.props} title={message('购买订阅')}>
        <main id="main-container"><div className="content content-full">
          <h2 className="font-weight-normal mb-4 m-3 mx-xl-0 mt-xl-0 mt-4">{message('选择最适合你的计划')}</h2>
          <div className="mb-3 font-size-sm mt-3 m-3 mx-xl-0">
            <span className="v2board-plan-tabs border-primary text-primary">
              <span className={this.state.tabs === 0 && 'active bg-primary'} onClick={() => this.setState({ tabs: 0 })}>{message('全部')}</span>
              <span className={this.state.tabs === 1 && 'active bg-primary'} onClick={() => this.setState({ tabs: 1 })}>{message('按周期')}</span>
              <span className={this.state.tabs === 2 && 'active bg-primary'} onClick={() => this.setState({ tabs: 2 })}>{message('按流量')}</span>
            </span>
          </div>
          {plans.length <= 0 ? (
            <div className="spinner-grow text-primary" role="status"><span className="sr-only">Loading...</span></div>
          ) : <div className="row">{plans.filter(plan => matchesPlanTab(plan, this.state.tabs)).map(plan => (
            <PlanCard key={Math.random()} plan={plan} currencySymbol={currency_symbol} />
          ))}</div>}
        </div></main>
      </MainLayout>
    );
  }
}
export default connect(({ plan, comm }) => ({ plan, comm }))(PlanPage);
