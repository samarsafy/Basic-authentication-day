import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App.jsx";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/Home" component={Home} />
      //if everytime when somebody wants to access the Admin component through
      // the router, redirect her/him to the login back if no token is in the //
      localstorage
      <Route path="/Admin" component={Login} />
      <Route path="/Admin" component={Admin} />
    </Switch>
  </BrowserRouter>
);
export default Router;
