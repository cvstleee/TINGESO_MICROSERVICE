package com.microservice.user.controller;
import com.microservice.user.entity.EmployeeEntity;
import com.microservice.user.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping("/")
    public ResponseEntity<List<EmployeeEntity>> listEmployees(){
        List<EmployeeEntity> employee = employeeService.getEmployees();
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeEntity> getEmployeeById(@PathVariable Long id){
        EmployeeEntity employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/")
    public ResponseEntity<EmployeeEntity> saveEmployee(@RequestBody EmployeeEntity employee){
        EmployeeEntity employeeNew = employeeService.saveEmployee(employee);
        return ResponseEntity.ok(employeeNew);
    }

    @PutMapping("/")
    public ResponseEntity<EmployeeEntity> updateEmployee(@RequestBody EmployeeEntity employee){
        EmployeeEntity employeeUpdated = employeeService.updateEmployee(employee);
        return ResponseEntity.ok(employeeUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<EmployeeEntity> deleteEmployee(@PathVariable Long id) throws Exception{
        var isDeleted = employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
