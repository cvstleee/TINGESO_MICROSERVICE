package com.microservice.creditEvaluation.controller;
import com.microservice.creditEvaluation.entity.CreditEvaluationEntity;
import com.microservice.creditEvaluation.service.CreditEvaluationService;
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
    public ResponseEntity<CreditEvaluationEntity> saveCreditEvaluation(@RequestBody CreditEvaluationEntity creditEvaluation) {
        creditEvaluation.setId(creditEvaluation.getIdCreditRequest());
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
       // System.out.println("ID: " + id);
       // System.out.println("monthDebth: " + monthDebth);
       // System.out.println("income: " + income);

        CreditEvaluationEntity creditEvaluation = creditEvaluationService.getById(id);

        if (creditEvaluationService.relationshipDebthIncome(monthDebth, income)) {
            creditEvaluation.setRelationshipDebtIncome(true);
            System.out.println("La relación deuda-ingreso es aprobada.");
        } else {
            creditEvaluation.setRelationshipDebtIncome(false);
            System.out.println("La relación deuda-ingreso no es aprobada.");
        }

        // Guarda los cambios en la entidad si es necesario
        creditEvaluationService.updateCreditEvaluation(creditEvaluation);

        return ResponseEntity.ok(creditEvaluation);
    }

    //R2 SE HACE EN EL FRONT
    //R3 SE HACE EN EL FRONT
    //R4 SE HACE EN EL FRONT
    //R5 SE HACE EN EL FRONT (SE ASUME)
    //R6 EDAD, SACARLA DEL COSTUMER Y MOSTRARLA PARA QUE EL EMPLEADO PUEDA DECIDIR SI CUMPLE O NO
    //R7 SAVING CAPACITY

    @PutMapping("/status/{id}")
    public ResponseEntity<CreditEvaluationEntity> statusChange(@PathVariable Long id){
        CreditEvaluationEntity creditEvaluation = creditEvaluationService.getById(id);
        boolean status = creditEvaluationService.statusChange(id);
        if(status){
            creditEvaluation.setStatus("Aprobado");
        }else{
            creditEvaluation.setStatus("Rechazado");
        }
        creditEvaluationService.updateCreditEvaluation(creditEvaluation);
        return ResponseEntity.noContent().build();
    }

}
