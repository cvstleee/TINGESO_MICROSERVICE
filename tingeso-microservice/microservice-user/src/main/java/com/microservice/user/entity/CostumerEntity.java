package com.microservice.user.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "costumer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CostumerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String rut;
    private String name;
    private String lastName;
    private String email;
    private int age;
    private int monthlyIncome;
    //Relaciones sin usar relaciones
    //private Long idCreditEvaluation;
    //mejor hago un findById costumer en el credit Request
    //private List<Long> idCreditRequests = new ArrayList<>();

    //@OneToOne(mappedBy = "costumer")
    //@JsonIgnore
    //private CreditEvaluationEntity creditEvaluation;

    /**@OneToMany(mappedBy = "costumer")
    //@JsonIgnore
    private List<DocumentEntity> documents;**/

    //@OneToMany(mappedBy = "costumer")
    //@JsonIgnore
    //private List<CreditRequestEntity> creditRequests;

}
