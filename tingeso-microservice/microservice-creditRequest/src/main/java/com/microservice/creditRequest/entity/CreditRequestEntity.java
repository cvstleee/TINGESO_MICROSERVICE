package com.microservice.creditRequest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "creditRequest")
@Data
@NoArgsConstructor
@AllArgsConstructor
//datos para PEDIR un crédito
public class CreditRequestEntity {
//VER CUALES DEJAR EN SEGUIMIENTO

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
   //tipo de préstamo
    private String type;
    //monto del prestamo
    private int creditAmount;
    //cuota mensual del préstamo, se calcula con la formula del simulation (NO SE RECIBE DEL CLIENTE)
    private int monthDebth;
    //plazo, lo indica el ejecutivo según el máximo dispo en la tabla
    private int deadline; //plazo en meses, si son 20 años 240 meses
    //ejecutivo lo indica según tabla
    private double interestRateYear; //anual
    private Long idCostumer;
    private Long idEmployee;
    private List<Long> idDocuments;
    private Long idCreditEvaluation;
}