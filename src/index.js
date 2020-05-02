//= Functions & Modules
// Packages
import { hot } from "react-hot-loader/root";
import { render } from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";

//= React components
// Own
import _App from "./App";

//= Styles
import "./style/global.scss";

const App = hot(_App);

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById("main"));
