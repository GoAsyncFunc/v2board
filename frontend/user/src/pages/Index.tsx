import React from 'react';
import history from '../vendor/routerHistory.js';

export class HomePage extends React.Component {
  componentDidMount(): void {
    if (!window.settings.homepage) history.push('/login');
  }

  decode(homepage: string): string {
    return decodeURI(window.atob(homepage));
  }

  render(): React.ReactNode {
    return window.settings.homepage ? (
      <div dangerouslySetInnerHTML={{ __html: this.decode(window.settings.homepage) }} />
    ) : (
      <div style={{ textAlign: 'center', paddingTop: 50 }}>
        <a href="https://github.com/wyx2685/v2board">v2board</a> is best.
      </div>
    );
  }
}

export default HomePage;
