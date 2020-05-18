export const SET_STUDENTS = "SET_STUDENTS"

export function setStudents(students) {

    const returnValue = {
        type: SET_STUDENTS,
        students
      }

    return returnValue
  }