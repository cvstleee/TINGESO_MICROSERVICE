import React, { useState, useEffect } from 'react';
import creditRequestService from '../services/creditRequest.service';
import creditEvaluationService from '../services/creditEvaluation.service';

const CreditEvaluation = () => {
    const [evaluation, setEvaluation] = useState({
        relationshipFeeIncome: false,
        appropiateAge: false,
        historyDICOM: false,
        antiquity: false,
        relationshipDebtIncome: false,
        savingsCapacity: false,
        statusEvaluation: '',
        creditRequestId: ''
    });

    const [creditRequests, setCreditRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [monthDebt, setMonthDebt] = useState(0);
    const [income, setIncome] = useState(0);
    const [savingsParams, setSavingsParams] = useState({ R71: false, R72: false, R73: false, R74: false, R75: false });
    const [step, setStep] = useState(1); // Para controlar el flujo secuencial

    const init = async () => {
        try {
            const creditRequestResponse = await creditRequestService.getAll();
            setCreditRequests(creditRequestResponse.data);
        } catch (error) {
            console.error("Error al cargar las solicitudes de crédito:", error);
        }
    };

    useEffect(() => {
        init(); // Carga los datos al montar el componente
    }, []);

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if (name.startsWith('R7')) {
            // Manejo de parámetros de ahorro
            setSavingsParams(prev => ({ ...prev, [name]: checked }));
        } else {
            setEvaluation(prevEvaluation => ({
                ...prevEvaluation,
                [name]: name === 'status' ? value : checked !== undefined ? checked : value,
            }));
        }

        // Si es una selección de creditRequest, guarda los detalles
        if (name === 'creditRequestId') {
            const selectedRequest = creditRequests.find(request => request.id === value);
            if (selectedRequest) {
                // Aquí puedes agregar más lógica si necesitas otros campos del request
            }
        }
    };

    const handleCalculateRelationshipDebtIncome = async () => {
        setIsLoading(true);
        try {
            const response = await creditEvaluationService.calculateRelationshipDebtIncome(evaluation.creditRequestId, monthDebt, income);
            setEvaluation(prev => ({ ...prev, relationshipDebtIncome: response.data.relationshipDebtIncome }));
            setStep(2); // Avanza al siguiente paso
        } catch (error) {
            console.error('Error al calcular relación deuda-ingreso:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSavingCapacity = async () => {
        setIsLoading(true);
        try {
            const response = await creditEvaluationService.savingCapacity(evaluation.creditRequestId, savingsParams.R71, savingsParams.R72, savingsParams.R73, savingsParams.R74, savingsParams.R75);
            setEvaluation(prev => ({ ...prev, savingsCapacity: response.data.savingsCapacity }));
            // Aquí podrías finalizar o reiniciar el proceso si es necesario
        } catch (error) {
            console.error('Error al calcular capacidad de ahorro:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (step === 1) {
            // Si estamos en el primer paso, calcular relación deuda-ingreso
            await handleCalculateRelationshipDebtIncome();
        } else if (step === 2) {
            // Si estamos en el segundo paso, calcular capacidad de ahorro
            await handleSavingCapacity();
        } else {
            // Guardar evaluación final
            setIsLoading(true);
            try {
                const data = await creditEvaluationService.create(evaluation);
                console.log('Evaluación guardada:', data);
                // Reiniciar o finalizar el proceso
                setStep(1); // Reiniciar al primer paso si es necesario
                setEvaluation({
                    relationshipFeeIncome: false,
                    appropiateAge: false,
                    historyDICOM: false,
                    antiquity: false,
                    relationshipDebtIncome: false,
                    savingsCapacity: false,
                    statusEvaluation: '',
                    creditRequestId: ''
                });
                setSavingsParams({ R71: false, R72: false, R73: false, R74: false, R75: false });
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            {/* Menú desplegable para seleccionar la solicitud de crédito */}
            <label htmlFor="creditRequestId">Seleccionar Solicitud de Crédito:</label>
            <select 
                id="creditRequestId" 
                name="creditRequestId"
                value={evaluation.creditRequestId}
                onChange={handleChange} 
                required
            >
                <option value="">Seleccione una opción</option>
                {creditRequests.map(request => (
                    <option key={request.id} value={request.id}> {request.id} </option>
                ))}
            </select>
        
            {/* Checkboxes */}
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="relationshipFeeIncome"
                        checked={evaluation.relationshipFeeIncome}
                        onChange={handleChange}
                    />
                    Relación Cuota Ingreso
                </label>
            </div>
            
            {/* Otros checkboxes... */}

            {/* Inputs para relación deuda-ingreso */}
            {step === 1 && (
                <div>
                    <label>Meses de Deuda:</label>
                    <input type="number" value={monthDebt} onChange={(e) => setMonthDebt(e.target.value)} />
                    
                    <label>Ingreso:</label>
                    <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
                    
                    <button onClick={handleSubmit} disabled={isLoading}>
                      {isLoading ? 'Calculando...' : 'Calcular Relación Deuda-Ingreso'}
                    </button>
                </div>
            )}

            {/* Inputs para capacidad de ahorro */}
            {step === 2 && (
                <div>
                    <label>
                        <input type="checkbox" name="R71" checked={savingsParams.R71} onChange={handleChange} />
                        Parámetro R71
                    </label>

                    {/* Otros parámetros... */}

                    <button onClick={handleSubmit} disabled={isLoading}>
                      {isLoading ? 'Calculando...' : 'Calcular Capacidad de Ahorro'}
                    </button>
                </div>
            )}

             {/* Botón para guardar evaluación final */}
             {step === 3 && (
                 <button onClick={handleSubmit} disabled={isLoading}>
                   {isLoading ? 'Guardando...' : 'Guardar Evaluación'}
                 </button>
             )}

             {/* Menú desplegable para cambiar el estado */}
             <div>
                 <label htmlFor="status">Modificar Estado:</label>
                 <select 
                     id="statusEvaluation" 
                     name="statusEvaluation"
                     value={evaluation.statusEvaluation}
                     onChange={handleChange} 
                     required
                 >
                     <option value="">Seleccione un nuevo estado</option>
                     <option value="Aprobado">Aprobado</option>
                     <option value="Rechazado">Rechazado</option>
                     <option value="Pendiente">Pendiente</option>
                 </select>
             </div>

         </div>
     );
};

export default CreditEvaluation;