import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Quote({ quote }) {
  return (
    <Card className="m-4">
      <CardBody>
        <strong>{quote.text}</strong>
      </CardBody>
    </Card>
  );
}
