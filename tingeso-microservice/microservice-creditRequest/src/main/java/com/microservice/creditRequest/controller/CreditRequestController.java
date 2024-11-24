package com.microservice.creditRequest.controller;


import com.microservice.creditRequest.entity.CreditRequestEntity;
import com.microservice.creditRequest.service.CreditRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/creditRequest")
public class CreditRequestController {
    @Autowired
    CreditRequestService creditRequestService;

    @GetMapping("/")
    public ResponseEntity<List<CreditRequestEntity>> listCreditRequests() {
        List<CreditRequestEntity> creditRequest = creditRequestService.getCreditRequests();
        return ResponseEntity.ok(creditRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditRequestEntity> getCreditRequestById(@PathVariable Long id) {
        CreditRequestEntity creditRequest = creditRequestService.getById(id);
        return ResponseEntity.ok(creditRequest);
    }

    @PostMapping("/")
    public ResponseEntity<CreditRequestEntity> saveCreditRequest(@RequestBody CreditRequestEntity creditRequest) {
        CreditRequestEntity creditRequestEntity = creditRequestService.saveCreditRequest(creditRequest);
        return ResponseEntity.ok(creditRequestEntity);
    }

    @PutMapping("/")
    public ResponseEntity<CreditRequestEntity> updateCreditRequest(@RequestBody CreditRequestEntity creditRequest) {
        CreditRequestEntity creditRequestUpdated = creditRequestService.updateCreditRequest(creditRequest);
        return ResponseEntity.ok(creditRequestUpdated);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<CreditRequestEntity> deleteCreditRequest(@PathVariable Long id) throws Exception{
        var isDeleted = creditRequestService.deleteCreditRequest(id);
        return ResponseEntity.noContent().build();
    }

    //endpoint para microservicio de creditRequest
   // @GetMapping("/searchByCreditRequest/{idCreditRequest}")
    //public ResponseEntity<?> findByIdCostumer(@PathVariable Long idCostumer) {
      //  return ResponseEntity.ok(creditRequestService.findByIdCostumer(idCostumer));
    //}

}
