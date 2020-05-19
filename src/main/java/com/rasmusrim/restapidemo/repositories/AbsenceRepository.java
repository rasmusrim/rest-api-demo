package com.rasmusrim.restapidemo.repositories;

import com.rasmusrim.restapidemo.models.AbsenceEntry;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AbsenceRepository extends CrudRepository<AbsenceEntry, Long>, AbsenceRepositoryCustom {
    public void deleteByStudentId(long studentId);
}
