import React from 'react';
import Spin from 'antd/lib/spin';

interface LoadingContainerProps {
  loading?: boolean;
  children?: React.ReactNode;
  // Historical callers supply these attributes; the original wrapper ignores them.
  className?: string;
  size?: 'sm';
  type?: 'light';
}

export default class LoadingContainer extends React.Component<LoadingContainerProps> {
  render() {
    return (
      <Spin spinning={this.props.loading} indicator={<div className="spinner-grow text-primary" />}>
        {this.props.children}
      </Spin>
    );
  }
}
