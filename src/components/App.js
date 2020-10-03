import React from "react";
import StaffPage from "./StaffPage";
import AdminPage from "./AdminPage";
import SignIn from "./SignInForm";
import { Route, Switch, Redirect } from "react-router-dom";
import ManageLogin from "./ManageLogin";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ManageLogin} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/staff" component={StaffPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
