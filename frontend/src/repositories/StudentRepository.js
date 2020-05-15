import restConfig from "../config.json";

import AbsenceRepository from "../repositories/AbsenceRepository"
import moment from 'moment';

export default class StudentRepository {
    static getAllStudents() {
        return new Promise((resolve, reject) => {
            fetch(restConfig.baseRestUrl + "/student").then(response => response.json().then(response => {
                resolve(response);
            }))
        })
    }

    static async getAllStudentsWithAbsenceFor(date) {

        let students = await this.getAllStudents();
        let absenceEntries = await AbsenceRepository.getAbsenceForAllStudents(date);

        Object.keys(students).forEach(studentIndex => {
            students[studentIndex].absence = new Map();
        })

        for (let key in absenceEntries) {
            let absenceEntry = absenceEntries[key];
            let absenceEntryDate = moment(absenceEntry.date);
            let studentId = absenceEntry.studentId;

            students[studentId].absence.set(absenceEntryDate.format('YYYY-MM-DD'), absenceEntry);
        }

        return students
    }
        
    

    static setAbsence(student, date, absenceCode) {
        return new Promise((resolve, reject) => {
            let body = {
                date: date,
                absenceCode: absenceCode

            }
            let config = {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            }

            fetch(restConfig.baseRestUrl + "/student/absence/" + student.id, config).then(response => response.json().then(response => {
                resolve(response);
            }))
        })

    }
}