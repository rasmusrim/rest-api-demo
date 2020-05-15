import React, { useEffect, useState } from 'react';
import AbsenceTypeService from '../services/AbsenceTypeService'


export default function StudentAbsenceCell({ absenceEntry }) {

    const [absenceType, setAbsenceType] = useState();


    useEffect(() => {
        if (typeof absenceEntry !== "undefined" && typeof absenceEntry.absenceCode !== "undefined") {
            AbsenceTypeService.getAbsenceType(absenceEntry.absenceCode).then(response => {
                setAbsenceType(response)
            })
        }
    }, [absenceEntry])

    let color;

    if (absenceType) {
        color = absenceType.color
    }

    return (
        <div style={{ backgroundColor: color, width: "20px", height: "20px" }}>
            
        </div>
    )
}
