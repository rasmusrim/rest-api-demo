package com.rasmusrim.restapidemo;

import com.rasmusrim.restapidemo.repositories.StudentRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = RestApiDemoApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class StudentApiTests extends BaseApiTest {

    @Autowired
    private StudentRepository studentRepository;

    @Test
    public void checkIf403WhenIncorrectApiKey() {
        HttpEntity<String> entity = new HttpEntity<String>(null, null);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/student"),
                HttpMethod.GET, entity, String.class);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    @Test
    public void checkIfItIsPossibleToCreateStudent() {
        JSONObject response = createStudent();

        try {
            assertEquals("John", response.get("firstName").toString());
            assertEquals("Doe", response.get("lastName").toString());
        } catch (JSONException e) {
            fail(e.getMessage());
        }


    }

    @Test
    public void checkIfItIsPossibleToFetchStudent() {
        String studentId = createStudentAndReturnStudentId();

        var responseObj = fetch("/student/" + studentId);

        try {
            assertEquals("John", responseObj.get("firstName").toString());
            assertEquals("Doe", responseObj.get("lastName").toString());
        } catch (JSONException e) {
            fail(e.getMessage());
        }
    }

    @Test
    public void checkIfItIsPossibleToDeleteStudent() {
        String studentId = createStudentAndReturnStudentId();
        System.out.println(studentId);

        fetch("/student/" + studentId, HttpMethod.DELETE);

        HttpEntity<String> entity = new HttpEntity<>(null, getDefaultHeaders());
        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/student/" + studentId),
                HttpMethod.GET, entity, String.class);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void checkIfItIsPossibleToUpdateStudent() {
        String studentId = createStudentAndReturnStudentId();

        String body = "{ \"firstName\": \"Jill\", \"lastName\": \"Johnson\" }";
        fetch("/student/" + studentId, body, HttpMethod.POST, getDefaultHeaders());

        JSONObject response = fetch("/student/" + studentId);

        try {
            assertEquals("Jill", response.get("firstName").toString());
            assertEquals("Johnson", response.get("lastName").toString());
        } catch (JSONException e) {
            fail(e.getMessage());
        }

    }

    private JSONObject createStudent() {
        var response = fetch("/student", "{ \"firstName\": \"John\", \"lastName\": \"Doe\" }", HttpMethod.POST, getDefaultHeaders());

        return response;
    }

    private String createStudentAndReturnStudentId() {
        JSONObject response = createStudent();
        try {
            return response.get("id").toString();
        } catch (JSONException e) {
            fail(e.getMessage());
        }

        return null;


    }

}
