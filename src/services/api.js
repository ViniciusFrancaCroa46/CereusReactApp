import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


// Add request interceptor for logging
api.interceptors.request.use(
    config => {
        console.log('Fazendo requisição para:', config.url);
        return config;
    },
    error => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for logging
api.interceptors.response.use(
    response => {
        console.log('Resposta de:', response.config.url, response.status);
        return response;
    },
    error => {
        console.error('Erro na resposta:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

// Cliente endpoint
export const monitoramentoService = {
    getSA: () => api.get('/monitoramento/sensores-agua'),
    getSAbyId: (id) => api.get(`/monitoramento/sensores-agua/${id}`),
    createSA: (data) => api.post('/monitoramento/registrar/sensores-agua', data),
    updateSA: (id, data) => api.put(`/monitoramento/sensores-agua/${id}`, data),
    deleteSA: (id) => api.delete(`/monitoramento/sensores-agua/${id}`),
    getAlert: () => api.get('/monitoramento/alertas')
};

export const barreiraService = {
    getBar: () => api.get('/monitoramento/barreira'),
    getBarbyId: (id) => api.get(`/monitoramento/barreira/${id}`),
    createBar: (data) => api.post('/monitoramento/registrar/barreira'),
    updateBar: (id, data) => api.put(`/monitoramento/barreira/${id}`, data),
    delete: (id) => api.delete(`/monitoramento/barreira/${id}`)
};

export default api;