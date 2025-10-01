package com.finconecta.robert.finconecta_api.controllers;

import com.finconecta.robert.finconecta_api.models.ActivityLog;
import com.finconecta.robert.finconecta_api.services.ActivityLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/logs")
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    public ActivityLogController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @GetMapping
    public ResponseEntity<List<ActivityLog>> getAllLogs() {
        return ResponseEntity.ok(activityLogService.findAll());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ActivityLog>> getLogsByCustomerId(@PathVariable UUID customerId) {
        return ResponseEntity.ok(activityLogService.getLogsByCustomerId(customerId));
    }
}