import React from "react";
import { withRouter } from "react-router";

import "../style/Home.scss";

class HomePage extends React.Component {
    render() {
        return (
            <div id="homePage" className="page">
                <div className="_left">
                    <img className="_logo" src="/imgs/logo.png"/>
                </div>
                <div className="_right">

                </div>
            </div>
        )
    }
};

export default withRouter(HomePage);