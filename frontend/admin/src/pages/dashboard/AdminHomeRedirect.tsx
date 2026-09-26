import React from 'react';
import history from '@/app/navigationService';

export default class AdminHomeRedirect extends React.Component {
    componentDidMount(): void {
        history.push('/login');
    }
    render() {
        return <div></div>;
    }
}
