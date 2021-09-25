import api from "./api";

async function getPhysicalExam(id) {
  return await api.get(`/physical_exams/${id}`);
}

async function create(data, id) {
  return await api.post(`/patients/${id}/physical_exams`, data);
}

async function update(id, data) {
  return await api.put(`/physical_exams/${id}`, data);
}
async function deletePhysical(id) {
  return await api.delete(`/physical_exams/${id}`);
}

export const Physicalexams = {
  getPhysicalExam,
  create,
  update,
  deletePhysical,
};
