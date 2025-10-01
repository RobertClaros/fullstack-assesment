package com.finconecta.robert.finconecta_api.services;

import com.finconecta.robert.finconecta_api.models.ActivityLog;
import com.finconecta.robert.finconecta_api.repositories.mongo.ActivityLogRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    public ActivityLog saveLog(ActivityLog log) {
        return activityLogRepository.save(log);
    }

    public List<ActivityLog> getLogsByCustomerId(UUID customerId) {
        return activityLogRepository.findByCustomerId(customerId);
    }

    public List<ActivityLog> findAll() {
        return activityLogRepository.findAll();
    }
}
