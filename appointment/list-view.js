import { Selector } from "testcafe";

class AppointmentsListPage {
  constructor() {}

  async getAllAppointments() {
    const appointments = [];
    const headerElements = Selector(".app-list-view")
      .find("thead")
      .find("th");
    const rows = Selector(".app-list-view")
      .find("tbody")
      .find("tr");
    const rowCount = await rows.count;
    const columnCount = await headerElements.count;
    for (var i = 0; i < rowCount; i++) {
      var appointment = {};
      const rowElements = await rows.nth(i).find("td");
      for (var j = 0; j < columnCount; j++) {
        const key = await headerElements.nth(j).innerText;
        const value = await rowElements.nth(j).innerText;
        appointment[key] = value;
      }
      appointments.push(appointment);
    }
    return appointments;
  }
}

export default new AppointmentsListPage();
