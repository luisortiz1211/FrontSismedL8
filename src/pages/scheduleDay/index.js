import Layout from "@/components/Layoutmain";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  Link,
  Paper,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Image from "next/image";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
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
  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  mpaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const index = () => {
  const classes = useStyles();

  return (
    <Layout>
      <CssBaseline />
      <Container maxWidth="lg" direction="row" h>
        <Title>
          {" "}
          <ListAltIcon
            style={{
              color: "#092435",
              fontSize: 40,
              position: "relative",
              top: "7px",
            }}
          />{" "}
          Atención de pacientes
        </Title>
        <Paper
          className={classes.root}
          elevation={6}
          style={{ margin: "20px" }}
        >
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
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  style={{
                    paddingBottom: "15px",
                    paddingTop: "20px",
                    color: "#092435",
                  }}
                >
                  <Grid
                    item
                    md={5}
                    xs={12}
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid container justifyContent="center">
                      <Grid item md={6} sm={3} xs={3}>
                        {" "}
                        <Link href={`/scheduleDay/schedule`}>
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
                              <Grid item>Agenda pacientes</Grid>
                            </Grid>
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={5}
                    xs={12}
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid container justifyContent="center">
                      <Grid item md={6} sm={3} xs={3}>
                        {" "}
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
                              <LocalHospitalIcon style={{ fontSize: 80 }} />
                            </Grid>
                            <Grid item>Atención pacientes</Grid>
                          </Grid>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};
export default index;
