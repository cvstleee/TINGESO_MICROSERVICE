import React, { useState } from 'react';
import costumerService from '../services/costumer.service';

const Simulation = () => {
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    loanAmount: '',
    anualInterestRate: '',
    termInYears: ''
  });

  // Estado para almacenar el resultado de la simulación
  const [simulationResult, setSimulationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página

      try {
          const result = await costumerService.simulation(formData.loanAmount, formData.anualInterestRate, formData.termInYears); // Llama al servicio getSimulation

          console.log('Resultado de la simulación de crédito hipotecario:', result.data);
          setSimulationResult(result.data); // Almacena el resultado de la simulación en el estado
          setErrorMessage(''); // Limpiar mensajes de error

      } catch (error) {
          console.error('Error:', error.message);
          setErrorMessage(error.message); // Mostrar mensaje de error en caso de falla
      }
  };

  return (
    <div>
      <h2>Simulación de Crédito</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loanAmount">Monto del Préstamo:</label>
          <input 
            type="number" 
            id="loanAmount" 
            name="loanAmount" 
            value={formData.loanAmount} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="anualInterestRate">Tasa de Interés Anual:</label>
          <input 
            type="number" 
            step="0.01" 
            id="anualInterestRate" 
            name="anualInterestRate" 
            value={formData.anualInterestRate} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="termInYears">Plazo en Años (Meses):</label>
          <input 
            type="number" 
            id="termInYears" 
            name="termInYears" 
            value={formData.termInYears} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Simular</button>
      </form>

      {/* Mostrar mensaje de error si hay uno */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Mostrar resultado de la simulación */}
      {simulationResult !== null && (
        <div>
          <h3>Resultado de la Simulación:</h3>
          <p><strong>Cuota Mensual: $</strong> {simulationResult}</p>
        </div>
      )}
    </div>
  );
};

export default Simulation;