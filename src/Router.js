import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { InshortsContext } from "./Routes";
import Login from "./components/AdminAccess/Login";
import AdminHome from "./components/AdminAccess/AdminHome";
const Router = () => {
  const { state, dispatch } = useContext(InshortsContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/adminlogin" exact component={Login} />
        {state && state.isLoggedIn ? (
          <Route path={"/adminHome"} exact component={AdminHome} />
        ) : (
          <Route path={"/adminHome"} exact component={Login} />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
