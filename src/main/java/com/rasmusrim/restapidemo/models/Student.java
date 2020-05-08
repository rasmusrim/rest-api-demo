package com.rasmusrim.restapidemo.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Student {

    @Id
    public long id;
    private String firstName;
    private String lastName;

}

