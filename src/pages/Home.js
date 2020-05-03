import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "../style/Home.scss";

class HomePage extends React.Component {
    render() {
        return (
            <div id="homePage" className="page">
                <div className="_left">
                    <img className="_logo" src="/imgs/logo.png"/>
                    <div className="_menuCnt">
                        <Link className="_blog" to="#">Blog</Link>
                        <Link className="_projects" to="#">Projects</Link>
                        <Link className="_aboutMe" to="#">About me</Link>
                    </div>
                </div>
                <div className="_right">
                    <video autoPlay loop preload="auto" muted>
                        <source src="/imgs/home_video.mp4" type="video/mp4"/>
                    </video>
                </div>
            </div>
        )
    }
};

export default withRouter(HomePage);