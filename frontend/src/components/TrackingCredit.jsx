import React, { useState, useEffect } from 'react';
import creditRequestService from '../services/creditRequest.service';
import creditEvaluationService from '../services/creditEvaluation.service';
import costumerService from '../services/costumer.service';
import employeeService from '../services/employee.service';

const TrackingCredit = () => {
    const [creditRequests, setCreditRequests] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [creditRequest, setCreditRequest] = useState(null);
    const [creditEvaluation, setCreditEvaluation] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [employeeName, setEmployeeName] = useState('');

    // Función para obtener todas las solicitudes de crédito
    const fetchCreditRequests = async () => {
        try {
            const response = await creditRequestService.getAll();
            setCreditRequests(response.data);
        } catch (error) {
            console.error("Error fetching credit requests:", error);
        }
    };

    // Función para obtener el creditRequest por ID
    const getCreditRequest = async (id) => {
        try {
            const response = await creditRequestService.get(id);
            setCreditRequest(response.data);
            fetchCustomerAndEmployee(response.data.idCostumer, response.data.idEmployee); // Obtener cliente y empleado
        } catch (error) {
            console.error("Error fetching credit request:", error);
        }
    };

    // Función para obtener la creditEvaluation por ID
    const getCreditEvaluation = async (id) => {
        try {
            const response = await creditEvaluationService.get(id);
            setCreditEvaluation(response.data);
        } catch (error) {
            console.error("Error fetching credit evaluation:", error);
        }
    };

    // Función para obtener el nombre del cliente y del empleado
    const fetchCustomerAndEmployee = async (customerId, employeeId) => {
        if (customerId) {
            try {
                const customerResponse = await costumerService.get(customerId);
                setCustomerName(`${customerResponse.data.name} ${customerResponse.data.lastName}`);
            } catch (error) {
                console.error("Error fetching customer:", error);
                setCustomerName('No disponible');
            }
        }

        if (employeeId) {
            try {
                const employeeResponse = await employeeService.get(employeeId);
                setEmployeeName(`${employeeResponse.data.firstName} ${employeeResponse.data.lastName}`);
            } catch (error) {
                console.error("Error fetching employee:", error);
                setEmployeeName('No disponible');
            }
        }
    };

    useEffect(() => {
        fetchCreditRequests(); // Cargar todas las solicitudes al montar el componente
    }, []);

    useEffect(() => {
        if (selectedId) {
            // Reiniciar estados antes de cargar nueva solicitud
            setCreditRequest(null);
            setCreditEvaluation(null);
            setCustomerName('');
            setEmployeeName('');

            getCreditRequest(selectedId);
            getCreditEvaluation(selectedId);
        }
    }, [selectedId]);

    return (
        <div>
            <h1>Seguimiento de Solicitud de Crédito</h1>
            <select onChange={(e) => setSelectedId(e.target.value)} value={selectedId || ''}>
                <option value="" disabled>Seleccione una solicitud</option>
                {creditRequests.map(request => (
                    <option key={request.id} value={request.id}>
                        {request.id} - {request.type} {/* Cambia esto según un campo descriptivo */}
                    </option>
                ))}
            </select>

            {creditRequest && (
                <div>
                    <h2>Detalles de la Solicitud de Crédito</h2>
                   
                        <li><strong>ID de Solicitud:</strong> {creditRequest.id}</li>
                        <li><strong>Tipo de Crédito:</strong> {creditRequest.type}</li>
                        <li><strong>Monto del Crédito:</strong> ${creditRequest.creditAmount.toLocaleString()}</li>
                        <li><strong>Plazo:</strong> {creditRequest.deadline} meses</li>
                        <li><strong>Tasa de Interés Anual:</strong> {creditRequest.interestRateYear}%</li>
                        <li><strong>Cliente:</strong> {customerName || 'No disponible'}</li>
                        <li><strong>Empleado:</strong> {employeeName || 'No disponible'}</li>
                    
                </div>
            )}

            {creditEvaluation && (
                <div>
                    <h2>Detalles de la Evaluación de Crédito</h2>
                    
                        <li><strong>ID de Evaluación:</strong> {creditEvaluation.id}</li>
                        <li><strong>Estado:</strong> {creditEvaluation.status}</li>
                        <li><strong>Relación Cuota-Ingreso:</strong> {creditEvaluation.relationshipFeeIncome ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>Edad Apropiada:</strong> {creditEvaluation.appropiateAge ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>Historial DICOM:</strong> {creditEvaluation.historyDICOM ? 'Aprobado' : 'No aprobado'}</li>
                        <li><strong>Antigüedad Laboral:</strong> {creditEvaluation.antiquity ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>Relación Deuda-Ingreso:</strong> {creditEvaluation.relationshipDebtIncome ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>Capacidad de Ahorro:</strong> {creditEvaluation.savingsCapacity ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>ID de Solicitud de Crédito:</strong> {creditEvaluation.idCreditRequest}</li>
                   
                </div>
            )}
        </div>
    );
};

export default TrackingCredit;