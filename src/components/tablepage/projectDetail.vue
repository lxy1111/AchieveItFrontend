<template>
  <div class="_detailpage">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" style="margin: 0.5rem;">

          <el-tabs style="margin: 0.5rem;">
            <el-tab-pane label="项目信息">
              <div class="project-info">
                <el-form
                  :inline="true"
                  :model="formEdit"
                  ref="formEdit"
                  class="demo-form-inline-dialog"
                  label-width="85px"
                  :rules="formEditRules"
                  :disabled="editDialogParam.formEditDisabled"
                >
                  <el-form-item class="form_input" label="项目id" prop="id">
                    <el-input disabled v-model="formEdit.id" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="项目名称" prop="projectName">
                    <el-input v-if="userInfo.userRole=='PM'&&this.formEdit.status!=6" v-model="formEdit.projectName" placeholder=""></el-input>
                    <el-input v-else disabled v-model="formEdit.projectName" placeholder=""></el-input>

                  </el-form-item>
                  <el-form-item label="项目状态" prop="status">
                    <el-button @click="onShowPending()"
                            class="status_button" v-if="formEdit.status==0">申请立项</el-button>
                    <el-button style="color: #00C1A0; background: rgba(0,193,160,0.09);"
                            class="status_button" v-if="formEdit.status==1">已立项</el-button>
                    <el-button @click="" style="color: #ab1b10; background: rgba(171,27,16,0.09);"
                            class="status_button" v-if="formEdit.status==2">立即驳回</el-button>
                    <el-button @click="" style="color: #0cab2f; background: rgba(12,171,47,0.09);"
                            class="status_button" v-if="formEdit.status==3">进行中</el-button>
                    <el-button @click="" style="color: #ab4d02; background: rgba(171,77,2,0.09);"
                            class="status_button" v-if="formEdit.status==4">已交付</el-button>
                    <el-button @click="" style="color: #838383; background: rgba(131,131,131,0.09);"
                            class="status_button" v-if="formEdit.status==5">结束</el-button>
                    <el-button @click="" style="color: #ab8c05; background: rgba(171,140,5,0.09);"
                            class="status_button" v-if="formEdit.status==6">已归档</el-button>
                  </el-form-item>
                  <el-form-item class="form_select" label="项目上级" prop="leader">
                    <el-input disabled v-model="formEdit.leader" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="客户信息" prop="customerInfo">
                    <el-input v-if="userInfo.userRole=='PM'&&this.formEdit.status!=6" v-model="formEdit.customerInfo" placeholder=""></el-input>
                    <el-input v-else disabled v-model="formEdit.customerInfo" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="主要里程碑" prop="milepost">
                    <el-input v-if="userInfo.userRole=='PM'&&this.formEdit.status!=6" v-model="formEdit.milepost" placeholder=""></el-input>
                    <el-input v-else disabled v-model="formEdit.milepost" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="主要功能" prop="projectFunction">
                    <el-input v-if="userInfo.userRole=='PM'&&this.formEdit.status!=6" type="textarea" autosize v-model="formEdit.projectFunction" placeholder=""></el-input>
                    <el-input v-else disabled type="textarea" autosize v-model="formEdit.projectFunction" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="采用技术" prop="technology">
                    <el-input v-if="userInfo.userRole=='PM'&&this.formEdit.status!=6" v-model="formEdit.technology" placeholder=""></el-input>
                    <el-input v-else disabled v-model="formEdit.technology" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="业务领域" prop="businessArea">
                    <el-input v-if="userInfo.userRole=='PM'&&this.formEdit.status!=6" v-model="formEdit.businessArea" placeholder=""></el-input>
                    <el-input v-else disabled v-model="formEdit.businessArea" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_date" label="预定时间" prop="scheduleTime">
                    <el-date-picker
                      v-if="userInfo.userRole=='PM'&&this.formEdit.status!=6"
                      v-model="formEdit.scheduleTime"
                      type="datetime"
                      placeholder="选择预定时间"
                    ></el-date-picker>
                    <el-date-picker
                      v-else disabled
                      v-model="formEdit.scheduleTime"
                      type="datetime"
                      placeholder="选择预定时间"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item class="form_date" label="交付时间" prop="deliveryTime">
                    <el-date-picker
                      v-if="userInfo.userRole=='PM'&&this.formEdit.status!=6"
                      v-model="formEdit.deliveryTime"
                      type="datetime"
                      placeholder="选择交付时间"
                    ></el-date-picker>
                    <el-date-picker
                      v-else disabled
                      v-model="formEdit.deliveryTime"
                      type="datetime"
                      placeholder="选择交付时间"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button style="background: #309aec;
                                  color: white;
                                  margin-left: 1rem;
                                  border-color: #309aec;"
                               v-if="this.userInfo.userRole=='PM'&&this.formEdit.status!=6"
                               round @click="saveEdit">保存更改</el-button>
                  </el-form-item>

                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="功能列表">
              <el-row style="margin-top: 1rem;">
                <el-col :span="20">
<!--                  <el-button v-if="this.userInfo.userRole=='PM'"-->
<!--                             style="background: #439ea8;-->
<!--                                  color: white;-->
<!--                                  margin-left: 1rem;-->
<!--                                  width: 8rem;-->
<!--                                  border-color: #439ea8;"-->
<!--                             round @click="">从excel导入</el-button>-->
<!--                  <el-button style="background: #cf9236;-->
<!--                                  color: white;-->
<!--                                  margin-left: 1rem;-->
<!--                                  width: 8rem;-->
<!--                                  border-color: #cf9236;"-->
<!--                             round>导出至excel</el-button>-->
                </el-col>
                <el-col :span="4">
                  <el-button v-if="this.userInfo.userRole=='PM'&&this.formEdit.status!=5&&this.formEdit.status!=6"
                             style="background: #309aec;
                                  color: white;
                                  margin-left: 1rem;
                                  border-color: #309aec;"
                             round @click="onShowAddFunction">新建功能</el-button>
                </el-col>
              </el-row>
              <div>
                <el-table
                  :data="functionList"
                  v-loading="loadingFunc"
                  style="width: 100%;margin-bottom: 20px; margin-top: 1rem;"
                  row-key="id"
                  :default-sort = "{prop: 'id', order: 'ascending'}"

                  :tree-props="{children: 'subFunction', hasChildren: 'hasChildren'}"
                  stripe class="visitor-table" align="center">
                  <el-table-column type="expand" >
                      <template slot-scope="props">
                        <el-table  :data="props.row.projectSubFuncs"
                                   style="width: 93%; margin-left: 5%; margin-bottom: 20px; margin-top: 1rem; background-color: #fcfcfc;border-radius: 4px;box-shadow:  0px 2px 10px rgba(0, 0, 0, .12); "
                                   row-key="id"
                                   stripe class="visitor-table" align="center">
                          <el-table-column label="子功能id" prop="id" align="center" >
                          </el-table-column>
                          <el-table-column label="子功能名称" prop="functionName"  align="center">
                          </el-table-column>
                          <el-table-column label="负责人" prop="personCharge" align="center" >
                          </el-table-column>
                          <el-table-column v-if="formEdit.status!=5&&formEdit.status!=6" fixed="right" label="操作"  align="center">
                            <template slot-scope="scope">
                              <i style="font-size: 1.1rem;" class="el-icon-zoom-in" @click="onShowFunctionDetail(scope.row)"></i>
                              <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEditSubFunction(scope.row)"></i>
                              <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-delete" @click="onShowDeleteSubFunction(scope.row)"></i>
                            </template>
                          </el-table-column>
                        </el-table>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" label="功能id" align="center"></el-table-column>
                  <el-table-column prop="functionName" label="功能名称" align="center"></el-table-column>
                  <el-table-column prop="personCharge" label="负责人" align="center"></el-table-column>
                  <el-table-column v-if="formEdit.status!=5&&formEdit.status!=6" fixed="right" label="操作"  align="center">
                    <template slot-scope="scope">
                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-folder-opened" @click="exportExcel(scope.row)"></i>
                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-folder-add" @click="onShowOpenExcel(scope.row)"></i>
                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-plus" @click="onShowAddSubFunction(scope.row)"></i>
                      <i style="font-size: 1.1rem;" class="el-icon-zoom-in" @click="onShowFunctionDetail(scope.row)"></i>

                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEditFunction(scope.row)"></i>
                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-delete" @click="onShowDeleteFunction(scope.row)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="组员管理">
              <el-row style="margin-top: 1rem;">
                <el-col :span="12">
                  <span style="background: white; font-weight: bold;
                                  color: #439ea8;
                                  margin-left: 1rem;
                                  border: 0;">当前项目上级：{{this.formEdit.leader}}</span>
                </el-col>
                <el-col :span="12" align="right">
                  <el-button v-if="this.userInfo.userRole=='PM'&&this.formEdit.status!=5&&this.formEdit.status!=6"
                             style="background: #309aec;
                                color: white;
                                margin-left: 1rem;
                                border-color: #309aec;"
                             round @click="onShowAddGroup">新增组员</el-button>
                </el-col>
              </el-row>

              <div>
                <el-table
                  :data="groupList"
                  style="width: 100%; margin-bottom: 20px; margin-top: 1rem;"
                  row-key="name"
                  default-expand-all
                  stripe class="visitor-table" align="center">
                  <el-table-column type="selection" width="30" align="center"></el-table-column>
                  <el-table-column prop="userId" label="组员id" width="70" align="center"></el-table-column>
                  <el-table-column prop="userName" label="姓名" width="60"></el-table-column>
                  <el-table-column prop="userRole" label="角色" width="150"></el-table-column>
                  <el-table-column prop="userMail" label="邮箱"></el-table-column>
                  <el-table-column prop="userDepartment" label="部门" width="100"></el-table-column>
                  <el-table-column prop="projectChargerMail" label="项目上级邮箱"></el-table-column>
                  <el-table-column prop="userTel" label="电话"></el-table-column>
                  <el-table-column fixed="right" label="权限" align="center">
                    <template slot-scope="scope">
                      <i style="font-size: 1.1rem;" class="el-icon-zoom-in"
                         @click="onShowDetailPermission(scope.row)"></i>
<!--                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-plus" @click="onShowAddPermission(scope.row)"></i>-->
                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEditPermission(scope.row)"></i>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="this.formEdit.status!=5&&this.formEdit.status!=6" fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
