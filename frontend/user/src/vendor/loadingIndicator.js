import React from 'react';
import Icon from './Icon.js';
import './iconStyles.js';

export class LoadingIndicator extends React.Component {
  render() {
    return <div className={this.props.className}><Icon type="loading" /></div>;
  }
}

export default LoadingIndicator;
