package com.microservice.creditRequest.repository;
import com.microservice.creditRequest.entity.CreditRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CreditRequestRepository extends JpaRepository<CreditRequestEntity, Long> {
    //public CreditRequestEntity findById(Long creditRequestId);
    //public List<CreditRequestEntity> findByCostumer(Long idCostumer);
}