<!--                      <i style="font-size: 1.1rem;" class="el-icon-zoom-in" @click="onShowGroupDetail(scope.row)"></i>-->
                      <i style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEditGroup(scope.row)"></i>
                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-delete" @click="onShowDeleteGroup(scope.row)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="this.formEdit.status!=5&&this.formEdit.status!=6" label="工时管理" class="choose-time">
              <el-row style="margin-top: 1rem;">
                <el-col :span="12" align="left">
                  <span style="font-weight: bold;">
                    查询项目工时
                  </span>
                </el-col>
                <el-col :span="12" align="right">
                  <el-date-picker v-if="this.userInfo.userRole=='PM'||this.userInfo.userRole=='Superior'"
                    v-model="formSearchTime"
                    type="date"
                    placeholder="选择需要查询工时的日期"
                  ></el-date-picker>
                  <el-button v-if="this.userInfo.userRole=='PM'||this.userInfo.userRole=='Superior'"
                    style="margin-left: 1rem;" type="primary" @click="searchWorkTime()">查询工时</el-button>
                </el-col>
              </el-row>
              <div style="margin-bottom: 3rem;"
                   v-if="this.userInfo.userRole=='PM'||this.userInfo.userRole=='Superior'">
                <el-table
                  :data="timeList"
                  style="width: 100%;margin-bottom: 20px; margin-top: 1rem;"
                  row-key="name"
                  default-expand-all
                  stripe class="visitor-table" align="center">
                  <el-table-column prop="userId" label="组员id" width="80" align="center"></el-table-column>
                  <el-table-column prop="userName" label="姓名" width="80"></el-table-column>
                  <el-table-column prop="userRole" label="角色" width="130"></el-table-column>
                  <el-table-column prop="finishedFunction" width="150" label="完成功能"></el-table-column>
                  <el-table-column prop="finishedActivity" width="160" label="完成活动"></el-table-column>
                  <el-table-column prop="startTime" label="开始时间" width="160" :formatter="format_date"></el-table-column>
                  <el-table-column prop="finishTime" label="结束时间" width="160" :formatter="format_date"></el-table-column>
                  <el-table-column prop="status" align="center" label="状态" >
                    <template slot-scope="scope">
                      <button @click=""
                              class="status_button" v-if="scope.row.status==0">已提交</button>
                      <button @click="" style="color: #00C1A0; background: rgba(0,193,160,0.09);"
                              class="status_button" v-if="scope.row.status==1">已确认</button>
                      <button @click="" style="color: #ab1b10; background: rgba(171,27,16,0.09);"
                              class="status_button" v-if="scope.row.status==2">已驳回</button>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="userInfo.userName==formEdit.leader" fixed="right" label="操作"  align="center">
                    <template slot-scope="scope">
                      <button v-if="scope.row.status=='0'&&userInfo.userName==formEdit.leader"
                                 style="font-size: 0.85rem;
                                        color: #ab4d02; background-color: transparent;
                                        border: 0"
                                 @click="onShowPendingTime(scope.row)">
                        审批工时
                      </button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-divider></el-divider>
              <el-row v-if="this.formEdit.status!=5" style="margin-top: 1rem;">
                <el-col :span="16">
                  <span style="font-weight: bold;">
                    我的工时
                  </span>
                </el-col>
                <el-col :span="8" align="right">
                  <el-button style="background: #cf9236;color: white;margin-left: 1rem;width: 8rem;border-color: #cf9236;"
                             @click="onAddMyTime"
                             round>汇报我的工时</el-button>
                </el-col>
                <el-table
                  :data="myTimeList"
                  style="width: 100%;margin-bottom: 20px; margin-top: 3rem;"
                  row-key="name"
                  default-expand-all
                  stripe class="visitor-table" align="center">
                  <el-table-column prop="startTime" label="日期" :formatter="format_date2"></el-table-column>
                  <el-table-column prop="userRole" width="130" label="角色"></el-table-column>
                  <el-table-column prop="finishedFunction" width="150" label="完成功能"></el-table-column>
                  <el-table-column prop="finishedActivity" width="160" label="完成活动"></el-table-column>
                  <el-table-column prop="startTime" label="开始时间" :formatter="format_date"></el-table-column>
                  <el-table-column prop="finishTime" label="结束时间" :formatter="format_date"></el-table-column>
                  <el-table-column prop="status" width="120" align="center" label="状态" >
                    <template slot-scope="scope">
                      <button @click=""
                              class="status_button" v-if="scope.row.status==0">已提交</button>
                      <button @click="" style="color: #00C1A0; background: rgba(0,193,160,0.09);"
                              class="status_button" v-if="scope.row.status==1">已确认</button>
                      <button @click="" style="color: #ab1b10; background: rgba(171,27,16,0.09);"
                              class="status_button" v-if="scope.row.status==2">已驳回</button>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="80"  align="center">
                    <template slot-scope="scope">
                      <i v-if="scope.row.status=='0'||scope.row.status=='2'" style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEditTime(scope.row)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
            <el-tab-pane v-if="formEdit.status==5" label="归档管理">
              <div>
                <el-table
                  :data="documentList"
                  style="width: 100%;margin-bottom: 20px; margin-top: 1rem;"
                  row-key="name"
                  default-expand-all
                  stripe class="visitor-table" align="center">
                  <el-table-column prop="type" label="文档类型" align="center"></el-table-column>
<!--                  <el-table-column label="上传入口" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-upload-->
<!--                        class="upload-demo"-->
<!--                        action=""-->
<!--                        :on-change="handleChange"-->
<!--                        :file-list="fileList">-->
<!--                        <i style="font-size: 1.1rem;" class="el-icon-upload2"></i>-->
<!--                      </el-upload>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                  <el-table-column label="下载文档" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                      <i style="font-size: 1.1rem;" class="el-icon-download"></i>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
                  <el-table-column fixed="right" prop="whetherComplete" label="是否完整提交">
                    <template slot-scope="scope">
                      <button @click=""
                              style="border-radius: 0.1rem;
                            border: 0px;
                            position: relative;
                            width: 3.5rem;
                            height: 1.4rem;
                            color: #36aba8;
                            font-size: 0.8rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(54,171,168,0.09);"
                              v-if="scope.row.whetherComplete==true">完整</button>
                      <button @click="changeArchive(scope.row)"
                              style="border-radius: 0.1rem;
                            border: 0px;
                            position: relative;
                            width: 3.5rem;
                            height: 1.4rem;
                            color: #c14147;
                            font-size: 0.8rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(193,39,51,0.09);"
                              v-if="scope.row.whetherComplete==false">不完整</button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="缺陷管理">
              <el-row style="margin-top: 1rem;">
                <el-col :span="20">

                </el-col>
                <el-col :span="4">
                  <el-button v-if="this.userInfo.userRole=='PM'&&this.formEdit.status!=5&&this.formEdit.status!=6"
                             style="background: #309aec;
                                  color: white;
                                  margin-left: 1rem;
                                  border-color: #309aec;"
                             round @click="onShowAddDefault">新建缺陷</el-button>
                </el-col>
              </el-row>
              <br>
              <div>
                <el-table :data="defaultList" stripe class="visitor-table" style="width: 100%" align="center" v-loading="loadingFunc">
<!--                  <el-table-column type="selection" width="30" align="center"></el-table-column>-->
                  <el-table-column prop="id" label="缺陷id"  align="center"></el-table-column>
                  <el-table-column prop="content" label="缺陷内容" ></el-table-column>
                  <el-table-column prop="chargerId" label="负责人id" ></el-table-column>
                  <el-table-column v-if="formEdit.status!=5&&formEdit.status!=6" fixed="right" label="操作"  align="center">
                    <template slot-scope="scope">

<!--                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEditDefect(scope.row)"></i>-->
                      <i v-if="userInfo.userRole=='PM'" style="font-size: 1.1rem;" class="el-icon-delete" @click="onShowDeleteDefect(scope.row)"></i>
                    </template>
                  </el-table-column>
                </el-table>

              </div>
            </el-tab-pane>
            <el-tab-pane label="风险管理">
              <el-row style="margin-top: 1rem;">
                <el-col :span="20">

                </el-col>
                <el-col :span="4">
                  <el-button v-if="this.userInfo.userRole=='PM'&&this.formEdit.status!=5&&this.formEdit.status!=6"
                             style="background: #309aec;
                                  color: white;
                                  margin-left: 1rem;
                                  border-color: #309aec;"
                             round @click="onShowAddRisk">新建风险</el-button>
                </el-col>
<!--                <el-col :span="4">-->
<!--                  <el-dropdown @command="handleCommand">-->
<!--              <span class="el-dropdown-link">-->
<!--                 从组织库导入风险<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--              </span>-->
<!--                    <el-dropdown-menu slot="dropdown">-->
<!--                      <el-dropdown-item command="a">黄金糕</el-dropdown-item>-->
<!--                      <el-dropdown-item command="b">狮子头</el-dropdown-item>-->
<!--                      <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>-->
<!--                      <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>-->
<!--                      <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>-->
<!--                    </el-dropdown-menu>-->
<!--                  </el-dropdown>-->
<!--                </el-col>-->
              </el-row>
              <br>
              <div>
                <el-table :data="riskList" stripe class="visitor-table" style="width: 100%" align="center" v-loading="loadingFunc">
<!--                  <el-table-column type="selection" width="30" align="center"></el-table-column>-->
                  <el-table-column prop="id" label="风险id"  align="center"></el-table-column>
                  <el-table-column prop="type" label="风险类型" ></el-table-column>
                  <el-table-column prop="description" label="风险描述"></el-table-column>
                  <el-table-column prop="level" label="风险级别" show-overflow-tooltip tooltip-effect="dark" ></el-table-column>
                  <el-table-column prop="effect" label="风险影响度"  ></el-table-column>
                  <el-table-column prop="strategy" label="风险应对策略"></el-table-column>
                  <el-table-column prop="responsible" label="风险责任人"  ></el-table-column>
                  <!--      <el-table-column prop="gender" label="性别"  :formatter="format_gender"></el-table-column>-->
                  <el-table-column prop="frequency" label="风险跟踪频度"  ></el-table-column>
                  <el-table-column prop="relevant" label="风险相关者"  ></el-table-column>
                  <el-table-column fixed="right" prop="status" label="风险状态" >
                    <template slot-scope="scope">
                      <button @click="handleStatus(scope.row,2)"
                              style="border-radius: 0.2rem;
                            border: 0px;
                            position: relative;
                            width: 3.5rem;
                            height: 1.4rem;
                            color: #36aba8;
                            font-size: 0.8rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(54,171,168,0.09);"
                              v-if="scope.row.status==1">待处理</button>
                      <button @click="handleStatus(scope.row,3)"
                              style="border-radius: 0.2rem;
                            border: 0px;
                            position: relative;
                            width: 3.5rem;
                            height: 1.4rem;
                            color: #00C1A0;
                            font-size: 0.8rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(0,193,160,0.09);"
                              v-if="scope.row.status==2">处理中</button>
                      <button
                              style="border-radius: 0.2rem;
                            border: 0px;
                            position: relative;
                            width: 4rem;
                            height: 1.5rem;
                            color: #309aec;
                            font-size: 0.83rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(48,154,236,0.09);"
                              v-if="scope.row.status==3"
                      >处理完毕</button>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="this.formEdit.status!=5&&this.formEdit.status!=6" width="110" fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                      <button
                        style="border-radius: 0.2rem;
                            border: 0px;
                            position: relative;
                            width: 4rem;
                            height: 1.5rem;
                            color: #ec8a0d;
                            font-size: 0.83rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(236,138,13,0.09);"
                        @click="followRisk(scope.row)"
                      >风险跟踪</button>
                    </template>
                  </el-table-column>
                </el-table>

                <!--表格 end-->

                <!--分页 start-->
