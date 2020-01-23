require("../config");
import { Selector, t } from "testcafe";

class LoginPage {
  constructor() {
    this.username = Selector("#username");
    this.password = Selector("#password");
    this.submit = Selector("button").withText("Login");
    this.location = Selector("#location");
    this.logout = Selector(".logout");
  }

  async login(
      username = process.env.ADMIN_USERNAME,
    password = process.env.ADMIN_PASSWORD,
    location = "Registration"
  )

  {
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
    await this.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
  }
}

export default new LoginPage();
