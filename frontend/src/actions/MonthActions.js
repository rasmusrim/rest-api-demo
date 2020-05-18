export const CHANGE_MONTH = "CHANGE_MONTH"

export function changeMonth(month) {
    
    const returnValue = {
        type: CHANGE_MONTH,
        month
      }

      return returnValue
  }