import axios from 'axios';
import qs from 'qs'
import dev from '../../config/dev.env'

let base = '';

axios.defaults.baseURL="http://47.100.187.197:8080";

axios.defaults.headers.post['Content-Type'] = 'application/json';

var configs = {
  headers: {'Content-Type': 'multipart/form-data'}
}
var configs2={
  responseType: 'arraybuffer', // 表明返回服务器返回的数据类型
  headers: {
    'Content-Type': 'application/json'
  }

}


export const exportExcel = params => { return axios({
  headers: {
    'Content-Type':'application/json'
  },
  responseType: 'blob', //一定要写
  method: 'post',
  url:'/ProjectSubFunction/ExcelExport?id='+params,
}) };

export const uploadExcel = params => { return axios.post(`/ProjectSubFunction/ExcelImport`, params,configs).then(res => res.data); };

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

export const addRisk = params => { return axios.post(`/Risk/Add`, params).then(res => res.data); };

export const updateRisk = params => { return axios.post(`/Risk/Edit`, params).then(res => res.data); };

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




export const searchProjectArchive = params => { return axios.post(`/Archive/Search?projectId=`+params, params).then(res => res.data); };
export const acceptBestExperience = params => { return axios.post(`/Archive/AcceptBestExperience?projectId=`+params, params).then(res => res.data); };
export const acceptDevelopModel = params => { return axios.post(`/Archive/AcceptDevelopModel?projectId=`+params, params).then(res => res.data); };
export const acceptDevelopTool = params => { return axios.post(`/Archive/AcceptDevelopTool?projectId=`+params, params).then(res => res.data); };
export const acceptExamine = params => { return axios.post(`/Archive/AcceptExamine?projectId=`+params, params).then(res => res.data); };
export const acceptProblem = params => { return axios.post(`/Archive/AcceptProblem?projectId=`+params, params).then(res => res.data); };
export const acceptProjectBasicTable = params => { return axios.post(`/Archive/AcceptProjectBasicTable?projectId=`+params, params).then(res => res.data); };
export const acceptProjectCost = params => { return axios.post(`/Archive/AcceptProjectCost?projectId=`+params, params).then(res => res.data); };
export const acceptProjectDemand = params => { return axios.post(`/Archive/AcceptProjectDemand?projectId=`+params, params).then(res => res.data); };
export const acceptProjectEstimate = params => { return axios.post(`/Archive/AcceptProjectEstimate?projectId=`+params, params).then(res => res.data); };
export const acceptProjectPrice = params => { return axios.post(`/Archive/AcceptProjectPrice?projectId=`+params, params).then(res => res.data); };
export const acceptProjectProcess = params => { return axios.post(`/Archive/AcceptProjectProcess?projectId=`+params, params).then(res => res.data); };
export const acceptProjectProposal = params => { return axios.post(`/Archive/AcceptProjectProposal?projectId=`+params, params).then(res => res.data); };
export const acceptProjectRisk = params => { return axios.post(`/Archive/AcceptProjectRisk?projectId=`+params, params).then(res => res.data); };
export const acceptProjectSchedule = params => { return axios.post(`/Archive/AcceptProjectSchedule?projectId=`+params, params).then(res => res.data); };
export const acceptProjectSummary = params => { return axios.post(`/Archive/AcceptProjectSummary?projectId=`+params, params).then(res => res.data); };
export const acceptQASummary = params => { return axios.post(`/Archive/AcceptQASummary?projectId=`+params, params).then(res => res.data); };
export const acceptReport = params => { return axios.post(`/Archive/AcceptReport?projectId=`+params, params).then(res => res.data); };



export const searchPermission = params => { return axios.post(`/ProjectPermission/Search?`+params, params).then(res => res.data); };
export const editPermission = params => { return axios.post(`/ProjectPermission/Edit`, params).then(res => res.data); };
export const addPermission = params => { return axios.post(`/ProjectPermission/Add`, params).then(res => res.data); };



