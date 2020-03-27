import axios from 'axios';
import dev from '../../config/dev.env'

let base = '';

axios.defaults.baseURL="/api";

axios.defaults.headers.post['Content-Type'] = 'application/json';


export const requestLogin = params => { return axios.post(`/Login/LogOn`, params).then(res => res.data); };

export const searchProject = params => { return axios.post(`/ProjectInfo/Search`, params).then(res => res.data); };

export const createNewProject = params => { return axios.post(`/Project/NewProject`, params).then(res => res.data); };

export const deleteProject = params => { return axios.post(`/ProjectInfo/Delete`, params).then(res => res.data); };

export const updateProject = params => { return axios.post(`/ProjectInfo/Edit`, params).then(res => res.data); };

export const addProjectFunction = params => { return axios.post(`/ProjectFunction/Add`, params).then(res => res.data); };

export const deleteProjectFunction = params => { return axios.post(`/ProjectFunction/Delete`, params).then(res => res.data); };

export const updateProjectFunction = params => { return axios.post(`/ProjectFunction/Edit`, params).then(res => res.data); };

export const searchProjectFunction = params => { return axios.post(`/ProjectFunction/Search?id=`+params, params).then(res => res.data); };

export const searchProjectSubFunction = params => { return axios.post(`/ProjectSubFunction/SubSearch?id=`+params, params).then(res => res.data); };

export const addProjectSubFunction = params => { return axios.post(`/ProjectSubFunction/SubAdd`, params).then(res => res.data); };

export const updateProjectSubFunction = params => { return axios.post(`/ProjectSubFunction/SubEdit`, params).then(res => res.data); };

export const deleteProjectSubFunction = params => { return axios.post(`/ProjectSubFunction/SubDelete`, params).then(res => res.data); };

export const searchDevice = params => { return axios.post(`/Device/Search`, params).then(res => res.data); };

export const editDevice = params => { return axios.post(`/Device/Edit`, params).then(res => res.data); };
