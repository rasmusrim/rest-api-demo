import AbsenceTypeRepository from "../repositories/AbsenceTypeRepository"

export default class AbsenceService {

    static toggleAbsenceCode(code) {
        return new Promise(async (resolve, reject) => {
            let absenceTypes = await this.getAbsenceCodes();
            if (absenceTypes[code + 1]) {
                resolve(code + 1);
            } else {
                resolve(0);
            }

        })
    }

    static getAbsenceCodes() {
        return new Promise(async (resolve, reject) => {
            if (!localStorage.getItem('absenceTypes')) {
                let absenceTypes = await AbsenceTypeRepository.getAbsenceTypes();
                absenceTypes.sort((absenceType1, absenceType2) => {
                    return absenceType1.code - absenceType2.code;
                });
                
                localStorage.setItem('absenceTypes', JSON.stringify(absenceTypes));
            }

            resolve(JSON.parse(localStorage.getItem('absenceTypes')))
        })
    }



}