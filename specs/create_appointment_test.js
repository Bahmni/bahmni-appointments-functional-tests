import createAppointmentPage from "../appointment/create_appointment";
import loginPage from "../login";
var moment = require('moment');



fixture`Create New Appointment`
    .page`${process.env.APPLICATION_URL}/home/index.html#/login`;

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('User creates a valid appointment after service conflicts', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectServiceHavingConflicts();
        //await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.selectWalkinAppointmentCheckbox();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointmentAfterConflicts();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAppointment(date);
        await createAppointmentPage.selectEditAppointmentButton();
        await createAppointmentPage.assertPatientFullName();
        await createAppointmentPage.assertServiceForConflicts();
        await createAppointmentPage.assertLocation();
    });

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('User creates a valid appointment after double booking conflicts', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectServiceHavingConflicts();
       // await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.selectWalkinAppointmentCheckbox();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointmentAfterConflicts();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAppointment(date);
        await createAppointmentPage.selectEditAppointmentButton();
        await createAppointmentPage.assertPatientFullName();
        await createAppointmentPage.assertServiceForConflicts();
        await createAppointmentPage.assertLocation();
    });


test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('Create a recurring appointment from Date selection ', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
        //await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        //await createAppointmentPage.selectSpeciality();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.selectRecurringOption();
        await createAppointmentPage.selectFromDate();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.selectToDate();
        await createAppointmentPage.enterToDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.selectRecurranceTypeDay();
        await createAppointmentPage.selectRecurrancesBox();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointment();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.verifyProviderName();
        await createAppointmentPage.verifyNotes(date);
        await createAppointmentPage.navigateToNextDate();
        await createAppointmentPage.verifyProviderName();
        await createAppointmentPage.verifyNotes(date);
        await createAppointmentPage.navigateToNextDate();
        await createAppointmentPage.verifyProviderName();
        await createAppointmentPage.verifyNotes(date);
    });

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })

    ('User creates and Edits a valid appointment', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
        //await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointment();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAppointment(date);
        await createAppointmentPage.selectEditAppointmentButton();
        await createAppointmentPage.assertPatientFullName();
        //await createAppointmentPage.assertService();
        await createAppointmentPage.assertLocation();
        //await createAppointmentPage.updateService();
        //await createAppointmentPage.updateServiceAppType();
        await createAppointmentPage.updateNotes("123");
        await createAppointmentPage.saveAppointment();
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
        await createAppointmentPage.selectRecurringOption();
        await createAppointmentPage.saveAppointment();
        await createAppointmentPage.waitForErrorMessages();
        await createAppointmentPage.patientErrorMessage();
        await createAppointmentPage.serviceErrorMessage();
        //await createAppointmentPage.dateErrorMessage();
        //await createAppointmentPage.endDateErrorMessage();
        //await createAppointmentPage.recurranceErrorMessage();
        //await createAppointmentPage.startTimeErrorMessage();
        //await createAppointmentPage.endTimeErrorMessage();

    });

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })

    ('User creates a valid appointment', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
        //await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointment();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAppointment(date);
        await createAppointmentPage.selectEditAppointmentButton();
        await createAppointmentPage.assertPatientFullName();
       // await createAppointmentPage.assertService();
        await createAppointmentPage.assertLocation();
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
    ('Cancel Appointment when no data is entered', async () => {
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectCancelAppointment();
        await createAppointmentPage.confirmCancelAppointmentAction();
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
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.saveAppointment();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.verifyPatientName();
       // await createAppointmentPage.verifyService();
    });

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('Cancel Appointment when the data is entered', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
       // await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        //await createAppointmentPage.selectSpeciality();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.selectCancelAppointment();
        await createAppointmentPage.confirmCancelAppointmentAction();
    });

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('Dismiss the cancel appointment pop up after entering all the data', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
       // await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        //await createAppointmentPage.selectSpeciality();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.selectCancelAppointment();
        await createAppointmentPage.selectNoForCancelAppointment();
        //await createAppointmentPage.assertPatientDetails();
    });


