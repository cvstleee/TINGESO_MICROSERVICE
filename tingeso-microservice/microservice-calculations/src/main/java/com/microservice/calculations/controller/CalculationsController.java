package com.microservice.calculations.controller;

import com.microservice.calculations.entity.CalculationsEntity;
import com.microservice.calculations.service.CalculationsService;
import com.microservice.calculations.service.CreditSimulationService;
import com.microservice.calculations.service.TotalCostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/calculations")
public class CalculationsController {
    @Autowired
    CalculationsService calculationsService;
    @Autowired
    CreditSimulationService creditSimulationService;
    @Autowired
    TotalCostService totalCostService;

    //hacer el crud + llamadas a simulation y total cost

    @GetMapping("/")
    public ResponseEntity<List<CalculationsEntity>> listCalculations() {
        List<CalculationsEntity> calculations = calculationsService.getAllCalculations();
        return ResponseEntity.ok(calculations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalculationsEntity> getCalculationById(@PathVariable("id") Long id) {
        CalculationsEntity calculations = calculationsService.getCalculationById(id);
        return ResponseEntity.ok(calculations);
    }

    @PostMapping("/")
    public ResponseEntity<CalculationsEntity> saveCalculation(@RequestBody CalculationsEntity calculation) {
        CalculationsEntity calculationNew = calculationsService.saveCalculation(calculation);
        return ResponseEntity.ok(calculationNew);
    }

    @PutMapping("/")
    public ResponseEntity<CalculationsEntity> updateCalculation(@RequestBody CalculationsEntity calculation) {
        CalculationsEntity calculationNew = calculationsService.updateCalculation(calculation);
        return ResponseEntity.ok(calculationNew);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CalculationsEntity> deleteCalculation(@PathVariable("id") Long id) throws Exception {
        var isDeleted = calculationsService.deleteCalculation(id);
        return ResponseEntity.noContent().build();
    }

    //ahora el service de total cost y simulation
    @GetMapping("/simulate")
    public int simulation(@RequestParam("P") int P, @RequestParam("r") double r, @RequestParam("n") int n) {
        return creditSimulationService.simulationDebt(P, r, n);
    }

    @PutMapping("/calculateTotalCost/{id}")
    public ResponseEntity<CalculationsEntity> calculateTotalCost(
            @PathVariable Long id,
            @RequestParam int loanAmount,
            @RequestParam double anualInterestRate,
            @RequestParam int termInYears,
            @RequestParam int fireInsurance,
            @RequestParam float percentage) {


        // Obtener la solicitud de crédito por su ID (código antiguo)
        // CÓDIGO ACTUAL: como ahora no modificaremos el objeto, sino que lo agregaremos a una entidad calculation
        //hay que cambiar todo, y darle la id
        CalculationsEntity calculation = new CalculationsEntity();
        //se guarda la id del credit request
        calculation.setIdCreditRequest(id);

        //setters de creditAmount, deadline (termInMonths), interestRateMonth, interestRateYear, maxAmount
        //esto lo saco de la credit request, tendría que comunicar este microservicio con el de credit request
        //capaz no sea necesario, porque con esto SOBREESCRIBIA lo que ya existia en el credit request
        //y si en vez de sobreescribirlo lo extraigo?
        //calculation.setDeadline(termInYears * 12);
        //calculation.setCreditAmount(loanAmount);
        //calculation.setInterestRateYear(anualInterestRate);

        double monthlyInterestRate = (anualInterestRate / 100) / 12;
        calculation.setInterestRateMonth(monthlyInterestRate);

        // 1. Cálculo de cuota mensual
        int monthDebth = creditSimulationService.simulationDebt(loanAmount, anualInterestRate, termInYears);
        calculation.setMonthDebth(monthDebth);

        // 2. Cálculos de seguros
        int lifeInsurance = totalCostService.calculateLifeInsurance(monthDebth, percentage);
        calculation.setLifeInsurance(lifeInsurance);
        calculation.setFireInsurance(fireInsurance);

        // 3. Cálculo de comisión de administración
        int admiFee = totalCostService.calculateAdmiFee(monthDebth, percentage);
        calculation.setAdministrationFee(admiFee);

        // 4. Cálculo de costos totales y mensuales
        int monthlyCost = totalCostService.monthlyCost(monthDebth, lifeInsurance, fireInsurance);
        calculation.setMonthCost(monthlyCost);
        int totalCost = totalCostService.totalCost(monthDebth, termInYears, admiFee);
        calculation.setTotalCost(totalCost);

        // Guardar los cambios en la base de datos
        //creditRequestService.updateCreditRequest(calculation); // Asegúrate de que el servicio tenga este método
        return ResponseEntity.ok(calculation); // Retorna el objeto actualizado
    }
}
