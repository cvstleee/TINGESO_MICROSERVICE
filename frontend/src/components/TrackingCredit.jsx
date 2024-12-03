import React, { useState, useEffect } from 'react';
import creditRequestService from '../services/creditRequest.service';
import creditEvaluationService from '../services/creditEvaluation.service';
import costumerService from '../services/costumer.service';
import employeeService from '../services/employee.service';
import trackingService from '../services/tracking.service';
import './TrackingCredit.css'; 

const TrackingCredit = () => {
    const [creditRequests, setCreditRequests] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [creditRequest, setCreditRequest] = useState(null);
    const [creditEvaluation, setCreditEvaluation] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [trackingData, setTrackingData] = useState(null);

    const fetchCreditRequests = async () => {
        try {
            const response = await creditRequestService.getAll();
            setCreditRequests(response.data);
        } catch (error) {
            console.error("Error fetching credit requests:", error);
        }
    };

    const getCreditRequest = async (id) => {
        try {
            const response = await creditRequestService.get(id);
            setCreditRequest(response.data);
            fetchCustomerAndEmployee(response.data.idCostumer, response.data.idEmployee);
        } catch (error) {
            console.error("Error fetching credit request:", error);
        }
    };

    const getCreditEvaluation = async (id) => {
        try {
            const response = await creditEvaluationService.get(id);
            setCreditEvaluation(response.data);
        } catch (error) {
            console.error("Error fetching credit evaluation:", error);
        }
    };

    const getTrackingData = async (id) => {
        try {
            const response = await trackingService.findByIdCreditRequest(id);
            setTrackingData(response.data);
        } catch (error) {
            console.error("Error fetching tracking data:", error);
        }
    };

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
        fetchCreditRequests();
    }, []);

    useEffect(() => {
        if (selectedId) {
            setCreditRequest(null);
            setCreditEvaluation(null);
            setCustomerName('');
            setEmployeeName('');
            setTrackingData(null);

            getCreditRequest(selectedId);
            getCreditEvaluation(selectedId);
            getTrackingData(selectedId);
        }
    }, [selectedId]);

    const formatCurrency = (amount) => {
        return `$${amount.toLocaleString('es-CL')}`;
    };

    return (
        <div className="tracking-credit-container">
            <h1>Seguimiento de Solicitud de Crédito</h1>
            <select className="request-selector" onChange={(e) => setSelectedId(e.target.value)} value={selectedId || ''}>
                <option value="" disabled>Seleccione una solicitud</option>
                {creditRequests.map(request => (
                    <option key={request.id} value={request.id}>
                        {request.id} - {request.type}
                    </option>
                ))}
            </select>

            {creditRequest && (
                <div className="details-section">
                    <h2>Detalles de la Solicitud de Crédito</h2>
                    <ul>
                        <li><strong>ID de Solicitud:</strong> {creditRequest.id}</li>
                        <li><strong>Tipo de Crédito:</strong> {creditRequest.type}</li>
                        <li><strong>Monto del Crédito:</strong> {formatCurrency(creditRequest.creditAmount)}</li>
                        <li><strong>Plazo:</strong> {creditRequest.deadline} meses</li>
                        <li><strong>Tasa de Interés Anual:</strong> {creditRequest.interestRateYear}%</li>
                        <li><strong>Cliente:</strong> {customerName || 'No disponible'}</li>
                        <li><strong>Empleado:</strong> {employeeName || 'No disponible'}</li>
                    </ul>
                </div>
            )}

            {creditEvaluation && (
                <div className="evaluation-section">
                    <h2>Detalles de la Evaluación de Crédito</h2>
                    <ul>
                        <li><strong>ID de Evaluación:</strong> {creditEvaluation.id}</li>
                        <li><strong>Estado:</strong> {creditEvaluation.status}</li>
                        <li><strong>Relación Cuota-Ingreso:</strong> {creditEvaluation.relationshipFeeIncome ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>Edad Apropiada:</strong> {creditEvaluation.appropiateAge ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>Historial DICOM:</strong> {creditEvaluation.historyDICOM ? 'Aprobado' : 'No aprobado'}</li>
                        <li><strong>Antigüedad Laboral:</strong> {creditEvaluation.antiquity ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>Relación Deuda-Ingreso:</strong> {creditEvaluation.relationshipDebtIncome ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>Capacidad de Ahorro:</strong> {creditEvaluation.savingsCapacity ? 'Aprobada' : 'No aprobada'}</li>
                        <li><strong>ID de Solicitud de Crédito:</strong> {creditEvaluation.idCreditRequest}</li>
                    </ul>
                </div>
            )}

            {trackingData && (
                <div className="tracking-section">
                    <h2>Costos Totales:</h2>
                    <ul>
                        <li><strong>Cargo Administrativo:</strong> {formatCurrency(trackingData.administrationFee)}</li>
                        <li><strong>Meses de Deuda:</strong> {trackingData.monthDebth}</li>
                        <li><strong>Costo Mensual:</strong> {formatCurrency(trackingData.monthCost)}</li>
                        <li><strong>Costo Total:</strong> {formatCurrency(trackingData.totalCost)}</li>
                        <li><strong>Tasa de Interés Mensual:</strong> {(trackingData.interestRateMonth * 100).toFixed(2)}%</li>
                        <li><strong>Seguro de Vida:</strong> {formatCurrency(trackingData.lifeInsurance)}</li>
                        <li><strong>Seguro contra Incendios:</strong> {formatCurrency(trackingData.fireInsurance)}</li>
                        <li><strong>ID de Solicitud de Crédito:</strong> {trackingData.idCreditRequest}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TrackingCredit;