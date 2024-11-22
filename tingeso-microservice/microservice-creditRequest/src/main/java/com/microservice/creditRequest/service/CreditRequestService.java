package com.microservice.creditRequest.service;
import com.microservice.creditRequest.entity.CreditRequestEntity;
import com.microservice.creditRequest.repository.CreditRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditRequestService {
    //@Autowired
    //CostumerRepository costumerRepository;
    //@Autowired
   // EmployeeRepository employeeRepository;
    @Autowired
    CreditRequestRepository creditRequestRepository;
    //@Autowired
    //TotalCostService totalCostService;
    //@Autowired
    //CreditSimulationService creditSimulationService;

    public List<CreditRequestEntity> getCreditRequests() {
        return creditRequestRepository.findAll();
    }

    //pedirle info a ms costumer, employee a través de http
    public CreditRequestEntity saveCreditRequest(CreditRequestEntity creditRequest) {
        //System.out.println(creditRequest);
        CreditRequestEntity creditRequestEntity = new CreditRequestEntity();
        Optional<CostumerEntity> costumerEntity = costumerRepository.findById(creditRequest.getCostumerId());
        if (costumerEntity.isEmpty()) {
            return null;
        }

        Optional<EmployeeEntity> employeeEntity = employeeRepository.findById(creditRequest.getEmployeeId());
        if (employeeEntity.isEmpty()) {
            return null;
        }

        //hacerlo de nuevo ya que saqué el DTO de credit request
        creditRequestEntity.setCostumer(costumerEntity.get());
        creditRequestEntity.setEmployee(employeeEntity.get());
        creditRequestEntity.setType(creditRequest.getType());
        creditRequestEntity.setCreditAmount(creditRequest.getCreditAmount());
        creditRequestEntity.setDeadline(creditRequest.getDeadline());
        creditRequestEntity.setInterestRateYear(creditRequest.getInterestRateYear());
        creditRequestEntity.setAdministrationFee(0);
        creditRequestEntity.setMonthCost(0);
        creditRequestEntity.setTotalCost(0);
        creditRequestEntity.setInterestRateMonth(0);
        creditRequestEntity.setLifeInsurance(0);
        creditRequestEntity.setFireInsurance(0);
        return creditRequestRepository.save(creditRequestEntity);
    }

    public CreditRequestEntity getById(Long id){
        return creditRequestRepository.findById(id).get();
    }

    public CreditRequestEntity updateCreditRequest(CreditRequestEntity creditRequestEntity) {
        return creditRequestRepository.save(creditRequestEntity);
    }



    public boolean deleteCreditRequest(Long id) throws Exception {
        try {
            creditRequestRepository.deleteById(id);
            return true;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


}
