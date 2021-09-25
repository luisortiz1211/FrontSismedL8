import AnnounTitle from "@/components/AnnounTitle";
import Routes from "@/constants/routes";
import { Emergencycontacts } from "@/lib/emergencycontact";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, Fade } from "@material-ui/core";
import {
  Backdrop,
  Button,
  Container,
  Divider,
  Grid,
  Modal,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
  nameContact: yup.string().required("Ingrese el nombre de contacto"),
  movil: yup.number().required("Confirme número celular"),
  landline: yup.number().required("Confirme número telefonico"),
  relationShip: yup.string().required("Defina el parentesco"),
  bloodType: yup.string().required("Ingrese el tipo de sangre"),
});

export default function EmergencyContactNew({ props }) {
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
      const contactData = {
        ...formData,
      };
      const response = await Emergencycontacts.create(contactData);
      console.log("Nuevo contacto registrado", response);
      setResult("Contact properly added");
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
      <Container>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AnnounTitle>Agregar nuevo contacto para emergencia.</AnnounTitle>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            style={{
              backgroundColor: "#BBF0E8",
              paddingBottom: "10px",
              paddingTop: "15px",
              color: "#092435",
            }}
          >
            {" "}
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="id"
                name="id"
                label="# Historia clínica"
                className={classes.textField}
                defaultValue={id}
                variant="outlined"
                disabled
                InputProps={{
                  readOnly: true,
                }}
                {...register("patient_id")}
              />
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="nameContact"
                name="nameContact"
                label="Nombre del familiar"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("nameContact")}
              />
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
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
            spacing={2}
            style={{
              backgroundColor: "#FFFFFF",
              paddingBottom: "10px",
              paddingTop: "15px",
              color: "#092435",
            }}
          >
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="landline"
                name="landline"
                label="Telf. Fijo"
                required
                className={classes.textField}
                defaultValue=""
                variant="outlined"
                {...register("landline")}
              />
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="relationShip"
                name="relationShip"
                label="Parentesco"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("relationShip")}
              />
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="bloodType"
                name="bloodType"
                label="Tipo de sangre"
                required
                className={classes.textField}
                defaultValue=""
                variant="outlined"
                {...register("bloodType")}
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
              <Link href={`${Routes.MEDICALHISTORY}`}>
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
            {/*  <Grid
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
                Añadir contacto
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
                <Link href={`${Routes.MEDICALHISTORY}${id}`}>
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
    </CssBaseline>
  );
}
