//= Functions & Modules
// Packages
import React, { Suspense } from "react";
import { withRouter, Route, Switch } from "react-router";

const HomePage = React.lazy(() => import("./pages/Home"));

class App extends React.Component {
	render() {
		return (
            <Suspense fallback={"Loading..."}>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                </Switch>
            </Suspense>
        );
	}
}

export default withRouter(App);
