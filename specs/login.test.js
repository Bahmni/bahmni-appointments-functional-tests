import loginPage from "../login";
import { ClientFunction } from 'testcafe';
import { Selector, t } from "testcafe";



const getLocation = ClientFunction(() => document.location.href);

fixture`Application Login`
  .page`${process.env.APPLICATION_URL}/home/index.html#/login`;

test("Valid login test", async () => {
  await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
});
