import restConfig from "../config.json";
import BaseRestService from "./BaseRestService"

export default class AbsenceTypeRepository {
    static getAbsenceTypes() {
        
        return new Promise((resolve, reject) => {
            BaseRestService.fetch(restConfig.baseRestUrl + "/absencetype").then(response => response.json().then(response => resolve(response)))
        })
    }
}