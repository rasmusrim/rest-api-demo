import config from "../config.json";

export default class StudentService {
    static getAllStudents() {
        return new Promise((resolve, reject) => {
            fetch(config.baseRestUrl + "/student").then(response => response.json().then(response => {
                resolve(response);
            }))
        })
    }
}