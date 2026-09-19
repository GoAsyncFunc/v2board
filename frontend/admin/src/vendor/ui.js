import React from 'react';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Col from 'antd/lib/col';
import ConfigProvider from 'antd/lib/config-provider';
import DatePicker from 'antd/lib/date-picker';
import Drawer from 'antd/lib/drawer';
import Dropdown from 'antd/lib/dropdown';
import Input from 'antd/lib/input';
import List from 'antd/lib/list';
import Menu from 'antd/lib/menu';
import message from 'antd/lib/message';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import AntSpin from 'antd/lib/spin';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import Tabs from 'antd/lib/tabs';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';

export { default as Sortable } from './sortable.js';
export { default as JsonEditor } from '../components/JsonEditor.jsx';

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

// These aliases preserve the behavior of the recovered production bundle.
const Spin = LoadingContainer;
const LoadingIndicator = LoadingContainer;
const notification = message;
const Modal = Drawer;
const ButtonGroup = Button.Group;

export {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Drawer,
  Dropdown,
  Input,
  List,
  LoadingContainer,
  LoadingIndicator,
  Menu,
  message,
  Modal,
  notification,
  Radio,
  Row,
  Select,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
};
