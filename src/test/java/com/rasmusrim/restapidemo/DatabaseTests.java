package com.rasmusrim.restapidemo;

import com.rasmusrim.restapidemo.models.AbsenceEntry;
import com.rasmusrim.restapidemo.models.Student;
import com.rasmusrim.restapidemo.repositories.AbsenceRepository;
import com.rasmusrim.restapidemo.repositories.StudentRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { RestApiDemoApplication.class })
@ActiveProfiles("test")
public class DatabaseTests {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AbsenceRepository absenceRepository;


    @Test
    public void checkIfStudentCanBeAdded() {
        Student student = new Student();
        student.setFirstName("John");
        student.setLastName("Doe");
        var savedStudent = studentRepository.save(student);

        var fetchedStudent = studentRepository.getById(savedStudent.getId());

        assertEquals("John", fetchedStudent.getFirstName());
        assertEquals("Doe", fetchedStudent.getLastName());


    }

    @Test
    public void checkIfStudentCanBeUpdated() {
        Student student = new Student();
        student.setFirstName("John");
        student.setLastName("Doe");
        var savedStudent = studentRepository.save(student);
        long id = savedStudent.getId();

        var studentToUpdate = studentRepository.getById(savedStudent.getId());
        studentToUpdate.setFirstName("Jill");
        studentRepository.save(studentToUpdate);

        var fetchedStudent = studentRepository.getById(id);

        assertEquals(studentToUpdate.getFirstName(), fetchedStudent.getFirstName());
        assertEquals(studentToUpdate.getLastName(), fetchedStudent.getLastName());
    }

    @Test
    public void checkIfStudentCanBeDeleted() {
        Student student = new Student();
        student.setFirstName("John");
        student.setLastName("Doe");
        var savedStudent = studentRepository.save(student);
        long id = savedStudent.getId();

        studentRepository.deleteById(id);

        var fetchedStudent = studentRepository.getById(id);

        assertEquals(null, fetchedStudent);
    }

    @Test
    public void checkIfAbsenceEntryCanBeSaved() {
        var absenceEntry = new AbsenceEntry();
        absenceEntry.setStudentId(1);
        absenceEntry.setDate(LocalDate.now());
        absenceEntry.setAbsenceCode((byte)1);
        var savedAbsenceEntry = absenceRepository.save(absenceEntry);

        AbsenceEntry fetchedAbsenceEntry = absenceRepository.getById(savedAbsenceEntry.getId());

        assertEquals(absenceEntry.getStudentId(), fetchedAbsenceEntry.getStudentId());
        assertEquals(absenceEntry.getAbsenceCode(), fetchedAbsenceEntry.getAbsenceCode());
        assertEquals(absenceEntry.getDate(), fetchedAbsenceEntry.getDate());


    }


}

