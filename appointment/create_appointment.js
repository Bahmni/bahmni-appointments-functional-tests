require("../config");
import {AssertionOptions, Selector, t, TestControllerPromise} from "testcafe";
import Data from "../test_data/Data";
const data = new Data();


class createAppointmentPage {

    constructor() {
        this.appointmentsModule = Selector('#bahmni\\.appointment\\.scheduling');
        this.appointmentsNewModule = this.appointmentsModule.nth(1);
        this.appointmentListTab = Selector('.add-app-wrapper header a:nth-child(2)');
        this.addNewAppointmentButton = Selector('.add-app-btn');
        this.patientField = Selector('[data-testid="patient-search"]');
        this.serviceField = Selector('[data-testid="service-search"]');
        this.serviceAppTypeField = Selector('[data-testid="service-type-search"]');
        this.providerSearch = Selector('[data-testid="provider-search"]');
        this.specialitySearch = Selector('[data-testid="speciality-search"]');
        this.locationSearch = Selector('[data-testid="location-search"]');
        //this.dateSelection = Selector('.rc-calendar-input');
        this.dateSelection = Selector('[data-testid="datePicker"]');
        this.appointmentDatePicker = Selector('[data-testid="date-selector"]');
        this.endDateGroup = Selector('[data-test-id="end-date-group"]').nth(1);
        this.startDateGroup = Selector('[data-test-id="start-date-group"]');
        this.endDateSelection = Selector('[data-testid="datePicker"]').nth(1);
        this.endsOn = Selector('[data-testid="on-radio-button"]');
        this.dateSelectionErrorMessage = Selector('[data-testid="Please select time"]');
        this.startTimeSelection = Selector('[data-testid="start-time-selector"]');
        this.endTimeSelection = Selector('[data-testid="end-time-selector"]');
        this.saveAppointmentButton = Selector('[data-testid="check-and-save"]');
        this.cancelAppointment = Selector('[data-testid="cancel"]');
        this.dismissCancelPopUp = Selector('[data-testid="cancel-no"]');
        this.confirmCancelAppointment = Selector('[data-testid="cancel-yes"]');
        this.selectHours = Selector('.rc-time-picker-panel-select li');
        this.selectEndHours = Selector('.rc-time-picker-panel-select').find('li');
        this.selectMin = Selector('.rc-time-picker-panel-select').find('li');
        this.selectday = Selector('.rc-time-picker-panel-select').find('li');
        this.notesSelection = Selector('[data-testid="notes"]');
        this.patient = Selector('#react-select-2-option-0');
        this.service = Selector('#react-select-3-option-0');
        this.service_conflicts = Selector('#react-select-3-option-15');
        this.newService = Selector('#react-select-3-option-3');
        this.serviceAppTypeFieldSelection = Selector('#react-select-7-option-0');
        this.newServiceAppTypeFieldSelection = Selector('#react-select-4-option-2');
        this.providerSearchSelection = Selector('#react-select-5-option-23');
        this.specialitySearchSelection = Selector('#react-select-7-option-0');
        this.locationSearchSelection = Selector('#react-select-4-option-1');
        this.closeSaveButton = Selector('[data-testid="save-close-button"]');
        this.closeIcon = Selector('[data-testid="#save-close-icon"]');
        this.addNewAppointmentLink = Selector('[data-testid="#save-new-appointment-link"]');
        this.recurringCheckbox = Selector('.rc-checkbox-input');
        this.todayRadioButton = Selector('#today');
        this.afterRadioButton = Selector('#after');
        this.recurranceTypeDay = Selector('#recurrence-type-day');
        this.recurranceTypeWeek = Selector('#recurrence-type-week');
        this.recurranceDaySunday = Selector('[data-testid="SUNDAY"]');
        this.recurranceDayMonday = Selector('[data-testid="MONDAY"]');
        this.fromRadioButton = Selector('#from');
        this.onRadioButton = Selector('#on');
        this.occourancesTextBox = Selector('[data-testid="occurrences"]');
        this.recurrancesTextBox = Selector('[data-testid="recurrence-type-group"]');
        this.listbutton = Selector('.view-toggle-wrapper a:nth-child(1)');
        this.listView = Selector('.app-list-view');
        this.nextDateButton = Selector('.fa.fa-angle-right');
        this.createdAppointment = Selector((this.listView).find('tr')).withText(data.appointments_info.notes);
        this.editAppointmentButton =  Selector('.appointment-action-btn-container button:nth-child(1)');
        this.appointmentListTab = Selector('.add-app-wrapper header a:nth-child(2)');
        this.saveAnywayButton = Selector('[data-testid="conflictsSaveAnyway"]');
        this.conflictsTab = Selector('[data-testid="conflicts"]');
        this.noServiceConflictsTab = Selector('[data-testid=conflict-tab]:nth-child(2)');
        this.overlappingConflictsTab = Selector('[data-testid=conflict-tab]:nth-child(1)');//.nth(1);
        this.noServiceConflictsContainer = Selector('.react-tabs__tab-panel--selected div[class*=conflictsHeading');
        this.walkinAppointmentCheckbox = Selector('#walk-in-selection-checkbox');

    }

