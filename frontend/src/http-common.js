import axios from "axios";

const tingesoBackendServer = import.meta.env.VITE_TINGESO_BACKEND_SERVER;
const tingesoBackendPort = import.meta.env.VITE_TINGESO_BACKEND_PORT;

//console.log("tingesoBackendServer: ", tingesoBackendServer);
console.log("tingesoBackendPort: ", tingesoBackendPort);

export default axios.create({
    //baseURL: `http://104.41.29.47:${tingesoBackendPort}`
    baseURL: `http://${tingesoBackendServer}:${tingesoBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});