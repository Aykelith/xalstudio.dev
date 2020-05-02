//= Functions & Modules
// Own
import getScreenSize from "web_panoro/utils/getScreenSize";
import setupGlobalSettings from "web_panoro/utils/setupGlobalSettings";
// Packages
import { hot } from "react-hot-loader/root";
import { render } from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";

//= React components
// Own
import _App from "./App";

//= Styles
import "web_panoro/style/global.scss";

const App = hot(_App);

console.log("GOOD");

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById("main"));
