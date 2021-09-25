import api from "./api";

async function getScheduleUser(id) {
  return await api.get(`/schedule_users/${id}`);
}

async function create(id, data) {
  return await api.post(`/users/${id}/schedule_users`, data);
}

async function update(id, data) {
  return await api.put(`/schedule_users/${id}`, data);
}
async function deleteSchedule(id) {
  return await api.delete(`/schedule_users/${id}`);
}

export const Scheduleusers = {
  getScheduleUser,
  create,
  update,
  deleteSchedule,
};
