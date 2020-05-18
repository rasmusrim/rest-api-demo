package com.rasmusrim.restapidemo.repositories;


import com.rasmusrim.restapidemo.models.AbsenceEntry;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class AbsenceRepositoryCustomImpl implements AbsenceRepositoryCustom {

    private String tableName = "absence_entry";

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<AbsenceEntry> getAbsenceByMonth(LocalDate date) {
        var firstDay = date.toString();
        var lastDay = LocalDate.parse(date.getYear() + "-" + String.format("%02d", date.getMonthValue())  + "-" + date.lengthOfMonth());

        Query query = entityManager.createNativeQuery("SELECT * FROM " + tableName +
                " WHERE date <= ? AND date >= ?", AbsenceEntry.class);
        query.setParameter(1, lastDay);
        query.setParameter(2, firstDay);

        return query.getResultList();
    }



}
