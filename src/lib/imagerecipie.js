import api from "./api";

async function getImageRecipie(id) {
  return await api.get(`/image_recipies/${id}`);
}

async function create(data, id) {
  return await api.post(`/patients/${id}/image_recipies`, data);
}

async function update(id, data) {
  return await api.put(`/image_recipies/${id}`, data);
}
async function deleteImageRecipie(id) {
  return await api.delete(`/image_recipies/${id}`);
}

export const Imagerecipies = {
  getImageRecipie,
  create,
  update,
  deleteImageRecipie,
};
