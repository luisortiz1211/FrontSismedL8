import React from "react";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { Grid, ListItemAvatar } from "@material-ui/core";
import ButtonBack from "./ButtonBack";

export default function Title({ children }) {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        style={{ paddingTop: "10px" }}
      >
        <Grid item md={6}>
          <Grid
            container
            direction="row"
            //justifyContent="space-around"
            alignItems="center"
          >
            <h1>
              {"  "}
              {children}
            </h1>
          </Grid>
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
