package com.microservice.calculations.service;

import com.microservice.calculations.entity.CalculationsEntity;
import com.microservice.calculations.repository.CalculationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalculationsService {
    @Autowired
    CalculationsRepository calculationsRepository;

    public List<CalculationsEntity> getAllCalculations() {
        return calculationsRepository.findAll();
    }

    public CalculationsEntity getCalculationById(Long id) {
        return calculationsRepository.findById(id).get();
    }

    public CalculationsEntity saveCalculation(CalculationsEntity calculation) {
        return calculationsRepository.save(calculation);
    }
    public CalculationsEntity updateCalculation(CalculationsEntity calculation) {
        return calculationsRepository.save(calculation);
    }

    public boolean deleteCalculation(Long id) throws Exception {
        try{
            calculationsRepository.deleteById(id);
            return true;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }
    }

    //método que me entrega la instancia de calculations que tiene cierta id de creditRequest
    public  CalculationsEntity findByIdCreditRequest(Long idCreditRequest){
            CalculationsEntity calculation =  calculationsRepository.findByIdCreditRequest(idCreditRequest);
            return calculation;
    }

}
