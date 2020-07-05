import React, { useContext, useEffect } from "react";
import { QuoteContext } from "../providers/QuoteProvider";

export default function QuoteList() {
  const { quotes, refreshQuotes } = useContext(QuoteContext);

  useEffect(() => {
    refreshQuotes();
  }, []);

  return (
    <section>
      {quotes.map(q =>
        <div key={q.id}>{q.text}</div>
      )}
    </section>
  );
}