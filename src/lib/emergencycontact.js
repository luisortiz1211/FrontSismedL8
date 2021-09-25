import api from "./api";

async function getEmergencyContact(id) {
  return await api.get(`/emergency_contacts/${id}`);
}

async function create(data, id) {
  return await api.post(`patients/${id}/emergency_contacts/`, data);
}

async function update(id, data) {
  return await api.put(`/emergency_contacts/${id}`, data);
}
async function deleteContact(id) {
  return await api.delete(`/emergency_contacts/${id}`);
}

export const Emergencycontacts = {
  getEmergencyContact,
  create,
  update,
  deleteContact,
};
