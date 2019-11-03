require("../config");
import { Selector, t } from "testcafe";

class AppointmentsPage {
  constructor() {}

  async newAppointment(
    patient,
    speciality = "Cardiology",
    service = "Cardiology",
    location = "OPD-1",
    appointmentDate,
    appointmentStartTime = "01:00 PM",
    provider,
    walkIn,
    notes
  ) {
    if (!appointmentDate)
      appointmentDate = new Date().toISOString().split("T")[0];
    await t.click(".add-app-btn");
    await t.typeText("#patientID", patient.person.display);
    await t.click(
      Selector("#ui-id-1")
        .find("a")
        .withText(patient.person.display)
    );
    await t.click("#speciality").click(
      Selector("#speciality")
        .find("option")
        .withText(speciality)
    );
    await t.click("#service").click(
      Selector("#service")
        .find("option")
        .withText(service)
    );
    await t.click("#location").click(
      Selector("#location")
        .find("option")
        .withText(location)
    );
    if (provider)
      await t.click("#provider").click(
        Selector("#provider")
          .find("option")
          .withText(provider)
      );
    await t.typeText("#date", appointmentDate);
    await t.typeText("#startTimeID", appointmentStartTime);
    if (walkIn) await t.click(".walk-in-app input");
    if (notes) await t.typeText("#notes", notes);
    await t.click(Selector("button").withText("Save"));
    await t
      .expect(Selector(".message-container").innerText)
      .eql("\t\nAppointment saved successfully\n\t");
  }

  async openAppointmentList() {
    await t.click(Selector("a").withText("Appointments List"));
  }

  async switchToListView() {
    await t.click(
      Selector(".view-toggle-wrapper")
        .find("a")
        .withText("List view")
    );
  }
}

export default new AppointmentsPage();
