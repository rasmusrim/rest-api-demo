import restConfig from "../config.json";

export default class AbsenceRepository {
    static getAbsenceForAllStudents(date) {
        return new Promise((resolve, reject) => {
            fetch(restConfig.baseRestUrl + "/absence/" + date.year() + "/" + (date.month() + 1)).then(response => response.json().then(response => {
                resolve(response);
            }))
        })
    }

    static setAbsence(student, date, absenceCode) {
        return new Promise((resolve, reject) => {
            let body = {
                date: date,
                absenceCode: absenceCode

            }
            let config = {
                method: "POST",
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