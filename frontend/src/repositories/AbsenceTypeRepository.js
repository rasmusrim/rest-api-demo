import restConfig from "../config.json";

export default class AbsenceTypeRepository {
    static getAbsenceTypes() {
        
        return new Promise((resolve, reject) => {
            fetch(restConfig.baseRestUrl + "/absencetype").then(response => response.json().then(response => resolve(response)))
        })
    }
}