import { Grid } from "@material-ui/core";
import React from "react";
import ButtonBack from "./ButtonBack";

export default function Title({ children }) {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={1}
        style={{ paddingTop: "10px" }}
      >
        <Grid item md={6}>
          <h1>
            {"  "}
            {children}
          </h1>
        </Grid>

        <Grid item>
          <ButtonBack />
        </Grid>
      </Grid>
      <style jsx>
        {`
          h1 {
            margin: 0;
            font-size: 2rem;
            text-align: left;
            color: #092435;
          }
        `}
      </style>
    </>
  );
}
