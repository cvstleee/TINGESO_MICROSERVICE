package com.tingeso.tingeso.servicies;

import com.tingeso.tingeso.DTO.CreditEvaluation;
import com.tingeso.tingeso.entities.CreditEvaluationEntity;
import com.tingeso.tingeso.entities.CreditRequestEntity;
import com.tingeso.tingeso.repositories.CreditEvaluationRepository;
import com.tingeso.tingeso.repositories.CreditRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditEvaluationService {
    @Autowired
    CreditEvaluationRepository creditEvaluationRepository;
    @Autowired
    CreditRequestRepository creditRequestRepository;

    public List<CreditEvaluationEntity> getCreditEvaluations() {
        return creditEvaluationRepository.findAll();
    }

    public CreditEvaluationEntity saveCreditEvaluation(CreditEvaluation creditEvaluation) {
        System.out.println(creditEvaluation);
        CreditEvaluationEntity creditEvaluationEntity = new CreditEvaluationEntity();
        Optional<CreditRequestEntity> creditRequestEntity = creditRequestRepository.findById(creditEvaluation.getCreditRequestId());
        if(creditRequestEntity.isEmpty()) {
            return null;
        }
        if(existCreditRequestById(creditEvaluation.getCreditRequestId())){
            System.out.print("YA EXISTE");
            return null;
        }

        creditEvaluationEntity.setCreditRequest(creditRequestEntity.get());
        creditEvaluationEntity.setAppropiateAge(creditEvaluation.isAppropiateAge());
        creditEvaluationEntity.setAntiquity(creditEvaluation.isAntiquity());
        creditEvaluationEntity.setStatusEvaluation(creditEvaluation.getStatusEvaluation());
        creditEvaluationEntity.setSavingsCapacity(creditEvaluation.isSavingsCapacity());
        creditEvaluationEntity.setHistoryDICOM(creditEvaluation.isHistoryDICOM());
        creditEvaluationEntity.setRelationshipDebtIncome(creditEvaluation.isRelationshipDebtIncome());
        creditEvaluationEntity.setRelationshipFeeIncome(creditEvaluation.isRelationshipFeeIncome());

        return creditEvaluationRepository.save(creditEvaluationEntity);
    }

    public CreditEvaluationEntity getById(Long id){
        return creditEvaluationRepository.findById(id).get();
    }

    public CreditEvaluationEntity updateCreditEvaluation(CreditEvaluationEntity creditEvaluation) {
        return creditEvaluationRepository.save(creditEvaluation);
    }

    public boolean existCreditRequestById(Long id){
        if(creditEvaluationRepository.existsByCreditRequestId(id)){
            return true;
        }else{
            return false;
        }
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
