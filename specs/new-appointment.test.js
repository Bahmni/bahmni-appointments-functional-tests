import { t } from "testcafe";

import * as config from "../config";
import patientApi from "../api/patient";
import loginPage from "../login";
import appointmentsPage from "../appointment";
import createAppointmentPage from "../appointment/create_appointment";

fixture`Create Appointment`.page`${config.BAHMNI_LOGIN_URL}`.beforeEach(
  async () => {
    await t.maximizeWindow();
    await loginPage.loginAsAdmin();
    await appointmentsPage.open();
  }
);

test("Creating a new appointment", async () => {
  const patient = await patientApi.registerPatient();
  await appointmentsPage.openAppointmentList();
  await createAppointmentPage.newAppointment(patient);
});