<!--                <el-pagination-->
<!--                  @size-change="handleSizeChange"-->
<!--                  @current-change="handleCurrentChange"-->
<!--                  :current-page="pageInfo.currentPage"-->
<!--                  :page-sizes="[5, 10, 50, 100]"-->
<!--                  :page-size="pageInfo.pageSize"-->
<!--                  layout="total, sizes, prev, pager, next, jumper"-->
<!--                  :total="pageInfo.pageTotal"-->
<!--                ></el-pagination>-->
              </div>
            </el-tab-pane>

<!--            <el-tab-pane label="设备管理">-->
<!--              <el-col :span="3">-->
<!--                <el-button style="margin-top: 7px; background: #309aec; color: white; border-color: #309aec;" round @click="onShowAdd">新增设备</el-button>-->
<!--              </el-col>-->
<!--              <el-col :span="2">-->
<!--                <el-button style="margin-top: 7px;" type="danger" round>批量删除</el-button>-->
<!--              </el-col>-->
<!--            <el-table :data="deviceList" stripe class="visitor-table" style="width: 100%" align="center" v-loading="loading">-->
<!--              <el-table-column type="selection" width="30" align="center"></el-table-column>-->
<!--              <el-table-column prop="id" label="设备id"  align="center"></el-table-column>-->
<!--              <el-table-column prop="deviceowner" label="资产管理者" ></el-table-column>-->
<!--              <el-table-column prop="status" label="设备状态" >-->
<!--                <template slot-scope="scope">-->
<!--                  <button style="border-radius: 0.2rem;-->
<!--                            border: 0px;-->
<!--                            position: relative;-->
<!--                            width: 4rem;-->
<!--                            height: 1.5rem;-->
<!--                            color: #309aec;-->
<!--                            font-size: 0.83rem;-->
<!--                            font-weight: bolder;-->
<!--                            font-family: PingFang SC;-->
<!--                            background: rgba(48,154,236,0.09);"-->
<!--                  >项目状态</button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="deadline" label="资产使用期限(天)"></el-table-column>-->
<!--            </el-table>-->
<!--            </el-tab-pane>-->



<!--            <el-tab-pane label="设备管理">-->
<!--              <el-col :span="3">-->
<!--                <el-button style="margin-top: 7px; background: #309aec; color: white; border-color: #309aec;" round @click="">新增设备</el-button>-->
<!--              </el-col>-->
<!--              <el-col :span="2">-->
<!--                <el-button style="margin-top: 7px;" type="danger" round>批量删除</el-button>-->
<!--              </el-col>-->
<!--            <el-table :data="deviceList" stripe class="visitor-table" style="width: 100%" align="center" v-loading="loading">-->
<!--              <el-table-column type="selection" width="30" align="center"></el-table-column>-->
<!--              <el-table-column prop="id" label="设备id"  align="center"></el-table-column>-->
<!--              <el-table-column prop="deviceowner" label="资产管理者" ></el-table-column>-->
<!--              <el-table-column prop="status" label="设备状态" >-->
<!--                <template slot-scope="scope">-->
<!--                  <button style="border-radius: 0.2rem;-->
<!--                            border: 0px;-->
<!--                            position: relative;-->
<!--                            width: 4rem;-->
<!--                            height: 1.5rem;-->
<!--                            color: #309aec;-->
<!--                            font-size: 0.83rem;-->
<!--                            font-weight: bolder;-->
<!--                            font-family: PingFang SC;-->
<!--                            background: rgba(48,154,236,0.09);"-->
<!--                  >项目状态</button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="deadline" label="资产使用期限(天)"></el-table-column>-->
<!--            </el-table>-->
<!--            </el-tab-pane>-->


