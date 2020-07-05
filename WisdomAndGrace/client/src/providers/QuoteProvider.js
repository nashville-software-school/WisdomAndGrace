import React, { useState, createContext } from "react";

export const QuoteContext = createContext();

export function QuoteProvider(props) {
  const apiUrl = "api/quote";
  const [quotes, setQuotes] = useState([]);

  const refreshQuotes = () => {
    const token = sessionStorage.getItem("token");
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json())
      .then(setQuotes);
  };

  const addQuote = (quote) => {
    const token = sessionStorage.getItem("token");
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    }).then(resp => resp.json());
  };

  return (
    <QuoteContext.Provider value={{ quotes, refreshQuotes, addQuote }}>
      {props.children}
    </QuoteContext.Provider>
  );
}