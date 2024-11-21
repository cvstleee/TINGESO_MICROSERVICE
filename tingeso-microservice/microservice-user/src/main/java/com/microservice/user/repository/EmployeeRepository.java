package com.microservice.user.repository;

import com.microservice.user.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    public List<EmployeeEntity> findByFirstName(String firstName);
    public List<EmployeeEntity> findByLastName(String lastName);
    public EmployeeEntity findByEmail(String email);

}
