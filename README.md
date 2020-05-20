# REST API Demo
A REST server written in Java with Spring Boot to allow teachers to add, update and delete students in addition to specifying their absence/presence on a specific day.

## Setting up
The API is configured to run with a mySQL server. See `resources/application.properties` to change host, port, credentials or database na,e.

## Running
    ./gradle bootRun

## Frontend
There is a simple React frontend in the folder `frontend/`. See the README file here for documentation.

## Methods
See the files in the folder `frontend/restServices` to see which methods exist and how they are used.