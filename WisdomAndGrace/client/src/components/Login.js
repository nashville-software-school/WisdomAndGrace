import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Login() {
    const { login } = useContext(UserProfileContext);

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    const loginClick = () => {
        login(email, password)
            .then(() => alert("logged in"));
    };

    return (
        <fieldset>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" type="text" 
                    onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" 
                    onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <button onClick={loginClick}>Login</button>
            </div>
        </fieldset>
    );
}