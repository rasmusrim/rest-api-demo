export const SET_ACTIVE_ABSENCE_TYPE_SELECTOR = "SET_ACTIVE_ABSENCE_TYPE_SELECTOR"

export function setActiveAbsenceTypeSelector(studentId, date) {
    
    const returnValue = {
        type: SET_ACTIVE_ABSENCE_TYPE_SELECTOR,
        studentId,
        date
      }

      return returnValue
  }