package com.finconecta.robert.finconecta_api.controllers;

import com.finconecta.robert.finconecta_api.dtos.JwtResponse;
import com.finconecta.robert.finconecta_api.dtos.LoginRequest;
import com.finconecta.robert.finconecta_api.models.User;
import com.finconecta.robert.finconecta_api.repositories.jpa.UserRepository;
import com.finconecta.robert.finconecta_api.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String jwt = jwtUtil.generateJwtToken(user.getUsername(), user.getRoles());

        return ResponseEntity.ok(new JwtResponse(jwt, "Bearer", user.getUsername()));
    }
}
