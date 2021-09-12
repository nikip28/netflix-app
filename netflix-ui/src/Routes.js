import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout";

const List = lazy(() => import("./modules/list"));
const MovieDetails = lazy(() => import("./modules/movieDetails"));

const Routes = (props) => (
  <Router>
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" render={() => <List {...props} />} />
          <Route
            exact
            path="/details"
            render={() => <MovieDetails {...props} />}
          />
        </Switch>
      </Suspense>
    </Layout>
  </Router>
);

export default Routes;
