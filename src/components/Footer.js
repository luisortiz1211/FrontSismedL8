import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Box } from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import { Link as MuiLink } from "@material-ui/core";

function Copyright() {
  const classes = useStyles();
  return (
    <div
      style={{ backgroundColor: "#60CCD9", padding: "8px", color: "#092435" }}
    >
      <Typography variant="body2" align="center">
        {"Copyright © "}
        {" SISTEMA MEDICO "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}
function Copyright1() {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: "#092435", padding: "5px" ,color:"#60CCD9" }}>
      <Typography variant="body2" align="center">
        {"Desarrollador  por LO "}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    padding: "30px",
    backgroundColor: "#092435",
  },
  footer1: {
    backgroundColor: "#60CCD9",
  },
}));
const StickyFooter=()=> {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <footer className={classes.footer}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{
            backgroundColor: "#092435",
            padding: "5px",
            color: "#BBF0E8",
          }}
        >
          <Grid item xs={2} md={1}>
            <Box className={classes.logo}>
              <Image
                src="/logosismed1.png"
                alt="Sismed"
                width={100}
                height={50}
                color="#fff"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle1"
              align="center"
            >
              Atención de Lunes a Viernes de 9:00 a 17:00
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle1"
              align="center"
            >
              Av. Amazonas y Tomas de Berlanga
            </Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle1"
              align="center"
              component="p"
            >
              0999905876 {"/"} 026988569
            </Typography>
          </Grid>
        </Grid>
      </footer>
      <Copyright />
      <Copyright1 />
    </>
  );
}
export default StickyFooter;