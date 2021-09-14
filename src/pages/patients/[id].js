import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Title from "@/components/Title";
import LayoutSecondary from "@/components/LayoutSecondary";
import Container from "@material-ui/core/Container";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import { Patients } from "@/lib/patient";

import DrugAllergies from "@/components/DrugAllergies";
import DrugsRecipies from "@/components/DrugsRecipies";
import EmergencyContacts from "@/components/EmergencyContacts";
import ExplorationPatients from "@/components/ExplorationPatients";
import FamilyHistories from "@/components/FamilyHistories";
import ImageRecipies from "@/components/ImageRecipies";
import PersonalHistories from "@/components/PersonalHistories";
import PhysicalExams from "@/components/PhysicalExams";
import { useForm } from "react-hook-form";
//import { TextField } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
//import { Button } from "@material-ui/core";
import Link from "next/link";
import { Link as Muilink } from "@material-ui/core/Link";
import Routes from "@/constants/routes";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Fade, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    //height: "auto",
    padding: "15px",
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
}));

const patientDetails = (prop) => {
  const classes = useStyles();

  const router = useRouter();
  const { id } = router.query;

  const { register, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (patient) => {
    try {
      await Patients.update(`${id}`, {
        ci: patient.ci,
        name: patient.name,
        lastName: patient.lastName,
        sex: patient.sex,
        civilStatus: patient.civilStatus,
        birthay: patient.birthay,
        employment: patient.employment,
        email: patient.email,
        movil: patient.movil,
        landline: patient.landline,
        address: patient.address,
        nationality: patient.nationality,
        city: patient.city,
        parish: patient.parish,
      });
    } catch (error) {
      if (error.response) {
        console.error(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      console.error(error.config);
    }
  };
  const { data, error } = useSWR(`/patients/${id}`, fetcher);
  console.log("patientDetails", data);

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
      <Container maxWidth="lg">
        <Title>Datos clinicos del paciente</Title>
        <Paper elevation={6} style={{ padding: "10px", margin: "20px" }}>
          <Container>
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
                    defaultValue={data.ci}
                    className={classes.root}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    //{...register("ci")}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    label="Nombre"
                    defaultValue={data.name}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("name", {
                    //  required: true,
                    //  pattern: {
                    //    value: /^[A-Za-z@.]+$/,
                    //    message: "No puede contener números",
                    //  },
                    //})}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Apellidos"
                    defaultValue={data.lastName}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("lastName", {
                    //  required: true,
                    //  pattern: {
                    //    value: /^[A-Za-z@.]+$/,
                    //    message: "No puede contener números",
                    //  },
                    //})}
                    inputRef={register}
                  />
                </Grid>
              </Grid>{" "}
              <Divider light style={{ backgroundColor: "#414A4F" }} />
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
                    defaultValue={data.sex}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("sex")}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="civilStatus"
                    name="civilStatus"
                    label="Estado civil"
                    defaultValue={data.civilStatus}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("civilStatus")}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="birthay"
                    name="birthay"
                    label="Fecha nacimiento"
                    defaultValue={data.birthay}
                    required
                    className={classes.root}
                    variant="outlined"
                    // {...register("birthay")}
                    inputRef={register}
                  />
                </Grid>
              </Grid>
              <Divider light style={{ backgroundColor: "#414A4F" }} />
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
                    defaultValue={data.employment}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("employment", {
                    //  required: true,
                    //  pattern: {
                    //    value: /^[A-Za-z@.]+$/,
                    //    message: "No puede contener números",
                    //  },
                    //})}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Correo electrónico"
                    defaultValue={data.email}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("email")}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="movil"
                    name="movil"
                    label="Celular"
                    defaultValue={data.movil}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("movil")}

                    inputRef={register}
                  />
                </Grid>
              </Grid>
              <Divider light style={{ backgroundColor: "#414A4F" }} />
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
                    defaultValue={data.landline}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("landline")}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="address"
                    name="address"
                    label="Dirección"
                    defaultValue={data.address}
                    required
                    className={classes.root}
                    variant="outlined"
                    // {...register("address")}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="nationality"
                    name="nationality"
                    label="Nacionalidad"
                    defaultValue={data.nationality}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("nalionality", {
                    //  required: true,
                    //  pattern: {
                    //    value: /^[A-Za-z@.]+$/,
                    //    message: "No puede contener números",
                    //  },
                    //})}
                    inputRef={register}
                  />
                </Grid>
              </Grid>
              <Divider light style={{ backgroundColor: "#414A4F" }} />
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
                    id="city"
                    name="city"
                    label="Ciudad"
                    defaultValue={data.city}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("city", {
                    //  required: true,
                    //  pattern: {
                    //    value: /^[A-Za-z@.]+$/,
                    //    message: "No puede contener números",
                    //  },
                    //})}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="parish"
                    name="parish"
                    label="Provincia"
                    defaultValue={data.parish}
                    required
                    className={classes.root}
                    variant="outlined"
                    //{...register("parish", {
                    //  required: true,
                    //  pattern: {
                    //    value: /^[A-Za-z@.]+$/,
                    //    message: "No puede contener números",
                    //  },
                    //})}
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="patient_id"
                    name="patient_id"
                    label="# Historia clinica"
                    defaultValue={data.patient_id}
                    className={classes.root}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    //{...register("patient_id")}
                    inputRef={register}
                  />
                </Grid>
              </Grid>
              <Divider light style={{ backgroundColor: "#414A4F" }} />
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
                spacing={3}
              >
                <Grid item lg={4} sm={12} xs={12}>
                  <Link href={`${Routes.HOME}`}>
                    <Button
                      style={{
                        backgroundColor: "#003D59",
                        color: "#BBF0E8",
                      }}
                      variant="contained"
                    >
                      Cancelar
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#4A92A8", color: "#092435" }}
                  >
                    Agendar
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                    onClick={handleOpen}
                  >
                    Actualizar
                  </Button>
                </Grid>
              </Grid>
              <Divider
                light
                style={{ backgroundColor: "#414A4F", color: "#092435" }}
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
                      Datos actualizados con exito
                    </h2>
                    <Link href={`${Routes.PATIENTS}/${id}`}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="small"
                        style={{ backgroundColor: "#60CCD9", color: "#092435" }}
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
        {/* <EmergencyContacts patientID={data.patient_id} />
        <DrugAllergies patientID={data.patient_id} />
        <FamilyHistories patientID={data.patient_id} />
        <PersonalHistories patientID={data.patient_id} />
        <PhysicalExams patientID={data.patient_id} />
        <ExplorationPatients patientID={data.patient_id} />
        <DrugsRecipies patientID={data.patient_id} />
            <ImageRecipies patientID={data.patient_id} />*/}
      </Container>
    </LayoutSecondary>
  );
};
export default patientDetails;
