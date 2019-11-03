import { t } from "testcafe";

import patientApi from "../api/patient";
import loginPage from "../login";
import appointmentsPage from "../appointments";

fixture`New Appointment`
  .page`${process.env.APPLICATION_URL}/bahmni/home/index.html#/login`.beforeEach(
  async () => {
    await t.maximizeWindow();
    await loginPage.login(
      process.env.ADMIN_USERNAME,
      process.env.ADMIN_PASSWORD
    );
  }
);

test("Creating a new appointment", async () => {
  await t.navigateTo(`${process.env.APPLICATION_URL}/bahmni/appointments`);
  const patient = await patientApi.registerPatient();
  await appointmentsPage.openAppointmentList();
  await appointmentsPage.newAppointment(patient);
});
