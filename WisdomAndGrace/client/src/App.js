import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
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
            <ApplicationViews />
          </div>
        </QuoteProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
