import AnnounTitle from "@/components/AnnounTitle";
import Routes from "@/constants/routes";
import { Drugallergies } from "@/lib/drugallergies";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, Fade } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@mui/icons-material/Save";
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
  drugName: yup.string().required("Ingrese el medicamento"),
  drugSymptom: yup.string().required("Ingrese los sintomas"),
  drugRemark: yup.string().required("Ingrese algun comentario"),
});

export default function DrugAllergieNew({ props }) {
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
      const response = await Drugallergies.create(userData);
      console.log("Nuevo alergia registrada", response);
      setResult("Allergie properly register");
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
          <AnnounTitle>Registrar alergias del paciente</AnnounTitle>
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
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="id"
                name="id"
                label="# Historia Clínica"
                className={classes.textField}
                defaultValue={id}
                //required
                disabled
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                {...register("patient_id")}
              />
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="drugName"
                name="drugName"
                label="Medicamento"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("drugName")}
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
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="drugSymptom"
                name="drugSymptom"
                label="Sintomas"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("drugSymptom")}
              />
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="drugRemark"
                name="drugRemark"
                label="Observación"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("drugRemark")}
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
            {/*          <Grid
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
                Añadir alergia
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
                <Link href={`${Routes.MEDICALHISTORY}`}>
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
