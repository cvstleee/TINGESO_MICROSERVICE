package com.microservice.creditRequest.service;
import com.microservice.creditRequest.entity.CreditRequestEntity;
import com.microservice.creditRequest.repository.CreditRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class CreditRequestService {
    @Autowired
    CreditRequestRepository creditRequestRepository;

    public List<CreditRequestEntity> getCreditRequests() {
        return creditRequestRepository.findAll();
    }

    //pedirle info a ms costumer, employee a través de http
    public CreditRequestEntity saveCreditRequest(CreditRequestEntity creditRequest) {
        //le saqué todo lo que tenia antes pq ahora no lo usaré con objetos, sino que solo con id's
        return creditRequestRepository.save(creditRequest);
    }

    public CreditRequestEntity getById(Long id){
        return creditRequestRepository.findById(id).get();
    }

    public CreditRequestEntity updateCreditRequest(CreditRequestEntity creditRequestEntity) {
        return creditRequestRepository.save(creditRequestEntity);
    }

    public boolean deleteCreditRequest(Long id) throws Exception {
        try {
            creditRequestRepository.deleteById(id);
            return true;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    //Comunicación con microservicio user, ese manda la id
   // public List<CreditRequestEntity> findByIdCostumer(Long idCostumer){
     //   return creditRequestRepository.findByCostumer(idCostumer);
    //}

}
