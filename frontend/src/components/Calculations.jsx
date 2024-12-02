import React, { useEffect, useState } from 'react';
import creditRequestService from '../services/creditRequest.service';
import calculationsService from '../services/calculations.service';

const Calculations = () => {
    const [creditRequests, setCreditRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [totalCost, setTotalCost] = useState(null);
    const [error, setError] = useState(null);

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

    const handleSelectChange = (e) => {
        const selectedIndex = e.target.value;
        if (selectedIndex !== "") {
            setSelectedRequest(creditRequests[selectedIndex]);
            setTotalCost(null);
            setError(null);
        } else {
            setSelectedRequest(null);
            setTotalCost(null);
            setError(null);
        }
    };

    const handleCalculate = async (e) => {
        e.preventDefault();

        if (!selectedRequest) {
            setError("Por favor, selecciona una solicitud de crédito.");
            return;
        }

        const params = new URLSearchParams({
            creditAmount: selectedRequest.creditAmount,
            interestRateYear: selectedRequest.interestRateYear,
            deadline: selectedRequest.deadline,
        });

        try {
            const response = await calculationsService.totalCost(selectedRequest.id, params);
            setTotalCost(response.data);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Función para formatear números como moneda chilena
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    };

    return (
        <div>
            <h1>Calculadora de Costos de Crédito</h1>
            <select onChange={handleSelectChange}>
                <option value="">Selecciona una solicitud de crédito</option>
                {creditRequests.map((request, index) => (
                    <option key={request.id} value={index}>
                        {request.id} - {formatCurrency(request.creditAmount)}
                    </option>
                ))}
            </select>

            {selectedRequest && (
                <div>
                    <h2>Detalles de la Solicitud Seleccionada:</h2>
                    <p><strong>ID:</strong> {selectedRequest.id}</p>
                    <p><strong>Monto del Crédito:</strong> {formatCurrency(selectedRequest.creditAmount)}</p>
                    <p><strong>Tasa de Interés Anual:</strong> {selectedRequest.interestRateYear !== null ? selectedRequest.interestRateYear.toFixed(2) + '%' : 'No disponible'}</p>
                    <p><strong>Plazo:</strong> {selectedRequest.deadline}</p>
                </div>
            )}

            <button onClick={handleCalculate} disabled={!selectedRequest}>
                Calcular Costo Total
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {totalCost && (
                <div>
                    <h2>Resultados del Cálculo:</h2>
                    <p><strong>ID Solicitud:</strong> {totalCost.idCreditRequest}</p>
                    <p><strong>Cuota Mensual:</strong> {formatCurrency(totalCost.monthDebth)}</p>
                    <p><strong>Costo Mensual:</strong> {formatCurrency(totalCost.monthCost)}</p>
                    <p><strong>Costo Total:</strong> {formatCurrency(totalCost.totalCost)}</p>
                    <p><strong>Seguro de Vida:</strong> {formatCurrency(totalCost.lifeInsurance)}</p>
                    <p><strong>Seguro Contra Incendios:</strong> {formatCurrency(totalCost.fireInsurance)}</p>
                    <p><strong>Fee Administración:</strong> {formatCurrency(totalCost.administrationFee)}</p>
                </div>
            )}
        </div>
    );
};

export default Calculations;