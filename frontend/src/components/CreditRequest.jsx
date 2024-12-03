import React, { useState, useEffect } from 'react';
import costumerService from '../services/costumer.service';
import employeeService from '../services/employee.service';
import DocumentUpload from './DocumentUpload'; 
import creditRequestService from '../services/creditRequest.service';
import './CreditRequest.css'; // Asegúrate de crear este archivo CSS

const CreditRequest = () => {
    const [formData, setFormData] = useState({
        idCostumer: '',
        idEmployee: '',
        type: '',
        creditAmount: '',
        deadline: '',
        interestRateYear: '',
    });

    const [savedRequest, setSavedRequest] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [costumers, setCostumers] = useState([]);
    const [employees, setEmployees] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const result = await creditRequestService.create(formData);
            console.log('Solicitud de crédito guardada:', result);
            setSavedRequest(result.data);
            setErrorMessage('');
            
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage(error.message);
        }
    };

    const init = async () => {
        try {
            const costumerResponse = await costumerService.getAll();
            setCostumers(costumerResponse.data);

            const employeeResponse = await employeeService.getAll();
            setEmployees(employeeResponse.data);

        } catch (error) {
            console.error("Error al cargar clientes o empleados:", error);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="credit-request-container">
            <h1>Solicitud de Crédito</h1>
            <form onSubmit={handleSubmit} className="credit-request-form">
                <div className="form-group">
                    <label htmlFor="idCostumer">Cliente:</label>
                    <select 
                        id="idCostumer" 
                        name="idCostumer" 
                        value={formData.idCostumer} 
                        onChange={handleChange} 
                        required 
                    >
                        <option value="">Seleccione su nombre</option>
                        {costumers.map(costumer => (
                            <option key={costumer.id} value={costumer.id}>
                                {costumer.name} {costumer.lastName}
                            </option> 
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="idEmployee">Empleado:</label>
                    <select 
                        id="idEmployee" 
                        name="idEmployee" 
                        value={formData.idEmployee} 
                        onChange={handleChange} 
                        required 
                    >
                        <option value="">Seleccione nombre ejecutivo</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.firstName} {employee.lastName}
                            </option> 
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Tipo:</label>
                    <select 
                        id="type" 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange} 
                        required 
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="Primera Vivienda">Primera Vivienda</option>
                        <option value="Segunda Vivienda">Segunda Vivienda</option>
                        <option value="Remodelación">Remodelación</option>
                        <option value="Propiedad Comercial">Propiedad Comercial</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="creditAmount">Monto del Préstamo:</label>
                    <input 
                        type="number" 
                        id="creditAmount" 
                        name="creditAmount" 
                        value={formData.creditAmount} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deadline">Plazo en Años:</label>
                    <input 
                        type="number" 
                        id="deadline" 
                        name="deadline" 
                        value={formData.deadline} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="interestRateYear">Tasa de Interés Anual:</label>
                    <input 
                        type="number" 
                        id="interestRateYear" 
                        name="interestRateYear" 
                        value={formData.interestRateYear} 
                        onChange={handleChange} 
                        step="0.01"
                        required 
                    />
                </div>

                <button type='submit' className='submit-button'>Guardar Solicitud</button>
            </form>

            {errorMessage && (
                <p className='error-message'>{errorMessage}</p>
            )}

            {savedRequest && (
                <div className='saved-request'>
                    <h2>Solicitud Guardada:</h2>
                    {Object.entries(savedRequest).map(([key, value]) => (
                         key !== "documents" && (
                         <p key={key}><strong>{key}:</strong> {value}</p>)
                     ))}
                    
                     <DocumentUpload idCreditRequest={savedRequest.id} />
                 </div>
             )}
         </div>
     );
};

export default CreditRequest;