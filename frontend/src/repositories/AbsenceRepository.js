import restConfig from "../config.json";

export default class AbsenceRepository {
    static getAbsenceForAllStudents(date) {
        return new Promise((resolve, reject) => {
            fetch(restConfig.baseRestUrl + "/absence/" + date.year() + "/" + (date.month() + 1)).then(response => response.json().then(response => {
                resolve(response);
            }))
        })
    }
}