package com.rasmusrim.restapidemo.controllers;

import com.rasmusrim.restapidemo.models.Student;
import com.rasmusrim.restapidemo.repositories.AbsenceRepository;
import com.rasmusrim.restapidemo.repositories.StudentRepository;
import com.rasmusrim.restapidemo.services.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class StudentController {

    public StudentController(StudentRepository studentRepository, AbsenceRepository absenceRepository) {
        this.absenceRepository = absenceRepository;
        this.studentRepository = studentRepository;
    }

    private StudentRepository studentRepository;
    private AbsenceRepository absenceRepository;

    @GetMapping({"/student/{id}"})
    public Student getSingleStudent(@PathVariable(required = true) String id) {
        Student student = studentRepository.getById(Long.parseLong(id));

        if (student == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Student not found"
            );
        }

        return student;

    }

    @GetMapping({"/student"})
    public Map<Long, Student> getAllStudents() {
        var students = studentRepository.findAll();
        var iterator = students.iterator();

        var returnMap = new HashMap<Long, Student>();

        while (iterator.hasNext()) {
            var student = iterator.next();
            returnMap.put(student.getId(), student);
        }

        return returnMap;

    }

    @DeleteMapping("/student/{studentId}")
    @Transactional
    public boolean deleteStudent(@PathVariable(required = true) String studentId) {
        long studentIdLong = Long.parseLong(studentId);

        try {
            studentRepository.deleteById(studentIdLong);
            absenceRepository.deleteByStudentId(studentIdLong);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Student with ID " + studentId + " not found."
            );
        }

        return true;
    }

    @PostMapping("/student")
    public Student addStudent(@RequestBody Map<String, String> payload) {
        String firstName = payload.get("firstName");
        String lastName = payload.get("lastName");

        if (firstName.trim() == "" || lastName.trim() == "") {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "First or last name missing"
            );
        }

        var student = new Student();
        student.setFirstName(firstName);
        student.setLastName(lastName);

        return studentRepository.save(student);

    }

    @PostMapping("/student/{studentId}")
    public Student addStudent(@PathVariable(required = true) String studentId, @RequestBody Map<String, String> payload) {
        String firstName = payload.get("firstName");
        String lastName = payload.get("lastName");

        var student = studentRepository.getById(Long.parseLong(studentId));

        if (student == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Student not found"
            );
        }

        student.setFirstName(firstName);
        student.setLastName(lastName);

        return studentRepository.save(student);

    }

}

