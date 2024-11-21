package com.microservice.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor

//datos del ejecutivo
public class EmployeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private List<Long> idCreditRequests = new ArrayList<>();
    //private List<Long> idCreditEvaluations = new ArrayList<>();

}
