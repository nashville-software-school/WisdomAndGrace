import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const QuoteContext = createContext();

export function QuoteProvider(props) {
  const apiUrl = "/api/quote";
  const { getToken } = useContext(UserProfileContext);

  const [quotes, setQuotes] = useState([]);

  const refreshQuotes = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setQuotes));

  const addQuote = (quote) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(quote)
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      }));

  return (
    <QuoteContext.Provider value={{ quotes, refreshQuotes, addQuote }}>
      {props.children}
    </QuoteContext.Provider>
  );
}