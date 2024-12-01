import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Button, Checkbox, FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography, Box, FormControlLabel } from '@mui/material'; 
import creditRequestService from '../services/creditRequest.service';
import creditEvaluationService from '../services/creditEvaluation.service';
import DebtIncomeRelationship from './DebtIncomeRelationship';

const CreditEvaluation = () => {
    const navigate = useNavigate(); 
    const [evaluation, setEvaluation] = useState({
        id: '',
        relationshipFeeIncome: false,
        appropiateAge: false,
        historyDICOM: false,
        antiquity: false,
        relationshipDebtIncome: false,
        savingsCapacity: false,
        idCreditRequest: ''
    });
    const [creditRequests, setCreditRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [savingsParams, setSavingsParams] = useState({
        R71: false,
        R72: false,
        R73: false,
        R74: false,
        R75: false
    });
    const [step, setStep] = useState(1);

    const init = async () => {
        try {
            const creditRequestResponse = await creditRequestService.getAll();
            setCreditRequests(creditRequestResponse.data);
        } catch (error) {
            console.error("Error al cargar las solicitudes de crédito:", error);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        if (name.startsWith('R7')) {
            setSavingsParams(prev => ({ ...prev, [name]: checked }));
        } else {
            setEvaluation(prevEvaluation => ({
                ...prevEvaluation,
                [name]: checked !== undefined ? checked : value,
            }));
        }

        if (name === 'idCreditRequest') {
            const selectedRequest = creditRequests.find(request => request.id === value);
            if (selectedRequest) {
                setEvaluation(prev => ({ ...prev, idCreditRequest: value, id: selectedRequest.id }));
            }
        }
    };

    const handleSavingCapacity = async () => {
        setIsLoading(true);
        try {
            const response = await creditEvaluationService.savingCapacity(evaluation.idCreditRequest, savingsParams.R71, savingsParams.R72, savingsParams.R73, savingsParams.R74, savingsParams.R75);
            setEvaluation(prev => ({ ...prev, savingsCapacity: response.data.savingsCapacity }));
            setStep(3); 
        } catch (error) {
            console.error('Error al calcular capacidad de ahorro:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveEvaluation = async () => {
        setIsLoading(true);
        try {
            await creditEvaluationService.create(evaluation); 
            setStep(2); 
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <Box sx={{ p: 3, bgcolor: '#ffffff', color: '#000000', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
              Evaluación de Crédito
          </Typography>
          <FormControl fullWidth margin="normal">
              <InputLabel id="idCreditRequest-label">Seleccionar Solicitud de Crédito</InputLabel>
              <Select
                  labelId="idCreditRequest-label"
                  id="idCreditRequest"
                  name="idCreditRequest"
                  value={evaluation.idCreditRequest}
                  onChange={handleChange}
                  required
              >
                  <MenuItem value="">
                      <em>Seleccione una opción</em>
                  </MenuItem>
                  {creditRequests.map(request => (
                      <MenuItem key={request.id} value={request.id}>
                          {request.id}
                      </MenuItem>
                  ))}
              </Select>
          </FormControl>

          <Typography variant="h6">Evaluaciones</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel control={<Checkbox name="relationshipFeeIncome" checked={evaluation.relationshipFeeIncome} onChange={handleChange} />} label="Relación Cuota Ingreso" />
              <FormControlLabel control={<Checkbox name="appropiateAge" checked={evaluation.appropiateAge} onChange={handleChange} />} label="Edad Apropiada" />
              <FormControlLabel control={<Checkbox name="historyDICOM" checked={evaluation.historyDICOM} onChange={handleChange} />} label="Historial DICOM" />
              <FormControlLabel control={<Checkbox name="antiquity" checked={evaluation.antiquity} onChange={handleChange} />} label="Antigüedad" />
              <FormControlLabel control={<Checkbox name="savingsCapacity" checked={evaluation.savingsCapacity} onChange={handleChange} />} label="Capacidad de Ahorro" />
          </Box>

          <Typography variant="body1">
              <strong>Relación Deuda Ingreso:</strong> {evaluation.relationshipDebtIncome ? 'Aprobado' : 'No Aprobado'}
          </Typography>

          {step === 1 && (
              <Button variant="contained" color="primary" onClick={saveEvaluation} disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} /> : 'Guardar Evaluación'}
              </Button>
          )}

          {step === 2 && (
              <DebtIncomeRelationship 
                  evaluation={evaluation}
                  resetEvaluation={() => setStep(1)}
                  navigate={navigate}
              />
          )}
      </Box>
    );
};

export default CreditEvaluation;