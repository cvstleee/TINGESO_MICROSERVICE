import React, { useState, useEffect } from 'react';
import costumerService from '../services/costumer.service'; // Asegúrate de que este servicio esté correctamente implementado
import employeeService from '../services/employee.service';
import DocumentUpload from './DocumentUpload'; 
import creditRequestService from '../services/creditRequest.service';

const CreditRequest = () => {
    const [formData, setFormData] = useState({
        costumerId: '',
        employeeId: '',
        type: '',
        creditAmount: '',
        deadline: '',
        interestRateYear: '',
    });

    const [savedRequest, setSavedRequest] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [costumers, setCostumers] = useState([]);
    const [employees, setEmployees] = useState([]);

    // Maneja cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la recarga de la página
    
        try {
            const result = await creditRequestService.create(formData); // Llama al servicio create con formData
            console.log('Solicitud de crédito guardada:', result);
            setSavedRequest(result.data); // Almacena la solicitud guardada
            setErrorMessage('');
            
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage(error.message);
        }
    };

    // Inicializa los datos de clientes y empleados
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
        init(); // Carga los datos al montar el componente
    }, []);

    return (
        <div>
            <h1>Solicitud de Crédito</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="costumerId">Cliente:</label>
                    <select 
                        id="costumerId" 
                        name="costumerId" 
                        value={formData.costumerId} 
                        onChange={handleChange} 
                        required 
                    >
                        <option value="">Seleccione su nombre</option>
                        {costumers.map(costumer => (
                            <option key={costumer.id} value={costumer.id}>{costumer.name} {costumer.lastName}</option> 
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="employeeId">Empleado:</label>
                    <select 
                        id="employeeId" 
                        name="employeeId" 
                        value={formData.employeeId} 
                        onChange={handleChange} 
                        required 
                    >
                        <option value="">Seleccione nombre ejecutivo</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option> 
                        ))}
                    </select>
                </div>

                <div>
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

                <div>
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

                <div>
                    <label htmlFor="deadline">Plazo en Meses:</label>
                    <input 
                        type="number" 
                        id="deadline" 
                        name="deadline" 
                        value={formData.deadline} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="interestRateYear">Tasa de Interés Anual:</label>
                    <input 
                        type="number" 
                        id="interestRateYear" 
                        name="interestRateYear" 
                        value={formData.interestRateYear} 
                        onChange={handleChange} 
                        required 
                    />
                </div>



                {/* Agrega un botón para enviar */}
                <button type='submit'>Guardar Solicitud</button>

            </form>

            {/* Mostrar mensaje de error si hay uno */}
            {errorMessage && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            )}

            {/* Mostrar información de la solicitud guardada */}
            {savedRequest && (
                <div>
                    <h2>Solicitud Guardada:</h2>
                    {Object.entries(savedRequest).map(([key, value]) => (
                         key !== "documents" && ( // Si no quieres mostrar documentos aquí
                         <p key={key}><strong>{key}:</strong> {value}</p>)
                     ))}
                    
                     {/* Aquí se pasa el ID de la solicitud guardada al componente DocumentUpload */}
                     <DocumentUpload creditRequestId={savedRequest.id} />
                 </div>
             )}
         </div>
     );
};

export default CreditRequest;