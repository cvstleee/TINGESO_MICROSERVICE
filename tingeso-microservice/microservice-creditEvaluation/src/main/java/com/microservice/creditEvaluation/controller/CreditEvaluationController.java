package com.tingeso.tingeso.controllers;

import com.tingeso.tingeso.DTO.CreditEvaluation;
import com.tingeso.tingeso.entities.CreditEvaluationEntity;
import com.tingeso.tingeso.servicies.CreditEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/creditEvaluation")
public class CreditEvaluationController {
    @Autowired
    CreditEvaluationService creditEvaluationService;

    @GetMapping("/")
    public ResponseEntity<List<CreditEvaluationEntity>> listCreditEvaluation() {
        List<CreditEvaluationEntity> creditEvaluation = creditEvaluationService.getCreditEvaluations();
        return ResponseEntity.ok(creditEvaluation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditEvaluationEntity> getCreditEvaluationById(@PathVariable("id") Long id) {
        CreditEvaluationEntity creditEvaluation = creditEvaluationService.getById(id);
        return ResponseEntity.ok(creditEvaluation);
    }

    @PostMapping("/")
    public ResponseEntity<CreditEvaluationEntity> saveCreditEvaluation(@RequestBody CreditEvaluation creditEvaluation) {
        CreditEvaluationEntity creditEvaluationNew = creditEvaluationService.saveCreditEvaluation(creditEvaluation);
        return ResponseEntity.ok(creditEvaluationNew);
    }

    @PutMapping("/")
    public ResponseEntity<CreditEvaluationEntity> updateCreditEvaluation(@RequestBody CreditEvaluationEntity creditEvaluation) {
        CreditEvaluationEntity creditEvaluationUpdated = creditEvaluationService.updateCreditEvaluation(creditEvaluation);
        return ResponseEntity.ok(creditEvaluationUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CreditEvaluationEntity> deleteCreditEvaluation(@PathVariable("id") Long id) throws Exception {
        var isDeleted = creditEvaluationService.deleteCreditEvaluation(id);
        return ResponseEntity.noContent().build();
    }

    //R1
    @PutMapping("/calculateRelationship/{id}")
    public ResponseEntity<CreditEvaluationEntity> calculateRelationshipDebthIncome(@PathVariable Long id, @RequestParam int monthDebth, @RequestParam int income) {
        CreditEvaluationEntity creditEvaluation = creditEvaluationService.getById(id);
        if(creditEvaluationService.relationshipDebthIncome(monthDebth, income)){
            creditEvaluation.setRelationshipDebtIncome(true);
        }else{
            creditEvaluation.setRelationshipDebtIncome(false);
        }
        return ResponseEntity.ok(creditEvaluation);
    }

    //R2 SE HACE EN EL FRONT
    //R3 SE HACE EN EL FRONT
    //R4 SE HACE EN EL FRONT
    //R5 SE HACE EN EL FRONT (SE ASUME)
    //R6 EDAD, SACARLA DEL COSTUMER Y MOSTRARLA PARA QUE EL EMPLEADO PUEDA DECIDIR SI CUMPLE O NO
    //R7 SAVING CAPACITY

    @PutMapping("/savingCapacity/{id}")
    public ResponseEntity<CreditEvaluationEntity> savingCapacity(@PathVariable Long id, @RequestParam boolean R71,
    @RequestParam boolean R72, @RequestParam boolean R73, @RequestParam boolean R74, @RequestParam boolean R75){
        CreditEvaluationEntity creditEvaluation = creditEvaluationService.getById(id);
        if(creditEvaluationService.savingCapacity(R71, R72, R73, R74, R75)){
            creditEvaluation.setSavingsCapacity(true);
        }else{
            creditEvaluation.setSavingsCapacity(false);
        }
        return ResponseEntity.ok(creditEvaluation);
    }

}
