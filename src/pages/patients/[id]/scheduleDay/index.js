import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import Layout from "@/components/Layoutmain";
import Loading from "@/components/Loading";
import ScheduleDayUser from "@/components/ScheduleDayUser";
import Title from "@/components/Title";
import { fetcher } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import * as yup from "yup";

const schema = yup.object().shape({
  /* ci: yup.number().required("Confirme su número de cédula"),
  name: yup.string().required("Ingrese su nombre"),
  lastName: yup.string().required("Ingrese su apellido"),
 */
});
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

const index = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

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
          Agendamiento
        </Title>
        <Paper
          className={classes.root}
          elevation={6}
          style={{ margin: "20px" }}
        >
          <AnnounTitle>
            Seleccione el médico, comprobar los horarios disponibles
          </AnnounTitle>

          <ScheduleDayUser />
        </Paper>
      </Container>
    </Layout>
  );
};
export default index;