test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('Create a recurring appointment from Today ', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
        //await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        //await createAppointmentPage.selectSpeciality();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.selectRecurringOption();
        await createAppointmentPage.selectTodayRadioButton();
        await createAppointmentPage.selectAfterRadioButton();
        await createAppointmentPage.selectOccourancesBox();
        await createAppointmentPage.selectRecurranceTypeDay();
        await createAppointmentPage.selectRecurrancesBox();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointment();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.verifyProviderName();
        await createAppointmentPage.verifyNotes(date);
        await createAppointmentPage.navigateToNextDate();
        await createAppointmentPage.verifyProviderName();
        await createAppointmentPage.verifyNotes(date);
        await createAppointmentPage.navigateToNextDate();
        await createAppointmentPage.verifyProviderName();
        await createAppointmentPage.verifyNotes(date);
    });




test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('Create a Weekly recurring appointment from Date selection ', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
        //await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        //await createAppointmentPage.selectSpeciality();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.selectRecurringOption();
        await createAppointmentPage.selectFromDate();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.selectToDate();
        await createAppointmentPage.enterToDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.selectRecurranceTypeWeek();
        await createAppointmentPage.selectRecurranceDaySunday()
        await createAppointmentPage.selectRecurranceDayMonday();
        await createAppointmentPage.selectRecurrancesBox();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointment();
        //Validations will be enabled once the redirection bug is fixed.
        //await createAppointmentPage.selectListButton();
        //await createAppointmentPage.verifyProviderName();
        //await createAppointmentPage.verifyNotes();
        //await createAppointmentPage.navigateToNextDate();
        //await createAppointmentPage.verifyProviderName();
        //await createAppointmentPage.verifyNotes();
       // await createAppointmentPage.navigateToNextDate();
       // await createAppointmentPage.verifyProviderName();
       // await createAppointmentPage.verifyNotes();
    });

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })
    ('Create a Weekly recurring appointment from Today ', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
       // await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        //await createAppointmentPage.selectSpeciality();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.selectRecurringOption();
        await createAppointmentPage.selectTodayRadioButton();
        await createAppointmentPage.selectAfterRadioButton();
        await createAppointmentPage.selectOccourancesBox();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.selectRecurranceTypeWeek();
        await createAppointmentPage.selectRecurranceDaySunday()
        await createAppointmentPage.selectRecurranceDayMonday();
        await createAppointmentPage.selectRecurrancesBox();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointment();
        await createAppointmentPage.selectListButton();
        //Validations will be enabled once the redirection bug is fixed.
        //await createAppointmentPage.verifyProviderName();
        //await createAppointmentPage.verifyNotes();
        //await createAppointmentPage.navigateToNextDate();
        //await createAppointmentPage.verifyProviderName();
        //await createAppointmentPage.verifyNotes();
        //Validations will be enabled once the redirection bug is fixed.
        // await createAppointmentPage.navigateToNextDate();
        // await createAppointmentPage.verifyProviderName();
        // await createAppointmentPage.verifyNotes();
    });

test
    .meta({priority: 'P1'})
    .before(async () => {
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    })

    ('User creates a valid walkin appointment', async () => {
        const date = moment().format('YYYY-MM-DD hh:mm:ss.SSSZ');
        await createAppointmentPage.selectAppointmentsModule();
        await createAppointmentPage.selectAppointmentListTab();
        await createAppointmentPage.selectAddNewAppointmentButton();
        await createAppointmentPage.selectPatient();
        await createAppointmentPage.selectService();
       // await createAppointmentPage.selectServiceAppType();
        await createAppointmentPage.selectProvider();
        await createAppointmentPage.selectLocation();
        await createAppointmentPage.selectWalkinAppointmentCheckbox();
        await createAppointmentPage.enterFromDate();
        await createAppointmentPage.enterStartTime();
        await createAppointmentPage.enterEndTime();
        await createAppointmentPage.enterNotes(date);
        await createAppointmentPage.saveAppointment();
        await createAppointmentPage.selectListButton();
        await createAppointmentPage.selectAppointment(date);
        await createAppointmentPage.selectEditAppointmentButton();
        await createAppointmentPage.assertPatientFullName();
        //await createAppointmentPage.assertService();
        await createAppointmentPage.assertLocation();
    });

