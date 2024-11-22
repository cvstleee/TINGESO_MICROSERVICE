package com.tingeso.tingeso.entities;
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
    //juntar con credit request
    private String statusEvaluation;

    //todas son uno a uno
    //unido al creditRequest (x el maxamount)
    //unido al costumner (x la edad)
    //unido al saving por el savings capacity

    @OneToOne
    @JoinColumn(name = "costumer_id" , referencedColumnName = "id")
    @JsonIgnore
    private CostumerEntity costumer;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "creditRequest_id" , referencedColumnName = "id")
    private CreditRequestEntity creditRequest;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="employee_id")
    private EmployeeEntity employee;


}
