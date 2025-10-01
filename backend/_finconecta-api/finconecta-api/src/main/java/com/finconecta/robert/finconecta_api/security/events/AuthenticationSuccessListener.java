package com.finconecta.robert.finconecta_api.security.events;

import com.finconecta.robert.finconecta_api.models.ActivityLog;
import com.finconecta.robert.finconecta_api.services.ActivityLogService;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationSuccessListener implements ApplicationListener<AuthenticationSuccessEvent> {

    private final ActivityLogService activityLogService;

    public AuthenticationSuccessListener(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        String username = event.getAuthentication().getName();

        ActivityLog log = new ActivityLog(
                null,
                username,
                "LOGIN_SUCCESS",
                "Successful login. JWT token issued."
        );
        activityLogService.saveLog(log);
    }
}