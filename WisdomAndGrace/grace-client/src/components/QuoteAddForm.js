import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addQuote } from "../modules/quoteManager";

export default function QuoteAddForm() {
  const navigate = useNavigate();
  const [quoteText, setQuoteText] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    addQuote({ text: quoteText })
      .then(() => navigate("/"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="quoteText">Quote</Label>
        <Input
          id="quoteText"
          type="textarea"
          onChange={(e) => setQuoteText(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}
