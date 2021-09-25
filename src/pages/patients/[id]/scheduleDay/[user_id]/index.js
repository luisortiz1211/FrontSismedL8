import ChargeInformation from "@/components/ChargeInformation";
import Layout from "@/components/Layoutmain";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import { Scheduledays } from "@/lib/scheduleday";
import { fetcher } from "@/lib/utils";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CheckIcon from "@mui/icons-material/Check";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import * as yup from "yup";

const schema = yup.object().shape({
  /* ci: yup.number().required("Confirme su número de cédula"),
    name: yup.string().required("Ingrese su nombre"),
    lastName: yup.string().required("Ingrese su apellido"),
   */
});
const columns = [
  {
    id: "id",
    label: "N°",
    minWidth: 30,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
  {
    id: "userDay",
    label: "Día",
    minWidth: 130,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
  {
    id: "startTime",
    label: "Hora inicio",
    minWidth: 130,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
  {
    id: "finishTime",
    label: "Hora fin",
    minWidth: 130,
    backgroundColor: "#BBF0E8",
    align: "left",
  },

  {
    id: "botonSelect",
    label: "",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
];

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
  },
  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },

  formControl: {
    minWidth: 300,
    paddingBottom: "15px",
    color: "#414A4F",
    paddingRight: "10px",
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
  button: {
    margin: theme.spacing(3),
  },
  rightIcon: {
    marginLeft: theme.spacing(2),
  },
}));

const index = () => {
  const classes = useStyles();
  const { register, control, handleSubmit } = useForm();
  const router = useRouter();
  const { id, user_id } = router.query;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
        availableStatus: 1,
        scheduleDayState: "pendiente",
        patient_id: id,
        userAssigned: user_id,
      };
      const response = await Scheduledays.create(userData);
      console.log("Nueva cita registrada", response);
      setResult("Date properly register");
      //alert("Cita asignada ");
    } catch (error) {
      if (error.response) {
        console.error(error.response);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/users/${user_id}}/schedule_users`, fetcher);
  console.log("Horarios médico", data);
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
          <List component="div" disablePadding>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              {data.data.map((schedule) => {
                return (
                  <ListItem className={classes.nested}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      style={{
                        paddingBottom: "15px",
                        paddingTop: "20px",
                        color: "#092435",
                      }}
                    >
                      <ListItemIcon>
                        <ArrowDropDownCircleIcon
                          style={{
                            color: "#092435",
                            fontSize: 35,
                            position: "relative",
                            //top: "6px",
                          }}
                        />
                      </ListItemIcon>

                      <Grid item md={2} sm={3} xs={12}>
                        <Controller
                          name="scheduleDay"
                          control={control}
                          defaultValue={schedule.userDay}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Día"
                              className={classes.textField}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={2} sm={3} xs={12}>
                        <Controller
                          name="scheduleTime"
                          control={control}
                          defaultValue={schedule.startTime}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Hora inicio"
                              className={classes.textField}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={2} sm={3} xs={12}>
                        <Controller
                          name="scheduleTime"
                          control={control}
                          defaultValue={schedule.finishTime}
                          render={({ field }) => (
                            <TextField
                              //{...field}
                              label="Hora fin"
                              className={classes.textField}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={2} sm={5} xs={12}>
                        <ListItemIcon>
                          <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            style={{
                              backgroundColor: "#60CCD9",
                              color: "#092435",
                            }}
                            onClick={handleOpen}
                          >
                            <Grid>
                              <CheckIcon
                                style={{
                                  color: "#092435",
                                  position: "relative",
                                  top: "7px",
                                  alignItems: "center",
                                }}
                              />
                              Asignar cita
                            </Grid>
                          </Button>
                        </ListItemIcon>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.mpaper}>
                    <h2 id="transition-modal-title">
                      Cita seleccionada con éxito
                    </h2>
                    <Link href={`${Routes.SCHEDULEDAY}`}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="small"
                        style={{
                          backgroundColor: "#60CCD9",
                          color: "#092435",
                        }}
                        className={classes.upgrade}
                      >
                        Aceptar
                      </Button>
                    </Link>
                  </div>
                </Fade>
              </Modal>
            </form>
          </List>
        </Paper>
      </Container>
    </Layout>
  );
};
export default index;
