import api from "./api";

async function getExplorationPatient(id) {
  return await api.get(`/exploration_patients/${id}`);
}

async function create(data, id) {
  return await api.post(`/patients/${id}/exploration_patients`, data);
}

async function update(id, data) {
  return await api.put(`/exploration_patients/${id}`, data);
}
async function deleteExplorationPatient(id) {
  return await api.delete(`/exploration_patients/${id}`);
}

export const Explorationpatients = {
  getExplorationPatient,
  create,
  update,
  deleteExplorationPatient,
};
