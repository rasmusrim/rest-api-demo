import React from 'react';


export default function Student({student}) {
    
    return (
        <>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
        </>
    )
    
}