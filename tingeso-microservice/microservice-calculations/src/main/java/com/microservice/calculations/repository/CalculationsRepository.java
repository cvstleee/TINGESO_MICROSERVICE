package com.microservice.calculations.repository;

import com.microservice.calculations.entity.CalculationsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalculationsRepository extends JpaRepository<CalculationsEntity, Long> {
    CalculationsEntity findByIdCreditRequest(Long idCreditRequest);
}
