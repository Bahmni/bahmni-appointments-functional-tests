import { Selector, t } from "testcafe";

import * as config from "../config";

class CreateAppointmentPage {
  constructor() {
    this.addNewAppointmentButton = Selector(".add-app-btn");
    this.patientField = Selector("#patientID");
    this.serviceField = Selector("#service");
    this.providerField = Selector("#provider");
    this.specialityField = Selector("#speciality");
    this.locationField = Selector("#location");
    this.dateField = Selector("#date");
    this.startTimeField = Selector("#startTimeID");
    this.walkInField = Selector(".walk-in-app input");
    this.notesField = Selector("#notes");
    this.saveButton = Selector("button").withText("Save");
    this.messageContainer = Selector(".message-container");
  }

  async selectAddNewAppointmentButton() {
    await t.click(this.addNewAppointmentButton);
  }

  async selectPatient(patient) {
    await t.typeText(this.patientField, patient.person.display);
    await t.click(
      Selector("#ui-id-1")
        .find("a")
        .withText(patient.person.display)
    );
    await t.expect(this.patientField.value).contains(patient.person.display);
  }

  async selectService(serviceName) {
    await t.click(this.serviceField).click(
      Selector(this.serviceField)
        .find("option")
        .withText(serviceName)
    );
  }

  async selectServiceAppType() {
    // TODO
  }

  async selectProvider(providerName) {
    await t.click(this.providerField).click(
      Selector(this.providerField)
        .find("option")
        .withText(providerName)
    );
  }

  async selectSpeciality(specialityName) {
    await t.click(this.specialityField).click(
      Selector(this.specialityField)
        .find("option")
        .withText(specialityName)
    );
  }

  async selectLocation(locationName) {
    await t.click(this.locationField).click(
      Selector(this.locationField)
        .find("option")
        .withText(locationName)
    );
  }

  async enterAppointmentDate(date) {
    if (!date) date = new Date().toISOString().split("T")[0];
    await t.typeText("#date", date);
  }

  async enterAppointmentStartTime(time) {
    await t.typeText("#startTimeID", time);
    await t.click("#endTimeID");
  }

  async selectWalkInAppointment() {
    await t.click(".walk-in-app input");
  }

  async enterNotes(notes) {
    await t.typeText(this.notes, notes);
  }
  async saveAppointment() {
    await t.click(this.saveButton);
    // await t.click(this.saveButton);
  }

  async veifyAppointmentSavedMessage() {
    await t
      .expect(this.messageContainer.innerText)
      .eql("\t\nAppointment saved successfully\n\t");
  }

  async newAppointment(
    patient,
    speciality = "Cardiology",
    service = "Cardiology",
    location = config.DEFAULT_TEST_LOCATION,
    appointmentDate,
    appointmentStartTime = "01:00 PM",
    provider,
    walkIn,
    notes
  ) {
    await this.selectAddNewAppointmentButton();
    await this.selectPatient(patient);
    await this.selectSpeciality(speciality);
    await this.selectService(service);
    await this.selectLocation(location);
    if (provider) await this.selectProvider(provider);
    await this.enterAppointmentDate(appointmentDate);
    await this.enterAppointmentStartTime(appointmentStartTime);
    if (walkIn) await this.selectWalkInAppointment(walkIn);
    if (notes) await this.enterNotes(notes);
    await this.saveAppointment();
    await this.veifyAppointmentSavedMessage();
  }
}

export default new CreateAppointmentPage();
