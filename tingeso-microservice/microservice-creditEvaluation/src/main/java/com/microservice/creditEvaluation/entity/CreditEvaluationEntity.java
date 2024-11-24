package com.microservice.creditEvaluation.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "creditEvaluation")
@Data
@NoArgsConstructor
@AllArgsConstructor

//revisando los documentos presentados por el cliente y calculando
//manualmente la relación cuota/ingreso para determinar la capacidad de pago


//Tbala de booleanos que cambiará el ejecutivo
public class CreditEvaluationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    //Reglas de negocio
    private boolean relationshipFeeIncome;
    private boolean appropiateAge;
    private boolean historyDICOM;
    private boolean antiquity;
    private boolean relationshipDebtIncome;
    //private boolean maxAmount;
    private boolean savingsCapacity;
    //pq la id costumer y employee ya lo tiene el credit request
    private Long idCreditRequest;

}
