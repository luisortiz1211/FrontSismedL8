import DrugAllergieNew from "@/components/DrugAllergieNew";
import DrugsRecipieNew from "@/components/DrugsRecipieNew";
import EmergencyContactNew from "@/components/EmergencyContactNew";
import ExplorationPatientNew from "@/components/ExplorationPatientNew";
import FamilyHistoryNew from "@/components/FamilyHistoryNew";
import ImageRecipieNew from "@/components/ImageRecipieNew";
import LayoutSecondary from "@/components/LayoutSecondary";
import PatientsInformation from "@/components/Patient";
import PersonalHistoryNew from "@/components/PersonalHistoryNew";
import PhysicalExamNew from "@/components/PhysicalExamNew";
import Title from "@/components/Title";
import { Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
    backgroundColor: "#60CCD9",
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
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
}));

const patientDetails = ({ props }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
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
          Datos clínicos del paciente
        </Title>
        <Paper elevation={6} style={{ padding: "10px", margin: "20px" }}>
          <Container>
            <Box className={classes.root}>
              <Box sx={{ borderBottom: 2, borderColor: "#fff" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Datos" {...a11yProps(0)} />
                  <Tab label="Contactos" {...a11yProps(1)} />
                  <Tab label="APP" {...a11yProps(2)} />
                  <Tab label="APF" {...a11yProps(3)} />
                  <Tab label="Alergias" {...a11yProps(4)} />
                  <Tab label="Semiologia" {...a11yProps(5)} />
                  <Tab label="Exploración" {...a11yProps(6)} />
                  <Tab label="Imagenes" {...a11yProps(7)} />
                  <Tab label="Medicamentos" {...a11yProps(8)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <PatientsInformation
                  patientID={id}
                  component={"span"}
                  variant={"body2"}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EmergencyContactNew />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <PersonalHistoryNew />
              </TabPanel>

              <TabPanel value={value} index={3}>
                <FamilyHistoryNew />
              </TabPanel>

              <TabPanel value={value} index={4}>
                <DrugAllergieNew />
              </TabPanel>

              <TabPanel value={value} index={5}>
                <PhysicalExamNew />
              </TabPanel>

              <TabPanel value={value} index={6}>
                <ExplorationPatientNew />
              </TabPanel>
              <TabPanel value={value} index={7}>
                <ImageRecipieNew />
              </TabPanel>
              <TabPanel value={value} index={8}>
                <DrugsRecipieNew />
              </TabPanel>
            </Box>
          </Container>
        </Paper>
        {/* <EmergencyContactList patientID={data.patient_id} />
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
