import api from "./api";

async function getUser(user_id) {
  return await api.get(`/users/${user_id}`);
}

async function create(data) {
  return await api.post(`/users`, data);
}

async function update(user_id, data) {
  return await api.put(`/users/${user_id}`, data);
}
async function deleteUser(user_id) {
  return await api.delete(`users/${user_id}`);
}

export const Users = {
  getUser,
  create,
  update,
  deleteUser,
};
