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
       // System.out.print("ID EN GET BY ID" + id);
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

    public boolean relationshipDebthIncome(int monthDebth, int income) {
       // System.out.print("deuda: " + monthDebth);
       // System.out.print(" income: " + income);

        // Convertir monthDebth a double para evitar la truncación
        double temp = (double) monthDebth / income; // Asegúrate de que al menos uno sea double
        System.out.print("\ndivision: " + temp);

        double relation = temp * 100;
        System.out.println("\nrelation debth income is " + relation);

        return relation <= 35; // Retorna directamente el resultado
    }

    //cambiar el estado de la evaluation después de haber sido revisada
    public boolean statusChange(Long id){
        //System.out.print("\nID STATUS"+id);
        CreditEvaluationEntity creditEvaluation = getById(id);
        if(creditEvaluation.isRelationshipDebtIncome() && creditEvaluation.isAntiquity() && creditEvaluation.isAppropiateAge() &&
        creditEvaluation.isHistoryDICOM() && creditEvaluation.isRelationshipFeeIncome() && creditEvaluation.isSavingsCapacity()){
          //  System.out.print("TRUE");
            return true;
        }else{
           // System.out.print("FALSE");
            return false;
        }
    }
}
