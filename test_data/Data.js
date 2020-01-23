
var moment = require('moment');

export default class Data {


    constructor() {
        let currentDate = moment();
        let date = currentDate.format('MM/DD/YYYY');
        //let datetime = currentDate.format('YYYY-MM-DD hh:mm:ss a');
        let datetimeForNotes = currentDate.format('YYYY-MM-DD hh:mm:ss.SSSZ' );

        let toDate = moment().add(5, 'days');
        let endDate = toDate.format('MM/DD/YYYY');
        this.appointments_info =
            {
                //Edit the Patient Name.
                patient_name: 'krishna',
                patient_full_name: 'krishna Chaitanya (103284)',
                patient_id: 'EG103325M',
                patient_error_message: 'Please select patient',
                service_name: 'Dressing',
                service_name_new: 'automation',
                new_service_name:'Medical Clinic',
                service_error_message: 'Please select service',
                service_app_type: 'Maxillo-facial dressing',
                new_service_app_type: 'Medical',
                provider: 'krishna chaitanya',
                location: 'Psycho-Social, Mental Health',
                date: date,
                endDate: endDate,
                date_error_message: 'Please select date',
                end_date_error_message: 'Please select recurrence end type',
                recurrance_error_message: 'Please select valid recurrence period',
                to_date: '10:30 am',
                from_date: '11:30 am',
                time_error_message: 'please select time',
                notes: datetimeForNotes,
                updated_notes: date.concat("updated"),
                toTimePlaceHolder: 'Enter time as hh:mm am/pm',
                addNewAppointmentText: 'Add new appointment',
                conflictsMessage: 'The automation service you had selected for the appointment(s) is not available during below listed dates',
                doubleBookingConflictsMessage: 'The appointments you are trying to book overlaps with the following dates'
            }
    }

    getDate() {
        let currentDate = moment();
        return currentDate.format('YYYY-MM-DD hh:mm:ss.SSSZ');
    }

    getCreatedAppointmentWithCurrentDate() {
        this.appointments_info.notes = this.getDate();
        return this.appointments_info;
    }
}