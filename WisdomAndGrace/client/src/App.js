import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { QuoteProvider } from "./providers/QuoteProvider";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <QuoteProvider>
          <div className="App">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="login">Login</Link></li>
            </ul>
            <ApplicationViews />
          </div>
        </QuoteProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
