package com.microservice.tracking.controller;

import com.microservice.tracking.entity.TrackingEntity;
import com.microservice.tracking.service.TrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tracking")
public class TrackingController {
    @Autowired
    TrackingService trackingService;

    @GetMapping("/")
    public ResponseEntity<List<TrackingEntity>> getAllTracking() {
        List<TrackingEntity> trackingEntityList = trackingService.getTrackings();
        return ResponseEntity.ok(trackingEntityList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrackingEntity> getTrackingById(@PathVariable("id") Long id) {
        TrackingEntity tracking = trackingService.getById(id);
        return ResponseEntity.ok(tracking);
    }

    @PostMapping("/")
    public ResponseEntity<TrackingEntity> saveTracking(@RequestBody TrackingEntity tracking) {
        TrackingEntity trackingEntity = trackingService.saveTracking(tracking);
        return ResponseEntity.ok(trackingEntity);
    }

    @PutMapping("/")
    public ResponseEntity<TrackingEntity> updateTracking(@RequestBody TrackingEntity tracking) {
        TrackingEntity trackingEntity = trackingService.updateTracking(tracking);
        return ResponseEntity.ok(trackingEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TrackingEntity> deleteTracking(@PathVariable Long id) throws Exception {
        var isDeleted = trackingService.deleteTracking(id);
        return ResponseEntity.noContent().build();
    }

}
