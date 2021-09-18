import api from "./api";

async function getUser(id) {
  return await api.get(`/schedule_users/${id}`);
}

async function create(id, data) {
  return await api.post(`/users/${id}/schedule_users`, data);
}

async function update(id, data) {
  return await api.put(`/schedule_users/${id}`, data);
}
async function deleteUser(id) {
  return await api.delete(`/schedule_users/${id}`);
}

export const ScheduleUser = {
  getUser,
  create,
  update,
  deleteUser,
};
