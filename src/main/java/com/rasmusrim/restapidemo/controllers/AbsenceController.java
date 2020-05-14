package com.rasmusrim.restapidemo.controllers;

import com.rasmusrim.restapidemo.models.AbsenceEntry;
import com.rasmusrim.restapidemo.repositories.AbsenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AbsenceController {

    @Autowired
    private AbsenceRepository absenceRepository;

    @GetMapping({"/absence/{studentId}/{year}/{month}"})
    public Map<Long, AbsenceEntry> getAbsenceForSingleStudent(@PathVariable(required = true) String studentId, @PathVariable(required = true) String year, @PathVariable(required = true) String month) {
        var date = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month),1);

        var absenceEntries = absenceRepository.getAbsenceByStudentAndMonth(Integer.parseInt(studentId), date);
        var iterator = absenceEntries.iterator();

        var returnMap = new HashMap<Long, AbsenceEntry>();

        while(iterator.hasNext()) {
            var absenceEntry = iterator.next();
            returnMap.put(absenceEntry.getId(), absenceEntry);
        }


        return returnMap;

    }

    @GetMapping({"/absence/{year}/{month}"})
    public Map<Long, AbsenceEntry> getAbsenceForAllStudents(@PathVariable(required = true) String year, @PathVariable(required = true) String month) {
        var date = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month),1);
        var absenceEntries = absenceRepository.getAbsenceByMonth(date);
        var iterator = absenceEntries.iterator();

        var returnMap = new HashMap<Long, AbsenceEntry>();

        while(iterator.hasNext()) {
            var absenceEntry = iterator.next();
            returnMap.put(absenceEntry.getId(), absenceEntry);
        }

        return returnMap;
    }


    @PatchMapping({"/student/absence/{id}"})
    public AbsenceEntry setAbsence(@PathVariable(required = true) String id, @RequestBody Map<String, String> payload) throws ParseException {
        var absence = new AbsenceEntry();

        var date = Date.from(Instant.parse(payload.get("date")));

        absence.setDate(date);
        absence.setStudentId(Integer.parseInt(id));
        absence.setAbsenceCode(Byte.parseByte(payload.get("absenceCode")));

        absenceRepository.save(absence);

        return absence;

    }

}

