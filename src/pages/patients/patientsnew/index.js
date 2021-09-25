import AnnounTitle from "@/components/AnnounTitle";
import LayoutSecondary from "@/components/LayoutSecondary";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import { Patients } from "@/lib/patient";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, Fade, Paper } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SaveIcon from "@mui/icons-material/Save";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    //height: "auto",
    //padding: "15px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
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
const schema = yup.object().shape({
  ci: yup.number().required("Confirme su número de cédula"),
  name: yup.string().required("Ingrese su nombre"),
  lastName: yup.string().required("Ingrese su apellido"),
  civilStatus: yup.number().required("Defina el sexo"),
  birthay: yup.string().required("Ingrese su fecha de nacimiento"),
  employment: yup.string().required("Defina nombre del empleo"),
  email: yup.string().email("Ingrese un email").required("Confirme el email"),
  movil: yup.number().required("Confirme número telefonico"),
  landline: yup.number().required("Confirme número fijo"),
  address: yup.string().required("Defina nombre del empleo"),
  nationality: yup.string().required("Defina nombre del empleo"),
  city: yup.string().required("Defina nombre del empleo"),
  parish: yup.string().required("Defina nombre del empleo"),
});

const index = ({ props }) => {
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
      };
      const response = await Patients.create(userData);
      console.log("Nuevo paciente registrado", response);
      setResult("User properly register");
      reset();
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

  return (
    <CssBaseline>
      <LayoutSecondary>
        <Container maxWidth="lg">
          <Title>
            <AssignmentIndIcon
              style={{
                color: "#092435",
                fontSize: 35,
                position: "relative",
                top: "6px",
              }}
            />
            Registrar un nuevo paciente
          </Title>
          <Paper elevation={6} style={{ padding: "10px", margin: "20px" }}>
            <Container>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <AnnounTitle>
                  Ingresar los datos del paciente, para crear una nueva historia
                  médica.
                </AnnounTitle>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  style={{
                    backgroundColor: "#BBF0E8",
                    paddingBottom: "10px",
                    paddingTop: "15px",
                    color: "#092435",
                  }}
                >
                  {" "}
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="ci"
                      name="ci"
                      label="Cédula"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("ci")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      label="Nombre"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("name")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="lastName"
                      name="lastName"
                      label="Apellidos"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("lastName")}
                    />
                  </Grid>
                </Grid>{" "}
                <Divider
                  light
                  style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                />
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
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="sex"
                      name="sex"
                      label="Sexo"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("sex")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="civilStatus"
                      name="civilStatus"
                      label="Estado civil"
                      required
                      className={classes.textField}
                      defaultValue=""
                      variant="outlined"
                      {...register("civilStatus")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="birthay"
                      name="birthay"
                      label="Fecha nacimiento"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("birthay")}
                    />
                  </Grid>
                </Grid>
                <Divider
                  light
                  style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                />
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  style={{
                    backgroundColor: "#BBF0E8",
                    paddingBottom: "10px",
                    paddingTop: "15px",
                    color: "#092435",
                  }}
                >
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="employment"
                      name="employment"
                      label="Ocupación"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("employment")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="email"
                      name="email"
                      label="Correo electrónico"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="movil"
                      name="movil"
                      label="Celular"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("movil")}
                    />
                  </Grid>
                </Grid>
                <Divider
                  light
                  style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                />
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
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="landline"
                      name="landline"
                      label="Telf. Fijo"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("landline")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="address"
                      name="address"
                      label="Dirección"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("address")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="nationality"
                      name="nationality"
                      label="País/Origen"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("nationality")}
                    />
                  </Grid>
                </Grid>
                <Divider
                  light
                  style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                />
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  style={{
                    backgroundColor: "#BBF0E8",
                    paddingBottom: "20px",
                    paddingTop: "15px",
                    color: "#092435",
                  }}
                >
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="city"
                      name="city"
                      label="Ciudad"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("city")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="parish"
                      name="parish"
                      label="Provincia"
                      className={classes.textField}
                      defaultValue=""
                      required
                      variant="outlined"
                      {...register("parish")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="patient_id"
                      name="patient_id"
                      label="# Historia clínica"
                      disabled
                      className={classes.textField}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      //{...register("patient_id")}
                    />
                  </Grid>
                </Grid>
                <Divider
                  light
                  style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                />
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
                    <Link href={`${Routes.PATIENTS}`}>
                      <Button
                        style={{
                          backgroundColor: "#003D59",
                          color: "#BBF0E8",
                          width: "80vh",
                        }}
                        variant="contained"
                      >
                        Cancelar
                      </Button>
                    </Link>
                  </Grid>
                  {/* <Grid
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
                      style={{
                        backgroundColor: "#4A92A8",
                        color: "#092435",
                        width: "80vh",
                      }}
                      startIcon={<ScheduleIcon />}
                    >
                      Agendar
                    </Button>
                  </Grid> */}
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
                      style={{
                        backgroundColor: "#60CCD9",
                        color: "#092435",
                        width: "80vh",
                      }}
                      onClick={handleOpen}
                      startIcon={<SaveIcon />}
                    >
                      Crear historia
                    </Button>
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
                        Datos actualizados con éxito
                      </h2>
                      <Link href={`${Routes.PATIENTS}`}>
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
            </Container>
          </Paper>
        </Container>
      </LayoutSecondary>
    </CssBaseline>
  );
};
export default index;
