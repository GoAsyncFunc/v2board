import React from 'react';
import history from '../vendor/routerHistory.js';

export default class HomePage extends React.Component {
  componentDidMount() {
    window.settings.homepage || history.push("/login");
  }
  decode(homepage) {
    const decoded = window.atob(homepage);
    return decodeURI(decoded);
  }
  render() {
    return window.settings.homepage ? <div dangerouslySetInnerHTML={{
      __html: this.decode(window.settings.homepage)
    }}></div> : <div style={{
      textAlign: "center",
      paddingTop: 50
    }}>
                <a href={"https://github.com/wyx2685/v2board"}>{"v2board"}</a>
                {" is best."}
            </div>;
  }
}
