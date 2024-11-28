import React, { useState } from 'react';
import documentService from '../services/document.service';

const DocumentUpload = ({ creditRequestId }) => {
    const [files, setFiles] = useState([]);
    const [type, setType] = useState(''); // Estado para el tipo de documento
    const [title, setTitle] = useState(''); // Estado para el título del documento
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e) => {
        setFiles([...e.target.files]); // Almacena todos los archivos seleccionados
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Previene la recarga de la página
    
        const formData = new FormData();
        files.forEach(file => {
            formData.append('file', file); // Agrega cada archivo al FormData
        });
    
        // Agrega tipo, título y ID de la solicitud de crédito
        formData.append('type', type);
        formData.append('title', title);
        formData.append('creditRequestId', creditRequestId); // Este es para asociar con la solicitud
    
        try {
            const result = await documentService.create(formData); // Llama al servicio create con formData
            console.log('Documentos subidos:', result.data);
            setSuccessMessage('Documentos subidos con éxito');
            setErrorMessage('');
            
            // Limpiar campos después de subir
            setFiles([]);
            setType('');
            setTitle('');
            
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Subir Documentos</h2>
            <form onSubmit={handleUpload}>
                <input 
                    type="file" 
                    multiple 
                    onChange={handleFileChange} 
                    required 
                />
                <div>
                    <label htmlFor="type">Tipo de Documento:</label>
                    <input 
                        type="text" 
                        id="type" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="title">Título del Documento:</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Subir Documentos</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default DocumentUpload;