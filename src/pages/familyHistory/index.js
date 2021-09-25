import React from "react";
import Title from "@/components/Title";
import LayoutSecondary from "@/components/LayoutSecondary";
import Container from "@material-ui/core/Container";

export default function index() {
  return (
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title>Antecedente medicos de familiares - Vacio</Title>
      </Container>
    </LayoutSecondary>
  );
}
