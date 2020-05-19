package com.rasmusrim.restapidemo.services;

import com.rasmusrim.restapidemo.i18n.services.LocaleService;
import com.rasmusrim.restapidemo.models.AbsenceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Scope("singleton")
public class AbsenceTypeService {
    private Set<AbsenceType> absenceTypes;

    @Autowired
    private LocaleService localeService;

    public AbsenceTypeService() {
        absenceTypes = new HashSet<>();

        AbsenceType noData = new AbsenceType();
        noData.setCode((byte) 0);
        noData.setName("NO_DATA");
        noData.setColor(Color.WHITE);
        absenceTypes.add(noData);

        AbsenceType present = new AbsenceType();
        present.setCode((byte) 1);
        present.setName("PRESENT");
        present.setColor(Color.GREEN);

        absenceTypes.add(present);

        AbsenceType notPresent = new AbsenceType();
        notPresent.setCode((byte) 2);
        notPresent.setName("NOT_PRESENT");
        notPresent.setColor(Color.RED);

        absenceTypes.add(notPresent);
    }

    public Set<AbsenceType> getAbsenceTypes() {
        return absenceTypes;
    }

    public Set<AbsenceType> getAbsenceTypes(Locale locale) {
        return addI18nNameToAbsenceTypes(getAbsenceTypes(), locale);
    }

    private Set<AbsenceType> addI18nNameToAbsenceTypes(Set<AbsenceType> absenceTypes, Locale locale) {
        localeService.setLocale(locale);

        absenceTypes.forEach(absenceType -> {
            var label = localeService.getMessage("absencetype." + absenceType.getName());
            absenceType.setLabel(label);
        });

        return absenceTypes;
    }

    public AbsenceType getAbsenceType(byte code) {
        Set<AbsenceType> filteredSet = absenceTypes.stream()
                .filter(s -> s.getCode() == code)
                .collect(Collectors.toSet());

        if (filteredSet.size() > 0) {
            return (AbsenceType) filteredSet.toArray()[0];
        } else {
            return null;
        }
    }

    public String getAbsenceTypesAsString() {
        var absenceTypes = getAbsenceTypes();
        String absenceCodes = "";

        for (AbsenceType type : absenceTypes) {
            if (absenceCodes.length() > 0) {
                absenceCodes += ", ";
            }
            absenceCodes += type.getCode() + " (" + type.getName() + ")";
        }

        return absenceCodes;

    }
}
