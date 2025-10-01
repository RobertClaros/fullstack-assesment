package com.finconecta.robert.finconecta_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// Esta configuración le dice a Spring que SOLO busque repositorios JPA
// en el paquete 'repositories.jpa'.
@Configuration
@EnableJpaRepositories(
        basePackages = {"com.finconecta.robert.finconecta_api.repositories.jpa"}
)
public class JpaConfig {
    // Esto habilita la capa de acceso a datos para PostgreSQL
}
