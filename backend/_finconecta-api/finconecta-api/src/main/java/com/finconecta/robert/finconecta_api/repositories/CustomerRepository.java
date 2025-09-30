package com.finconecta.robert.finconecta_api.repositories;

import com.finconecta.robert.finconecta_api.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}