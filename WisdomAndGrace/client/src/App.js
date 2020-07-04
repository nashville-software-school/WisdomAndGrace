import React from 'react';
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Login from "./components/Login";

function App() {
  return (
    <UserProfileProvider>
      <div className="App">
        <Login/>
      </div>
    </UserProfileProvider>
  );
}

export default App;
