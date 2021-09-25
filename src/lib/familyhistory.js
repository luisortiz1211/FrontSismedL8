import api from "./api";

async function getFamilyHistory(id) {
  return await api.get(`/family_histories/${id}`);
}

async function create(data, id) {
  return await api.post(`/patients/${id}/family_histories`, data);
}

async function update(id, data) {
  return await api.put(`/family_histories/${id}`, data);
}
async function deleteFamilyHistory(id) {
  return await api.delete(`/family_histories/${id}`);
}

export const Familyhistories = {
  getFamilyHistory,
  create,
  update,
  deleteFamilyHistory,
};
