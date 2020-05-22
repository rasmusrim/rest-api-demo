package com.rasmusrim.restapidemo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.PersistenceContext;
import java.awt.*;

@Getter
@Setter
public class AbsenceType {
    private String name;
    private byte code;

    @JsonIgnore
    private Color color;
    private String label;

    @JsonProperty("color")
    private String hexColor;

    public void setColor(Color color) {

        this.color = color;

        if (color != null) {
            hexColor = "#" + Integer.toHexString(color.getRGB()).substring(2);
        }
    }

    public AbsenceType clone() {
        return this.clone();
    }
}