    async selectAppointmentsModule() {
        await t.click(this.appointmentsNewModule);
        await t.expect(this.appointmentListTab.innerText).contains('Appointments List');
    }
    async selectAppointmentListTab(){
        await t.click(this.appointmentListTab);
        await t.expect(this.appointmentListTab.innerText).contains('Appointments List');
    }
    async selectAddNewAppointmentButton(){
        await t.click(this.addNewAppointmentButton);
    }
    async selectPatient(){
        await t.click(this.patientField);
        await t.typeText(this.patientField, data.appointments_info.patient_name );
        await t.click(this.patient);
        await t.expect(this.patientField.innerText).contains(data.appointments_info.patient_full_name);
    }
    async assertPatientFullName(){
        await t.expect(this.patientField.innerText).contains(data.appointments_info.patient_full_name);
    }

    async assertServiceUnavailabilityConflict(){
        await t.expect(this.noServiceConflictsContainer.innerText).contains(data.appointments_info.conflictsMessage);
    }
    async doubleBookingConflict(){
        await t.expect(this.noServiceConflictsContainer.innerText).contains(data.appointments_info.doubleBookingConflictsMessage);
    }

    async selectService(){
        await t.click(this.serviceField);
        await t.click(this.service);
        //await t.expect(this.serviceField.innerText).contains(data.appointments_info.service_name);

    }
    async selectServiceHavingConflicts(){
        await t.click(this.serviceField);
        await t.click(this.service_conflicts);
        await t.expect(this.serviceField.innerText).contains(data.appointments_info.service_name_new);

    }

    async updateService(){
        await t.click(this.serviceField);
        await t.click(this.newService);
        await t.expect(this.serviceField.innerText).contains(data.appointments_info.new_service_name);

    }
    async selectServiceAppType(){
        await t.click(this.serviceAppTypeField);
        await t.click(this.serviceAppTypeFieldSelection);
        await t.expect(this.serviceAppTypeField.innerText).contains(data.appointments_info.service_app_type);


    }
    async updateServiceAppType(){
        await t.click(this.serviceAppTypeField);
        await t.click(this.newServiceAppTypeFieldSelection);
        await t.expect(this.serviceAppTypeField.innerText).contains(data.appointments_info.new_service_app_type);


    }

    async assertService(){
        await t.expect(this.serviceField.innerText).contains(data.appointments_info.service_name);
    }

    async assertServiceForConflicts(){
        await t.expect(this.serviceField.innerText).contains(data.appointments_info.service_name_new);
    }
    async selectProvider(){
        await t.click(this.providerSearch);
        await t.typeText(this.providerSearch, data.appointments_info.provider);
        await t.click(this.providerSearchSelection);
        await t.expect(this.providerSearch.innerText).contains(data.appointments_info.provider)

    }
    async selectSpeciality(){
        await t.click(this.specialitySearch);
        await t.click(this.specialitySearchSelection);
    }
    async selectLocation(){
        await t.click(this.locationSearch);
        await t.click(this.locationSearchSelection);
       // await t.expect(this.locationSearchSelection.innerText).contains(data.appointments_info.location);
    }

