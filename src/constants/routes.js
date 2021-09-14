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
  CONTACTS: "/emergency_contacts",
  PERSONAL: "/personal_histories",
  ALLERGIES: "/drug_allergies",
  FAMILY: "/family_histories",
  PHYSICAL: "/physical_exams",
  EXPLORATION: "/exploration_patients",
  IMAGE: "/image_recipies",
  DRUGS: "/drugs_recipies",
  USERS: "/users",

  // PATIENT_ID: "/patient/:id",

  // USERS: "/@usuarios",
  // USERS_ID: `/usuario/:id`,
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
