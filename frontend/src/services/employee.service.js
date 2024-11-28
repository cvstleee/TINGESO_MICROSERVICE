import httpClient from '../http-common';

const getAll = () => {
    return httpClient.get('/employee/');
}

const create = data => {
    return httpClient.post("/employee/", data);
}

const get = id => {
    return httpClient.get(`/employee/${id}`);
}

const update = data => {
    return httpClient.put('/employee/', data);
}

const remove = id => {
    return httpClient.delete(`/employee/${id}`);
}
export default { getAll, create, get, update, remove };