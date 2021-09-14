import api from "./api";

async function getPatient(patient_id) {
  return await api.get(`/patients/${patient_id}`);
}

async function create(data) {
  return await api.post(`/user/patients`, data);
}

async function update(patient_id, data) {
  return await api.put(`/patients/${patient_id}`, data);
}
async function deletePatient(patient_id) {
  return await api.delete(`user/patients/${patient_id}`);
}

export const Patients = {
  getPatient,
  create,
  update,
  deletePatient,
};
