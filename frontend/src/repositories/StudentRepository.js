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

    static getAllStudentsWithAbsenceFor(date) {
        return new Promise(async (resolve, reject) => {

        let students = await this.getAllStudents();
        let absenceEntries = await AbsenceRepository.getAbsenceForAllStudents(date);

        for (let key in absenceEntries) {
            let absenceEntry = absenceEntries[key];
            let absenceEntryDate = moment(absenceEntry.date);
            let studentId = absenceEntry.studentId;

            if (typeof students[studentId].absence === "undefined") {
                students[studentId].absence = new Map();
            }

            students[studentId].absence.set(absenceEntryDate, absenceEntry);
        }

        resolve(Object.values(students))
    })
        
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