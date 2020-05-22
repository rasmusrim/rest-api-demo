package com.rasmusrim.restapidemo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Getter
@Setter
public class Student {

    @Id
    @GeneratedValue
    public Long id;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

}

