const publicRoutes = {
  LOGIN: "/login",
  // REGISTER: "/register",
  // PATIENTS: "/patients",
  // ABOUT: "/about",
};

const privateRoutes = {
  HOME: "/",
  REGISTER: "/register",
  PATIENTS: "/patients",
  CONTACTS: "/emergencyContact",
  PERSONAL: "/personalHistory",
  ALLERGIES: "/drugAllergies",
  FAMILY: "/familyHistory",
  PHYSICAL: "/physicalExam",
  EXPLORATION: "/explorationPatient",
  IMAGE: "/imagesRecipie",
  DRUGS: "/drugsRecipie",
  USERS: "/users",
  SCHEDULEDAY: "/scheduleDay",
  SCHEDULEUSER: "/userSchedule",
  MEDICALHISTORY: "/medicalHistory",

  // PATIENT_ID: "/patient/:id",

  // USERS: "/@usuarios",
  // USERS_ID: `/usuario/:id`,
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
