import React, { useState, useEffect } from 'react';
import creditRequestService from '../services/creditRequest.service';

const TotalCost = () => {
  const [creditRequests, setCreditRequests] = useState([]); // Lista de creditRequests existentes
  const [selectedCreditRequestId, setSelectedCreditRequestId] = useState(""); // ID seleccionado, inicializado como cadena vacía
  const [formData, setFormData] = useState({
    loanAmount: '',
    anualInterestRate: '',
    termInYears: '',
    fireInsurance: '',
    percentage: ''
  });
  const [creditData, setCreditData] = useState(null);
  const [error, setError] = useState(null);

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

  // Maneja el cambio de valores en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    // Maneja la selección de una solicitud de crédito existente
    const handleCreditRequestChange = (e) => {
      setSelectedCreditRequestId(e.target.value);
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!selectedCreditRequestId) {
          setError("Por favor, selecciona una solicitud de crédito.");
          return;
      }

      const params = new URLSearchParams({
          loanAmount: formData.loanAmount,
          anualInterestRate: formData.anualInterestRate,
          termInYears: formData.termInYears,
          fireInsurance: formData.fireInsurance,
          percentage: formData.percentage
      });

      try {
          const data = await creditRequestService.totalCost(selectedCreditRequestId, params); // Llama al servicio calculateTotalCost

          setCreditData(data.data);
          setError(null);
      } catch (error) {
          setError(error.message);
      }
  };
  
  return (
    <div>
      <h3>Calcular Costo Total de Crédito</h3>

      {/* Selección de solicitud de crédito */}
      <div>
        <label>Selecciona una Solicitud de Crédito:</label>
        <select onChange={handleCreditRequestChange} value={selectedCreditRequestId}>
          <option value="">-- Selecciona una opción --</option>
          {creditRequests.map((creditRequest) => (
            <option key={creditRequest.id} value={creditRequest.id}>
              {creditRequest.id} 
            </option>
          ))}
        </select>
      </div>

      {/* Formulario de entrada de datos */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Monto del Préstamo:</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tasa de Interés Anual:</label>
          <input
            type="number"
            name="anualInterestRate"
            step="0.01"
            value={formData.anualInterestRate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Plazo en Años:</label>
          <input
            type="number"
            name="termInYears"
            value={formData.termInYears}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Seguro Contra Incendios:</label>
          <input
            type="number"
            name="fireInsurance"
            value={formData.fireInsurance}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Porcentaje:</label>
          <input
            type="number"
            name="percentage"
            step="0.01"
            value={formData.percentage}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Calcular Costo Total</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Visualización de resultados */}
      {creditData && (
        <div>
          <h4>Datos del Crédito</h4>
          <p><strong>Cuota Mensual:</strong> {creditData.monthDebth}</p>
          <p><strong>Seguro de Vida:</strong> {creditData.lifeInsurance}</p>
          <p><strong>Seguro Contra Incendios:</strong> {creditData.fireInsurance}</p>
          <p><strong>Comisión Administrativa:</strong> {creditData.administrationFee}</p>
          <p><strong>Costo Mensual Total:</strong> {creditData.monthCost}</p>
          <p><strong>Costo Total:</strong> {creditData.totalCost}</p>
        </div>
      )}
    </div>
  );
};

export default TotalCost;
