package com.rasmusrim.restapidemo.controllers;

import com.rasmusrim.restapidemo.i18n.helper.LocaleResolver;
import com.rasmusrim.restapidemo.models.AbsenceType;
import com.rasmusrim.restapidemo.services.AbsenceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

@RestController
public class AbsenceTypeController {

    @Autowired
    private AbsenceTypeService absenceTypeService;

    @GetMapping({"/absencetype"})
    public Set<AbsenceType> getTypes(HttpServletRequest request) {
        var lr = new LocaleResolver();
        var locale = lr.resolveLocale(request);

        var absenceTypes = absenceTypeService.getAbsenceTypes(locale);

        return absenceTypes;
    }

}

