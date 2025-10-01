package com.finconecta.robert.finconecta_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(
        basePackages = {"com.finconecta.robert.finconecta_api.repositories.mongo"}
)
public class MongoConfig {
}