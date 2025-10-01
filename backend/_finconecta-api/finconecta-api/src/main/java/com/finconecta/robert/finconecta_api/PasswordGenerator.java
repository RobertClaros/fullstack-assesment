package com.finconecta.robert.finconecta_api;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility class to generate a BCrypt hash for a given raw password.
 */
public class PasswordGenerator {

    public static void main(String[] args) {
        final String rawPassword = "xxxxx";
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("--------------------------------------------------------------------------------------------------");
        System.out.println("password: " + rawPassword);
        System.out.println("HASH BCrypt : " + encodedPassword);
        System.out.println("--------------------------------------------------------------------------------------------------");
    }
}

