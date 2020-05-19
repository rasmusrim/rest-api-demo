import React from 'react';

import moment from 'moment';

export default function DatesHeaderRow({month}) {
    

    let currentDay = moment(month).startOf('month').clone();

    let output = [];
    
    let i = 0;
    while (currentDay.month() === moment(month).month() && i < 100) {
        output.push(<td key={"day-in-month-" + currentDay.date()}>{currentDay.format("DD")}</td>)
        currentDay.add(1, 'day')
        i++;
    }

    return output;

}