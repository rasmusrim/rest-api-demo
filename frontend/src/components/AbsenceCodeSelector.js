import React, { useState, useEffect } from 'react';
import AbsenceTypeService from '../services/AbsenceTypeService';

export default function AbsenceCodeSelector({absenceCodeSelected}) {
    
    const [absenceCodes, setAbsenceCodes] = useState([]);

    useEffect(() => {
        AbsenceTypeService.getAbsenceCodes().then(codes => {
            setAbsenceCodes(codes);
        })
    
    }, [])
    
    return (
        <ul className={"absence-code-selector"}>
            { absenceCodes.map(absenceCode => {
                return <li key={absenceCode.code} onClick={() => absenceCodeSelected(absenceCode.code)}>{absenceCode.label}</li>
             })}
        </ul>
    )
}