    async assertLocation(){
        await t.expect(this.locationSearch.innerText).contains(data.appointments_info.location);

    }
    async enterFromDate(){
        //await t.click(this.dateSelection);
        console.log(data.appointments_info.date);
        await t.typeText(this.dateSelection, data.appointments_info.date)
    }

    async selectFromDate(){
        await t.click(this.fromRadioButton);
    }
    async enterToDate(){
        //await t.click(this.endDateSelection);
        console.log(data.appointments_info.endDate);
        await t.typeText(this.endDateSelection, data.appointments_info.endDate)

    }

    async selectToDate(){
        await t.click(this.onRadioButton);
    }

    async enterStartTime(){
        await t.click(this.startTimeSelection);
        await t.click(this.selectHours.withText('10'));
        await t.click(this.selectMin.withText('30'));
        await t.click(this.selectday.withText('am'));
        await t.click(this.notesSelection);

    }

    async enterEndTime() {
        await t.click(this.endTimeSelection);
        await t.click(this.selectEndHours.withText('11'));
        await t.click(this.selectMin.withText('30'));
        await t.click(this.selectday.withText('am'));

    }
    async enterNotes(notes){
        await t.typeText(this.notesSelection, notes);
    }
    async updateNotes(){
        await t.typeText(this.notesSelection, data.appointments_info.updated_notes)
    }
    async saveAppointment() {
        await t.click(this.saveAppointmentButton);
        await t.wait(3000);
        if (await this.overlappingConflictsTab.exists && await this.noServiceConflictsTab.exists)
        {
            await t.click(this.overlappingConflictsTab);
            await t.click(this.noServiceConflictsTab);
            await t.click(this.saveAnywayButton);
            await t.click(this.closeSaveButton)
    }
        else if (await this.overlappingConflictsTab.exists && await this.saveAnywayButton.visible){
            await t.click(this.overlappingConflictsTab);
            await t.click(this.saveAnywayButton);
            await t.click(this.closeSaveButton)
        }
        else if (await this.noServiceConflictsTab.exists && await this.saveAnywayButton.visible){
            await t.click(this.noServiceConflictsTab);
            await t.click(this.saveAnywayButton);
            await t.click(this.closeSaveButton)
        }
        else if (await this.saveAnywayButton.exists && await this.saveAnywayButton.visible){
            await t.click(this.saveAnywayButton);
            await t.click(this.closeSaveButton)
        }
    else{
        if (await this.closeSaveButton.exists && await this.closeSaveButton.visible) await t.click(this.closeSaveButton)
}

}

    async saveAppointmentAfterConflicts() {
        await t.click(this.saveAppointmentButton);
        await t.wait(3000);
        if (await this.overlappingConflictsTab.exists && await this.noServiceConflictsTab.exists)
        {
            await t.click(this.overlappingConflictsTab);
            await this.doubleBookingConflict();
            await t.click(this.noServiceConflictsTab);
            await this.assertServiceUnavailabilityConflict();
            await t.click(this.saveAnywayButton);
            await t.click(this.closeSaveButton)
        }
        else if (await this.overlappingConflictsTab.exists && await this.saveAnywayButton.visible){
            await t.click(this.overlappingConflictsTab);
            //await this.doubleBookingConflict();
            await t.click(this.saveAnywayButton);
            await t.click(this.closeSaveButton)
        }
        else if (await this.noServiceConflictsTab.exists && await this.saveAnywayButton.visible){
            await t.click(this.noServiceConflictsTab);
            //await this.assertServiceUnavailabilityConflict();
            await t.click(this.saveAnywayButton);
            await t.click(this.closeSaveButton)
        }
        else if (await this.saveAnywayButton.exists && await this.saveAnywayButton.visible){
            await t.click(this.saveAnywayButton);
            await t.click(this.closeSaveButton)
        }
        else{
            if (await this.closeSaveButton.exists && await this.closeSaveButton.visible) await t.click(this.closeSaveButton)
        }

    }


    async waitForErrorMessages(){
        await t.wait(5000)
    }

    async patientErrorMessage(){
        await t.expect(this.patientField.innerText).contains(data.appointments_info.patient_error_message);
    }

    async serviceErrorMessage(){
        await t.expect(this.serviceField.innerText).contains(data.appointments_info.service_error_message);
    }

