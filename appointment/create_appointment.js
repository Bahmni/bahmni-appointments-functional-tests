require("../config");
import { Selector, t } from "testcafe";
import Data from "../test_data/Data";
const data = new Data();


class createAppointmentPage {
    constructor() {
        this.appointmentsModule = Selector('#bahmni\\.appointment\\.scheduling');
        this.appointmentsNewModule = this.appointmentsModule.nth(1);
        this.appointmentListTab = Selector('.add-app-wrapper header a:nth-child(2)');
        this.addNewAppointmentButton = Selector('.add-app-btn');
        this.patientField = Selector('[data-testid="patient-search"]');
        //this.patientFieldErrorMessage = this.patientField.withAttribute('data-testid','error-message');
        this.serviceField = Selector('[data-testid="service-search"]');
        this.serviceAppTypeField = Selector('[data-testid="service-type-search"]');
        this.providerSearch = Selector('[data-testid="provider-search"]');
        this.specialitySearch = Selector('[data-testid="speciality-search"]');
        this.locationSearch = Selector('[data-testid="location-search"]');
        this.dateSelection = Selector('[data-testid="datePicker"]');
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
        this.service = Selector('#react-select-3-option-1');
        this.serviceAppTypeFieldSelection = Selector('#react-select-4-option-1');
        this.providerSearchSelection = Selector('#react-select-6-option-56');
        this.specialitySearchSelection = Selector('#react-select-7-option-0');
        this.locationSearchSelection = Selector('#react-select-5-option-1');
        this.closeSaveButton = Selector('[data-testid="save-close-button"]');
        this.closeIcon = Selector('[data-testid="#save-close-icon"]');
        this.addNewAppointmentLink = Selector('[data-testid="#save-new-appointment-link"]');

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
    async selectService(){
        await t.click(this.serviceField);
        await t.click(this.service);
        await t.expect(this.serviceField.innerText).contains(data.appointments_info.service_name);

    }
    async selectServiceAppType(){
        await t.click(this.serviceAppTypeField);
        await t.click(this.serviceAppTypeFieldSelection);
        await t.expect(this.serviceAppTypeField.innerText).contains(data.appointments_info.service_app_type);


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
        await t.expect(this.locationSearch.innerText).contains(data.appointments_info.location);

    }
    async enterFromDate(){
        await t.click(this.dateSelection);
        await t.typeText(this.dateSelection, data.appointments_info.date)
    }

    async enterStartDate(){
        await t.click(this.startTimeSelection);
        await t.click(this.selectHours.withText('10'));
        await t.click(this.selectMin.withText('30'));
        await t.click(this.selectday.withText('am'));
        await t.click(this.notesSelection);

    }

    async enterEndDate() {
        await t.click(this.endTimeSelection);
        await t.click(this.selectEndHours.withText('11'));
        await t.click(this.selectMin.withText('30'));
        await t.click(this.selectday.withText('am'));

    }
    async enterNotes(){
        await t.typeText(this.notesSelection, data.appointments_info.notes)
    }
    async saveAppointment(){
        await t.click(this.saveAppointmentButton);
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
        await t.expect(this.dateSelection.innerText).contains(data.appointments_info.date_error_message);
    }

    async startTimeErrorMessage(){
        await t.expect(this.startTimeSelection.innerText).contains(data.appointments_info.time_error_message);
    }

    async endTimeErrorMessage(){
        await t.expect(this.endTimeSelection.innerText).contains(data.appointments_info.time_error_message);
    }

    async selectCancelAppointment(){
        await t.click(this.cancelAppointment);
    }
    async selectNoForCancelAppointment(){
        await t.click(this.dismissCancelPopUp());
        await this.selectPatient();

    }

    async confirmCancelAppointmentAction() {
        await t.click(this.confirmCancelAppointment());
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



}

export default new createAppointmentPage();
