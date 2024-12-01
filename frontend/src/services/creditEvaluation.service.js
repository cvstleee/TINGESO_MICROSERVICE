import httpClient from '../http-common';

// Obtener todos los registros de evaluación de crédito
const getAll = () => {
    return httpClient.get('/creditEvaluation/');
}

// Crear un nuevo registro de evaluación de crédito
const create = data => {
    return httpClient.post("/creditEvaluation/", data);
}

// Obtener un registro específico de evaluación de crédito por ID
const get = id => {
    return httpClient.get(`/creditEvaluation/${id}`);
}

// Actualizar un registro existente de evaluación de crédito
const update = data => {
    return httpClient.put('/creditEvaluation/', data);
}

// Eliminar un registro de evaluación de crédito por ID
const remove = id => {
    return httpClient.delete(`/creditEvaluation/${id}`);
}

const statusChange = id =>{
    return httpClient.put(`/creditEvaluation/status/${id}`);
}

// Calcular la relación deuda-ingreso
const calculateRelationshipDebtIncome = (id, monthDebt, income) => {
    return httpClient.put(`/creditEvaluation/calculateRelationship/${id}`, null, { params: { monthDebth: monthDebt, income } });
}

// Calcular la capacidad de ahorro
const savingCapacity = (id, R71, R72, R73, R74, R75) => {
    return httpClient.put(`/creditEvaluation/savingCapacity/${id}`, null, { params: { R71, R72, R73, R74, R75 } });
}

export default { getAll, create, get, update, remove, calculateRelationshipDebtIncome, savingCapacity, statusChange};