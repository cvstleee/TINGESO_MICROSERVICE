package com.microservice.creditRequest.DTO;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class Document {
    private Long creditRequestId;
    private String title;
    private String type;
    @Lob
    private byte[] file;
}
