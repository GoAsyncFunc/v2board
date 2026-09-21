import React from 'react';
import history from '../app/navigation';

export default class AdminHomePage extends React.Component {
    componentDidMount(): void {
        history.push('/login');
    }
    render() {
        return <div></div>;
    }
}
