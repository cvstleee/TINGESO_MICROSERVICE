package com.microservice.calculations.service;

import org.springframework.stereotype.Service;

@Service
public class TotalCostService {
    //resultados de los costos totales??

    //1. en credit simulation

    //2. Cálculo de los Seguros

    //TIENEN DISTINTOS PORCENTAJES
    public int calculateLifeInsurance(int monthDebth) {
        float lifeInsurance;
        float percentage = 0.0003f; // Porcentaje como decimal

        // Calcular el seguro de vida
        lifeInsurance = monthDebth * percentage;

        // Redondear antes de convertir a int
        return Math.round(lifeInsurance);
    }

    //el de incendio no se calcula

    //3. cálculo por comisión de administración
    //ES IGUAL AL OTRO, VER SI JUNTARLOS
    public int calculateAdmiFee(int monthDebth) {
        float admiFee;
        float percentage = 0.01f; // Porcentaje como decimal (1% es 0.01)

        // Calcular la tarifa administrativa
        admiFee = monthDebth * percentage; // Ahora se calcula correctamente como 1%

        // Redondear antes de convertir a int
        return Math.round(admiFee);
    }

    //4. cálculo del costo total del préstamo

    //mensual
    public int monthlyCost(int monthDebth, int lifeInsurance, int fireInsurance){
        return monthDebth + lifeInsurance + fireInsurance;
    }

    //total durante la vida del préstamo

    public int totalCost(int monthlyCost, int deadline, int admiFee){
        int monthsOfDeadline = deadline * 12;
        return (monthlyCost * monthsOfDeadline) + admiFee;
    }

}
