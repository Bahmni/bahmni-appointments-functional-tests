import createAppointmentPage from "../appointment/create_appointment";
import loginPage from "../login";


fixture`Create New Appointment`
    .page`${process.env.APPLICATION_URL}/home/index.html#/login`

test
    .meta({priority: 'P1'})
    .before(async () => {
         await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('User creates a valid appointment', async () => {
     await createAppointmentPage.selectAppointmentsModule();
     await createAppointmentPage.selectAppointmentListTab();
     await createAppointmentPage.selectAddNewAppointmentButton();
     await createAppointmentPage.selectPatient();
     await createAppointmentPage.selectService();
     await createAppointmentPage.selectServiceAppType();
     await createAppointmentPage.selectProvider();
     //await createAppointmentPage.selectSpeciality();
     await createAppointmentPage.selectLocation();
     await createAppointmentPage.enterFromDate();
     await createAppointmentPage.enterStartDate();
     await createAppointmentPage.enterEndDate();
     await createAppointmentPage.enterNotes();
     await createAppointmentPage.saveAppointment();
     await createAppointmentPage.closeSavePopup();
});

test
    .meta({priority: 'P1'})
    .before(async () => {
         await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('User creates a invalid appointment', async () => {
     await createAppointmentPage.selectAppointmentsModule();
     await createAppointmentPage.selectAppointmentListTab();
     await createAppointmentPage.selectAddNewAppointmentButton();
     await createAppointmentPage.saveAppointment();
     await createAppointmentPage.waitForErrorMessages();
     await createAppointmentPage.patientErrorMessage();
     await createAppointmentPage.serviceErrorMessage();
     //await createAppointmentPage.dateErrorMessage();
     //await createAppointmentPage.startTimeErrorMessage();
     //await createAppointmentPage.endTimeErrorMessage();

});

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('User creates a valid appointment by adding mandatory fields', async () => {
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.enterStartDate();
        await createAppointmentPage.enterEndDate();
        await createAppointmentPage.saveAppointment();
    });


test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('Dismiss the cancel appointment pop up', async () => {
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectCancelAppointment();
        await createAppointmentPage.selectNoForCancelAppointment();
    });

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('Cancel Appointment', async () => {
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectCancelAppointment();
        await createAppointmentPage.confirmCancelAppointmentAction();
    });


