import loginPage from "../login";

fixture`Application Login`
  .page`${process.env.APPLICATION_URL}/home/index.html#/login`;

test("Valid login test", async () => {
  await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
});
