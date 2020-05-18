import React from 'react'
import { changeMonth } from '../actions/MonthActions'

import { connect } from 'react-redux'
import moment from 'moment';

function Toolbar({ month, changeMonth }) {
    const goToLastMonth = () => {
        let lastMonth = moment(month).subtract(1, 'months');
        changeMonth(lastMonth)
    }

    const goToNextMonth = () => {
        let nextMonth = moment(month).add(1, 'months');
        changeMonth(nextMonth)

    }

    return (
        <>
            <button onClick={goToLastMonth}>&lt;&lt; Last month</button>
            <span>{moment(month).format("MMMM YYYY")}</span>
            <button onClick={goToNextMonth}>Next month &gt;&gt;</button>
        </>

    )

}

function mapStateToProps(state) {
    return {
        month: state.month
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changeMonth: month => {
            dispatch(changeMonth(month))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);


