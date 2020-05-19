export const SET_STUDENTS = "SET_STUDENTS"
export const UPDATE_STUDENT = "UPDATE_STUDENTS"

export function setStudents(students) {

  const returnValue = {
    type: SET_STUDENTS,
    students
  }

  return returnValue
}

export function updateStudent(student) {

  const returnValue = {
    type: UPDATE_STUDENT,
    student
  }

  return returnValue
}