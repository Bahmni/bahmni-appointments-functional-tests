import { Selector, t } from "testcafe";

import * as config from "../config";

class LoginPage {
  constructor() {
    this.username = Selector("#username");
    this.password = Selector("#password");
    this.submit = Selector("button").withText("Login");
    this.location = Selector("#location");
    this.logout = Selector(".logout");
  }

  async login(
    username,
    password = process.env.ADMIN_PASSWORD,
    location = config.DEFAULT_TEST_LOCATION
  ) {
    await t
      .maximizeWindow()
      .typeText(this.username, username)
      .typeText(this.password, password);
    await t
      .click(this.location)
      .click(this.location.find("option").withText(location));
    await t.click(this.submit);
    await t.expect(Selector(".dashboard").exists).ok();
    await t.click(".btn-user-info");
    await t
      .expect(
        Selector("span").withAttribute("ng-bind", "currentUser.username")
          .innerText
      )
      .eql(username);
  }

  async loginAsAdmin() {
    await this.login(config.ADMIN_USERNAME, config.ADMIN_PASSWORD);
  }
}

export default new LoginPage();
