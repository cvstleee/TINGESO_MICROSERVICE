package com.microservice.costumer.repository;
import com.microservice.costumer.entity.CostumerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CostumerRepository extends JpaRepository<CostumerEntity, Long> {
    public CostumerEntity findByRut(String rut);
    public List<CostumerEntity> findByName(String name);
    public List<CostumerEntity> findByLastName(String lastName);
    public List<CostumerEntity> findByAge(int age);
    public List<CostumerEntity> findByMonthlyIncome (int monthlyIncome);

}
