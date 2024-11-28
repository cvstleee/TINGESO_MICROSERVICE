import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import creditRequestService from '../services/creditRequest.service';
import creditEvaluationService from '../services/creditEvaluation.service';

const CreditEvaluation = () => {
    const navigate = useNavigate(); // Inicializar el hook useNavigate
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
    const [monthDebt, setMonthDebt] = useState(0);
    const [income, setIncome] = useState(0);
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
            // Avanza a la etapa 3 después de calcular la capacidad de ahorro
            setStep(3); 
        } catch (error) {
            console.error('Error al calcular capacidad de ahorro:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (step === 1) {
            await handleSavingCapacity(); // Solo se calcula la capacidad de ahorro en este paso
        } else if (step === 2) {
            await saveEvaluation(); // Guardar evaluación en este paso
        }
    };

    const saveEvaluation = async () => {
        setIsLoading(true);
        try {
            const data = await creditEvaluationService.create(evaluation); 
            console.log('Evaluación guardada:', data);

            // Calcular relación deuda-ingreso después de guardar
            await calculateRelationshipDebtIncome();

            resetEvaluation();
            
            // Redirigir a TotalCost si se cumplen todas las condiciones
            if (evaluation.relationshipDebtIncome && evaluation.savingsCapacity) { 
                navigate('/total-cost'); 
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateRelationshipDebtIncome = async () => {
        setIsLoading(true);
        try {
            const response = await creditEvaluationService.calculateRelationshipDebtIncome(evaluation.id, monthDebt, income);
            setEvaluation(prev => ({ ...prev, relationshipDebtIncome: response.data.relationshipDebtIncome }));
          } catch (error) {
              console.error('Error al calcular relación deuda-ingreso:', error);
          } finally {
              setIsLoading(false);
          }
      };

    const resetEvaluation = () => {
        setStep(1); // Reiniciar al primer paso si es necesario
        setEvaluation({
            id: '',
            relationshipFeeIncome: false,
            appropiateAge: false,
            historyDICOM: false,
            antiquity: false,
            relationshipDebtIncome: false,
            savingsCapacity: false,
            idCreditRequest: ''
        });
        setSavingsParams({ R71: false, R72: false, R73: false, R74: false, R75: false });
    };

    return (
      <div>
          <label htmlFor="idCreditRequest">Seleccionar Solicitud de Crédito:</label>
          <select id="idCreditRequest" name="idCreditRequest" value={evaluation.idCreditRequest} onChange={handleChange} required>
              <option value="">Seleccione una opción</option>
              {creditRequests.map(request => (
                  <option key={request.id} value={request.id}>
                      {request.id}
                  </option>
              ))}
          </select>
          <div>
              <label>
                  <input type="checkbox" name="relationshipFeeIncome" checked={evaluation.relationshipFeeIncome} onChange={handleChange} /> Relación Cuota Ingreso
              </label>
              <label>
                  <input type="checkbox" name="appropiateAge" checked={evaluation.appropiateAge} onChange={handleChange} /> Edad Apropiada
              </label>
              <label>
                  <input type="checkbox" name="historyDICOM" checked={evaluation.historyDICOM} onChange={handleChange} /> Historial DICOM
              </label>
              <label>
                  <input type="checkbox" name="antiquity" checked={evaluation.antiquity} onChange={handleChange} /> Antigüedad
              </label>
              
              <label>
                  <input type="checkbox" name="savingsCapacity" checked={evaluation.savingsCapacity} onChange={handleChange} /> Capacidad de Ahorro
              </label>
              {/* Mostrar estado de relación deuda ingreso */}
              <div>
                  <strong>Relación Deuda Ingreso:</strong> {evaluation.relationshipDebtIncome ? 'Aprobado' : 'No Aprobado'}
              </div>
          </div>
          {step === 2 && (
              <div>
                  <label>Meses de Deuda:</label>
                  <input type="number" value={monthDebt} onChange={(e) => setMonthDebt(e.target.value)} />
                  <label>Ingreso:</label>
                  <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
                  <button onClick={handleSubmit} disabled={isLoading}>
                      {isLoading ? 'Calculando...' : 'Calcular Capacidad de Ahorro'}
                  </button>
              </div>
          )}
          {step === 1 && (
              <>
                  {/* Botón para guardar la evaluación */}
                  <button onClick={saveEvaluation} disabled={isLoading}>
                      {isLoading ? 'Guardando...' : 'Guardar Evaluación'}
                  </button>
              </>
          )}
      </div>
    );
};

export default CreditEvaluation;