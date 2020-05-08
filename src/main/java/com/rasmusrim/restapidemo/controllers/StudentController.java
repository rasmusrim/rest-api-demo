package com.rasmusrim.restapidemo.controllers;

import com.rasmusrim.restapidemo.models.Student;
import com.rasmusrim.restapidemo.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class StudentController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping({"/student/{id}"})
    public Student getSingleStudent(@PathVariable(required = true) String id) {
        Student student = studentRepository.getById(Long.parseLong(id));
        System.out.println(student);
        return student;

    }

    @GetMapping({"/student"})
    public Iterable<Student> getAllStudent() {
        Iterable<Student> students = studentRepository.findAll();

        return students;

    }

}

