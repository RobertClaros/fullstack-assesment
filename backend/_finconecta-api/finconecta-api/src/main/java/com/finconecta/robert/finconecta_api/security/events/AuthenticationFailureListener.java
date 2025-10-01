package com.finconecta.robert.finconecta_api.security.events;

import com.finconecta.robert.finconecta_api.models.ActivityLog;
import com.finconecta.robert.finconecta_api.services.ActivityLogService;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFailureListener implements ApplicationListener<AuthenticationFailureBadCredentialsEvent> {

    private final ActivityLogService activityLogService;

    public AuthenticationFailureListener(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @Override
    public void onApplicationEvent(AuthenticationFailureBadCredentialsEvent event) {
        String username = (String) event.getAuthentication().getPrincipal();

        ActivityLog log = new ActivityLog(
                null,
                username,
                "LOGIN_FAILURE",
                "Login failed due to bad credentials."
        );
        activityLogService.saveLog(log);
    }
}