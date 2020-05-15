import AbsenceTypeRepository from "../repositories/AbsenceTypeRepository"

export default class AbsenceTypeService {

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



    static async getAbsenceType(code) {
        let absenceCodes = await this.getAbsenceCodes();
        return absenceCodes[code];
    }
}