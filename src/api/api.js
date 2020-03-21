import axios from 'axios';
import dev from '../../config/dev.env'

let base = '';

axios.defaults.baseURL="http://47.100.187.197:8080";


export const requestLogin = params => { return axios.post(`/Login/LogOn`, params).then(res => res.data); };
