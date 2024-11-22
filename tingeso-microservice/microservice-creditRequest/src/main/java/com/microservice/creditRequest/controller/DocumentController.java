package com.tingeso.tingeso.controllers;

import com.tingeso.tingeso.DTO.Document;
import com.tingeso.tingeso.entities.DocumentEntity;
import com.tingeso.tingeso.servicies.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/document")
public class DocumentController {
    @Autowired
    DocumentService documentService;

    @GetMapping("/")
    public ResponseEntity<List<DocumentEntity>> getAllDocuments() {
        List<DocumentEntity> document = documentService.getDocuments();
        return ResponseEntity.ok(document);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentEntity> getDocumentById(@PathVariable Long id) {
        DocumentEntity document = documentService.getDocumentById(id);
        return ResponseEntity.ok(document);
    }


    @PostMapping("/")
    public ResponseEntity<DocumentEntity> saveDocument(@RequestParam("file") MultipartFile file,
                                                       @RequestParam("type") String type,
                                                       @RequestParam("title") String title,
                                                       @RequestParam("creditRequestId") Long creditRequestId) {
        try {
            // Crear un objeto Document y establecer sus propiedades
            Document document = new Document();
            document.setType(type);
            document.setTitle(title);
            document.setCreditRequestId(creditRequestId); // Establecer el ID de la solicitud de crédito

            // Guardar el contenido del archivo en el objeto Document (si es necesario)
            document.setFile(file.getBytes()); // Asegúrate de que tu clase Document tenga un campo para esto

            // Llamar al servicio para guardar el documento
            DocumentEntity savedDocument = documentService.saveDocument(document);

            if (savedDocument == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Si no se encuentra la solicitud de crédito
            }

            return ResponseEntity.ok(savedDocument);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/")
    public ResponseEntity<DocumentEntity> updateDocument(@RequestBody DocumentEntity document) {
        DocumentEntity documentUpdated = documentService.updateDocument(document);
        return ResponseEntity.ok(documentUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DocumentEntity> deleteDocument(@PathVariable Long id) throws Exception{
        var isDeleted = documentService.deleteDocumentById(id);
        return ResponseEntity.noContent().build();
    }

}
