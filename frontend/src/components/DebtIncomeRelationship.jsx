import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import creditEvaluationService from '../services/creditEvaluation.service';

const DebtIncomeRelationship = ({ evaluation, resetEvaluation, navigate }) => {
    const [monthDebt, setMonthDebt] = useState(0);
    const [income, setIncome] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const calculateDebtIncomeRelationship = async () => {
        setIsLoading(true);
        try {
            const response = await creditEvaluationService.calculateRelationshipDebtIncome(evaluation.id, monthDebt, income);
            evaluation.relationshipDebtIncome = response.data.relationshipDebtIncome;
            await statusChange(evaluation.id); // Cambiar estado después de guardar el valor de relationship
            // Mostrar resumen de evaluación
            setShowSummary(true);
        } catch (error) {
            console.error('Error al calcular relación deuda-ingreso:', error);
        } finally {
            setIsLoading(false);
        }
    };

    
    const statusChange = async (id) => {
        try {
            await creditEvaluationService.statusChange(id);
            console.log('Estado cambiado exitosamente');
        } catch (error) {
            console.error('Error al cambiar el estado:', error);
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Calcular Relación Deuda-Ingreso</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <label>Cuota Mensual del Préstamo:</label>
                <input type="number" value={monthDebt} onChange={(e) => setMonthDebt(e.target.value)} />
                <label>Ingreso Mensual:</label>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
                <Button variant="contained" color="primary" onClick={calculateDebtIncomeRelationship} disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Calcular Relación Deuda-Ingreso'}
                </Button>
            </Box>

            {/* Mostrar Resumen de Evaluación */}
            {showSummary && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h5">Resumen de la Evaluación</Typography>
                    <Typography><strong>ID Solicitud:</strong> {evaluation.id}</Typography>
                    <Typography><strong>Estado de la evaluación:</strong> {evaluation.status}</Typography>
                    <Typography><strong>Relación Cuota Ingreso:</strong> {evaluation.relationshipFeeIncome ? 'Aprobado' : 'No Aprobado'}</Typography>
                    <Typography><strong>Edad Apropiada:</strong> {evaluation.appropiateAge ? 'Aprobado' : 'No Aprobado'}</Typography>
                    <Typography><strong>Historial DICOM:</strong> {evaluation.historyDICOM ? 'Aprobado' : 'No Aprobado'}</Typography>
                    <Typography><strong>Antigüedad:</strong> {evaluation.antiquity ? 'Aprobado' : 'No Aprobado'}</Typography>
                    <Typography><strong>Relación Deuda Ingreso:</strong> {evaluation.relationshipDebtIncome ? 'Aprobado' : 'No Aprobado'}</Typography>
                    <Typography><strong>Capacidad de Ahorro:</strong> {evaluation.savingsCapacity ? 'Aprobado' : 'No Aprobado'}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default DebtIncomeRelationship;