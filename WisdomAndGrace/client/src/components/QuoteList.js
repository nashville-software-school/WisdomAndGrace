import React, { useContext } from "react";
import { QuoteContext } from "../providers/QuoteProvider";

export default function QuoteList() {
    const { quotes } = useContext(QuoteContext);

    return (
        <section>
            {quotes.map(q => 
                <div>{q.text}</div>
            )}
        </section>
    );
}