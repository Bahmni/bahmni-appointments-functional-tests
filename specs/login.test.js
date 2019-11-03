import loginPage from "../login";
import * as config from "../config";

fixture`Application Login`.page`${config.BAHMNI_LOGIN_URL}`;

test("Admin login test", async () => {
  await loginPage.loginAsAdmin();
});
