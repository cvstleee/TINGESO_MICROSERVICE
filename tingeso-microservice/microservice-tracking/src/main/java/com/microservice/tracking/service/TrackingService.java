package com.microservice.tracking.service;

import com.microservice.tracking.entity.TrackingEntity;
import com.microservice.tracking.repository.TrackingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackingService {
    @Autowired
    TrackingRepository trackingRepository;

    public List<TrackingEntity> getTrackings(){
        return trackingRepository.findAll();
    }

    public TrackingEntity getById(Long trackingId){
        return trackingRepository.findById(trackingId).get();
    }

    public TrackingEntity saveTracking(TrackingEntity trackingEntity){
        return trackingRepository.save(trackingEntity);
    }

    public TrackingEntity updateTracking(TrackingEntity trackingEntity){
        return trackingRepository.save(trackingEntity);
    }

    public boolean deleteTracking(Long trackingId) throws Exception {
        try{
            trackingRepository.deleteById(trackingId);
            return true;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }

    }


}
