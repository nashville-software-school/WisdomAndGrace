import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const registerClick = () => {
    const userProfile = { name, email };
    register(userProfile, password)
      .then(() => history.push("/"));
  };

  return (
    <fieldset>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="text" onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={registerClick}>Register</button>
      </div>
    </fieldset>
  );
}