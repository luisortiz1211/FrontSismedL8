import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import { Scheduleusers } from "@/lib/scheduleuser";
import { fetcher } from "@/lib/utils";
import {
  Backdrop,
  Box,
  Button,
  CssBaseline,
  Fade,
  Grid,
  Modal,
  TextField,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

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
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = async (schedule) => {
    try {
      await Scheduleusers.create(`${id}`, {
        user_id: id,
        //userDay: schedule.userDay,
        //startTime: schedule.startTime,
        //finishTime: schedule.finishTime,
        availableStatus: 1,
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

  const { data, error } = useSWR(`/users/${id}/schedule_users/`, fetcher);
  console.log("Nuevo horario", data);
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
    <>
      <LayoutSecondary>
        <CssBaseline />
        <Container maxWidth="lg" direction="row">
          <Title>
            <CreditScoreIcon
              style={{
                color: "#092435",
                fontSize: 35,
                position: "relative",
                top: "6px",
              }}
            />
            Nuevo horario
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
                  <AnnounTitle>Agregue el día y la hora de turno</AnnounTitle>

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
                          {...register("userDay")}
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
                          md={5}
                          xs={12}
                          style={{
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Link href={`${Routes.SCHEDULEUSER}/${id}`}>
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
                          md={5}
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
                            Guardar cambios
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider
                      light
                      style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                    />
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
                            Se añadio un nuevo horario con éxito
                          </h2>
                          <Link href={`${Routes.SCHEDULEUSER}/${id}`}>
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
    </>
  );
};
export default index;
