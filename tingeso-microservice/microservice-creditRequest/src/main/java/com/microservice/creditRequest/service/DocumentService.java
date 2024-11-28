package com.microservice.creditRequest.service;

import com.microservice.creditRequest.DTO.Document;
import com.microservice.creditRequest.entity.CreditRequestEntity;
import com.microservice.creditRequest.entity.DocumentEntity;
import com.microservice.creditRequest.repository.CreditRequestRepository;
import com.microservice.creditRequest.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {
    @Autowired
    DocumentRepository documentRepository;
    @Autowired
    CreditRequestRepository creditRequestRepository;

    public List<DocumentEntity> getDocuments(){
        return documentRepository.findAll();
    }

    public DocumentEntity saveDocument(Document document){
        DocumentEntity documentEntity = new DocumentEntity();

        documentEntity.setType(document.getType());
        documentEntity.setIdCreditRequest(document.getIdCreditRequest());
        documentEntity.setTitle(document.getTitle());
        documentEntity.setFile(document.getFile());

        return documentRepository.save(documentEntity);

    }

    public DocumentEntity getDocumentById(Long id){
        return documentRepository.findById(id).get();
    }

    public DocumentEntity updateDocument(DocumentEntity document){
        return documentRepository.save(document);
    }

    public boolean deleteDocumentById(Long id) throws Exception{
        try{
            documentRepository.deleteById(id);
            return true;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }
    }


}
