<template>
  <div class="_tablepage">
    <!-- 查询区 start -->

    <!-- 查询区 end -->

    <!-- 操作区 start -->
    <el-row class="operate">
      <el-col :span="16">
        <el-collapse>
          <el-collapse-item title="项目查询" name="1">

            <template slot="title">
              <el-button type="primary">项目查询</el-button>
            </template>

            <el-form
              :inline="true"
              :model="formSearch"
              ref="formSearch"
              class="demo-form-inline"
              label-width="82px"
            >
              <el-form-item class="small_form_input" label="项目id" prop="id">
                <el-input v-model="formSearch.id" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_input" label="项目名称" prop="projectName">
                <el-input v-model="formSearch.projectName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_input" label="项目上级" prop="leader">
                <el-input v-model="formSearch.leader" placeholder=""></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 4rem;" @click="onSearch">查询</el-button>
                <el-button type="warning" style="width: 4rem;" @click="onReset" plain>重置</el-button>
              </el-form-item>
            </el-form>

          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="8" align="right">

        <el-radio-group style="margin-top: 7px; background: #fff; color: rgb(241, 129, 10); border-color: rgb(241, 129, 10); margin-right: 7px;" v-if="this.userInfo.userRole=='Superior'" v-model="radioSuperior">
          <el-radio-button label="1">仅显示我的待审核</el-radio-button>
          <el-radio-button label="2">显示全部项目</el-radio-button>
        </el-radio-group>

        <el-radio-group v-if="this.userInfo.userRole=='EPGLeader'||this.userInfo.userRole=='QALeader'" v-model="radioLeader">
          <el-radio-button label="1">仅显示我的待分配</el-radio-button>
          <el-radio-button label="2">显示全部项目</el-radio-button>
        </el-radio-group>

        <el-button v-if="this.userInfo.userRole=='PM'"
                   style="margin-top: 7px; background: #309aec; color: white; border-color: #309aec; margin-right: 7px;"
                   round @click="onShowAdd">新建项目</el-button>
        <el-radio-group style="background: #fff; color: rgb(241, 129, 10); border-color: rgb(241, 129, 10); margin-right: 7px; font-family: 'PingFang SC'"
                        v-if="this.userInfo.userRole=='PM'"
                        v-model="radioPM">
          <el-radio-button label="1">仅显示我的立项</el-radio-button>
          <el-radio-button label="2">显示全部项目</el-radio-button>
        </el-radio-group>

        <el-radio-group v-if="this.userInfo.userRole=='Member'" v-model="radioMember">
          <el-radio-button label="1">仅显示我的项目</el-radio-button>
          <el-radio-button label="2">显示全部项目</el-radio-button>
        </el-radio-group>

      </el-col>
    </el-row>

    <!-- 操作区 end -->
    <!--表格 start-->

    <el-table
      :data="tableData"
      class="visitor-table"
      style="width: 100%; max-height: 78%;"
      align="center" stripe
      tooltip-effect="dark"
      show-overflow-tooltip
      :row-style="{height:'1rem'}"
      v-loading="loading">
      <el-table-column type="selection" width="28" align="center"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form class="demo-table-expand">
              <el-form-item label="客户信息">
                <span v-model="props.row.customerInfo">{{ props.row.customerInfo }}</span>
              </el-form-item>
              <el-form-item label="主要里程碑">
                <span>{{ props.row.milepost }}</span>
              </el-form-item>
              <el-form-item label="采用技术">
                <span>{{ props.row.technology }}</span>
              </el-form-item>
              <el-form-item label="业务领域">
                <span>{{ props.row.businessArea }}</span>
              </el-form-item>
              <el-form-item label="主要功能">
                <span>{{ props.row.projectFunction}}</span>
              </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="项目id" width="90" align="center"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip tooltip-effect="dark" align="center"></el-table-column>
      <el-table-column prop="leader" label="项目上级" show-overflow-tooltip tooltip-effect="dark" align="center"></el-table-column>
      <el-table-column prop="createrId" label="项目经理id" width="90" align="center"></el-table-column>
