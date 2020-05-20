import restConfig from "../config.json";

import AbsenceRestService from "./AbsenceRestService"
import BaseRestService from "./BaseRestService"

import moment from 'moment';

export default class StudentRestService {
    static getAllStudents() {
        return new Promise((resolve, reject) => {
            BaseRestService.fetch(restConfig.baseRestUrl + "/student").then(response => response.json().then(response => {
                resolve(response);
            }))
        })
    }

    static async getAllStudentsWithAbsenceFor(date) {

        date = moment(date)

        let students = await this.getAllStudents();
        let absenceEntries = await AbsenceRestService.getAbsenceForAllStudents(date);

        Object.keys(students).forEach(studentIndex => {
            students[studentIndex].absence = new Map();
        })

        for (let key in absenceEntries) {
            let absenceEntry = absenceEntries[key];
            let absenceEntryDate = moment(absenceEntry.date);
            let studentId = absenceEntry.studentId;

            if (typeof students[studentId] !== "undefined") {
                students[studentId].absence.set(absenceEntryDate.format('YYYY-MM-DD'), absenceEntry);
            }
        }

        return students
    }

    static deleteStudent(student) {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'DELETE'
            }

            BaseRestService.fetch(restConfig.baseRestUrl + "/student/" + student.id, config).then(response => response.json().then(response => {
                resolve(response);
            }))


        })
    }

    static addStudent(firstName, lastName) {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'POST',
                body: JSON.stringify({
                    firstName,
                    lastName
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            }

            BaseRestService.fetch(restConfig.baseRestUrl + "/student", config).then(response => response.json().then(response => {
                resolve(response);
            }))

        })

    }

    static updateStudent(student) {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'POST',
                body: JSON.stringify({
                    firstName: student.firstName,
                    lastName: student.lastName
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            }

            BaseRestService.fetch(restConfig.baseRestUrl + "/student/" + student.id, config).then(response => response.json().then(response => {
                resolve(response);
            }))

        })

    }
}