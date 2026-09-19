import React from 'react';
import { connect } from 'react-redux';
import * as echarts from 'echarts/core';
import type { EChartsCoreOption, EChartsType } from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import history from '../vendor/routerHistory.js';
import MainLayout from '../layouts/MainLayout.jsx';
import { get } from '../services/request.js';
import { siteSettings } from '../vendor/siteSettings.js';
import { formatIncome, formatLiveCount, type DisplayScalar } from '../components/MoneyDisplay';
import type { AdminDispatch } from '../types/store';

echarts.use([
  LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent,
  DatasetComponent, TransformComponent, LabelLayout, SVGRenderer,
]);

interface OrderChartRecord {
  type: string;
  date: string;
  value: number;
}

interface RankChartRecord {
  total: number;
  server_name?: string;
  email?: string;
}

interface DashboardStats {
  online_user?: DisplayScalar;
  day_income?: DisplayScalar;
  day_register_total?: DisplayScalar;
  month_income?: DisplayScalar;
  last_month_income?: DisplayScalar;
  commission_last_month_payout?: DisplayScalar;
  month_register_total?: DisplayScalar;
  ticket_pending_total?: DisplayScalar;
  commission_pending_total?: DisplayScalar;
}

interface DashboardConfig {
  site: { currency?: string };
}

interface DashboardProps {
  dispatch: AdminDispatch;
  stat: DashboardStats;
  config: DashboardConfig;
}

interface DashboardRootState {
  stat: DashboardStats;
  config: DashboardConfig;
}

interface DashboardState {
  queueStatus?: string;
}

interface QuickLinkProps {
  icon: string;
  label: string;
  path: string;
}

interface RankChartProps {
  title: string;
  chartRef: React.RefObject<HTMLDivElement>;
  extraClass?: string;
}

interface RankChartOption {
  tooltip: { trigger: string; formatter: (values: Array<{ value: string | number }>) => string };
  grid: { top: string; left: string; right: string; bottom: string; containLabel: boolean };
  xAxis: { type: string };
  yAxis: { type: string; data: string[] };
  series: Array<{ data: number[]; type: string }>;
}

interface OrderChartSeries {
  name: string;
  type: string;
  smooth: boolean;
  data: number[];
}

interface OrderChartOption {
  tooltip: { trigger: string };
  legend: { data: string[]; left: string; z: number };
  grid: { left: string; right: string; bottom: string; containLabel: boolean };
  xAxis: { type: string; boundaryGap: boolean; data: string[] };
  yAxis: { type: string };
  series: OrderChartSeries[];
}

