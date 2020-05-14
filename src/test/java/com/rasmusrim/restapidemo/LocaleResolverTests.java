package com.rasmusrim.restapidemo;

import com.rasmusrim.restapidemo.i18n.helper.LocaleResolver;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.junit.Before;


import java.util.Locale;

@SpringBootTest
class LocaleResolverTests {

	@Test
	void simpleLocaleResolverTest() {
		var lr = new LocaleResolver();
		MockHttpServletRequest request = new MockHttpServletRequest();
		request.addHeader("Accept-Language", "no,en");

		var locale = lr.resolveLocale(request);

		assertThat(locale.toString(), is("no"));
	}

	@Test
	void noHeaderPresent() {
		var lr = new LocaleResolver();
		MockHttpServletRequest request = new MockHttpServletRequest();

		var locale = lr.resolveLocale(request);

		assertThat(locale.toString(), is("en_US"));
	}

}
