package com.rasmusrim.restapidemo.repositories;

import com.rasmusrim.restapidemo.models.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {
    Student getById(long id);
}
