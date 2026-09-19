import React from 'react';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';
import Carousel from 'antd/lib/carousel';
import ConfigProvider from 'antd/lib/config-provider';
import Drawer from 'antd/lib/drawer';
import Dropdown from 'antd/lib/dropdown';
import Input from 'antd/lib/input';
import Menu from 'antd/lib/menu';
import message from 'antd/lib/message';
import Radio from 'antd/lib/radio';
import AntSpin from 'antd/lib/spin';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';

class LoadingContainer extends React.Component {
  render() {
    return React.createElement(
      AntSpin,
      {
        spinning: this.props.loading,
        indicator: React.createElement('div', { className: 'spinner-grow text-primary' }),
      },
      this.props.children,
    );
  }
}

// LoadingContainer is the shared loading surface used by pages and checkout.
const notification = message;
const Modal = Drawer;

export {
  Badge,
  Button,
  Carousel,
  ConfigProvider,
  Drawer,
  Dropdown,
  Input,
  LoadingContainer,
  Menu,
  message,
  Modal,
  notification,
  Radio,
  Select,
  Switch,
  Table,
  Tag,
  Tooltip,
};
