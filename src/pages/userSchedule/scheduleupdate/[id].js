import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

import React, { useState } from "react";
import Title from "@/components/Title";
import LayoutSecondary from "@/components/LayoutSecondary";
import { CssBaseline, Link as Muilink } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, TextField, Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Image from "next/image";
import withAuth from "@/hocs/withAuth";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ChargeInformation from "@/components/ChargeInformation";
import AddIcon from "@material-ui/icons/Add";
import { ScheduleUser } from "@/lib/scheduleuser";
import { useForm } from "react-hook-form";
import { Fade, Modal, Backdrop } from "@material-ui/core";
import Routes from "@/constants/routes";
import Divider from "@material-ui/core/Divider";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DeleteSchedule from "@/components/DeleteSchedule";

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

const index = ({ props }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [value, setValue] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = async (schedule) => {
    try {
      await ScheduleUser.update(`${id}`, {
        startTime: schedule.startTime,
        finishTime: schedule.finishTime,
      });
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
  const handleDelete = async () => {
    try {
      await ScheduleUser.deleteUser(`${id}`);
    } catch (error) {
      if (error.response) {
        alert(error.response.message);
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const { data, error } = useSWR(`/schedule_users/${id}`, fetcher);
  console.log("horarios por usuario", data);
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
    <LayoutSecondary>
      <CssBaseline />
      <Container maxWidth="lg" direction="row">
        <Title>Modificar horario</Title>
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
                <form
                  className={classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                    <Grid item md={4} sm={3} xs={12}>
                      <TextField
                        id="userDay"
                        name="userDay"
                        label="Día"
                        defaultValue={data.userDay}
                        className={classes.textField}
                        variant="outlined"
                        //{...register("ci")}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={4} sm={3} xs={12}>
                      <TextField
                        id="startTime"
                        name="startTime"
                        label="Hora inicio"
                        defaultValue={data.startTime}
                        className={classes.textField}
                        variant="outlined"
                        {...register("startTime")}
                      />
                    </Grid>
                    <Grid item md={4} sm={3} xs={12}>
                      <TextField
                        id="finishTime"
                        name="finishTime"
                        label="Hora final"
                        defaultValue={data.finishTime}
                        className={classes.textField}
                        variant="outlined"
                        {...register("finishTime")}
                      />
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      style={{
                        backgroundColor: "#FFFFFF",
                        paddingBottom: "10px",
                        paddingTop: "15px",
                        color: "#092435",
                      }}
                    >
                      <Grid
                        item
                        md={3}
                        xs={12}
                        style={{
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Link href={`${Routes.SCHEDULEUSER}/${data.user_id}`}>
                          <Button
                            style={{
                              backgroundColor: "#61908A",
                              color: "#092435",
                            }}
                            variant="contained"
                            fullWidth
                            onClick={handleDelete}
                          >
                            Eliminar
                          </Button>
                        </Link>
                      </Grid>
                      <Grid
                        item
                        md={3}
                        xs={12}
                        style={{
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Link href={`${Routes.SCHEDULEUSER}/${data.user_id}`}>
                          <Button
                            style={{
                              backgroundColor: "#003D59",
                              color: "#BBF0E8",
                            }}
                            variant="contained"
                            fullWidth
                          >
                            Cancelar
                          </Button>
                        </Link>
                      </Grid>
                      <Grid
                        item
                        md={3}
                        xs={12}
                        style={{
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
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
                          Actualizar
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

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
                          Datos actualizados con exito
                        </h2>
                        <Link href={`${Routes.SCHEDULEUSER}/${data.user_id}`}>
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
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default index;
