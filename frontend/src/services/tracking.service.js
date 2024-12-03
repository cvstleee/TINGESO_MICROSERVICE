import httpClient from '../http-common';

const findByIdCreditRequest = id => {
    return httpClient.get(`/calculations/findByIdCreditRequest/${id}`);
}

export default { findByIdCreditRequest };