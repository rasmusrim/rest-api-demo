package com.rasmusrim.restapidemo.i18n.services;

import com.rasmusrim.restapidemo.i18n.helper.LocaleResolver;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.Locale;

@Service
@Getter
@Setter
public class LocaleService {
    private Locale locale;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private LocaleResolver localeResolver;

    public String getMessage(String code) {

        if (locale == null) {
            locale = localeResolver.getDefaultLocale();
        }

        return messageSource.getMessage(code, null, locale);
    }
}