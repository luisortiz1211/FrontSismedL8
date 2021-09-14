import React from "react";
import { useAuth } from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link as MuiLink } from "@material-ui/core";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Image from "next/image";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  grow: {
    flexGrow: 1,
    backgroundColor: theme.palette.tertiary.main,
  },
  image: {
    backgroundImage: `url(${"/portada.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
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
  },
  appBar: {
    position: "relative",
  },
  logo: {
    alignItems: "center",
    backgroundPosition: "center",
    justifyContent: "center",
  },
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Ingrese su email."),
  password: yup.string().required("Ingrese su clave"),
});

const Login = () => {
  const { login } = useAuth();
  const classes = useStyles();
  const { control, handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const userData = await login(data);
      console.log("userActive", userData);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
          <Grid
            item
            xs={12}
            md={6}

            component="main"
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {" "}
              <Grid item>
                {" "}
                <Box
                  md={4}
                  display={{ xs: "none", sm: "block" }}
                  style={{ padding: "10px" }}
                >
                  <Image src="/logosismed2.png" width={150} height={150} />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}></Avatar>
              <Typography component="h1" variant="h5">
                Inicio de sesión
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                style={{ paddingBottom: "30px" }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Correo electrónico"
                      variant="outlined"
                      className={classes.textField}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="email"
                    />
                  )}
                  rules={{
                    required: "Correo requerido",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "You must provide a valid email address!",
                    },
                  }}
                />

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Contraseña"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="password"
                    />
                  )}
                  rules={{
                    required: "Password required",
                    minLength: {
                      value: 6,
                      message: "Tu contraseña debe tener minimo 6 caracteres",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Ingresar
                </Button>
                <Grid container>
                  <Grid item style={{ color: "#414A4F" }}>
                    <Link href="#" passHref>
                      <MuiLink>Olvido su contraseña?</MuiLink></Link>
                  </Grid>
                </Grid>
              </form>

              {/*//////////*/}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default withoutAuth(Login);
