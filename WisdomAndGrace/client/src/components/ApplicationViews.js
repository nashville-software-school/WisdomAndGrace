import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import QuoteList from "./QuoteList";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <QuoteList /> : <Redirect to="/login" />}
      </Route>

      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
};
