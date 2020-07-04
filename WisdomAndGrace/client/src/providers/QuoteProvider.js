import React, { useState, createContext, useEffect } from "react";

export const QuoteContext = createContext();

export function QuoteProvider(props) {

    const [ quotes, setQuotes ] = useState([]);

    const refreshQuotes = () => {
        const token = sessionStorage.getItem("token");
        return fetch("api/quote", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(setQuotes);
    };

    useEffect(() => {
        refreshQuotes();
    }, []);

    return (
        <QuoteContext.Provider value={{ quotes, refreshQuotes }}>
            {props.children}
        </QuoteContext.Provider>
    );
}