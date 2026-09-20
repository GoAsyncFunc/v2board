import React from 'react';
import Spin from 'antd/lib/spin';

export interface LoadingContainerProps {
  loading: boolean;
  children?: React.ReactNode;
}

export default function LoadingContainer({ loading, children }: LoadingContainerProps): React.ReactElement {
  return (
    <Spin spinning={loading} indicator={<div className="spinner-grow text-primary" />}>
      {children}
    </Spin>
  );
}
