import { Selector, t } from "testcafe";

import * as config from "../config";

class AppointmentPage {
  constructor() {}

  async open() {
    await t.navigateTo(`${config.BAHMNI_URL}/appointments`);
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

export default new AppointmentPage();
