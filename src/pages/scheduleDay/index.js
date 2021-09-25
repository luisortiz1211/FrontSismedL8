import ChargeInformation from "@/components/ChargeInformation";
import Layout from "@/components/Layoutmain";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { fetcher } from "@/lib/utils";
import { CssBaseline, Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import ListAltIcon from "@mui/icons-material/ListAlt";
import React from "react";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  container: {
    minHeight: 440,
  },

  button: {
    fontSize: "10px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const index = () => {
  const classes = useStyles();

  const { data, error } = useSWR(`/users`, fetcher);
  console.log("listas de medicos", data);
  if (error)
    return (
      <div>
        <ChargeInformation />
      </div>
    );
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <Layout>
      <CssBaseline />
      <Container maxWidth="lg" direction="row">
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
          Horario de Citas
        </Title>

        <Paper
          className={classes.root}
          elevation={6}
          style={{ margin: "20px" }}
        >
          {" "}
          Parece que funciona
        </Paper>
      </Container>
    </Layout>
  );
};
export default index;
