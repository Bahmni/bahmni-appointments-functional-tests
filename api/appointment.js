const API = require("../utils/api");
const config = require("../config");

const APPOINTMENTS_API_URL = `${config.REST_API_URL}/appointments/`;
const APPOINTMENTS_SERVICE_API_URL = `${config.REST_API_URL}/appointmentService/`;

const createAppointment = async (
  patient,
  serviceName = "Cardiology",
  providers = []
) => {
  const startDate = new Date();
  startDate.setMinutes(10);
  const endDate = new Date();
  endDate.setMinutes(30);
  const appointmentService = await getAppointmentService(serviceName);
  const appointmentInfo = {
    patientUuid: patient.person.uuid,
    serviceUuid: appointmentService.uuid,
    startDateTime: startDate,
    endDateTime: endDate,
    providers: providers,
    locationUuid: null,
    appointmentKind: "Scheduled"
  };
  return await API.post(`${APPOINTMENTS_API_URL}?v=full`, appointmentInfo);
};

const cancelAppointment = async appointment => {
  const cancel = { toStatus: "Cancelled" };
  return await API.post(
    `${APPOINTMENTS_API_URL}/${appointment.uuid}/status-change`,
    cancel
  );
};

const getAllAppointmentServices = async () => {
  return await API.get(`${APPOINTMENTS_SERVICE_API_URL}/all/default?size=1`);
};

const getAppointmentService = async serviceName => {
  const services = await getAllAppointmentServices();
  const service = services.find(service => service.name === serviceName);
  if (service) return service;
  return await API.post(APPOINTMENTS_SERVICE_API_URL, { name: serviceName });
};

module.exports = {
  createAppointment,
  cancelAppointment,
  getAllAppointmentServices,
  getAppointmentService
};
