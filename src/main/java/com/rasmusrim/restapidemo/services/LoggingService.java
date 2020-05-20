package com.rasmusrim.restapidemo.services;

import java.io.FileWriter;
import java.io.IOException;

public class LoggingService {

    static public void log(String text) {
        try {
            FileWriter logWriter = new FileWriter("log.txt", true);
            logWriter.write(text + "\n");
            logWriter.close();

        } catch (IOException e) {
            System.out.println("Could not create log file");

        }

    }
}
