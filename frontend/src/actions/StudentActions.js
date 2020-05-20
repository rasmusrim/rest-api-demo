export const SET_STUDENTS = "SET_STUDENTS"
export const UPDATE_STUDENT = "UPDATE_STUDENT"
export const DELETE_STUDENT = "DELETE_STUDENT"
export const ADD_STUDENT = "ADD_STUDENT"

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

export function deleteStudent(student) {
  const returnValue = {
    type: DELETE_STUDENT,
    student
  }

  return returnValue
}

export function addStudent(student) {

  const returnValue = {
    type: ADD_STUDENT,
    student
  }

  return returnValue
}