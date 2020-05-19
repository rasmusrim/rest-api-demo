package com.rasmusrim.restapidemo.repositories;

import com.rasmusrim.restapidemo.models.AbsenceEntry;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AbsenceRepositoryCustom {
    List<AbsenceEntry> getAbsenceEntriesByMonth(LocalDate date);
    AbsenceEntry getAbsenceEntryByDateAndStudent(LocalDate date, int studentId);

}
