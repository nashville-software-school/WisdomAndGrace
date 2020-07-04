import React, { useContext } from "react";
import { QuoteContext } from "../providers/QuoteProvider";

export default function QuoteList() {
    const { quotes } = useContext(QuoteContext);

    return (
        <section>
            {quotes.map(q => 
                <div key={q.id}>{q.text}</div>
            )}
        </section>
    );
}