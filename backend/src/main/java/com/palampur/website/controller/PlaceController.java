package com.palampur.website.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class PlaceController {

    @GetMapping("/places")
    public List<Map<String, String>> getPlaces() {
        return List.of(
            Map.of("name", "Dhauladhar Mountains", "info", "Snow-capped peaks offering breathtaking views."),
            Map.of("name", "Tea Gardens", "info", "Lush green tea plantations spread across Palampur."),
            Map.of("name", "Neugal Khad", "info", "A serene stream with picnic spots."),
            Map.of("name", "Andretta Village", "info", "Artistic village known for pottery and culture."),
            Map.of("name", "Bir-Billing", "info", "World-famous paragliding destination.")
        );
    }
}

