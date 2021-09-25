import AnnounTitle from "@/components/AnnounTitle";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import { useAuth } from "@/lib/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import withAuth from "../hocs/withAuth";

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
      <Title>
        <AddReactionIcon
          style={{
            color: "#092435",
            fontSize: 35,
            position: "relative",
            top: "6px",
          }}
        />
        {"  "}
        Crear cuenta de usuario
      </Title>
      <Paper elevation={6} style={{ margin: "20px" }}>
        <Container>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ paddingBottom: "30px" }}
          >
            <AnnounTitle>
              Registrar los campos y crear un nuevo perfil de usuario
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
              <Grid item lg={3} sm={3} xs={12}>
                {" "}
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
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                <TextField
                  variant="outlined"
                  label="Apellidos"
                  style={{ textTransform: "upercase" }}
                  className={classes.textField}
                  {...register("lastName", {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z@.]+$/,
                      message: "No puede contener números",
                    },
                  })}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
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
                <TextField
                  //{...field}
                  variant="outlined"
                  label="Contraseña"
                  style={{ textTransform: "upercase" }}
                  className={classes.textField}
                  {...register("password", { required: true })}
                  type="password"
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
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
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                <TextField
                  //{...field}
                  variant="outlined"
                  label="Cédula"
                  className={classes.textField}
                  {...register("ci", { required: true, minLength: 10 })}
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
              <AnnounTitle>Seleccionar tipo y estado de la cuenta</AnnounTitle>
              <Grid item lg={3} sm={3} xs={12}>
                <FormControl
                  variant="outlined"
                  label="Estado"
                  className={classes.textField}
                  //style={{ minWidth: "auto" }}
                >
                  <Select
                    id="availableStatus"
                    {...register("availableStatus", { required: true })}
                    defaultValue="Activo"
                  >
                    <MenuItem value={`1`}>Activo</MenuItem>
                    <MenuItem value={`0`}>Desactivado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                <FormControl
                  variant="outlined"
                  label="Tipo"
                  className={classes.textField}
                >
                  <Select
                    id="roleUser"
                    {...register("roleUser", { required: true })}
                    defaultValue="Médico"
                  >
                    <MenuItem value={`ROLE_ADMIN`}>Administrador</MenuItem>
                    <MenuItem value={`ROLE_MEDIC`}>Médico</MenuItem>
                    <MenuItem value={`ROLE_ASSISTENT`}>Asistente</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={3} sm={3} xs={12}>
                <FormControl
                  variant="outlined"
                  label="ESpecialidad"
                  className={classes.textField}
                  //style={{ minWidth: "150px" }}
                >
                  <Select
                    id="employment"
                    {...register("employment", { required: true })}
                    defaultValue=""
                  >
                    <MenuItem value={"MEDICINA GENERAL"}>
                      Medicina General
                    </MenuItem>
                    <MenuItem value={"ASISTENTE MÉDICO"}>
                      Asistente Médico
                    </MenuItem>
                    <MenuItem value={"ENFERMERIA"}>Enfermeria</MenuItem>
                  </Select>
                </FormControl>
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
                <Link href={`${Routes.HOME}`}>
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
