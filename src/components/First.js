import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BallotIcon from "@material-ui/icons/Ballot";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SearchIcon from "@material-ui/icons/Search";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Routes from "../constants/routes";
import withAuth from "./../hocs/withAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${"/portada.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "right",
    height: "auto",
  },
  paper: {
    margin: theme.spacing(8, 4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root2: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },

  logo: {
    alignItems: "center",
    backgroundPosition: "center",
    justifyContent: "center",
  },
}));

const First = () => {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <Paper elevation={6} style={{ margin: "20px" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          component="main"
          className={(classes.root, classes.image)}
        >
          <Grid item xs={12} md={4} component="main">
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                {" "}
                <Box
                  display={{ xs: "none", sm: "block" }}
                  style={{ padding: "10px" }}
                >
                  <Image src="/logosismed2.png" width={150} height={150} />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Grid container justifyContent="space-around">
                <Grid item md={2} xs={6}>
                  {" "}
                  <Link href={Routes.USERS}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      style={{
                        color: "#60CCD9",
                      }}
                      color="primary"
                    >
                      <Grid
                        container
                        style={{ textAlign: "center" }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <AssignmentIcon style={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item>Usuario SISMED</Grid>
                      </Grid>
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={2} xs={6}>
                  <Link href={Routes.MEDICALHISTORY}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      style={{
                        color: "#60CCD9",
                      }}
                      color="primary"
                    >
                      <Grid
                        container
                        style={{ textAlign: "center" }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item md={12}>
                          <BallotIcon style={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item md={12}>
                          Historia clínica
                        </Grid>
                      </Grid>
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={2} xs={6}>
                  <Link href={Routes.PATIENTS}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      style={{
                        color: "#60CCD9",
                      }}
                      color="primary"
                    >
                      <Grid
                        container
                        style={{ textAlign: "center" }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item md={12}>
                          <SearchIcon style={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item md={12}>
                          Buscar paciente
                        </Grid>
                      </Grid>
                    </Button>
                  </Link>
                </Grid>
              </Grid>

              <Grid container justifyContent="space-around">
                <Grid item md={2} xs={6}>
                  {" "}
                  <Link href={Routes.SCHEDULEUSER}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      style={{
                        color: "#60CCD9",
                      }}
                      color="primary"
                    >
                      <Grid
                        container
                        style={{ textAlign: "center" }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item md={12}>
                          <LibraryBooksIcon style={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item md={12}>
                          Agenda Medico
                        </Grid>
                      </Grid>
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={2} xs={6}>
                  <Link href={Routes.SCHEDULEDAY}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      style={{
                        color: "#60CCD9",
                      }}
                      color="primary"
                    >
                      <Grid
                        container
                        style={{ textAlign: "center" }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item md={12}>
                          <DateRangeIcon style={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item md={12}>
                          Agenda Pacientes
                        </Grid>
                      </Grid>
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={2} xs={6}>
                  <Link href={Routes.REGISTER}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      style={{
                        color: "#60CCD9",
                      }}
                      color="primary"
                    >
                      <Grid
                        container
                        style={{ textAlign: "center" }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item md={12}>
                          <SupervisorAccountIcon style={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item md={12}>
                          Crear cuenta
                        </Grid>
                      </Grid>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default withAuth(First);
