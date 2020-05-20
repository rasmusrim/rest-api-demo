package com.rasmusrim.restapidemo.controllers;

import com.rasmusrim.restapidemo.models.AbsenceEntry;
import com.rasmusrim.restapidemo.models.AbsenceType;
import com.rasmusrim.restapidemo.repositories.AbsenceRepository;
import com.rasmusrim.restapidemo.repositories.StudentRepository;
import com.rasmusrim.restapidemo.services.AbsenceTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
public class AbsenceController {

    private AbsenceRepository absenceRepository;
    private StudentRepository studentRepository;
    private AbsenceTypeService absenceTypeService;

    public AbsenceController(AbsenceRepository absenceRepository, StudentRepository studentRepository, AbsenceTypeService absenceTypeService) {

        this.absenceRepository = absenceRepository;
        this.studentRepository = studentRepository;
        this.absenceTypeService = absenceTypeService;

    }

    @GetMapping({"/absence/{year}/{month}"})
    public Map<Long, AbsenceEntry> getAbsenceForAllStudents(@PathVariable(required = true) String year, @PathVariable(required = true) String month) {

        if (year.length() != 4) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Year must have four digits"
            );
        }

        if (month.length() < 1 || month.length() > 2) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Month must have one or two digits."
            );

        }

        var date = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), 1);
        var absenceEntries = absenceRepository.getAbsenceEntriesByMonth(date);
        var iterator = absenceEntries.iterator();

        var returnMap = new HashMap<Long, AbsenceEntry>();

        while (iterator.hasNext()) {
            var absenceEntry = iterator.next();
            returnMap.put(absenceEntry.getId(), absenceEntry);
        }

        return returnMap;
    }


    @PostMapping({"/student/absence/{studentId}"})
    public AbsenceEntry setAbsence(@PathVariable(required = true) String studentId, @RequestBody Map<String, String> payload) throws ParseException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(payload.get("date"), formatter);
        Long studentIdLong = Long.parseLong(studentId);
        Byte absenceCode = Byte.parseByte(payload.get("absenceCode"));

        var student = studentRepository.getById(studentIdLong);

        if (student == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Student " + studentId + " not found"
            );
        }

        var absenceType = absenceTypeService.getAbsenceType(absenceCode);

        if (absenceType == null) {
            var absenceTypes = absenceTypeService.getAbsenceTypesAsString();
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid absence type: " + absenceCode + ". Possible values: " + absenceTypes
            );
        }

        AbsenceEntry absenceEntry = absenceRepository.getAbsenceEntryByDateAndStudent(date, studentIdLong);

        if (absenceEntry == null) {
            absenceEntry = new AbsenceEntry();
        }

        absenceEntry.setDate(date);
        absenceEntry.setStudentId(Integer.parseInt(studentId));
        absenceEntry.setAbsenceCode(Byte.parseByte(payload.get("absenceCode")));

        absenceRepository.save(absenceEntry);

        return absenceEntry;

    }

}

