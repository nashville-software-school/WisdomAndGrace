import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { useAuth } from "./modules/authManager";

function App() {

  const { isLoggedIn } = useAuth();

  // The "isLoggedIn" state variable will be null until 
  //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark"/>;
  }

  return (
    <Router>
        <Header />
        <ApplicationViews />
    </Router>
  );
}

export default App;