export function rankChartOption(data: RankChartRecord[], getLabel: (item: RankChartRecord) => string | undefined) {
  const option: RankChartOption = {
    tooltip: { trigger: 'axis', formatter: values => `${values[0].value} GB` },
    grid: { top: '1%', left: '1%', right: '1%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: [] },
    series: [{ data: [], type: 'bar' }],
  };
  [...data].reverse().forEach(item => {
    option.yAxis.data.push(getLabel(item) || '');
    option.series[0].data.push(item.total);
  });
  return option;
}

function QuickLink({ icon, label, path }: QuickLinkProps) {
  return <div className="col-sm-6 col-xl-3 js-appear-enabled animated" data-toggle="appear">
    <a className="block block-bordered block-link-pop text-center mb-0" onClick={() => history.push(path)}>
      <div className="block-content block-content-full text-center"><i className={`fa-2x si ${icon} text-primary d-none d-sm-inline-block mb-3`} /><div className="font-w600 text-uppercase">{label}</div></div>
    </a>
  </div>;
}

function RankChart({ title, chartRef, extraClass = '' }: RankChartProps) {
  return <div className={`col-lg-6 js-appear-enabled animated ${extraClass}`} data-toggle="appear">
    <div className="block border-bottom"><div className="block-header block-header-default"><h3 className="block-title">{title}</h3></div><div className="block-content"><div className="px-sm-3 pt-sm-3 py-3 clearfix" style={{ height: 400 }} ref={chartRef} /></div></div>
  </div>;
}

export class DashboardPage extends React.Component<DashboardProps, DashboardState> {
  state: DashboardState = {};
  orderChart = React.createRef<HTMLDivElement>();
  serverLastRankChart = React.createRef<HTMLDivElement>();
  serverTodayRankChart = React.createRef<HTMLDivElement>();
  userTodayRankChart = React.createRef<HTMLDivElement>();
  userLastRankChart = React.createRef<HTMLDivElement>();
  orderChartObject?: EChartsType;
  serverLastRankChartObject?: EChartsType;
  serverTodayRankChartObject?: EChartsType;
  userTodayRankChartObject?: EChartsType;
  userLastRankChartObject?: EChartsType;

  constructor(props: DashboardProps) {
    super(props);
    this.chartResize = this.chartResize.bind(this);
  }

  renderOrderChart(data: OrderChartRecord[]): void {
    this.orderChartObject = echarts.init(this.orderChart.current, 'vintage', { renderer: 'svg' });
    const option: OrderChartOption = {
      tooltip: { trigger: 'axis' },
      legend: { data: [], left: '0', z: 4 },
      grid: { left: '1%', right: '1%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: [] },
      yAxis: { type: 'value' },
      series: [],
    };
    data.forEach(item => {
      if (!option.legend.data.includes(item.type)) option.legend.data.push(item.type);
      if (!option.xAxis.data.includes(item.date)) option.xAxis.data.push(item.date);
      const series = option.series.find(candidate => candidate.name === item.type);
      if (series) series.data.push(item.value);
      else option.series.push({ name: item.type, type: 'line', smooth: true, data: [item.value] });
    });
    this.orderChartObject.setOption(option as unknown as EChartsCoreOption);
  }

  renderRankChart(ref: React.RefObject<HTMLDivElement>, propertyName: 'serverLastRankChartObject' | 'serverTodayRankChartObject' | 'userTodayRankChartObject' | 'userLastRankChartObject', data: RankChartRecord[], getLabel: (item: RankChartRecord) => string | undefined): void {
    const chart = echarts.init(ref.current);
    this[propertyName] = chart;
    chart.setOption(rankChartOption(data, getLabel) as unknown as EChartsCoreOption);
  }

  chartResize(): void {
    [this.orderChartObject, this.serverLastRankChartObject, this.serverTodayRankChartObject, this.userTodayRankChartObject, this.userLastRankChartObject].forEach(chart => chart?.resize());
  }

  async componentDidMount(): Promise<void> {
    await this.checkQueue();
    this.props.dispatch({ type: 'stat/getOverride' });
    this.props.dispatch({ type: 'stat/getOrder', complete: (data: OrderChartRecord[]) => this.renderOrderChart(data) });
    this.props.dispatch({ type: 'stat/getServerLastRank', complete: (data: RankChartRecord[]) => this.renderRankChart(this.serverLastRankChart, 'serverLastRankChartObject', data, item => item.server_name) });
    this.props.dispatch({ type: 'stat/getServerTodayRank', complete: (data: RankChartRecord[]) => this.renderRankChart(this.serverTodayRankChart, 'serverTodayRankChartObject', data, item => item.server_name) });
    this.props.dispatch({ type: 'stat/getUserTodayRank', complete: (data: RankChartRecord[]) => this.renderRankChart(this.userTodayRankChart, 'userTodayRankChartObject', data, item => item.email) });
    this.props.dispatch({ type: 'stat/getUserLastRank', complete: (data: RankChartRecord[]) => this.renderRankChart(this.userLastRankChart, 'userLastRankChartObject', data, item => item.email) });
    this.props.dispatch({ type: 'config/fetch', key: 'site' });
    window.addEventListener('resize', this.chartResize);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.chartResize);
  }

  async checkQueue(): Promise<void> {
    const serviceUrl = new URL(siteSettings.serviceHost);
    const response = await get(`${serviceUrl.origin}/monitor/api/stats`);
    this.setState({ queueStatus: typeof response?.status === 'string' ? response.status : undefined });
  }

  showPendingCommissionOrders(): void {
    this.props.dispatch({ type: 'order/addFilter', key: 'status', condition: '=', value: '3' });
    this.props.dispatch({ type: 'order/addFilter', key: 'commission_status', condition: '=', value: '0' });
    this.props.dispatch({ type: 'order/addFilter', key: 'commission_balance', condition: '>', value: '0' });
    history.push('/order');
  }

  renderAlerts() {
    const { stat } = this.props;
    return <>
      {this.state.queueStatus && this.state.queueStatus !== 'running' && <div className="row"><div className="col-lg-12"><div className="alert alert-danger" role="alert"><p className="mb-0">当前队列服务运行异常，可能会导致业务无法使用。</p></div></div></div>}
      {stat.ticket_pending_total && <div className="alert alert-danger" role="alert"><p className="mb-0">有 {stat.ticket_pending_total} 条工单等待处理 <a className="alert-link" href="javascript:void(0)" onClick={() => history.push('/ticket')}>立即处理</a></p></div>}
      {stat.commission_pending_total && <div className="alert alert-danger" role="alert"><p className="mb-0">有 {stat.commission_pending_total} 笔佣金等待确认 <a className="alert-link" href="javascript:void(0)" onClick={() => this.showPendingCommissionOrders()}>立即处理</a></p></div>}
    </>;
  }

  render() {
    const { stat, config } = this.props;
    return <MainLayout {...this.props} title="仪表盘">
      {this.renderAlerts()}
      <div className="mb-0 block border-bottom js-classic-nav d-none d-sm-block"><div className="block-content block-content-full"><div className="row no-gutters border">
        <QuickLink icon="si-equalizer" label="系统设置" path="/config/system" />
        <QuickLink icon="si-list" label="订单管理" path="/order" />
        <QuickLink icon="si-bag" label="订阅管理" path="/plan" />
        <QuickLink icon="si-users" label="用户管理" path="/user" />
      </div></div></div>
      <div className="row no-gutters">
        <div className="col-lg-12 js-appear-enabled animated" data-toggle="appear"><div className="block border-bottom mb-0 v2board-stats-bar"><div className="block-content"><div className="d-flex align-items-center">
          <div className="pr-4 pr-sm-5 pl-0 pl-sm-3"><i className="fa fa-users fa-2x text-gray-light float-right" /><div className="text-muted mb-1" style={{ width: 120 }}>在线人数</div><div className="display-4 text-black font-w300 mb-2">{stat.online_user || '0'}</div></div>
          <div className="pr-4 pr-sm-5 pl-0 pl-sm-3"><i className="fa fa-chart-line fa-2x text-gray-light float-right" /><p className="text-muted w-75 mb-1">今日收入</p><p className="display-4 text-black font-w300 mb-2">{formatIncome(stat.day_income)}<span className="font-size-h5 font-w600 text-muted">{config.site.currency}</span></p></div>
          <div className="pr-4 pr-sm-5 pl-0 pl-sm-3"><i className="fa fa-user fa-2x text-gray-light float-right" /><div className="text-muted mb-1" style={{ width: 120 }}>实时注册</div><div className="display-4 text-black font-w300 mb-2">{formatLiveCount(stat.day_register_total)}</div></div>
        </div></div></div></div>
        <div className="col-lg-12 js-appear-enabled animated" data-toggle="appear"><div className="block border-bottom mb-0 v2board-stats-bar"><div className="block-content block-content-full"><div className="d-flex align-items-center">
          <div className="pr-4 pr-sm-5 pl-0 pl-sm-3"><p className="fs-3 text-dark mb-0">{formatIncome(stat.month_income)} {config.site.currency}</p><p className="text-muted mb-0">本月收入</p></div>
          <div className="px-4 px-sm-5 border-start"><p className="fs-3 text-dark mb-0">{formatIncome(stat.last_month_income)} {config.site.currency}</p><p className="text-muted mb-0">上月收入</p></div>
          <div className="px-4 px-sm-5 border-start"><p className="fs-3 text-dark mb-0">{formatIncome(stat.commission_last_month_payout)} {config.site.currency}</p><p className="text-muted mb-0">上月佣金支出</p></div>
          <div className="px-4 px-sm-5 border-start"><p className="fs-3 text-dark mb-0">{stat.month_register_total || '-'}</p><p className="text-muted mb-0">本月新增用户</p></div>
        </div></div></div></div>
        <div className="col-lg-12 js-appear-enabled animated" data-toggle="appear"><div className="block border-bottom mb-0"><div className="px-sm-3 pt-sm-3 py-3 clearfix" style={{ height: 400 }} ref={this.orderChart} /></div></div>
      </div>
      <div className="row mt-xl-3">
        <RankChart title="今日节点流量排行" chartRef={this.serverTodayRankChart} extraClass="pr-xl-1" />
        <RankChart title="昨日节点流量排行" chartRef={this.serverLastRankChart} />
        <RankChart title="今日用户流量排行" chartRef={this.userTodayRankChart} extraClass="pr-xl-1" />
        <RankChart title="昨日用户流量排行" chartRef={this.userLastRankChart} />
      </div>
    </MainLayout>;
  }
}

export default connect((state: DashboardRootState) => ({ stat: state.stat, config: state.config }))(DashboardPage);
