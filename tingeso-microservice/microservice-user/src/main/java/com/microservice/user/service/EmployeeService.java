package com.microservice.user.service;
import com.microservice.user.entity.EmployeeEntity;
import com.microservice.user.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    public List<EmployeeEntity> getEmployees(){
        return employeeRepository.findAll();
    }

    public EmployeeEntity saveEmployee(EmployeeEntity employee){
        return employeeRepository.save(employee);
    }

    public EmployeeEntity getEmployeeById(Long id){
        return employeeRepository.findById(id).get();
    }

    public EmployeeEntity updateEmployee(EmployeeEntity employee){
        return employeeRepository.save(employee);
    }

    public boolean deleteEmployee(Long id) throws Exception{
        try{
            employeeRepository.deleteById(id);
            return true;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
