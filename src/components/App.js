import React from "react";
import StaffPage from "./StaffPage";
import AdminPage from "./AdminPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ManageLogin from "./ManageLogin";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div>
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={ManageLogin} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/staff" component={StaffPage} />
      <Route component={PageNotFound} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