    async dateErrorMessage(){
        await t.expect(this.startDateGroup.innerText).contains(data.appointments_info.date_error_message);
    }
    async endDateErrorMessage(){
        await t.expect(this.endDateGroup.innerText).contains(data.appointments_info.end_date_error_message);
    }

    async recurranceErrorMessage(){
        await t.expect(this.recurrancesTextBox.innerText).contains(data.appointments_info.end_date_error_message);
    }

    async startTimeErrorMessage(){
        await t.expect(this.startTimeSelection.innerText).match(/^please select time/);
    }

    async endTimeErrorMessage(){
        await t.expect(this.endTimeSelection.innerText).match(/^please select time/);

    }

    async selectCancelAppointment(){
        await t.click(this.cancelAppointment);
    }
    async selectNoForCancelAppointment(){
        await t.click(this.dismissCancelPopUp);

    }

    async confirmCancelAppointmentAction() {
        await t.click(this.confirmCancelAppointment);
        await this.selectAppointmentListTab();
    }
    async closeSavePopup(){
        await t.click(this.closeSaveButton)
    }
    async closeSaveIcon(){
        await t.click(this.closeIcon)
    }
    async newAppointmentLink(){
        await t.click(this.addNewAppointmentLink)
    }
    async selectRecurringOption(){
        await t.click(this.recurringCheckbox)
    }
    async selectTodayRadioButton(){
        await t.click(this.todayRadioButton)
    }
    async selectAfterRadioButton(){
        await t.click(this.afterRadioButton)
    }
    async selectOccourancesBox(){
        await t.click(this.occourancesTextBox);
        await t.typeText(this.occourancesTextBox, '5', { replace: true });
    }

    async selectRecurrancesBox(){
        await t.typeText(this.recurrancesTextBox, '1', {replace: true});
    }
    async selectListButton(){
        await t.wait(1000)
        await t.click(this.listbutton);
    }

    async verifyProviderName(){
        await t
            .expect(this.listView
                .find('tr')
                .withText(data.appointments_info.provider)
                .exists)
            .ok()
    }

    async verifyPatientName(){
        await t
            .expect(this.listView
                .find('tr')
                .withText(data.appointments_info.patient_name)
                .exists)
            .ok()
    }

    async verifyService(){
        await t
            .expect(this.listView
                .find('tr')
                .withText(data.appointments_info.service_name)
                .exists)
            .ok()
    }
    async verifyServiceAppointmentType(){
        await t
            .expect(this.listView
                .find('tr')
                .withText(data.appointments_info.service_app_type)
                .exists)
            .ok()
    }
    async verifyLocation(){
        await t
            .expect(this.listView
                .find('tr')
                .withText(data.appointments_info.location)
                .exists)
            .ok()
    }
    async date(){
        await t
            .expect(this.listView
                .find('tr')
                .withText(data.appointments_info.date)
                .exists)
            .ok()
    }


    async verifyNotes(notesForAppointment){
        await t
            .expect(this.listView
                .find('tr')
                .withText(notesForAppointment)
                .exists)
            .ok()
    }



    async selectAppointment(notesForAppointment){
        let appointmentToSelect = Selector((this.listView).find('tr')).withText(notesForAppointment)
        await t.click(appointmentToSelect);
    }

    async navigateToNextDate(){
        await t.click(this.nextDateButton);
    }

    async selectRecurranceTypeDay(){
        await t.click(this.recurranceTypeDay);

    }
    async selectRecurranceTypeWeek(){
        await t.click(this.recurranceTypeWeek);

    }

    async selectRecurranceDaySunday(){
        await t.click(this.recurranceDaySunday);

    }

    async selectRecurranceDayMonday(){
        await t.click(this.recurranceDayMonday);

    }

    async selectEditAppointmentButton(){
        await t.click(this.editAppointmentButton);
    }

    async saveAfterConflicts(){
        if (await this.saveAnywayButton.exists && await this.saveAnywayButton.visible)
            await t.click(this.saveAnywayButton);
    }

    async selectWalkinAppointmentCheckbox(){
        await t.click(this.walkinAppointmentCheckbox)
    }
}

export default new createAppointmentPage();
