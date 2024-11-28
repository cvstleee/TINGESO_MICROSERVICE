import httpClient from '../http-common';

const getAll = () => {
    return httpClient.get('/document/');
}

const create = (data) => {
    return httpClient.post("/document/", data, {
        headers: {
            'Content-Type': 'multipart/formData' 
        }
    });
};

const get = id => {
    return httpClient.get(`/document/${id}`);
}

const update = data => {
    return httpClient.put('/document/', data);
}

const remove = id => {
    return httpClient.delete(`/document/${id}`);
}
export default { getAll, create, get, update, remove };