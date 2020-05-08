package com.rasmusrim.restapidemo;

import com.rasmusrim.restapidemo.models.Student;
import org.springframework.data.repository.Repository;

public interface PatientRepository extends Repository<Student, Long> {

}