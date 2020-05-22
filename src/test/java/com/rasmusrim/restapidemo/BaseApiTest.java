package com.rasmusrim.restapidemo;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

abstract public class BaseApiTest {
    @LocalServerPort
    private int port;

    @Value("${http.auth-token}")
    private String apiKey;

    @Value("${http.auth-token-header-name}")
    private String apiKeyHeaderName;

    TestRestTemplate restTemplate = new TestRestTemplate();

    protected JSONObject fetch(String url, String body, HttpMethod method, HttpHeaders headers) {
        HttpEntity<String> entity = new HttpEntity<String>(body, headers);
        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort(url),
                method, entity, String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        try {
            JSONObject responseObj = new JSONObject(response.getBody());
            return responseObj;
        } catch (JSONException e) {
            fail(e.getMessage() + " when fetching " + url + " with method " + method);
        }

        return null;

    }

    protected JSONObject fetch(String url, String body) {
        HttpMethod method = HttpMethod.GET;

        return fetch(url, body, method, getDefaultHeaders());
    }

    protected JSONObject fetch(String url, HttpMethod method) {

        return fetch(url, null, method, getDefaultHeaders());
    }


    protected JSONObject fetch(String url) {

        HttpMethod method = HttpMethod.GET;

        return fetch(url, "", method, getDefaultHeaders());
    }

    protected HttpHeaders getDefaultHeaders() {
        HttpHeaders headers = new HttpHeaders();

        headers.add(apiKeyHeaderName, apiKey);
        headers.add("content-type", "application/json");

        return headers;

    }


    protected String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }

}
