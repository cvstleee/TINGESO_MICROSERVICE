package com.microservice.tracking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tracking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private int administrationFee;
    private int monthCost;
    private int totalCost;
    private double interestRateMonth;
    private int lifeInsurance;
    private int fireInsurance;
    //enlazado a una solicitud de crédito
    private Long idCreditRequest;
}
