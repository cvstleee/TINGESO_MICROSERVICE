package com.tingeso.tingeso.controllers;

import com.tingeso.tingeso.DTO.CreditRequest;
import com.tingeso.tingeso.entities.CostumerEntity;
import com.tingeso.tingeso.entities.CreditRequestEntity;
import com.tingeso.tingeso.servicies.CreditRequestService;
import com.tingeso.tingeso.servicies.CreditSimulationService;
import com.tingeso.tingeso.servicies.TotalCostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/creditRequest")
public class CreditRequestController {
    @Autowired
    CreditRequestService creditRequestService;
    @Autowired
    private TotalCostService totalCostService;
    @Autowired
    private CreditSimulationService creditSimulationService;

    @GetMapping("/")
    public ResponseEntity<List<CreditRequestEntity>> listCreditRequests() {
        List<CreditRequestEntity> creditRequest = creditRequestService.getCreditRequests();
        return ResponseEntity.ok(creditRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditRequestEntity> getCreditRequestById(@PathVariable Long id) {
        CreditRequestEntity creditRequest = creditRequestService.getById(id);
        return ResponseEntity.ok(creditRequest);
    }

    @PostMapping("/")
    public ResponseEntity<CreditRequestEntity> saveCreditRequest(@RequestBody CreditRequest creditRequest) {
        CreditRequestEntity creditRequestEntity = creditRequestService.saveCreditRequest(creditRequest);
        return ResponseEntity.ok(creditRequestEntity);
    }

    @PutMapping("/")
    public ResponseEntity<CreditRequestEntity> updateCreditRequest(@RequestBody CreditRequestEntity creditRequest) {
        CreditRequestEntity creditRequestUpdated = creditRequestService.updateCreditRequest(creditRequest);
        return ResponseEntity.ok(creditRequestUpdated);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<CreditRequestEntity> deleteCreditRequest(@PathVariable Long id) throws Exception{
        var isDeleted = creditRequestService.deleteCreditRequest(id);
        return ResponseEntity.noContent().build();

    }

    @PutMapping("/calculateTotalCost/{id}")
    public ResponseEntity<CreditRequestEntity> calculateTotalCost(
            @PathVariable Long id,
            @RequestParam int loanAmount,
            @RequestParam double anualInterestRate,
            @RequestParam int termInYears,
            @RequestParam int fireInsurance,
            @RequestParam float percentage) {


        // Obtener la solicitud de crédito por su ID
        CreditRequestEntity creditRequest = creditRequestService.getById(id);
        if (creditRequest == null) {
            return ResponseEntity.notFound().build();
        }

        //setters de creditAmount, deadline (termInMonths), interestRateMonth, interestRateYear, maxAmount
        creditRequest.setDeadline(termInYears * 12);
        creditRequest.setCreditAmount(loanAmount);
        creditRequest.setInterestRateYear(anualInterestRate);

        double monthlyInterestRate = (anualInterestRate / 100) / 12;
        creditRequest.setInterestRateMonth(monthlyInterestRate);

        // 1. Cálculo de cuota mensual
        int monthDebth = creditSimulationService.simulationDebt(loanAmount, anualInterestRate, termInYears);
        creditRequest.setMonthDebth(monthDebth);

        // 2. Cálculos de seguros
        int lifeInsurance = totalCostService.calculateLifeInsurance(monthDebth, percentage);
        creditRequest.setLifeInsurance(lifeInsurance);
        creditRequest.setFireInsurance(fireInsurance);

        // 3. Cálculo de comisión de administración
        int admiFee = totalCostService.calculateAdmiFee(monthDebth, percentage);
        creditRequest.setAdministrationFee(admiFee);

        // 4. Cálculo de costos totales y mensuales
        int monthlyCost = totalCostService.monthlyCost(monthDebth, lifeInsurance, fireInsurance);
        creditRequest.setMonthCost(monthlyCost);
        int totalCost = totalCostService.totalCost(monthDebth, termInYears, admiFee);
        creditRequest.setTotalCost(totalCost);

        // Guardar los cambios en la base de datos
        creditRequestService.updateCreditRequest(creditRequest); // Asegúrate de que el servicio tenga este método
        return ResponseEntity.ok(creditRequest); // Retorna el objeto actualizado
    }

}