<!--            <el-tab-pane label="设备管理">-->
<!--              <el-col :span="3">-->
<!--                <el-button style="margin-top: 7px; background: #309aec; color: white; border-color: #309aec;" round @click="onShowAdd">新增设备</el-button>-->
<!--              </el-col>-->
<!--              <el-col :span="2">-->
<!--                <el-button style="margin-top: 7px;" type="danger" round>批量删除</el-button>-->
<!--              </el-col>-->
<!--            <el-table :data="deviceList" stripe class="visitor-table" style="width: 100%" align="center" v-loading="loading">-->
<!--              <el-table-column type="selection" width="30" align="center"></el-table-column>-->
<!--              <el-table-column prop="id" label="设备id"  align="center"></el-table-column>-->
<!--              <el-table-column prop="deviceowner" label="资产管理者" ></el-table-column>-->
<!--              <el-table-column prop="status" label="设备状态" >-->
<!--                <template slot-scope="scope">-->
<!--                  <button style="border-radius: 0.2rem;-->
<!--                            border: 0px;-->
<!--                            position: relative;-->
<!--                            width: 4rem;-->
<!--                            height: 1.5rem;-->
<!--                            color: #309aec;-->
<!--                            font-size: 0.83rem;-->
<!--                            font-weight: bolder;-->
<!--                            font-family: PingFang SC;-->
<!--                            background: rgba(48,154,236,0.09);"-->
<!--                  >项目状态</button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="deadline" label="资产使用期限(天)"></el-table-column>-->
<!--            </el-table>-->
<!--            </el-tab-pane>-->


          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :title="editDefaultDialogParam.title"
      :visible.sync="editDefaultDialogParam.show"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEditDefault"
        ref="formEditFunction"
        class="demo-form-inline-dialog"
        label-width="100px"
        :rules="formEditFunctionRules"
        :disabled="editDefaultDialogParam.formEditRiskDisabled"
      >
        <el-form-item class="form_input" label="缺陷内容" prop="functionName">
          <el-input v-model="formEditDefault.content" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="负责人" prop="personCharge">
          <el-input v-model="formEditDefault.chargerId" placeholder=""></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDefaultDialogParam.show = false">取 消</el-button>
        <el-button type="primary" @click="onAddDefault()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="editRiskDialogParam.title"
      :visible.sync="editRiskDialogParam.show"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEditRisk"
        ref="formEditFunction"
        class="demo-form-inline-dialog"
        label-width="100px"
        :rules="formEditFunctionRules"
        :disabled="editRiskDialogParam.formEditRiskDisabled"
      >
        <el-form-item class="form_input" label="风险类型" prop="functionName">
          <el-input v-model="formEditRisk.type" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="风险描述" prop="personCharge">
          <el-input v-model="formEditRisk.description" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="风险级别" prop="personCharge">
          <el-input v-model="formEditRisk.level" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="风险影响度" prop="personCharge">
          <el-input v-model="formEditRisk.effect" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="风险应对策略" prop="personCharge">
          <el-input v-model="formEditRisk.strategy" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="风险责任人" prop="personCharge">
          <el-input v-model="formEditRisk.responsible" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="风险相关者" prop="personCharge">
          <el-input v-model="formEditRisk.relevant" placeholder=""></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRiskDialogParam.show = false">取 消</el-button>
        <el-button type="primary" @click="onAddRisk()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="editFunctionDialogParam.title"
      :visible.sync="editFunctionDialogParam.show"
      width="700px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEditFunction"
        ref="formEditFunction"
        class="demo-form-inline-dialog"
        label-width="68px"
        :rules="formEditFunctionRules"
        :disabled="editFunctionDialogParam.formEditFunctionDisabled"
      >
        <el-form-item class="form_input" v-show="this.editFunctionDialogParam.title!='新增功能'" label="功能id" prop="id">
          <el-input disabled v-model="formEditFunction.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="功能名称" prop="functionName">
          <el-input v-model="formEditFunction.functionName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="负责人" prop="personCharge">
          <el-input v-model="formEditFunction.personCharge" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editFunctionDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editFunctionDialogParam.title!='查看功能'" type="primary" @click="onAddFunction()">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="上传excel文件"
      :visible.sync="showExcel"
      width="700px"
      @close="handleDialogClose"
      v-loading="uploadingexcel"
    >
      <el-link  :href="require('../../../static/subFunction.xlsx')" download="子功能模版.xlsx"  style="left: 44%">
        下载模版文件
      </el-link>
      <el-upload
        class="upload-demo"
        action="string"
        :http-request="uploadExcel"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel,且严格按照模版文件来进行文件填写</div>
      </el-upload>

    </el-dialog>

    <el-dialog
      :title="editSubFunctionDialogParam.title"
      :visible.sync="editSubFunctionDialogParam.show"
      width="700px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEditSubFunction"
        ref="formEditFunction"
        class="demo-form-inline-dialog"
        label-width="68px"
        :rules="formEditFunctionRules"
        :disabled="editSubFunctionDialogParam.formEditSubFunctionDisabled"
      >
        <el-form-item class="form_input" v-show="this.editSubFunctionDialogParam.title!='新增功能'" label="功能id" prop="id">
          <el-input disabled v-model="formEditSubFunction.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="子功能名称" prop="functionName">
          <el-input v-model="formEditSubFunction.functionName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="负责人" prop="personCharge">
          <el-input v-model="formEditSubFunction.personCharge" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSubFunctionDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editSubFunctionDialogParam.title!='查看功能'" type="primary" @click="onAddSubFunction()">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      :title="editGroupDialogParam.title"
      :visible.sync="editGroupDialogParam.show"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEditGroup"
        ref="formEditFunction"
        class="demo-form-inline-dialog"
        label-width="100px"
        :rules="formEditGroupRules"
        :disabled="editGroupDialogParam.formEditGroupDisabled"
      >
        <el-form-item class="form_input_group" label="当前项目ID" prop="projectId">
          <el-input disabled v-model="formEdit.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input_group" label="新增组员ID" prop="name">
          <el-input v-if="this.editGroupDialogParam.title=='新增组员'" v-model="formEditGroup.userId" placeholder=""></el-input>
          <el-input v-if="this.editGroupDialogParam.title=='编辑组员'" disabled v-model="formEditGroup.userId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input_group" label="角色" prop="head">
          <el-select v-model="formEditGroup.userRole" placeholder="">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editGroupDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editGroupDialogParam.title=='新增组员'" type="primary" @click="onAddGroup()">确 定</el-button>
        <el-button v-show="this.editGroupDialogParam.title=='编辑组员'" type="primary" @click="onEditGroup()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="editPermissionDialogParam.title"
      :visible.sync="editPermissionDialogParam.show"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEditPermission"
        ref="formEditFunction"
        class="demo-form-inline-dialog"
        label-width="100px"
        :disabled="editPermissionDialogParam.formEditPermissionDisabled"
      >

        <el-form-item class="form_input_group" label="文件权限" prop="head">
          <el-select v-model="formEditPermission.filePermission" placeholder="">
            <el-option
              v-for="item in permissionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_input_group" label="git权限" prop="head">
          <el-select v-model="formEditPermission.gitPermission" placeholder="">
            <el-option
              v-for="item in permissionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_input_group" label="邮件权限" prop="head">
          <el-select v-model="formEditPermission.mailPermission" placeholder="">
            <el-option
              v-for="item in permissionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPermissionDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editPermissionDialogParam.title=='新增权限'" type="primary" @click="onAddPermission()">确 定</el-button>
        <el-button v-show="this.editPermissionDialogParam.title=='编辑权限'" type="primary" @click="onEditPermission()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog width="400px" align="center"
      :title="changeProjectStatus.title"
      :visible.sync="changeProjectStatus.show">
      <el-radio-group v-if="this.changeProjectStatus.title=='审批项目'" v-model="radio1">
        <el-radio-button label="1">审批通过</el-radio-button>
        <el-radio-button label="2">立项驳回</el-radio-button>
      </el-radio-group>

      <el-radio-group v-if="this.changeProjectStatus.title=='审批工时'" v-model="radioTime">
        <el-radio-button label="1">审批通过</el-radio-button>
        <el-radio-button label="2">工时驳回</el-radio-button>
      </el-radio-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="changeProjectStatus.show = false">取 消</el-button>
        <el-button v-show="this.changeProjectStatus.title=='审批项目'" type="primary" @click="pendingProject()">确 定</el-button>
        <el-button v-show="this.changeProjectStatus.title=='审批工时'" type="primary" @click="pendingTime()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="formMyTimeDialogParam.title"
      :visible.sync="formMyTimeDialogParam.show"
      width="700px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formMyTime"
        class="demo-form-inline-dialog"
        label-width="68px"
        :disabled="formMyTimeDialogParam.formMyTimeDisabled"
      >
        <el-form-item class="form_input" label="员工id" prop="userId">
          <el-input disabled v-model="userInfo.userId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="员工姓名" prop="userName">
          <el-input disabled v-model="userInfo.userName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="完成功能" prop="finishedFunction">
          <el-select clearable v-model="formMyTime.finishedFunction" placeholder="请选择">
            <el-option
              v-for="item in functionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_input" label="完成活动" prop="finishedActivity">
          <el-cascader clearable
            v-model="formMyTime.finishedActivity"
            :options="activityOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item class="form_date" label="开始时间" prop="startTime">
          <el-date-picker
            value-
            v-model="formMyTime.startTime"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="form_date" label="结束时间" prop="finishTime">
          <el-date-picker
            value-
            v-model="formMyTime.finishTime"
            type="datetime"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="formMyTimeDialogParam.show = false">取 消</el-button>
        <el-button v-if="formMyTimeDialogParam.title=='汇报我的工时'" type="primary" @click="submitMyTime">提交</el-button>
        <el-button v-if="formMyTimeDialogParam.title=='编辑我的工时'" type="primary" @click="editMyTime">提交</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import {searchUserId,updateRisk,addDefault,addRisk,uploadExcel,exportExcel,groupListSearch, searchProject, searchProjectSubFunction,searchDevice,deleteProjectSubFunction,deleteProjectFunction, workHourSearch} from '../../api/api'

  import {
    workHourAccept, workHourReject, searchPermission, addPermission, editPermission
  } from '../../api/api'

  import {searchProjectFunction,deleteDefect, addProjectFunction, updateProjectFunction,searchDefault,searchRisk} from '../../api/api'
  import {approveProject, workHourEdit,workHourAdd,
    rejectProject, deleteProjectGroup,
    updateProject,
    myWorkHourSearch,
    updateProjectSubFunction,
    addProjectSubFunction} from "../../api/api";

  import {searchProjectArchive,acceptBestExperience, acceptDevelopModel, acceptDevelopTool, acceptExamine,
    acceptProblem,acceptProjectBasicTable,acceptProjectCost,acceptProjectDemand,acceptProjectEstimate,
    acceptProjectPrice,acceptProjectProcess,acceptProjectProposal,acceptProjectRisk,
    acceptProjectSchedule,acceptProjectSummary,acceptQASummary,acceptReport} from "../../api/api";
  import axios from 'axios';
  axios.defaults.baseURL="http://47.100.187.197:8080";
  axios.defaults.headers.post['Content-Type'] = 'application/json';


  export default {
        name: "projectDetail",
        data () {
          return {
            functionOptions:[

            ],
              uploadingexcel:false,
              functiontype:'',
            activityOptions:[
              {
                value: '工程活动',
                label: '工程活动',
                children: [{
                  value: '需求开发',
                  label: '需求开发'
                }, {
                  value: '设计',
                  label: '设计'
                }, {
                  value: '编码',
                  label: '编码'
                }, {
                  value: '单体测试',
                  label: '单体测试'
                }, {
                  value: '集成测试',
                  label: '集成测试'
                }, {
                  value: '系统测试',
                  label: '系统测试'
                }, {
                  value: '交付',
                  label: '交付'
                }, {
                  value: '维护',
                  label: '维护'
                }]
              },{
                value: '管理活动',
                label: '管理活动',
                children: [{
                  value: '范围管理',
                  label: '范围管理'
                }, {
                  value: '计划与调整',
                  label: '计划与调整'
                }, {
                  value: '监控与分析',
                  label: '监控与分析'
                }, {
                  value: '联络与沟通',
                  label: '联络与沟通'
                }]
              }, {
                value: '外包活动',
                label: '外包活动',
                children: [{
                  value: '外包管理',
                  label: '外包管理'
                }, {
                  value: '外包验收',
                  label: '外包验收'
                }, {
                  value: '外包支持',
                  label: '外包支持'
                }]
              }, {
                value: '支持活动',
                label: '支持活动',
                children: [{
                  value: '配置管理',
                  label: '配置管理'
                }, {
                  value: 'QA审计',
                  label: 'QA审计'
                }, {
                  value: '会议报告总结',
                  label: '会议报告总结'
                }, {
                  value: '培训',
                  label: '培训'
                }, {
                  value: '其他',
                  label: '其他'
                }]
              }
            ],

            radio1: '1',
            radioTime: '1',
            userInfo: {
              userName: '',
              userId: '',
              userRole: '',
              position: ''
            },
            staffs: [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "泷千家(天山西路店)", "address": "天山西路438号" }
            ],    //////全部员工

            fileList: [
            //   {
            //   name: 'food.jpeg',
            //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // }, {
            //   name: 'food2.jpeg',
            //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // }
            ],
            functionList: [{
                subfunlist:{

                }
            }],
              showExcel:false,
              functionid:'',
              riskList:[],
              defaultList:[],
              deviceList:[],
            loadingFunc: false,
            formSearchFunc: {
              functionName: "",
              id: "",
              personCharge: "",
              projectId: ""
            },


            groupList: [
              // {
              //   id: "10165101240",
              //   name: "组员1",
              //   role: "开发人员",
              //   email: "380923800@qq.com",
              //   department: "技术部",
              //   bossEmail: "10165101240@stu.ecnu.edu.cn",
              //   phone: "18918058616"
              // }
            ],
            permissionList: [],
            timeList: [
              // {
              //   id: "10165101240",
              //   name: "组员1",
              //   role: "开发人员",
              //   function: "3142",
              //   activity: "32321",
              //   starttime: "",
              //   endtime: ""
              // }
            ],
            myTimeList: [],
              riskData:{

              },
            documentList: [{
                type: "项目基础数据表",
                whetherComplete: false
              },
              {
                type: "项目提案书",
                whetherComplete: false
              },
              {
                type: "项目报价书",
                whetherComplete: false
              },
              {
                type: "项目估算表（功能点）",
                whetherComplete: false
              },
              {
                type: "项目计划书",
                whetherComplete: false
              },
              {
                type: "项目过程剪裁表",
                whetherComplete: false
              },
              {
                type: "项目成本管理表",
                whetherComplete: false
              },
              {
                type: "项目需求变更管理表",
                whetherComplete: false
              },
              {
                type: "项目风险管理表",
                whetherComplete: false
              },
              {
                type: "客户验收问题表",
                whetherComplete: false
              },
              {
                type: "客户验收报告",
                whetherComplete: false
              },
              {
                type: "项目总结",
                whetherComplete: false
              },
              {
                type: "最佳经验和教训",
                whetherComplete: false
              },
              {
                type: "开发工具",
                whetherComplete: false
              },
              {
                type: "开发模板（设计模板，测试模板）",
                whetherComplete: false
              },
              {
                type: "各阶段检查单",
                whetherComplete: false
              },
              {
                type: "QA总结",
                whetherComplete: false
              }],

              formEditRisk:{

              },
              formEditDefault:{

              },
            formEditFunction: {
                //id: "",
                functionName: "",
                personCharge: "",
                projectId: ""
            },
              formEditSubFunction: {
                  //id: "",
                  functionName: "",
                  personCharge: "",
                  projectId: ""
              },
            formEditGroup: {
              id: "",
              role: ""
            },
            formEditPermission: {

            },
            roleOptions: [
            //   {
            //   value: '项目上级',
            //   label: '项目上级'
            // },
              {
              value: '组织级配置管理员',
              label: '组织级配置管理员'
            }, {
              value: '项目改进小组',
              label: '项目改进小组'
            }, {
              value: '质量监控',
              label: '质量监控'
            }, {
              value: '项目经理',
              label: '项目经理'
            }, {
              value: '项目资产管理员',
              label: '项目资产管理员'
            }, {
              value: '项目成员',
              label: '项目成员'
            }],
            permissionOptions: [{
                value: '0',
                label: '0'
              }, {
                value: '1',
                label: '1'
              }],
            formSearch: {
              name: "2213",
              city: "213",
              type: "4453",
              age: null,
              gender: null,
              qq: "",
              startdate: null, //开始时间
              enddate: null, //结束时间
              createDate: "" //日期
            },
            formEdit: {
              businessArea: "",
              changeTime: "",
              createTime: "",
              createrId: 1,
              customerInfo: "",
              deliveryTime: "",
              id: 1,
              leader: "",
              milepost: "",
              projectFunction: "",
              projectName: "",
              scheduleTime: "",
              status: 1,
              technology: ""
            },
            formEditRules: {
              //校验规则

            },
            formEditFunctionRules: {
              //校验规则

            },
            formEditGroupRules: {
              //校验规则

            },
            editDialogParam: {
              title: "新增", //弹窗标题,值为:新增，查看，编辑
              show: false, //弹框显示
              formEditDisabled:false,//编辑弹窗是否可编辑
            },
              editRiskDialogParam:{
                  title: "新增功能", //弹窗标题,值为:新增功能，查看功能，编辑功能
                  show: false, //弹框显示
                  formEditRiskDisabled:false,//编辑弹窗是否可编辑
              },
              editDefaultDialogParam:{
                  title: "新增缺陷", //弹窗标题,值为:新增功能，查看功能，编辑功能
                  show: false, //弹框显示
                  formEditDefaultDisabled:false,//编辑弹窗是否可编辑
              },
            editFunctionDialogParam: {
              title: "新增功能", //弹窗标题,值为:新增功能，查看功能，编辑功能
              show: false, //弹框显示
              formEditFunctionDisabled:false,//编辑弹窗是否可编辑
            },
            editGroupDialogParam: {
              title: "新增组员", //弹窗标题,值为:新增功能，查看功能，编辑功能
              show: false, //弹框显示
              formEditGroupDisabled:false,//编辑弹窗是否可编辑
            },
            editPermissionDialogParam: {
              title: "新增权限", //弹窗标题,值为:新增功能，查看功能，编辑功能
              show: false, //弹框显示
              formEditPermissionDisabled:false,//编辑弹窗是否可编辑
            },
              editSubFunctionDialogParam: {
                  title: "新增功能", //弹窗标题,值为:新增功能，查看功能，编辑功能
                  show: false, //弹框显示
                  formEditSubFunctionDisabled:false,//编辑弹窗是否可编辑
              },
            changeProjectStatus: {
              title: "变更项目状态", //弹窗标题,值为:
              show: false,
              changeProjectStatusDisabled:true
            },
            formMyTimeDialogParam: {
              title: "汇报我的工时", //弹窗标题,值为:新增功能，查看功能，编辑功能
              show: false, //弹框显示
              formMyTimeDisabled:false,//编辑弹窗是否可编辑
            },
            formSearchTime: "",

            formMyTime: {
              projectId: '',
              userId: '',
              userName: '',
              finishedFunction: [],
              finishedActivity: [],
              startTime: '',
              finishTime: ''
            }
          }
        },
        created() {

        },
        mounted() {
          console.log("进入projectDetail界面");
          console.log(this.$route);
          this.onChangeQueryId(this.$route.query.id);
          this.userInfo.userName = sessionStorage.getItem("userName");
          this.userInfo.userRole = sessionStorage.getItem("role");
          this.userInfo.position = sessionStorage.getItem("position");
          this.userInfo.userId = sessionStorage.getItem("userId");
        },
        computed: {
          getQueryId: function() {
            return this.$route.query.id
          }
        },
        watch:{
          getQueryId: {
            handler(newValue, oldValue) {
              console.log(newValue, oldValue);
              this.onChangeQueryId(newValue);
            }
          }
        },
        methods: {
          getMyWorkHour(){

            var params='projectId='+this.formEdit.id+'&userId='+this.userInfo.userId;
            myWorkHourSearch(params)
              .then(response => {
                var json = response;
                console.log(json);
                if (json.count >=0) {
                  this.myTimeList = json.data.成员工时信息列表;
                  console.log(this.myTimeList)
                }
              })
              .catch(error => {
                this.$message({ message: "获取工时列表异常："+error, type: "error" });
              })
              .finally(() => {
                //this.loading = false;
              });

          },
            onShowEditDefect(rowData){
                this.editDefaultDialogParam.title='修改缺陷'
                this.editDefaultDialogParam.show=true
                this.formEditDefault=rowData


            },
            onShowDeleteDefect(rowData){
                 var id = rowData.id

                this.$confirm('确定删除吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    deleteDefect(id).then(res => {
                        if (res.msg == '缺陷删除成功！') {
                            this.$message({message: "删除成功！" , type: "success"});
                            this.getAllDefault(this.formEdit.id)
                        }

                    }).catch(error => {
                        this.$message({message: "异常：" + error, type: "error"});
                    })
                        .finally(() => {
                            //this.loading = false;
                        });

                })


            },
          getArchive(item){

            searchProjectArchive(item)
              .then(response => {
                if (response.count > 0) {
                  this.documentList = [{
                    type: "项目基础数据表",
                    whetherComplete: response.data.工时信息列表[0].projectBasicTable
                  },
                    {
                      type: "项目提案书",
                      whetherComplete: response.data.工时信息列表[0].projectProposal
                    },
                    {
                      type: "项目报价书",
                      whetherComplete: response.data.工时信息列表[0].projectPrice
                    },
                    {
                      type: "项目估算表（功能点）",
                      whetherComplete: response.data.工时信息列表[0].projectEstimate
                    },
                    {
                      type: "项目计划书",
                      whetherComplete: response.data.工时信息列表[0].projectSchedule
                    },
                    {
                      type: "项目过程剪裁表",
                      whetherComplete: response.data.工时信息列表[0].projectProcess
                    },
                    {
                      type: "项目成本管理表",
                      whetherComplete: response.data.工时信息列表[0].projectCost
                    },
                    {
                      type: "项目需求变更管理表",
                      whetherComplete: response.data.工时信息列表[0].projectDemand
                    },
                    {
                      type: "项目风险管理表",
                      whetherComplete: response.data.工时信息列表[0].projectRisk
                    },
                    {
                      type: "客户验收问题表",
                      whetherComplete: response.data.工时信息列表[0].acceptProblem
                    },
                    {
                      type: "客户验收报告",
                      whetherComplete: response.data.工时信息列表[0].acceptReport
                    },
                    {
                      type: "项目总结",
                      whetherComplete: response.data.工时信息列表[0].projectSummary
                    },
                    {
                      type: "最佳经验和教训",
                      whetherComplete: response.data.工时信息列表[0].bestExperience
                    },
                    {
                      type: "开发工具",
                      whetherComplete: response.data.工时信息列表[0].developTool
                    },
                    {
                      type: "开发模板（设计模板，测试模板）",
                      whetherComplete: response.data.工时信息列表[0].developModel
                    },
                    {
                      type: "各阶段检查单",
                      whetherComplete: response.data.工时信息列表[0].examine
                    },
                    {
                      type: "QA总结",
                      whetherComplete: response.data.工时信息列表[0].qaSummary
                    }]

                  console.log(this.documentList)
                }
              })
              .catch(error => { this.$message({ message: "改变文档状态异常："+error, type: "error" });})
              .finally(() => {});

          },
          changeArchive(row) {

            var documentStatus=row.whetherComplete==true?'不完整':'完整'
            this.$confirm('是否确认该文档'+documentStatus+'?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              if(row.type=='项目基础数据表'){
                acceptProjectBasicTable(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                      this.$message({type:'success', message:'文档状态更新成功'})
                      this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目提案书'){
                acceptProjectProposal(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目报价书'){
                acceptProjectPrice(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目估算表（功能点）'){
                acceptProjectEstimate(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目计划书'){
                acceptProjectSchedule(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目过程剪裁表'){
                acceptProjectProcess(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目成本管理表'){
                acceptProjectCost(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目需求变更管理表'){
                acceptProjectDemand(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目风险管理表'){
                acceptProjectRisk(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='客户验收问题表'){
                acceptProblem(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='客户验收报告'){
                acceptReport(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='项目总结'){
                acceptProjectSummary(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='最佳经验和教训'){
                acceptBestExperience(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='开发工具'){
                acceptDevelopTool(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='开发模板（设计模板，测试模板）'){
                acceptDevelopModel(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='各阶段检查单'){
                acceptExamine(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }else if(row.type=='QA总结'){
                acceptQASummary(this.formEdit.id)
                  .then(response => {if (response.msg =='状态更新成功！') {
                    this.$message({type:'success', message:'文档状态更新成功'})
                    this.getArchive(this.formEdit.id);}})
              }

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });

          },
          getAllGroupList(item){

            groupListSearch(item)
              .then(response => {
                var json = response;
                console.log(json);
                if (json.count >=0) {
                  this.groupList = json.data.组员信息列表;
                  //console.log(this.groupList)
                }
              })
              .catch(error => {
                this.$message({ message: "获取组员列表异常："+error, type: "error" });
              })
              .finally(() => {
                //this.loading = false;
              });

          },
            handleStatus(rowData,status){

              if(this.formEdit.status!=5&&this.formEdit.status!=6){

                var checkstatus=''
                if(status==2){
                  checkstatus='处理中'
                }else if (status==3){
                  checkstatus='处理完毕'
                }
                this.$confirm('状态将变为'+checkstatus+' 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  rowData.status=status
                  updateRisk(rowData).then(response=>{
                    if(response.msg=="更新成功！"){
                      this.$message({
                        type:'success',
                        message:'更新成功！'
                      })
                    }else{
                      this.$message({
                        type:'error',
                        message:response.msg
                      })
                    }

                  })  .catch(error => {
                    this.$message({ message: "更新风险异常："+error, type: "error" });
                  })
                    .finally(() => {

                    });

                })
              }
            },
            onShowAddDefault(){
              this.editDefaultDialogParam.title='新增缺陷'
                this.editDefaultDialogParam.show=true
            },
            onShowAddRisk(){

              this.editRiskDialogParam.title='新增风险'
              this.editRiskDialogParam.show=true;

            },
            uploadExcel(param){
                const formData = new FormData()
                formData.append('file', param.file)
                formData.append('id',this.functionid)
                this.uploadingexcel=true
                uploadExcel(formData,).then(response=>{
                   if(response.msg=="导入成功！"){
                       this.showExcel=false
                       this.$message({
                           type:'success',
                           message:'导入成功！'
                       })
                   }else{
                       this.$message({
                           type:'error',
                           message:response.msg
                       })
                   }

                })  .catch(error => {
                    this.$message({ message: "导入异常："+error, type: "error" });
                })
                    .finally(() => {
                        this.uploadingexcel = false;
                    });
            },
            onShowOpenExcel(rowData){
                this.showExcel=true
                this.functionid=rowData.id


            },
            followRisk(rowData){
              rowData.frequency+=1
              updateRisk(rowData).then(response=>{
                  if(response.msg=="更新成功！"){
                      this.$message({
                          type:'success',
                          message:'跟踪成功！已发送邮件到负责人'
                      })
                  }else{
                      this.$message({
                          type:'error',
                          message:response.msg
                      })
                  }

              })  .catch(error => {
                  this.$message({ message: "风险跟踪异常："+error, type: "error" });
              })
                  .finally(() => {

                  });



            },
            exportExcel(rowData){
              this.loadingFunc=true
              exportExcel(rowData.id).then(res=>{
                  const blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});//处理文档流
                  const fileName = rowData.functionName+'.xlsx';
                  const elink = document.createElement('a');
                  elink.download = fileName;
                  elink.style.display = 'none';
                  elink.href = URL.createObjectURL(blob);
                  document.body.appendChild(elink);
                  elink.click();
                  URL.revokeObjectURL(elink.href); // 释放URL 对象
                  document.body.removeChild(elink);


              }).catch(error => {
                  this.$message({ message: "导出异常："+error, type: "error" });
              })
                  .finally(() => {
                      this.loadingFunc=false
                  });


            },
            getAllRisks(projectId){

                this.loadingFunc = true
                let param={
                    "description": "",
                    "effect": '',
                    "frequency": '',
                    "id": '',
                    "level": '',
                    "pageNum": 1,
                    "pageSize": 10,
                    "relevant": "",
                    "responsible": "",
                    "status": '',
                    "strategy": "",
                    "type": "",
                    projectID:projectId
                }
                searchRisk(param)
                    .then(response => {
                        var json = response;
                        console.log(json);
                        if (json.msg == "查询成功") {

                            this.riskList = json.data.riskList;
                            console.log("风险列表查询成功");

                        } else {
                            this.$message({ message: json.message, type: "warning" });
                        }
                    })
                    .catch(error => {
                        this.$message({ message: "获取风险异常："+error, type: "error" });
                    })
                    .finally(() => {
                        this.loadingFunc = false;
                    });

            },
            getAllDefault(projectId){

                this.loadingFunc = true

                searchDefault(projectId)
                    .then(response => {
                        var json = response;
                        console.log(json);
                        if (json.msg == "查询成功！") {

                            this.defaultList = json.data.缺陷信息列表;
                            console.log("缺陷列表查询成功");

                        } else {
                            this.$message({ message: json.message, type: "warning" });
                        }
                    })
                    .catch(error => {
                        this.$message({ message: "获取缺陷异常："+error, type: "error" });
                    })
                    .finally(() => {
                        this.loadingFunc = false;
                    });

            },
            getDevices(projectId){

                this.loadingFunc = true
                let param={
                    deadline: "",
                    deviceowner: "",
                    id: "",
                    pageNum: 1,
                    pageSize: 10,
                    status: "",
                    projectID:projectId
                }
                searchDevice(param)
                    .then(response => {
                        var json = response;
                        console.log(json);
                        if (json.msg == "查询成功") {

                            this.deviceList = json.data.deviceList;
                            console.log("设备列表查询成功");

                        } else {
                            this.$message({ message: json.message, type: "warning" });
                        }
                    })
                    .catch(error => {
                        this.$message({ message: "获取设备异常："+error, type: "error" });
                    })
                    .finally(() => {
                        this.loadingFunc = false;
                    });

            },
          getAllFunction(projectId){
            let that=this
            this.loadingFunc = true
            searchProjectFunction(projectId)
              .then(response => {
                var json = response;
                console.log(json);
                if (json.msg == "查询成功") {

                  this.functionList = json.data.data;
                  console.log("功能列表查询成功");
                  this.functionOptions = [];

                  for (var i=0; i<json.count;i++){

                    this.functionOptions.push({
                      value: this.functionList[i].functionName,
                      label: this.functionList[i].functionName
                    })

                  }

                  console.log(this.functionOptions)

                  // for (var i=0;i<json.count;i++){
                  //
                  //   console.log("正在获取是否有子功能；"+i);
                  //   searchProjectSubFunction(this.functionList[i].id)
                  //     .then(res => {
                  //       console.log(res);
                  //       if(res.msg == "查询成功"&&res.count>0){
                  //         console.log(i+"号功能有子功能");
                  //         console.log(res.data.data)
                  //         let sub=res.data.data
                  //           // that.functionList[i].subfunlist=sub
                  //
                  //           // })
                  //         // for (var j=0;j<res.count;j++){
                  //         //   this.functionList.push({
                  //         //     id: res.data.data[j].funcId+"."+res.data.data[j].id,
                  //         //     functionName: res.data.data[j].functionName,
                  //         //     personCharge: res.data.data[j].personCharge,
                  //         //   });
                  //         // }
                  //
                  //         console.log(this.functionList);
                  //       }
                  //     })
                  //     .catch(error => {
                  //       this.$message({ message: error, type: "error" });
                  //     })
                  //     .finally(() => {
                  //
                  //     });
                  //
                  // }


                } else {
                  this.$message({ message: json.message, type: "warning" });
                }
              })
              .catch(error => {
                this.$message({ message: "获取功能异常："+error, type: "error" });
              })
              .finally(() => {
                this.loadingFunc = false;
              });

          },
          onChangeQueryId(newValue) {
            console.log("newValue: "+newValue);

            searchProject({
              id: newValue,
              pageNum: 1,
              pageSize: 1
            })
              .then(response => {
                var json = response;
                console.log(json);
                if (json.msg == "查询成功") {
                  this.formEdit = json.data.data[0];
                  this.getAllGroupList(this.formEdit.id);
                  this.getAllFunction(this.formEdit.id);
                  this.getAllRisks(this.formEdit.id)
                    this.getAllDefault(this.formEdit.id)
                  this.getDevices(this.formEdit.id)
                  this.getMyWorkHour();
                  this.getArchive(this.formEdit.id);

                } else {
                  this.$message({ message: json.message, type: "warning" });
                }
              })
              .catch(error => {
                this.$message({ message: error, type: "error" });
              })
              .finally(() => {
                this.loadingFunc = false;
              });

          },
          onAddMyTime(){

            this.formMyTime = {
              projectId: '',
              userId: '',
              userName: '',
              finishedFunction: [],
              finishedActivity: [],
              startTime: '',
              finishTime: ''
            }
            this.formMyTimeDialogParam.title = '汇报我的工时';
            this.formMyTimeDialogParam.show = true;
            this.formMyTimeDialogParam.formMyTimeDisabled = false;

          },
            onAddDefault(){
              this.formEditDefault.projectId=this.formEdit.id
                searchUserId(this.formEditDefault.chargerId).then(res=>{
                    if(res.count>0) {
                        var id = res.data.data[0].id
                        this.formEditDefault.chargerId = id
                        addDefault(this.formEditDefault).then(response => {
                            if (response.msg = '新增成功！') {
                                this.$message({
                                    type: 'success',
                                    message: '新增成功!'
                                });
                                this.formEditDefault = {};
                                this.editDefaultDialogParam.show = false
                                this.getAllDefault(this.formEdit.id)
                            }
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消新增'
                            });
                        })
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消新增'
                    });
                })


            },
            onAddRisk(){
              this.formEditRisk.status=1;
              this.formEditRisk.frequency=0;
              this.formEditRisk.projectID=this.formEdit.id;
              addRisk(this.formEditRisk).then(response=>{
                  if(response.msg='新增成功！'){
                      this.$message({
                          type: 'success',
                          message: '新增成功!'
                      });
                      this.formEditRisk={};
                      this.editRiskDialogParam.show=false
                      this.getAllRisks(this.formEdit.id)
                  }

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消新增'
                });
              })

            },
          onShowEditTime(item){

            this.formMyTime = item;
            this.formMyTimeDialogParam.title = '编辑我的工时';
            this.formMyTimeDialogParam.show = true;
            this.formMyTimeDialogParam.formMyTimeDisabled = false;

          },
          onShowAddFunction() {
            this.formEditFunction={
              functionName: "",
              personCharge: ""
            }
            this.editFunctionDialogParam.title = "新增功能";//设置标题
            this.editFunctionDialogParam.show = true;//显示弹框
            this.editFunctionDialogParam.formEditFunctionDisabled=false;//设置可编辑
          },
            onShowAddSubFunction(rowData) {
                this.formEditSubFunction=Object.assign({},rowData);
                // this.formEditSubFunction={
                //     funcId:rowData,
                //     functionName: "",
                //     personCharge: ""
                // }
                this.formEditSubFunction.functionName=''
                this.formEditSubFunction.personCharge=''
                this.formEditSubFunction.funcId=this.formEditSubFunction.id
                this.editSubFunctionDialogParam.title = "新增功能";//设置标题
                this.editSubFunctionDialogParam.show = true;//显示弹框
                this.editSubFunctionDialogParam.formEditSubFunctionDisabled=false;//设置可编辑

            },
          onShowEditFunction(rowData) {
            this.editFunctionDialogParam.title = "编辑功能";
            this.editFunctionDialogParam.show = true;
            this.editFunctionDialogParam.formEditFunctionDisabled=false;
            this.formEditFunction=Object.assign({},rowData);


          },
            onShowEditSubFunction(rowData) {
                this.editSubFunctionDialogParam.title = "编辑功能";
                this.editSubFunctionDialogParam.show = true;
                this.editSubFunctionDialogParam.formEditFunctionDisabled=false;
                this.formEditSubFunction=Object.assign({},rowData);


            },
          onShowDeleteFunction(rowData) {
              this.$confirm('此操作将删除功能, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  deleteProjectFunction(rowData.id).then(response=>{
                      this.getAllFunction(this.formEdit.id)
                      this.$message({
                          type:'success',
                          message:'删除成功'
                      })

                  })

              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
          },
            onShowDeleteSubFunction(rowData) {
                this.$confirm('此操作将删除子功能, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteProjectSubFunction(rowData.id).then(response=>{
                        this.getAllFunction(this.formEdit.id)
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })

                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
          onShowFunctionDetail(rowData) {

            this.editFunctionDialogParam.title = "查看功能";
            this.editFunctionDialogParam.show = true;
            this.editFunctionDialogParam.formEditFunctionDisabled=true;

            this.formEditFunction=Object.assign({},rowData);

          },

          onShowAddPermission(rowData) {
            this.editPermissionDialogParam.title = "新增权限";//设置标题
            this.editPermissionDialogParam.show = true;//显示弹框
            this.editPermissionDialogParam.formEditPermissionDisabled=false;//设置可编辑

            this.formEditPermission=Object.assign({},rowData);
            console.log(this.formEditPermission)
          },

          onShowDetailPermission(rowData) {
            this.editPermissionDialogParam.title = "查看权限";//设置标题
            this.editPermissionDialogParam.show = true;//显示弹框
            this.editPermissionDialogParam.formEditPermissionDisabled=true;//设置可编辑

            this.formEditPermission=Object.assign({},rowData);
            console.log(this.formEditPermission)

            var params = 'projectId='+this.formEdit.id+'&userId='+this.formEditPermission.userId;
            searchPermission(params)
              .then(response => {
                console.log(response);

                if (response.count==1) {
                  this.formEditPermission = {

                    projectChargerMail: this.formEditPermission.projectChargerMail,
                    userDepartment: this.formEditPermission.userDepartment,
                    userId: this.formEditPermission.userId,
                    userMail: this.formEditPermission.userMail,
                    userName: this.formEditPermission.userName,
                    userRole: this.formEditPermission.userRole,
                    userTel: this.formEditPermission.userTel,
                    filePermission: response.data.data.filePermission,
                    gitPermission: response.data.data.gitPermission,
                    mailPermission: response.data.data.mailPermission,

                  }
                }else{
                  this.formEditPermission = {

                    projectChargerMail: this.formEditPermission.projectChargerMail,
                    userDepartment: this.formEditPermission.userDepartment,
                    userId: this.formEditPermission.userId,
                    userMail: this.formEditPermission.userMail,
                    userName: this.formEditPermission.userName,
                    userRole: this.formEditPermission.userRole,
                    userTel: this.formEditPermission.userTel,
                    filePermission: '未分配',
                    gitPermission: '未分配',
                    mailPermission: '未分配',

                  }
                }

                console.log(this.formEditPermission);

              })
              .catch(error => {
                this.$message({ message: "获取权限列表异常："+error, type: "error" });
              })
              .finally(() => {
                //this.loading = false;
              });

          },
          onShowEditPermission(rowData) {
            this.editPermissionDialogParam.title = "编辑权限";
            this.editPermissionDialogParam.show = true;
            this.editPermissionDialogParam.formEditPermissionDisabled=false;

            this.formEditPermission=Object.assign({},rowData);
            console.log(this.formEditPermission)

            var params = 'projectId='+this.formEdit.id+'&userId='+this.formEditPermission.userId;
            searchPermission(params)
              .then(response => {
                console.log(response);

                if (response.count==1) {
                  this.formEditPermission = {

                    projectChargerMail: this.formEditPermission.projectChargerMail,
                    userDepartment: this.formEditPermission.userDepartment,
                    userId: this.formEditPermission.userId,
                    userMail: this.formEditPermission.userMail,
                    userName: this.formEditPermission.userName,
                    userRole: this.formEditPermission.userRole,
                    userTel: this.formEditPermission.userTel,
                    filePermission: response.data.data.filePermission,
                    gitPermission: response.data.data.gitPermission,
                    mailPermission: response.data.data.mailPermission,

                  }
                }else{
                  this.formEditPermission = {

                    projectChargerMail: this.formEditPermission.projectChargerMail,
                    userDepartment: this.formEditPermission.userDepartment,
                    userId: this.formEditPermission.userId,
                    userMail: this.formEditPermission.userMail,
                    userName: this.formEditPermission.userName,
                    userRole: this.formEditPermission.userRole,
                    userTel: this.formEditPermission.userTel,
                    filePermission: '未分配',
                    gitPermission: '未分配',
                    mailPermission: '未分配',

                  }
                }

                console.log(this.formEditPermission);

              })
              .catch(error => {
                this.$message({ message: "获取权限列表异常："+error, type: "error" });
              })
              .finally(() => {
                //this.loading = false;
              });
          },
          onShowAddGroup() {
            this.editGroupDialogParam.title = "新增组员";//设置标题
            this.editGroupDialogParam.show = true;//显示弹框
            this.editGroupDialogParam.formEditGroupDisabled=false;//设置可编辑
          },
          onShowEditGroup(rowData) {
            this.editGroupDialogParam.title = "编辑组员";
            this.editGroupDialogParam.show = true;
            this.editGroupDialogParam.formEditGroupDisabled=false;

            this.formEditGroup=Object.assign({},rowData);
            console.log(this.formEditGroup)
          },
          onShowDeleteGroup(rowData) {

            console.log(rowData)
            this.$confirm('此操作将删除组员, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var params = 'projectId='+this.formEdit.id+'&userId='+rowData.userId;
              deleteProjectGroup(params).then(response=>{
                this.getAllGroupList(this.formEdit.id)
                this.$message({
                  type:'success',
                  message:'删除成功'
                })

              })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });

          },
          onShowGroupDetail(rowData) {

            this.editGroupDialogParam.title = "查看功能";
            this.editGroupDialogParam.show = true;
            this.editGroupDialogParam.formEditGroupDisabled=true;

            this.formEditGroup=Object.assign({},rowData);

          },
          onShowPendingTime(item){

            if (this.userInfo.userName==this.formEdit.leader){
              console.log("开始审批项目")
              this.changeProjectStatus.show = true;
              this.changeProjectStatus.title= '审批工时';
            }
            this.formMyTime = item;
          },
          onShowPending(){

            if(this.userInfo.userRole=='Superior'){

              if (this.userInfo.userName==item.leader){
                this.changeProjectStatus.show = true;
                this.changeProjectStatus.title= '审批项目';
              } else {
                this.$alert('您不是该项目的上级，没有审批权限！', '没有权限', {
                  confirmButtonText: '确定'
                });
              }

            }

          },
          pendingTime(){
            if (this.radioTime=='1'){
              workHourAccept(this.formMyTime.id)
                .then(response => {

                  if (response.msg == "状态更新成功！") {

                    this.changeProjectStatus.show = false;
                    this.searchWorkTime();

                  } else {
                    this.$message({ message: response.msg, type: "warning" });
                  }
                })
                .catch(error => {
                  this.$message({ message: "工时审核异常："+error, type: "error" });
                })
                .finally(() => {

                });
            } else if(this.radioTime=='2'){

              workHourReject(this.formMyTime.id)
                .then(response => {

                  if (response.msg == "状态更新成功！") {

                    this.changeProjectStatus.show = false;
                    this.searchWorkTime()

                  } else {
                    this.$message({ message: response.msg, type: "warning" });
                  }
                })
                .catch(error => {
                  this.$message({ message: "工时驳回异常："+error, type: "error" });
                })
                .finally(() => {

                });
            }

          },
          pendingProject(){

            if (this.radio1=='1'){
              approveProject(this.formEdit.id)
                .then(response => {

                  if (response.msg == "状态更新成功！") {

                    this.changeProjectStatus.show = false;
                    this.getAllFunction();
                    this.getAllGroupList();

                  } else {
                    this.$message({ message: response.msg, type: "warning" });
                  }
                })
                .catch(error => {
                  this.$message({ message: "项目审核异常："+error, type: "error" });
                })
                .finally(() => {

                });
            } else if(this.radio1=='2'){

              rejectProject(this.formEdit.id)
                .then(response => {

                  if (response.msg == "状态更新成功！") {

                    this.changeProjectStatus.show = false;
                    this.getAllFunction();
                    this.getAllGroupList();

                  } else {
                    this.$message({ message: response.msg, type: "warning" });
                  }
                })
                .catch(error => {
                  this.$message({ message: "项目驳回异常："+error, type: "error" });
                })
                .finally(() => {

                });
            }


          },

          handleDialogClose() {       //功能弹窗关闭
            //this.$refs["formEditFunction"].resetFields();
          },
          onAddFunction() {
            if (this.editFunctionDialogParam.title == "新增功能") {
              this._saveFunction();
            }
            else if(this.editFunctionDialogParam.title == "编辑功能"){
              this._editFunction();
            }
          },

            onAddSubFunction() {
                if (this.editSubFunctionDialogParam.title == "新增功能") {
                    this._saveSubFunction();
                }
                else if(this.editSubFunctionDialogParam.title == "编辑功能"){
                    this._editSubFunction();
                }
            },
          onAddPermission() {
            if (this.editPermissionDialogParam.title == "新增权限") {
              this._savePermission();
            }
          },
          onEditPermission() {
            if (this.editPermissionDialogParam.title == "编辑权限") {
              this._editPermission();
            }
          },
          onAddGroup() {
            if (this.editGroupDialogParam.title == "新增组员") {
              this._saveGroup();
            }
          },
          onEditGroup() {
            if (this.editGroupDialogParam.title == "编辑组员") {
              this._editGroup();
            }
          },
          _saveGroup() {

            // userRoleSearch(this.userInfo.userId)
            //   .then(res => {
            //     console.log(res);
            //
            //   })
            //   .catch(error => {
            //     this.$message({ message: "执行异常,请重试", type: "error" });
            //   })
            //   .finally(() => {
            //
            //   });

            var params = {
              "projectId": this.formEdit.id,
              "roleDescription": this.formEditGroup.userRole,
              "userId": this.formEditGroup.userId
            }
            axios.post(`/ProjectUserInfo/Add?id=5` , params)
              .then(res => {
                console.log(res);
                this.editGroupDialogParam.show=false;
                this.getAllGroupList(this.formEdit.id);
              })
              .catch(error => {
                this.$message({ message: "保存项目异常："+error, type: "error" });
              })
              .finally(() => {

              });

          },
          _editGroup() {

            var params = 'projectId='+this.formEdit.id+'&userId='+this.formEditGroup.userId;
            deleteProjectGroup(params).then(response=>{

              var params1 = {
                "projectId": this.formEdit.id,
                "roleDescription": this.formEditGroup.userRole,
                "userId": this.formEditGroup.userId
              }
              console.log(params1)
              axios.post(`/ProjectUserInfo/Add?id=5` , params1)
                .then(res => {
                  console.log(res);
                  this.editGroupDialogParam.show=false;
                  this.getAllGroupList(this.formEdit.id);
                })
                .catch(error => {
                  this.$message({ message: "编辑组员异常："+error, type: "error" });
                })
                .finally(() => {

                });

            })

          },
          _savePermission() {



          },
          _editPermission() {

            var params={
              filePermission: this.formEditPermission.filePermission,
              gitPermission: this.formEditPermission.gitPermission,
              mailPermission: this.formEditPermission.mailPermission,
              projectId: this.formEdit.id,
              userId: this.formEditPermission.userId
            }

            editPermission(params)
              .then((response)=>{
                console.log(response)
                this.editPermissionDialogParam.show=false;
              })
              .catch(error => {
                this.$message({ message: "编辑权限异常："+error, type: "error" });
              })
              .finally(() => {

              });

          },

          _saveFunction() {

            this.formEditFunction.projectId=this.formEdit.id;
            addProjectFunction(this.formEditFunction)
              .then(response => {
                var json = response;
                console.log(json);
                this.editFunctionDialogParam.show = false;
                this.getAllFunction(this.formEditFunction.projectId);
                this.$message({
                    type:'success',
                    message:'成功'
                })
              })
              .catch(error => {
                this.$message({ message: "新增项目异常："+error, type: "error" });
              })
              .finally(() => {

              });
          },
            _saveSubFunction() {
                addProjectSubFunction(this.formEditSubFunction)
                    .then(response => {
                        if(response.msg=='新增成功！'){
                            this.$message({
                                type:'success',
                                message:'新增成功！'
                            })
                        }
                        var json = response;
                        console.log(json);
                        this.editSubFunctionDialogParam.show = false;
                        this.getAllFunction(this.formEdit.id);
                    })
                    .catch(error => {
                        this.$message({ message: "新增子功能异常："+error, type: "error" });
                    })
                    .finally(() => {

                    });
            },
          _editFunction() {

            this.formEditFunction.projectId=this.formEdit.id;
            updateProjectFunction(this.formEditFunction)
              .then(response => {
                var json = response;
                console.log(json);
                this.editFunctionDialogParam.show = false;
                this.getAllFunction(this.formEditFunction.projectId);
              })
              .catch(error => {
                this.$message({ message: "更新功能异常："+error, type: "error" });
              })
              .finally(() => {

              });

          },
            _editSubFunction() {
                updateProjectSubFunction(this.formEditSubFunction)
                    .then(response => {
                        var json = response;
                        console.log(json);
                        this.editSubFunctionDialogParam.show = false;
                        this.getAllFunction(this.formEdit.id);
                    })
                    .catch(error => {
                        this.$message({ message: "更新子功能异常："+error, type: "error" });
                    })
                    .finally(() => {

                    });

            },
          format_date(row, column) {

            var date = row[column.property];
            if (date == undefined) {
              return "";
            }
            console.log(date)
            console.log(this.$moment(date).format("YYYY-MM-DD HH:mm:ss"))
            return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
          },
          format_date2(row, column) {
            var date = row[column.property];
            if (date == undefined) {
              return "";
            }
            return this.$moment(date).format("YYYY-MM-DD");
          },
          format_date1(time) {
            if (time == undefined) {
              return "";
            }
            return this.$moment(time).format("YYYY-MM-DD");
          },
          handleChange(value) {

            console.log(value)
            //this.fileList = fileList.slice(-3);
          },
          handleSelect(item) {
            console.log(item);
          },
          querySearchAsync(queryString, cb) {
            var staffs = this.staffs;
            var results = queryString ? staffs.filter(this.createStateFilter(queryString)) : staffs;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(results);
            }, 3000 * Math.random());
          },
          createStateFilter(queryString) {
            return (state) => {
              return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          searchWorkTime(){

            var workHourParams = 'projectId='+this.formEdit.id+'&id='+this.format_date1(this.formSearchTime);
            if (this.formSearchTime==''){
              this.$message({ message: '查询日期不能为空！', type: "warning" });

            }else {

              workHourSearch(workHourParams)
                .then(response => {
                  var json = response;
                  console.log(json);
                  if (json.count >=0) {
                    this.timeList = json.data.工时信息列表;
                    console.log(this.timeList)

                    if (json.count ==0){
                      this.$message({ message: '该日期下暂无工时记录！', type: "warning" });
                    }

                  } else {
                    this.$message({ message: json.msg, type: "warning" });
                  }
                })
                .catch(error => {
                  this.$message({ message: "获取工时列表异常："+error, type: "error" });
                })
                .finally(() => {
                  //this.loading = false;
                });

            }

          },
          _edit() {

            updateProject(this.formEdit)
              .then(response => {
                var json = response;
                console.log(json);
              })
              .catch(error => {
                this.$message({ message: "更新项目异常："+error, type: "error" });
              })
              .finally(() => {

              });
          },
          saveEdit(){

            this.$confirm('是否保存修改？', '确认信息', {
              distinguishCancelAndClose: true,
              confirmButtonText: '保存',
              cancelButtonText: '放弃修改'
            })
              .then(() => {

                this._edit();

                this.$message({
                  type: 'info',
                  message: '保存修改'
                });
              })
              .catch(action => {
                this.$message({
                  type: 'info',
                  message: action === 'cancel'
                    ? '放弃保存并离开页面'
                    : '停留在当前页面'
                })
              });

          },
          submitMyTime(){

            this.$confirm('是否确认提交我的工时?', '提交工时', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {

                             ///////////////////////////////////////////调用提交我的工时接口

              this.formMyTime.projectId = this.formEdit.id;
              this.formMyTime.userId = this.userInfo.userId;
              this.formMyTime.userName = this.userInfo.userName;
              //this.formMyTime.finishedFunction = this.formMyTime.finishedFunction[0];
              //this.formMyTime.finishedActivity = this.formMyTime.finishedActivity[0]+"/"+this.formMyTime.finishedActivity[1];

              console.log(this.formMyTime)

              workHourAdd(this.formMyTime)
                .then(res=>{
                  console.log(res);
                  this.getMyWorkHour();

                  formMyTime= {
                    finishedFunction: [],
                    finishedActivity: [],
                    startTime: '',
                    finishTime: ''
                  }
                  this.formMyTimeDialogParam.show = false;
                  this.$message({
                    type: 'success',
                    message: '提交成功!'
                  });

                })
                .catch(err=>{

                })

            }).catch((err) => {
              console.log(err)
              this.$message({
                type: 'info',
                message: '已取消工时提交'
              });
            });

          },
          editMyTime(){

            this.$confirm('是否确认编辑并提交提交我的工时?', '提交编辑', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {

              console.log(this.formMyTime)

              workHourEdit({
                workHourId: this.formMyTime.id,
                startTime: this.formMyTime.startTime,
                finishTime: this.formMyTime.finishTime,
                finishedActivity: this.formMyTime.finishedActivity[0]+"/"+this.formMyTime.finishedActivity[1],
                finishedFunction: this.formMyTime.finishedFunction[0],
              })
                .then(res=>{
                  console.log(res);
                  this.getMyWorkHour();
                })
                .catch(err=>{

                })


              this.formMyTimeDialogParam.show = false;
              this.$message({
                type: 'success',
                message: '提交成功!'
              });

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消工时编辑'
              });
            });

          }

        }
    }
