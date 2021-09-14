import React from "react";
import { useRouter } from "next/router";
import { Button, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import Routes from "../constants/routes";

export default function ButtonBack() {
  const router = useRouter();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        {" "}
        <Button
          variant="contained"
          type="button"
          size="small"
          style={{ backgroundColor: "#BBF0E8", color: "#4A92A8" }}
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
          Volver Pagina
        </Button>
      </Grid>
      <Grid item>
        <Link href={Routes.HOME}>
          <Button
            variant="contained"
            type="button"
            size="small"
            style={{
              backgroundColor: "#092435",
              color: "#4A92A8",
              margin: "5px",
            }}
          >
            {" "}
            Ir al inicio
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
