import React from "react";
import Title from "@/components/title";
import LayoutSecondary from "@/components/LayoutSecondary";
import Container from "@material-ui/core/Container";

export default function index() {
  return (
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title>Recetas del paciente</Title>
      </Container>
    </LayoutSecondary>
  );
}
