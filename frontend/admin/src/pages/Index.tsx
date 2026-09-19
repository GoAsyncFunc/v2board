import React from 'react';
import history from '../vendor/routerHistory.js';

export default class AdminHomePage extends React.Component {
  componentDidMount(): void {
    history.push('/login');
  }
  render() {
    return <div></div>;
  }
}
