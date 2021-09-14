import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import withAuth from "../hocs/withAuth";
import LayoutSecondary from "@/components/LayoutSecondary";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box } from "@material-ui/core";

import { Paper, Container, InputLabel, MenuItem } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Title from "@/components/Title";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    //height: "auto",
    padding: "15px",
  },
  grow: {
    flexGrow: 1,
    backgroundColor: theme.palette.tertiary.main,
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "auto",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.tertiary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.tertiary.main,
  },
  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },
  appBar: {
    position: "relative",
  },
  formControl: {
    // minWidth: "50vh",
    // paddingBottom: "15px",
    color: "#414A4F",
    //paddingRight: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const schema = yup.object().shape({
  name: yup.string().required("Ingrese su nombre"),
  lastName: yup.string().required("Ingrese su apellido"),
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Ingrese su email."),
  password: yup.string().required("Ingrese su contraseña"),
  password_confirmation: yup.string().required("Confirme su contraseña"),
  ci: yup.number().required("Confirme su número de cédula"),
  //availableStatus: yup.boolean().required("Confirme el estado"),
  roleUser: yup.string().required("Confirme el rol de usuario"),
  employment: yup.string().required("Confirme la especialidad"),
});

const Register = () => {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { register: doregister } = useAuth();

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
      };
      const response = await doregister(userData);
      console.log("Nuevo usuario registrado", response);
      setResult("User properly register");
      reset();
    } catch (error) {
      if (response) {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    }
  };

  return (
    <div>
      <Container maxWidth="lg"></Container>
      <Title>Crear cuenta de usuario</Title>
      <Paper elevation={6} style={{ margin: "20px" }}>
        <Container>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ paddingBottom: "30px" }}
          >
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
              <Grid item lg={3} sm={3} xs={12}>
                {" "}
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      label="Nombres"
                      style={{ textTransform: "upercase" }}
                      className={classes.textField}
                      {...register("name", {
                        required: true,
                        pattern: {
                          value: /^[A-Za-z@.]+$/,
                          message: "No puede contener números",
                        },
                      })}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      //  {...field}
                      variant="outlined"
                      label="Apellidos"
                      style={{ textTransform: "upercase" }}
                      className={classes.textField}
                      // helperText={errors.name?.message}
                      {...register("lastName", {
                        required: true,
                        pattern: {
                          value: /^[A-Za-z@.]+$/,
                          message: "No puede contener números",
                        },
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      //{...field}
                      variant="outlined"
                      label="Correo electrónico"
                      style={{ textTransform: "upercase" }}
                      className={classes.textField}
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email no valido",
                        },
                      })}
                    />
                  )}
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
              <Grid item lg={3} sm={3} xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      //{...field}
                      variant="outlined"
                      label="Contraseña"
                      style={{ textTransform: "upercase" }}
                      className={classes.textField}
                      {...register("password", { required: true })}
                      type="password"
                    />
                  )}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                {" "}
                {/*<TextField
                  variant="outlined"
                  label="Confirmación de contraseña"
                  className={classes.textField}
                  {...register("password_confirmation", { required: true })}
                  type="password"
                  //helperText={!!errors.name && "Campo requerido"}
                  helperText={errors.password_confirmation?.message}
               />*/}
                <Controller
                  name="password_comfirmation"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      //{...field}
                      variant="outlined"
                      label="Confirmar contraseña"
                      style={{ textTransform: "upercase" }}
                      className={classes.textField}
                      {...register("password_confirmation", {
                        required: true,
                      })}
                      type="password"
                    />
                  )}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                {" "}
                {/*<TextField
                  variant="outlined"
                  label="Cédula"
                  className={classes.textField}
                  {...register("ci", { required: true, minLength: 10 })}
                  //helperText={!!errors.name && "Campo requerido"}
                  helperText={errors.ci?.message}
                />*/}
                <Controller
                  name="ci"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      //{...field}
                      variant="outlined"
                      label="Cédula"
                      className={classes.textField}
                      {...register("ci", { required: true, minLength: 10 })}
                    />
                  )}
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
              <Grid item lg={3} sm={3} xs={12}>
                <Controller
                  name="availableStatus"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      label="Estado"
                      className={classes.textField}
                      //style={{ minWidth: "auto" }}
                    >
                      <Select
                        labelId="availableStatus"
                        id="availableStatus"
                        {...register("availableStatus", { required: true })}
                        defaultValue="1"
                      >
                        <MenuItem value={`1`}>ACTIVO</MenuItem>
                        <MenuItem value={`0`}>DESACTIVADO</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                <Controller
                  name="roleUser"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      label="Tipo de usuario"
                      className={classes.textField}
                      //style={{ minWidth: "auto" }}
                    >
                      <Select
                        labelId="roleUser"
                        id="roleUser"
                        //label="Tipo de usuario"
                        {...register("roleUser", { required: true })}
                        defaultValue="ROLE_ASSISTENT"
                      >
                        <MenuItem value={`ROLE_ADMIN`}>ADMINISTRADOR</MenuItem>
                        <MenuItem value={`ROLE_MEDIC`}>MEDICO</MenuItem>
                        <MenuItem value={`ROLE_ASSISTENT`}>ASISTENTE</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                <Controller
                  name="employment"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      className={classes.textField}
                      // style={{ minWidth: "auto" }}
                    >
                      <Select
                        //{...field}

                        id="employment"
                        label="Especialidad"
                        {...register("employment", { required: true })}
                        defaultValue="ASISTENTE MÉDICO"
                      >
                        <MenuItem value="MEDICINA GENERAL">
                          MEDICINA GENERAL
                        </MenuItem>
                        <MenuItem value="ASISTENTE MÉDICO">
                          ASISTENTE MEDICO
                        </MenuItem>
                        <MenuItem value="ENFERMERIA">ENFERMERIA</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <Divider
              light
              style={{ backgroundColor: "#60CCD9", color: "#092435" }}
            />{" "}
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
                {" "}
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
                {" "}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  //style={{ color: "#092435" }}
                  className={classes.submit}
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
            <Divider
              light
              style={{ backgroundColor: "#60CCD9", color: "#092435" }}
            />{" "}
          </form>
        </Container>
      </Paper>
    </div>
  );
};

export default withAuth(Register);
