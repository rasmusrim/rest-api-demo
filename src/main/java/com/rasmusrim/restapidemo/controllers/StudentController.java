package com.rasmusrim.restapidemo.controllers;

import com.rasmusrim.restapidemo.models.Student;
import com.rasmusrim.restapidemo.repositories.AbsenceRepository;
import com.rasmusrim.restapidemo.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class StudentController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AbsenceRepository absenceRepository;


    @GetMapping({"/student/{id}"})
    public Student getSingleStudent(@PathVariable(required = true) String id) {
        Student student = studentRepository.getById(Long.parseLong(id));
        System.out.println(student);
        return student;

    }

    @GetMapping({"/student"})
    public Map<Long, Student> getAllStudents() {
        var students = studentRepository.findAll();
        var iterator = students.iterator();

        var returnMap = new HashMap<Long, Student>();

        while(iterator.hasNext()) {
            var student = iterator.next();
            returnMap.put(student.getId(), student);
        }


        return returnMap;

    }

}

