import React from "react";
import Title from "@/components/Title";
import Layout from "@/components/Layoutmain";
import Container from "@material-ui/core/Container";

export default function index() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Title>Horario de Citas</Title>
      </Container>
    </Layout>
  );
}
