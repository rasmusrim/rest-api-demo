package com.rasmusrim.restapidemo.repositories;

import com.rasmusrim.restapidemo.models.AbsenceEntry;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbsenceRepository extends CrudRepository<AbsenceEntry, Long>, AbsenceRepositoryCustom {
}
