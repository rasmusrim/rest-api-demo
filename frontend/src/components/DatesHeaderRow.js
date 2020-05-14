import React from 'react';


export default function DatesRow({month}) {
    let currentDay = month.clone().startOf('month').clone();

    let output = [];
    
    let i = 0;
    while (currentDay.month() === month.month() && i < 100) {
        output.push(<td key={"day-in-month-" + currentDay.date()}>{currentDay.format("DD")}</td>)
        currentDay.add(1, 'day')
        i++;
    }

    return output;

}