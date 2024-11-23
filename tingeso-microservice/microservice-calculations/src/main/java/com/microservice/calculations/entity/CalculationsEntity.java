package com.microservice.calculations.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "calculations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculationsEntity {
    //no se que guardar acá KLKSDJFLÑ, capaz lo que dan los cálculos? sacarlos del tracking......
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private int administrationFee;
    //cuota mensual del préstamo, se calcula con la formula del simulation (NO SE RECIBE DEL CLIENTE)
    private int monthDebth;
    private int monthCost;
    private int totalCost;
    private double interestRateMonth;
    private int lifeInsurance;
    private int fireInsurance;
    //enlazado a una solicitud de crédito
    private Long idCreditRequest;
}
