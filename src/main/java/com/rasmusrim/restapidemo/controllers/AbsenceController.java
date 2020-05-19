package com.rasmusrim.restapidemo.controllers;

import com.rasmusrim.restapidemo.models.AbsenceEntry;
import com.rasmusrim.restapidemo.repositories.AbsenceRepository;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AbsenceController {

    private AbsenceRepository absenceRepository;

    public AbsenceController(AbsenceRepository absenceRepository) {
        this.absenceRepository = absenceRepository;
    }

    @GetMapping({"/absence/{year}/{month}"})
    public Map<Long, AbsenceEntry> getAbsenceForAllStudents(@PathVariable(required = true) String year, @PathVariable(required = true) String month) {
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
        System.out.println(payload.get("date"));
        System.out.println(date);

        AbsenceEntry absenceEntry = absenceRepository.getAbsenceEntryByDateAndStudent(date, Integer.parseInt(studentId));

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

