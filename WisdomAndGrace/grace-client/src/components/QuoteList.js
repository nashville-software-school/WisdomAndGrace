import React, { useEffect, useState } from "react";
import Quote from "./Quote";
import { getAllQuotes } from "../modules/quoteManager";

export default function QuoteList() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getAllQuotes().then(setQuotes);
  }, []);

  return (
    <section>
      {quotes.map((q) => (
        <Quote key={q.id} quote={q} />
      ))}
    </section>
  );
}
