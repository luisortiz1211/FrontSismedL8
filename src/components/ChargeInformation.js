import Routes from "@/constants/routes";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxHeight: "100vh",
  },
  image: {
    backgroundImage: `url(${"/portada.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "80vh",
  },
}));
export default function ChargeInformation() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root} elevation={3}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          className={classes.image}
        >
          {" "}
          <Grid
            item
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <h1>Page Not Found</h1>
            <h1>
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again, or take a look at our
            </h1>
          </Grid>
          <Grid item>
            {" "}
            <Link href={Routes.LOGIN}>
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
      </Paper>
    </>
  );
}
