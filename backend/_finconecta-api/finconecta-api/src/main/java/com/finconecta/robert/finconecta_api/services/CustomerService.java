package com.finconecta.robert.finconecta_api.services;

import com.finconecta.robert.finconecta_api.models.Customer;
import com.finconecta.robert.finconecta_api.models.ActivityLog;
import com.finconecta.robert.finconecta_api.repositories.jpa.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final ActivityLogService activityLogService;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, ActivityLogService activityLogService) {
        this.customerRepository = customerRepository;
        this.activityLogService = activityLogService;
    }

    public Customer save(Customer customer) {
        boolean isUpdate = customer.getId() != null;

        Customer savedCustomer = customerRepository.save(customer);

        UUID customerId = savedCustomer.getId();
        String actionType = isUpdate ? "CUSTOMER_UPDATE" : "CUSTOMER_CREATE";
        String details = isUpdate
                ? "Customer updated: " + savedCustomer.getFirstName() + " (ID: " + customerId + ")"
                : "New customer created: " + savedCustomer.getFirstName() + " (ID: " + customerId + ")";

        ActivityLog log = new ActivityLog(
                customerId,
                "SYSTEM_USER",
                actionType,
                details
        );
        activityLogService.saveLog(log);

        return savedCustomer;
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Optional<Customer> findById(UUID id) {
        return customerRepository.findById(id);
    }

    @Transactional
    public void deleteById(UUID id) {
        Optional<Customer> customerOpt = customerRepository.findById(id);

        if (customerOpt.isPresent()) {
            Customer customerToDelete = customerOpt.get();
            customerRepository.deleteById(id);

            ActivityLog log = new ActivityLog(
                    id,
                    "SYSTEM_USER",
                    "CUSTOMER_DELETE",
                    "Customer deleted: " + customerToDelete.getFirstName() + " (ID: " + id + ")"
            );
            activityLogService.saveLog(log);
        }
    }
}