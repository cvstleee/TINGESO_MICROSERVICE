import React, { useState } from 'react';
import costumerService from '../services/costumer.service';

const RegisterUser = () => {
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    rut: '',
    name: '',
    lastName: '',
    email: '',
    age: '',
    monthlyIncome: ''
  });

  // Estado para almacenar el usuario guardado
  const [savedUser, setSavedUser] = useState(null);
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
 // Función para manejar el envío del formulario de clientes
const handleSubmit = async (e) => {
  e.preventDefault(); // Previene la recarga de la página

  try {
      const result = await costumerService.create(formData); // Llama al servicio createCustomer con formData
      console.log('Usuario guardado:', result);
      setSavedUser(result.data); // Almacena el usuario guardado en el estado
      setErrorMessage(''); // Limpiar mensajes de error

  } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message); // Mostrar mensaje de error en caso de falla
  }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rut">RUT:</label>
          <input 
            type="text" 
            id="rut" 
            name="rut" 
            value={formData.rut} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="lastName">Apellido:</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="age">Edad:</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="monthlyIncome">Ingreso Mensual:</label>
          <input 
            type="number" 
            id="monthlyIncome" 
            name="monthlyIncome" 
            value={formData.monthlyIncome} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {/* Mostrar mensaje de error si hay uno */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Mostrar información del usuario guardado */}
      {savedUser && (
        <div>
          <h2>Usuario Guardado:</h2>
          <p><strong>RUT:</strong> {savedUser.rut}</p>
          <p><strong>Nombre:</strong> {savedUser.name}</p>
          <p><strong>Apellido:</strong> {savedUser.lastName}</p>
          <p><strong>Email:</strong> {savedUser.email}</p>
          <p><strong>Edad:</strong> {savedUser.age}</p>
          <p><strong>Ingreso Mensual:</strong> {savedUser.monthlyIncome}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;