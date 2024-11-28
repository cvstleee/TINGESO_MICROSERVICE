import httpClient from '../http-common';

const getAll = () => {
    return httpClient.get('/creditRequest/');
}

const create = data => {
    return httpClient.post("/creditRequest/", data);
}

const get = id => {
    return httpClient.get(`/creditRequest/${id}`);
}

const update = data => {
    return httpClient.put('/creditRequest/', data);
}

const remove = id => {
    return httpClient.delete(`/creditRequest/${id}`);
}

const updateStatus = (creditRequest, status) => {
    // Set the status on the creditRequest object
    creditRequest.status = status;

    // Send the PUT request
    return httpClient.put('/creditRequest/status', creditRequest);
}

const totalCost = (creditRequestId, params) => {
    const url = `/creditRequest/calculateTotalCost/${creditRequestId}?${params.toString()}`;
    return httpClient.put(url, null); // Asumiendo que httpClient tiene un método put
};

export default { getAll, create, get, update, remove, totalCost, updateStatus };