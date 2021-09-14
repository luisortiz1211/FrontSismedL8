import React from "react";
import Title from "@/components/Title";
import LayoutSecondary from "@/components/LayoutSecondary";
import Container from "@material-ui/core/Container";

export default function personalHistory() {
  return (
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title>Antecedentes del paciente</Title>
      </Container>
    </LayoutSecondary>
  );
}