</script>

<style lang="scss">
._detailpage {
  font-family: "PingFang SC" !important;
  .status_button {
    border-radius: 0.1rem;
    border: 0px;
    position: relative;
    width: 4.7rem;
    height: 1.8rem;
    color: #309aec;
    font-size: 0.9rem;
    font-weight: bolder;
    font-family: PingFang SC;
    background: rgba(48,154,236,0.09);
  }

  .el-collapse {
    border: 0;
  }
  .el-collapse-item__header {
    margin-left: 2%;
    color: #439ea8;
    font-family: "PingFang SC";
    font-weight: bold;
    background: none;
    border: 0;
  }
  .el-collapse-item__arrow {
    display: none;
  }
  .el-collapse-item__wrap {
    will-change: height;
    background-color: #FFF;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 0px solid #EBEEF5;
  }

  .choose-time {
    font-family: "PingFang SC";

    .el-form-item__content {
      width: 220px;
      font-family: "PingFang SC";
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 220px;
    }

    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 0.2rem;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 35px;
      line-height: 30px;
      outline: 0;
      padding: 0 30px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }

  .el-collapse-item__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 60px;
    line-height: 48px;
    background-color: #FFF;
    color: #303133;
    cursor: pointer;
    border-bottom: 1px solid #EBEEF5;
    font-size: 0.9rem;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
  }

  .el-button {
    -webkit-appearance: none;
    background-image: none;
    border-radius: 0.2rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    font-size: 0.9rem;
    height: 32px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    font-family: "PingFang SC";
    width: 6rem;
    margin-top: 0px;
  }
  .el-button--primary {
    color: #FFF;
    background-color: #439ea8;
    border-color: #439ea8;
  }

  .el-dialog {
    border-radius: 0.2rem !important;
    font-family: "PingFang SC" !important;

    .el-form-item__content {
      width: 220px !important;
    }
    .el-form-item {
      margin-bottom: 20px !important;
    }
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 0.2rem;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 35px !important;
      line-height: 30px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
    .el-select {
      width: 220px !important;
    }
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 0.2rem;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 35px !important;
      line-height: 30px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }

  .clearfix {

  }

  .project-info {

  }

  .el-form-item {
    margin: 10px !important;
  }
  .visitor-table th{
    padding: 4px 0 !important;
  }
  .visitor-table td{
    padding: 4px 0 !important;
  }
  .visitor-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    font-size: 0.8rem;
    font-family: "PingFang SC";
    color: black;
  }
  .visitor-table th> .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    font-size: 0.8rem;
    color: black;
    font-family: "PingFang SC";
    font-weight: normal;
  }
  .el-table__row>td{
    border: none !important;
  }
  .visitor-table .el-table__row>td{
    border: none !important;
  }
  .form_input_group {
    .el-form-item__content {
      width: 700px;
    }
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 0.2rem;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 30px;
      line-height: 25px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }
  .form_input {
    .el-form-item__content {
      width: 200px;
    }
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 0.2rem;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 35px;
      line-height: 30px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }
  .form_input_big {
    .el-form-item__content {
      width: 220px;
    }
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 0.2rem;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 35px;
      line-height: 30px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }
  .form_select {
    .el-select {
      width: 200px;
    }
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 0.2rem;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 35px;
      line-height: 30px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }
  .form_date {

    font-family: "PingFang SC";

    .el-form-item__content {
      width: 210px;
      font-family: "PingFang SC";
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 210px;
    }

    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 0.2rem;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 35px;
      line-height: 30px;
      outline: 0;
      padding: 0 30px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }

}
</style>
