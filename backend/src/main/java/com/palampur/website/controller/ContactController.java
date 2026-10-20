package com.palampur.website.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class ContactController {

    @PostMapping("/contact")
    public String submitContact(@RequestBody Map<String, String> formData) {
        String name = formData.get("name");
        String email = formData.get("email");
        String message = formData.get("message");

        // Save to DB or send email (future expansion)
        return "Thank you, " + name + "! We received your message: " + message;
    }
}

