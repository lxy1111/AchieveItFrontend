import axios from 'axios';
import qs from 'qs'
import dev from '../../config/dev.env'

let base = '';

axios.defaults.baseURL="http://47.100.187.197:8080";

axios.defaults.headers.post['Content-Type'] = 'application/json';


export const requestLogin = params => { return axios.post(`/Login/LogOn`, params).then(res => res.data); };

export const addDevice = params => { return axios.post(`/Device/Add`, params).then(res => res.data); };

export const deleteDevice = params => { return axios.post(`/Device/Delete`,params).then(res => res.data); };

export const searchProject = params => { return axios.post(`/ProjectInfo/Search`, params).then(res => res.data); };

export const searchRisk = params => { return axios.post(`/Risk/Search`, params).then(res => res.data); };

export const createNewProject = params => { return axios.post(`/ProjectInfo/Add`, params).then(res => res.data); };

export const deleteProject = params => { return axios.post(`/ProjectInfo/Delete?`+params, params).then(res => res.data); };

export const updateProject = params => { return axios.post(`/ProjectInfo/Edit`, params).then(res => res.data); };

export const approveProject = params => { return axios.post(`/ProjectInfo/ApproveProject?projectId=`+params, params).then(res => res.data); };

export const rejectProject = params => { return axios.post(`/ProjectInfo/RejectProject?projectId=`+params, params).then(res => res.data); };

export const viewMyTask = params => { return axios.post(`/ProjectInfo/MyTask`, params).then(res => res.data); };

export const getEPGLeaderTask = params => { return axios.post(`/ProjectInfo/GetEPGLeaderProject`, params).then(res => res.data); };

export const getQALeaderTask = params => { return axios.post(`/ProjectInfo/GetQALeaderProject`, params).then(res => res.data); };

export const getMemberTask = params => { return axios.post(`/ProjectInfo/GetMemberProject`, params).then(res => res.data); };

export const getPMTask = params => { return axios.post(`/ProjectInfo/MyProject`, params).then(res => res.data); };

export const setProjectStatus = params => { return axios.post(`/ProjectInfo/SetStatus?`+params, params).then(res => res.data); };



export const addProjectFunction = params => { return axios.post(`/ProjectFunction/Add`, params).then(res => res.data); };

export const deleteProjectFunction = params => { return axios.post(`/ProjectFunction/Delete?id=`+params, params).then(res => res.data); };

export const updateProjectFunction = params => { return axios.post(`/ProjectFunction/Edit`, params).then(res => res.data); };

export const searchProjectFunction = params => { return axios.post(`/ProjectFunction/Search?id=`+params, params).then(res => res.data); };



export const searchProjectSubFunction = params => { return axios.post(`/ProjectSubFunction/SubSearch?id=`+params, params).then(res => res.data); };

export const addProjectSubFunction = params => { return axios.post(`/ProjectSubFunction/SubAdd`, params).then(res => res.data); };

export const updateProjectSubFunction = params => { return axios.post(`/ProjectSubFunction/SubEdit`, params).then(res => res.data); };

export const deleteProjectSubFunction = params => { return axios.post(`/ProjectSubFunction/SubDelete?id=`+params, params).then(res => res.data); };



export const searchDevice = params => { return axios.post(`/Device/Search`, params).then(res => res.data); };

export const editDevice = params => { return axios.post(`/Device/Edit`, params).then(res => res.data); };



export const workHourSearch = params => { return axios.post(`/WorkHourInfo/Search?`+params , params).then(res => res.data); };

export const myWorkHourSearch = params => { return axios.post(`/WorkHourInfo/MyWorkHours?`+params , params).then(res => res.data); };

export const workHourAdd = params => { return axios.post(`/WorkHourInfo/Add` , params).then(res => res.data); };

export const workHourEdit = params => { return axios.post(`/WorkHourInfo/Edit` , params).then(res => res.data); };

export const workHourAccept = params => { return axios.post(`/WorkHourInfo/Accept?id=`+params , params).then(res => res.data); };

export const workHourReject = params => { return axios.post(`/WorkHourInfo/Reject?id=`+params , params).then(res => res.data); };



export const groupListSearch = params => { return axios.post(`/ProjectUserInfo/Search?projectId=`+params , params).then(res => res.data); };

export const groupListAdd = params => { return axios.post(`/ProjectUserInfo/Add?id=`+params , params).then(res => res.data); };

export const deleteProjectGroup = params => { return axios.post(`/ProjectUserInfo/Delete?`+params , params).then(res => res.data); };




export const userRoleSearch = params => { return axios.post(`/UserInfo/UserRole?id=`+params , params).then(res => res.data); };



export const projectRoleSearch = params => { return axios.post(`/ProjectRole/searchAll`, params).then(res => res.data); };


