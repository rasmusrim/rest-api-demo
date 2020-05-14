import React, { useState, useEffect } from 'react';
import AbsenceService from '../services/AbsenceService';

export default function AbsenceCodeSelector({absenceCodeSelected}) {
    
    const [absenceCodes, setAbsenceCodes] = useState([]);


    useEffect(() => {
        AbsenceService.getAbsenceCodes().then(codes => {
            setAbsenceCodes(codes);
        })
    
    }, [])

    
    return (
        <ul className={"absence-code-selector"}>
            { absenceCodes.map(absenceCode => {
                return <li onClick={() => absenceCodeSelected(absenceCode.code)}>{absenceCode.label}</li>
             })}
        </ul>
    )
}