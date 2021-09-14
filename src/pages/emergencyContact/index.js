import React from "react";
import Title from "@/components/Title";
import LayoutSecondary from "@/components/LayoutSecondary";
import Container from "@material-ui/core/Container";

export default function index() {
  return (
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title>Contactos de emergencia</Title>
      </Container>
    </LayoutSecondary>
  );
}
