import React from 'react';
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { QuoteProvider } from "./providers/QuoteProvider";
import Login from "./components/Login";
import QuoteList from "./components/QuoteList";

function App() {
  return (
    <UserProfileProvider>
      <QuoteProvider>
        <div className="App">
          <Login />
          <QuoteList />
        </div>
      </QuoteProvider>
    </UserProfileProvider>
  );
}

export default App;
