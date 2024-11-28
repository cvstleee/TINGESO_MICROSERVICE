package com.microservice.user.controller;
import com.microservice.user.entity.CostumerEntity;
import com.microservice.user.service.CostumerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/costumer")
public class CostumerController {
    @Autowired
    CostumerService costumerService;

    @GetMapping("/")
    public ResponseEntity<List<CostumerEntity>> listCostumers() {
        List<CostumerEntity> costumer = costumerService.getCostumers();
        return ResponseEntity.ok(costumer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CostumerEntity> getCostumerById(@PathVariable Long id) {
        CostumerEntity costumer = costumerService.getById(id);
        return ResponseEntity.ok(costumer);
    }

    @PostMapping("/")
    public ResponseEntity<CostumerEntity> saveCostumer(@RequestBody CostumerEntity costumer) {
        CostumerEntity costumerNew = costumerService.saveCostumer(costumer);
        return ResponseEntity.ok(costumerNew);
    }

    @PutMapping("/")
    public ResponseEntity<CostumerEntity> updateCostumer(@RequestBody CostumerEntity costumer){
        CostumerEntity costumerUpdated = costumerService.updateCostumer(costumer);
        return ResponseEntity.ok(costumerUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteCostumerById(@PathVariable Long id) throws Exception {
        var isDeleted = costumerService.deleteCostumer(id);
        return ResponseEntity.noContent().build();
    }


}
