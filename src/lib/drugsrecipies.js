import api from "./api";

async function getDrugsRecipie(id) {
  return await api.get(`/drugs_recipies/${id}`);
}

async function create(data, id) {
  return await api.post(`patients/${id}/drugs_recipies/`, data);
}

async function update(id, data) {
  return await api.put(`/drugs_recipies/${id}`, data);
}
async function deleteDrugsRecipie(id) {
  return await api.delete(`/drugs_recipies/${id}`);
}

export const Drugsrecipies = {
  getDrugsRecipie,
  create,
  update,
  deleteDrugsRecipie,
};
