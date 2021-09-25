import api from "./api";

async function getDrugAllergie(id) {
  return await api.get(`/drug_allergies/${id}`);
}

async function create(data, id) {
  return await api.post(`patients/${id}/drug_allergies/`, data);
}

async function update(id, data) {
  return await api.put(`/drug_allergies/${id}`, data);
}
async function deleteDrugAllergie(id) {
  return await api.delete(`/drug_allergies/${id}`);
}

export const Drugallergies = {
  getDrugAllergie,
  create,
  update,
  deleteDrugAllergie,
};