<!--      <el-table-column prop="customerInfo" label="客户信息" show-overflow-tooltip tooltip-effect="dark" width="150" align="center"></el-table-column>-->
<!--      <el-table-column prop="milepost" label="主要里程碑" show-overflow-tooltip tooltip-effect="dark" width="150" align="center"></el-table-column>-->
<!--      <el-table-column prop="projectFunction" label="主要功能" show-overflow-tooltip tooltip-effect="dark" width="250" align="center"></el-table-column>-->
<!--      <el-table-column prop="technology" label="采用技术" show-overflow-tooltip tooltip-effect="dark" width="120" align="center"></el-table-column>-->
<!--      <el-table-column prop="businessArea" label="业务领域" show-overflow-tooltip tooltip-effect="dark" width="120" align="center"></el-table-column>-->
      <el-table-column prop="scheduleTime" label="预定时间" show-overflow-tooltip tooltip-effect="dark" align="center" :formatter="format_date"></el-table-column>
      <el-table-column prop="deliveryTime" label="交付日" show-overflow-tooltip tooltip-effect="dark" align="center" :formatter="format_date"></el-table-column>
      <el-table-column fixed="right"  prop="status" width="100" align="center" label="状态" >
        <template slot-scope="scope">
          <button @click="onShowPending(scope.row)"
                  class="status_button" v-if="scope.row.status==0">申请立项</button>
          <button @click="onShowDistribute(scope.row)" style="color: #00C1A0; background: rgba(0,193,160,0.09);"
                  class="status_button" v-if="scope.row.status==1">已立项</button>
          <button @click="" style="color: #ab1b10; background: rgba(171,27,16,0.09);"
                  class="status_button" v-if="scope.row.status==2">立即驳回</button>
          <button @click="changeProjectStatusTo4" style="color: #0cab2f; background: rgba(12,171,47,0.09);"
                  class="status_button" v-if="scope.row.status==3">进行中</button>
          <button @click="changeProjectStatusTo5" style="color: #ab4d02; background: rgba(171,77,2,0.09);"
                  class="status_button" v-if="scope.row.status==4">已交付</button>
          <button @click="changeProjectStatusTo6" style="color: #838383; background: rgba(131,131,131,0.09);"
                  class="status_button" v-if="scope.row.status==5">结束</button>
          <button @click="" style="color: #ab8c05; background: rgba(171,140,5,0.09);"
                  class="status_button" v-if="scope.row.status==6">已归档</button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100"  align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.status!=0&&
              (scope.row.createrId==userInfo.userId||userInfo.userRole=='Superior')"
             style="font-size: 1.1rem;" class="el-icon-zoom-in"
             @click="onShowDetail(scope.row)"></i>
          <i v-if="userInfo.userRole=='PM'&&scope.row.createrId==userInfo.userId" style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEdit(scope.row)"></i>
          <i v-if="userInfo.userRole=='PM'&&scope.row.createrId==userInfo.userId" style="font-size: 1.1rem;" class="el-icon-delete" @click=""></i>
        </template>
      </el-table-column>
    </el-table>

    <!--表格 end-->

    <!--分页 start-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.pageTotal"
    ></el-pagination>

    <!--分页 end-->
    <!-- 新增，编辑，查看 start -->
    <el-dialog
      :title="editDialogParam.title"
      :visible.sync="editDialogParam.show"
      width="80%"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEdit"
        ref="formEdit"
        class="demo-form-inline-dialog"
        label-width="68px"
        :disabled="editDialogParam.formEditDisabled"
      >
        <el-form-item v-if="editDialogParam.title=='编辑'" class="form_input" label="项目id" prop="name">
          <el-input disabled v-model="formEdit.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="项目名称" prop="city">
          <el-input v-model="formEdit.projectName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_select" label="项目上级" prop="type">
          <el-input v-model="formEdit.leader" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="客户信息" prop="age">
          <el-input v-model="formEdit.customerInfo" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="主要里程碑" prop="qq">
          <el-input v-model="formEdit.milepost" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="主要功能" prop="qq">
          <el-input type="textarea" autosize v-model="formEdit.projectFunction" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="采用技术" prop="qq">
          <el-input v-model="formEdit.technology" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="业务领域" prop="qq">
          <el-input v-model="formEdit.businessArea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_date" label="预定时间" prop="createDate">
          <el-date-picker
            v-model="formEdit.scheduleTime"
            type="datetime"
            placeholder="选择预定时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="form_date" label="交付时间" prop="createDate">
          <el-date-picker
            v-model="formEdit.deliveryTime"
            type="datetime"
            placeholder="选择交付时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editDialogParam.title!='查看'" type="primary" @click="onAdd();">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增，编辑，查看 end -->

    <el-dialog width="400px" align="center"
               :title="changeProjectStatus.title"
               :visible.sync="changeProjectStatus.show">

      <el-radio-group v-if="this.changeProjectStatus.title=='审批项目'" v-model="radio1">
        <el-radio-button label="1">审批通过</el-radio-button>
        <el-radio-button label="2">立项驳回</el-radio-button>
      </el-radio-group>
      <el-input v-if="this.changeProjectStatus.title=='分配EPG'" placeholder="请填写分配给该项目的EPG"></el-input>
      <el-input v-if="this.changeProjectStatus.title=='分配QA'" placeholder="请填写分配给该项目的QA"></el-input>

      <span v-if="this.changeProjectStatus.title=='变更项目状态'">是否完成所有配置，确定将该项目状态变更为“进行中”？</span>
      <span v-if="this.changeProjectStatus.title=='交付项目'">是否确定将该项目状态变更为“已交付”？</span>
      <span v-if="this.changeProjectStatus.title=='结束项目'">是否确定将该项目状态变更为“已结束”？</span>

      <div slot="footer" class="dialog-footer">
        <el-button @click="changeProjectStatus.show = false">取 消</el-button>
        <el-button v-show="this.changeProjectStatus.title=='审批项目'"
                   type="primary"
                   @click="pendingProject()">确 定</el-button>
        <el-button v-show="this.changeProjectStatus.title=='分配EPG'"
                   type="primary"
                   @click="">确 定</el-button>
        <el-button v-show="this.changeProjectStatus.title=='分配QA'"
                   type="primary"
                   @click="">确 定</el-button>
        <el-button v-show="this.changeProjectStatus.title=='变更项目状态'"
                   type="primary"
                   @click="changeProjectStatusTo3()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style lang="scss">
  .demo-table-expand {
    font-family: "PingFang SC";
    background-color: #fcfcfc;
    border-radius: 4px;
    box-shadow:  0px 2px 10px rgba(0, 0, 0, .12);
    margin-left: 90px;
    margin-right: 90px;
    margin-bottom: 30px;
    margin-top: 5px;
  }
  .demo-table-expand label {
    width: 100px;
    color: #439ea8;
    margin-right: 20px;
    font-size: 0.8rem;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 90%;
    margin-left: 5%;
    font-size: 0.8rem;
  }
  .visitor-table th{
    padding: 5px 0 !important;
  }
  .visitor-table td{
    padding: 5px 0 !important;
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
  .el-main {
    padding: 8px !important;
  }
  .el-radio-button .el-radio-button__inner {

    padding: 9px;
  }
  .el-radio-button, .el-radio-button__inner {

    height: 34px;
  }
._tablepage {

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

  // 覆写el样式,调整输入框宽度 start
  .el-form-item {
    margin-bottom: 0px !important;
  }

  .demo-form-inline .el-button {
    -webkit-appearance: none;
    background-image: none;
    border-radius: 0.2rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    font-size: 0.9rem;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    font-family: "PingFang SC";
    width: 5rem;
  }

  .el-button--primary {
    color: #FFF;
    background-color: #439ea8;
    border-color: #439ea8;
  }

  .small_form_input {
    .el-form-item__content {
      width: 90px;
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
      line-height: 30px;
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
      width: 100px;
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
      width: 100px;
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
      height: 30px;
      line-height: 30px;
      outline: 0;
      padding: 0 30px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }
  .el-pagination {
    padding-top: 5px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  // 覆写el样式,调整输入框宽度 end
  .operate {
    padding-bottom: 10px;

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
  }

  .el-form--inline .el-form-item__label {
    float: none;
    display: inline-block;
    width: 82px !important;
    font-family: "PingFang SC";
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #FFF;
    background-color: rgb(241, 129, 10);
    border-color: rgb(241, 129, 10);
    -webkit-box-shadow: -1px 0 0 0 rgb(241, 129, 10);
    box-shadow: -1px 0 0 0 rgb(241, 129, 10);
  }
  .el-radio-button__inner {
    border: 1px solid rgb(241, 129, 10);
    color: rgb(241, 129, 10);
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 1px solid rgb(241, 129, 10);
    border-radius: 4px 0 0 4px;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
  }
  .el-message-box__btns button:nth-child(2) {
    margin-left: 10px;
    background-color: #439ea8 !important;
    border-color: #439ea8 !important;
    font-family: "PingFang SC" !important;
  }
}
</style>


<script>
  import {searchProject, approveProject, rejectProject} from '../../api/api'
  import {createNewProject, getEPGLeaderTask, getQALeaderTask, getMemberTask} from '../../api/api'
  import {updateProject, userRoleSearch, viewMyTask, getPMTask} from '../../api/api'
  import {deleteProject} from '../../api/api'

export default {
  name: "tablepage",
  data() {
    return {
      userInfo: {
        userName: '',
        userId: '',
        userRole: '',
        position: ''
      },
      pageInfo: {
        //分页
          pageSize: 5,
          pageNum: 1,
          pageTotal: 0,
          currentPage: 1,
      },
      tableData: [

      ],
      formSearch: {
        businessArea: "",
        changeTime: "",
        createTime: "",
        createrId: "",
        customerInfo: "",
        deliveryTime: "",
        id: "",
        leader: "",
        milepost: "",
        projectFunction: "",
        projectName: "",
        scheduleTime: "",
        status: "",
        technology: "",
        pageNum:1,
        pageSize:5
    },
      formEdit: {
        businessArea: "",
        //changeTime: "",
        //createTime: "",
        //createrId: "",
        customerInfo: "",
        deliveryTime: "",
        id: "",
        leader: "",
        milepost: "",
        projectFunction: "",
        projectName: "",
        scheduleTime: "",
        status: "",
        technology: ""
      },
      formEditRules: {
        //校验规则
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      editDialogParam: {
        title: "新增", //弹窗标题,值为:新增，查看，编辑
        show: false, //弹框显示
        formEditDisabled:false,//编辑弹窗是否可编辑
      },
      changeProjectStatus: {
        title: "变更项目状态", //弹窗标题,值为:
        show: false,
        changeProjectStatusDisabled:true
      },

      loading: false, //加载提示,
      radio1: '1',
      radioSuperior: '2',
      radioLeader: '2',
      radioPM: '2',
      radioMember: '2'

    };
  },
  mounted() {

    this.onSearch();
    this.userInfo.userName = sessionStorage.getItem("userName");
    this.userInfo.userRole = sessionStorage.getItem("role");
    this.userInfo.position = sessionStorage.getItem("position");
    this.userInfo.userId = sessionStorage.getItem("userId");

  },
  watch:{
    radioSuperior: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (newValue=='1'){
          this.showMyTask();
        } else {
          this.onSearch();
        }
      }
    },
    radioLeader: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (newValue=='1'){
          this.showLeaderTask();
        } else {
          this.onSearch();
        }
      }
    },
    radioPM: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (newValue=='1'){
          this.showPMTask();

        } else {
          this.onSearch();
        }
      }
    },
    radioMember: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (newValue=='1'){
          this.showMemberTask();

        } else {
          this.onSearch();
        }
      }
    }
  },
  methods: {
    onSearch() {
      //查询
      this.loading = true;
      this.formSearch.pageNum = this.pageInfo.currentPage;
      this.formSearch.pageSize = this.pageInfo.pageSize;
      searchProject(this.formSearch)
        .then(response => {
          var json = response;
          console.log(json);
          if (json.msg == "查询成功") {
            this.tableData = json.data.data;
            this.pageInfo.pageTotal = json.count;
          } else {
            this.$message({ message: json.message, type: "warning" });
          }
        })
        .catch(error => {
          this.$message({ message: "执行异常,请重试", type: "error" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onAdd() {
      if (this.editDialogParam.title == "新增") {
        this._save();
      }
      else if(this.editDialogParam.title == "编辑"){
        this._edit();
      }
    },
    _save() {

      console.log("调用_save:");
      console.log(this.formEdit);

      createNewProject(this.formEdit)
        .then(response => {
          var json = response;
          console.log(json);
          this.editDialogParam.show = false;
          this.onSearch();
        })
        .catch(error => {
          this.$message({ message: "执行异常,请重试", type: "error" });
        })
        .finally(() => {

        });

    },
    _edit() {

      updateProject(this.formEdit)
        .then(response => {
          var json = response;
          console.log(json);
          this.editDialogParam.show = false;
        })
        .catch(error => {
          this.$message({ message: "执行异常,请重试", type: "error" });
        })
        .finally(() => {

        });
    },
    onShowAdd() {
      this.formEdit = {
        businessArea: "",
        changeTime: "",
        createTime: "",
        createrId: "",
        customerInfo: "",
        deliveryTime: "",
        id: "",
        leader: "",
        milepost: "",
        projectFunction: "",
        projectName: "",
        scheduleTime: "",
        status: "",
        technology: ""
      }
      this.editDialogParam.title = "新增";//设置标题
      this.editDialogParam.show = true;//显示弹框
      this.editDialogParam.formEditDisabled=false;//设置可编辑
    },
    onShowEdit(rowData) {
      this.editDialogParam.title = "编辑";
      this.editDialogParam.show = true;
      this.editDialogParam.formEditDisabled=false;

      this.formEdit=Object.assign({},rowData);
      this.formEdit.gender+='';
    },
    onShowDetail(rowData) {

      this.$router.push({
        name:'projectDetail',
        query: {
          id: Object.assign({},rowData).id
        },
        params: {
          projectInfo: Object.assign({},rowData)
        }
      })

      // this.editDialogParam.title = "查看";
      // this.editDialogParam.show = true;
      // this.editDialogParam.formEditDisabled=true;
      //
      // this.formEdit=Object.assign({},rowData);
      // this.formEdit.gender+='';

    },
    onReset() {
      //重置
      this.formSearch = {
        businessArea: "",
          changeTime: "",
          createTime: "",
          createrId: "",
          customerInfo: "",
          deliveryTime: "",
          id: "",
          leader: "",
          milepost: "",
          projectFunction: "",
          projectName: "",
          scheduleTime: "",
          status: "",
          technology: "",
          pageNum:1,
          pageSize:5
      }
      this.onSearch();
      //this.$refs["formSearch"].resetFields();
    },
    format_type(row, column) {
      //类别转换
      var type = row[column.property];
      if (type == 1) {
        return "留言";
      } else if (type == 2) {
        return "建议";
      } else if (type == 3) {
        return "BUG";
      } else {
        return "";
      }
    },
    format_gender(row, column) {
      var gender = row[column.property];
      if (gender == 1) {
        return "男";
      } else if (gender == 2) {
        return "女";
      } else {
        return "";
      }
    },
    format_date(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;

      if (this.userInfo.userRole=='Superior'){
        if (this.radioSuperior=='1'){
          this.showMyTask();
        } else if (this.radioSuperior=='2') {
          this.onSearch();
        }
      }

      if (this.userInfo.userRole=='PM'){
        if (this.radioPM=='1'){
          this.showPMTask();
        } else if (this.radioPM=='2') {
          this.onSearch();
        }
      }

      if (this.userInfo.userRole=='EPGLeader'||this.userInfo.userRole=='QALeader'){
        if (this.radioLeader=='1'){
          this.showLeaderTask();
        } else if (this.radioLeader=='2') {
          this.onSearch();
        }
      }

      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.pageInfo.pageNum = val;

      if (this.userInfo.userRole=='Superior'){
        if (this.radioSuperior=='1'){
          this.showMyTask();
        } else if (this.radioSuperior=='2') {
          this.onSearch();
        }
      }

      if (this.userInfo.userRole=='PM'){
        if (this.radioPM=='1'){
          this.showPMTask();
        } else if (this.radioPM=='2') {
          this.onSearch();
        }
      }

      if (this.userInfo.userRole=='EPGLeader'||this.userInfo.userRole=='QALeader'){
        if (this.radioLeader=='1'){
          this.showLeaderTask();
        } else if (this.radioLeader=='2') {
          this.onSearch();
        }
      }

      console.log(`当前为第 ${val} 页`);
    },
    handleDialogClose() {
      this.$refs["formEdit"].resetFields();
    },

    onShowPending(item){

      if(this.userInfo.userRole=='Superior'){

        if (this.userInfo.userName==item.leader){
          this.changeProjectStatus.show = true;
          this.changeProjectStatus.title= '审批项目';
          this.formEdit = item;
        } else {
          this.$alert('您不是该项目的上级，没有审批权限！', '没有权限', {
            confirmButtonText: '确定'
          });
        }

      }

    },
    onShowDistribute(item){
      if(this.userInfo.userRole=='EPGLeader'){

        this.changeProjectStatus.show = true;
        this.changeProjectStatus.title= '分配EPG';
        this.formEdit = item;

      }else if(this.userInfo.userRole=='QALeader'){

        this.changeProjectStatus.show = true;
        this.changeProjectStatus.title= '分配QA';
        this.formEdit = item;

      }else if(this.userInfo.userRole=='PM'&&item.createrId==this.userInfo.userId){

        this.changeProjectStatus.show = true;
        this.changeProjectStatus.title= '变更项目状态';
        this.formEdit = item;

      }
    },
    changeProjectStatusTo3(){

            //////////////////////////////////////////////////////调用改变项目状态接口

      this.changeProjectStatus.show = false;
    },
    changeProjectStatusTo4(){

      //////////////////////////////////////////////////////调用改变项目状态接口

      if(this.userInfo.userRole=='PM'){

        this.changeProjectStatus.show = true;
        this.changeProjectStatus.title= '交付项目';
        this.formEdit = item;

        // this.$confirm('是否确定将该项目状态变更为“已交付”？', '变更项目状态', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //
        // }).catch(() => {
        //
        // });
      }

    },
    changeProjectStatusTo5(){

      //////////////////////////////////////////////////////调用改变项目状态接口
      if(this.userInfo.userRole=='PM'){

        this.changeProjectStatus.show = true;
        this.changeProjectStatus.title= '结束项目';
        this.formEdit = item;

        // this.$confirm('是否确定将该项目状态变更为“已结束”？', '变更项目状态', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //
        // }).catch(() => {
        //
        // });
      }
    },
    changeProjectStatusTo6(){

      //////////////////////////////////////////////////////调用改变项目状态接口
      if(this.userInfo.userRole=='组织及配置管理员'){        ////////////////////这个角色目前还没有
        this.$confirm('是否确定将该项目状态变更为“已归档”？', '变更项目状态', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {

        });
      }
    },
    pendingProject(){

      if (this.radio1=='1'){
        approveProject(this.formEdit.id)
          .then(response => {

            if (response.msg == "状态更新成功！") {

              this.changeProjectStatus.show = false;
              this.onSearch();

            } else {
              this.$message({ message: response.msg, type: "warning" });
            }
          })
          .catch(error => {
            this.$message({ message: "执行异常,请重试", type: "error" });
          })
          .finally(() => {

          });
      } else if(this.radio1=='2'){

        rejectProject(this.formEdit.id)
          .then(response => {

            if (response.msg == "状态更新成功！") {

              this.changeProjectStatus.show = false;
              this.onSearch();

            } else {
              this.$message({ message: response.msg, type: "warning" });
            }
          })
          .catch(error => {
            this.$message({ message: "执行异常,请重试", type: "error" });
          })
          .finally(() => {

          });
      }


    },
    showMyTask(){   //项目上级获取自己待审批的项目

      // viewMyTask()
      //   .then(response => {
      //
      //     this.tableData=[];
      //     if (response.msg == "查询成功！") {
      //
      //       this.tableData = response.data.data;
      //
      //     } else {
      //       this.$message({ message: response.msg, type: "warning" });
      //     }
      //   })
      //   .catch(error => {
      //     this.$message({ message: "执行异常,请重试", type: "error" });
      //   })
      //   .finally(() => {
      //
      //   });

      this.loading = true;
      searchProject({
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        leader: this.userInfo.userName,
        status: 1
      })
        .then(response => {
          var json = response;
          console.log(json);
          if (json.msg == "查询成功") {
            this.tableData = json.data.data;
            this.pageInfo.pageTotal = json.count;
          } else {
            this.$message({ message: json.message, type: "warning" });
          }
        })
        .catch(error => {
          this.$message({ message: "执行异常,请重试", type: "error" });
        })
        .finally(() => {
          this.loading = false;
        });


    },
    showPMTask(){
      //查询
      this.loading = true;
      getPMTask({
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      })
        .then(response => {
          var json = response;
          console.log(json);
          if (json.msg == "查询成功！") {
            this.tableData = json.data.data;
            this.pageInfo.pageTotal = json.count;
          } else {
            this.$message({ message: json.msg, type: "warning" });
          }
        })
        .catch(error => {
          this.$message({ message: "执行异常,请重试", type: "error" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showMemberTask(){
                         /////////////////////////////////////////////查询普通员工自己参与的项目
      this.loading = true;
      getMemberTask({
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
      })
        .then(response => {
          var json = response;
          console.log(json);
          if (json.msg == "查询成功！") {
            this.tableData = json.data.data;
            this.pageInfo.pageTotal = json.count;
          } else {
            this.$message({ message: json.msg, type: "warning" });
          }
        })
        .catch(error => {
          this.$message({ message: "执行异常,请重试", type: "error" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showLeaderTask(){
      //查询
      this.loading = true;

      if (this.userInfo.userRole=='EPGLeader'){

        getEPGLeaderTask({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize
        })
          .then(response => {
            var json = response;
            console.log(json);
            if (json.msg == "查询成功！") {
              this.tableData = json.data.data;
              this.pageInfo.pageTotal = json.count;
            } else {
              this.$message({ message: json.msg, type: "warning" });
            }
          })
          .catch(error => {
            this.$message({ message: "执行异常,请重试", type: "error" });
          })
          .finally(() => {
            this.loading = false;
          });

      } else if(this.userInfo.userRole=='QALeader'){

        getQALeaderTask({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize
        })
          .then(response => {
            var json = response;
            console.log(json);
            if (json.msg == "查询成功！") {
              this.tableData = json.data.data;
              this.pageInfo.pageTotal = json.count;
            } else {
              this.$message({ message: json.msg, type: "warning" });
            }
          })
          .catch(error => {
            this.$message({ message: "执行异常,请重试", type: "error" });
          })
          .finally(() => {
            this.loading = false;
          });

      }

    }

  }
};
</script>

