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
            // Reiniciar totalCost y error al seleccionar una nueva solicitud
            setTotalCost(null);
            setError(null);
        } else {
            setSelectedRequest(null);
            setTotalCost(null); // Reiniciar totalCost si no hay selección
            setError(null); // Reiniciar error si no hay selección
        }
    };

    // Maneja el envío del formulario
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
            setTotalCost(response.data); // Guardar la respuesta
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Calculadora de Costos de Crédito</h1>
            <select onChange={handleSelectChange}>
                <option value="">Selecciona una solicitud de crédito</option>
                {creditRequests.map((request, index) => (
                    <option key={request.id} value={index}>
                        {request.id} - {request.creditAmount}
                    </option>
                ))}
            </select>

            {selectedRequest && (
                <div>
                    <h2>Detalles de la Solicitud Seleccionada:</h2>
                    <p><strong>ID:</strong> {selectedRequest.id}</p>
                    <p><strong>Monto del Crédito:</strong> {selectedRequest.creditAmount}</p>
                    <p><strong>Tasa de Interés Anual:</strong> {selectedRequest.interestRateYear !== null ? selectedRequest.interestRateYear.toFixed(2) + '%' : 'No disponible'}</p>
                    <p><strong>Plazo:</strong> {selectedRequest.deadline}</p>
                </div>
            )}

            <button onClick={handleCalculate} disabled={!selectedRequest}>
                Calcular Costo Total
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar errores */}

            {totalCost && (
                <div>
                    <h2>Resultados del Cálculo:</h2>
                    <p><strong>ID Solicitud:</strong> {totalCost.idCreditRequest}</p>
                    <p><strong>Cuota Mensual:</strong> {totalCost.monthCost}</p>
                    <p><strong>Costo Total:</strong> {totalCost.totalCost}</p>
                    <p><strong>Seguro de Vida:</strong> {totalCost.lifeInsurance}</p>
                    <p><strong>Seguro Contra Incendios:</strong> {totalCost.fireInsurance}</p>
                    {/* Agrega más propiedades según sea necesario */}
                </div>
            )}
        </div>
    );
};

export default Calculations;