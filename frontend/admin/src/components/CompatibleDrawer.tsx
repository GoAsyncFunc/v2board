import Drawer from 'antd/lib/drawer';

export interface CompatibleDrawerProps extends React.ComponentProps<typeof Drawer> {
  id?: string;
}

export default Drawer as React.ComponentType<CompatibleDrawerProps>;
