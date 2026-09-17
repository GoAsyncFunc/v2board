import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { c as connect } from '../vendor/reactRedux.js';
import { a as Table } from '../vendor/modules/7743416a.js';
import { a as LoadingContainer } from '../vendor/modules/76333265.js';
import { createReadonlyQueueColumns } from '../components/QueueDisplayColumns.jsx';
import '../vendor/modules/67395956.js';
import '../vendor/modules/6d615643.js';
import '../vendor/modules/77642f52.js';
import '../vendor/modules/6d43642f.js';
import '../vendor/siteHelpers.js';
import '../vendor/modules/51673471.js';
import '../components/Recovered_43674f62.jsx';
import '../components/Recovered_68566c61.jsx';
import '../components/Recovered_4f613657.jsx';
import '../components/Recovered_48394c55.jsx';
import '../components/Recovered_33585647.jsx';
import '../components/Recovered_796b4332.jsx';

class QueuePage extends React.Component {
  constructor(props) {
    super(props), this.state = {}, this.getDataTimer = void 0;
  }
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
    clearTimeout(this.getDataTimer);
  }
  getData() {
    this.props.dispatch({
      type: "system/getQueueStats"
    }), this.props.dispatch({
      type: "system/getQueueWorkload"
    }), this.getDataTimer = setTimeout(() => {
      this.getData();
    }, 3e3);
  }
  render() {
    var system = this.props.system,
      queueStats = system.queueStats,
      queueWorkload = (system.getQueueStatsLoading, system.queueWorkload);
    system.getQueueWorkloadLoading;
    return <MainLayout {...this.props} title="队列监控">
      <LoadingContainer loading={!queueStats}>
        <div className={"block block-rounded "}>
          <div className={"block-header block-header-default"}>
            <h3 className={"block-title"}>总览</h3>
          </div>
          <div className={"block-content p-0"}>
            <div className={"row no-gutters"}>
              <div className={"col-lg-6 col-xl-3 border-right p-4 border-bottom"}>
                <div><div>当前作业量</div><div className={"mt-4 font-size-h3"}>{(queueStats?.jobsPerMinute) || "0"}</div></div>
              </div>
              <div className={"col-lg-6 col-xl-3 border-right p-4 border-bottom"}>
                <div><div>近一小时处理量</div><div className={"mt-4 font-size-h3"}>{(queueStats?.recentJobs) || "0"}</div></div>
              </div>
              <div className={"col-lg-6 col-xl-3 border-right p-4 border-bottom"}>
                <div><div>7日内报错数量</div><div className={"mt-4 font-size-h3"}>{(queueStats?.failedJobs) || "0"}</div></div>
              </div>
              <div className={"col-lg-6 col-xl-3 p-4 border-bottom overflow-hidden"}>
                <div>
                  <div>状态</div>
                  <div className={"mt-4 font-size-h3"}>{queueStats && (queueStats?.status ? "运行中" : "未启动")}</div>
                  {queueStats && (queueStats?.status ? <i className={"si si-check text-success"} style={{ position: "absolute", fontSize: 100, right: -20, bottom: -20 }}></i> : <i className={"si si-close text-danger"} style={{ position: "absolute", fontSize: 100, right: -20, bottom: -20 }}></i>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingContainer>
      <LoadingContainer loading={!queueWorkload}>
        <div className={"block block-rounded "}>
          <div className={"block-header block-header-default"}><h3 className={"block-title"}>当前作业详情</h3></div>
          <div className={"block-content p-0"}>
            <Table columns={createReadonlyQueueColumns()} dataSource={queueWorkload && queueWorkload.filter(queue => "default" !== queue.name)} pagination={false} />
          </div>
        </div>
      </LoadingContainer>
    </MainLayout>;
  }
}
export default connect(state => ({ system: state.system }))(QueuePage);
