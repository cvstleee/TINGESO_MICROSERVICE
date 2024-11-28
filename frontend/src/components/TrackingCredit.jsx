import React, { useState, useEffect } from 'react';
import creditRequestService from '../services/creditRequest.service';
import creditEvaluationService from '../services/creditEvaluation.service';

const TrackingCredit = () => {
    const [creditRequests, setCreditRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [creditRequest, setCreditRequest] = useState(null);
    const [statusEvaluation, setStatusEvaluation] = useState(null); // Nuevo estado para almacenar statusEvaluation

    useEffect(() => {
        const fetchCreditRequests = async () => {
            try {
                const response = await creditRequestService.getAll();
                setCreditRequests(response.data);
            } catch (error) {
                console.error("Error fetching credit requests:", error);
            }
        };

        fetchCreditRequests();
    }, []);

    useEffect(() => {
        if (selectedRequestId) {
            // Obtener detalles de CreditRequest
            const fetchCreditRequest = async () => {
                try {
                    const response = await creditRequestService.get(selectedRequestId);
                    setCreditRequest(response.data);
                } catch (error) {
                    console.error("Error fetching credit request:", error);
                }
            };

            fetchCreditRequest();

            // Obtener statusEvaluation de CreditEvaluation
            const fetchCreditEvaluation = async () => {
                try {
                    const response = await creditEvaluationService.get(selectedRequestId); // Utiliza el mismo ID, en el docker esto se desconfigura ojo
                    setStatusEvaluation(response.data.statusEvaluation);
                } catch (error) {
                    console.error("Error fetching credit evaluation:", error);
                }
            };

            fetchCreditEvaluation();
        }
    }, [selectedRequestId]);

    const handleSelectChange = (event) => {
        setSelectedRequestId(event.target.value);
        setCreditRequest(null); // Limpiar el estado anterior
        setStatusEvaluation(null); // Limpiar el estado anterior de statusEvaluation
    };

    return (
        <div>
            <h3>Selecciona una Solicitud de Crédito</h3>
            <select onChange={handleSelectChange} value={selectedRequestId || ''}>
                <option value="" disabled>Seleccione una solicitud</option>
                {creditRequests.map(request => (
                    <option key={request.id} value={request.id}>
                     ID: {request.id}
                    </option>
                ))}
            </select>

            {creditRequest ? (
                <div>
                    <h3>Información de Credit Request</h3>
                    <p>ID: {creditRequest.id}</p>
                    <p>Estado Evaluación: {statusEvaluation}</p> 
                    <p>Tipo de Préstamo: {creditRequest.type}</p>
                    <p>Monto del Préstamo: {creditRequest.creditAmount}</p>
                    <p>Cuota Mensual: {creditRequest.monthDebth}</p>
                    <p>Plazo: {creditRequest.deadline} meses</p>
                    <p>Tasa de Interés Anual: {creditRequest.interestRateYear}%</p>
                    <p>Tasa de Interés Mensual: {creditRequest.interestRateMonth}%</p>
                </div>
            ) : (
                selectedRequestId && <div>Cargando información de la solicitud...</div>
            )}
        </div>
    );
};

export default TrackingCredit;
