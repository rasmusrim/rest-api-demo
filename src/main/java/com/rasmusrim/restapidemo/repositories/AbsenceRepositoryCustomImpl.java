package com.rasmusrim.restapidemo.repositories;


import com.rasmusrim.restapidemo.models.AbsenceEntry;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.time.LocalDate;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class AbsenceRepositoryCustomImpl implements AbsenceRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<AbsenceEntry> getAbsenceByStudentAndMonth(int studentId, LocalDate date) {
        var firstDay = date.toString();
        var lastDay = LocalDate.parse(date.getYear() + "-" + String.format("%02d", date.getMonthValue())  + "-" + date.lengthOfMonth());

        Query query = entityManager.createNativeQuery("SELECT * FROM absence " +
                "WHERE student_id = ? AND date <= ? AND date >= ?", AbsenceEntry.class);
        query.setParameter(1, studentId);
        query.setParameter(2, lastDay);
        query.setParameter(3, firstDay);
        return query.getResultList();
    }

    @Override
    public List<AbsenceEntry> getAbsenceByMonth(LocalDate date) {
        var firstDay = date.toString();
        var lastDay = LocalDate.parse(date.getYear() + "-" + String.format("%02d", date.getMonthValue())  + "-" + date.lengthOfMonth());

        Query query = entityManager.createNativeQuery("SELECT * FROM absence " +
                "WHERE date <= ? AND date >= ?", AbsenceEntry.class);
        query.setParameter(1, lastDay);
        query.setParameter(2, firstDay);
        return query.getResultList();
    }


}
