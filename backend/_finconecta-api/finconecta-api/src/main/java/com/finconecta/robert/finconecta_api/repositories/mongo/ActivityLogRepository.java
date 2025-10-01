package com.finconecta.robert.finconecta_api.repositories.mongo;

import com.finconecta.robert.finconecta_api.models.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.UUID;

public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {
    List<ActivityLog> findByCustomerId(UUID customerId);
}
