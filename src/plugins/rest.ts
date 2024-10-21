import axios from 'axios';
import router from '../routes/router';
import { HTTP_AUTH_ERRORS } from '../types/rest.types';

const restClient = axios.create({
    baseURL: 'https://6323b7ebbb2321cba91e0f6b.mockapi.io/api/v1/',
});

restClient.interceptors.response.use(res => res,
    function(error) {
        if(error.response && HTTP_AUTH_ERRORS.includes(error.response.status)) {
            router.navigate('/');
        }
        return Promise.reject(error);
    }
);

export default restClient;