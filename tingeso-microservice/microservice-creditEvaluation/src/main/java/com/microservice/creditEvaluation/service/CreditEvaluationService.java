package com.microservice.creditEvaluation.service;


import com.microservice.creditEvaluation.entity.CreditEvaluationEntity;
import com.microservice.creditEvaluation.repository.CreditEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditEvaluationService {
    @Autowired
    CreditEvaluationRepository creditEvaluationRepository;

    public List<CreditEvaluationEntity> getCreditEvaluations() {
        return creditEvaluationRepository.findAll();
    }

    //ya no necesito hacer los setters pq dejé de trabajar con relaciones de JPA
    public CreditEvaluationEntity saveCreditEvaluation(CreditEvaluationEntity creditEvaluation) {
        if(existCreditRequestById(creditEvaluation.getIdCreditRequest())){
            System.out.print("YA EXISTE");
            return null;
        }
        return creditEvaluationRepository.save(creditEvaluation);
    }

    public CreditEvaluationEntity getById(Long id){
        System.out.print("ID EN GET BY ID" + id);
        return creditEvaluationRepository.findById(id).get();
    }

    public boolean existCreditRequestById(Long idCreditRequest) {
        return creditEvaluationRepository.existsByIdCreditRequest(idCreditRequest);
    }

    public CreditEvaluationEntity updateCreditEvaluation(CreditEvaluationEntity creditEvaluation) {
        return creditEvaluationRepository.save(creditEvaluation);
    }

    public boolean deleteCreditEvaluation(Long id) throws Exception{
        try{
            creditEvaluationRepository.deleteById(id);
            return true;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }
    }

    //monthDebth en entidad de solicitud de crédito
    public boolean relationshipDebthIncome(int monthDebth, int income){
        System.out.print("deuda" + monthDebth);
        int temp = monthDebth/income;
        int relation = temp * 100;

        if (relation <= 35){
            return true;
        }else{
            return false;
        }
    }
    //recibe todos los checks del saving capacity y en caso de cumplir todo devuelve true, se lo manda al controller
    //y el controller se lo modifica a la credit evaluation
    public boolean savingCapacity(boolean R71, boolean R72, boolean R73, boolean R74, boolean R75){
        if(R71 && R72 && R73 && R74 && R75){
            return true;
        }else{
            return false;
        }
    }
}
