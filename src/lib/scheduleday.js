import api from "./api";

async function getScheduleDay(id) {
  return await api.get(`/schedule_days/${id}`);
}

async function create(data, id) {
  return await api.post(`/users/${id}/schedule_days`, data);
}

async function update(id, data) {
  return await api.put(`/schedule_days/${id}`, data);
}
async function deleteScheduleDay(id) {
  return await api.delete(`/schedule_days/${id}`);
}

export const Scheduledays = {
  getScheduleDay,
  create,
  update,
  deleteScheduleDay,
};
