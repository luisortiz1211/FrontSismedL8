import api from "./api";

async function getPersonalHistory(id) {
  return await api.get(`/personal_histories/${id}`);
}

async function create(data, id) {
  return await api.post(`/patients/${id}/personal_histories/`, data);
}

async function update(id, data) {
  return await api.put(`/personal_histories/${id}`, data);
}
async function deletePersonal(id) {
  return await api.delete(`/personal_histories/${id}`);
}

export const Personalhistories = {
  getPersonalHistory,
  create,
  update,
  deletePersonal,
};
