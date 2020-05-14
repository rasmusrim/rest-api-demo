package com.rasmusrim.restapidemo.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Getter
@Setter
public class AbsenceEntry {
    @Id
    @GeneratedValue
    private Long id;

    private long studentId;

    @Type(type="date")
    private Date date;
    private byte absenceCode;



}
