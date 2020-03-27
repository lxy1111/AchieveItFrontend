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
                    <el-input v-model="formEdit.id" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="项目名称" prop="projectName">
                    <el-input v-model="formEdit.projectName" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="项目状态" prop="status">
                    <button
                            class="status_button" v-if="formEdit.status==0">申请立项</button>
                    <button style="color: #00C1A0; background: rgba(0,193,160,0.09);"
                            class="status_button" v-if="formEdit.status==1">已立项</button>
                    <button @click="" style="color: #ab1b10; background: rgba(171,27,16,0.09);"
                            class="status_button" v-if="formEdit.status==2">立即驳回</button>
                    <button @click="" style="color: #0cab2f; background: rgba(12,171,47,0.09);"
                            class="status_button" v-if="formEdit.status==3">进行中</button>
                    <button @click="" style="color: #ab4d02; background: rgba(171,77,2,0.09);"
                            class="status_button" v-if="formEdit.status==4">已交付</button>
                    <button @click="" style="color: #838383; background: rgba(131,131,131,0.09);"
                            class="status_button" v-if="formEdit.status==5">结束</button>
                    <button @click="" style="color: #ab8c05; background: rgba(171,140,5,0.09);"
                            class="status_button" v-if="formEdit.status==6">已归档</button>
                  </el-form-item>
                  <el-form-item class="form_select" label="项目上级" prop="leader">
                    <el-input v-model="formEdit.leader" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="客户信息" prop="customerInfo">
                    <el-input v-model="formEdit.customerInfo" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="主要里程碑" prop="milepost">
                    <el-input v-model="formEdit.milepost" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="主要功能" prop="projectFunction">
                    <el-input type="textarea" autosize v-model="formEdit.projectFunction" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="采用技术" prop="technology">
                    <el-input v-model="formEdit.technology" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="业务领域" prop="businessArea">
                    <el-input v-model="formEdit.businessArea" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_date" label="预定时间" prop="scheduleTime">
                    <el-date-picker
                      v-model="formEdit.scheduleTime"
                      type="datetime"
                      placeholder="选择预定时间"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item class="form_date" label="交付时间" prop="deliveryTime">
                    <el-date-picker
                      v-model="formEdit.deliveryTime"
                      type="datetime"
                      placeholder="选择交付时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="功能列表">
              <el-row style="margin-top: 1rem;">
                <el-col :span="20">
                  <el-button style="background: #439ea8;
                                  color: white;
                                  margin-left: 1rem;
                                  width: 8rem;
                                  border-color: #439ea8;"
                             round @click="">从excel导入</el-button>
                  <el-button style="background: #cf9236;
                                  color: white;
                                  margin-left: 1rem;
                                  width: 8rem;
                                  border-color: #cf9236;"
                             round>导出至excel</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button style="background: #309aec;
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
                  row-key="name"
                  default-expand-all
                  :tree-props="{children: 'subFunction', hasChildren: 'hasChildren'}"
                  stripe class="visitor-table" align="center">
                  <el-table-column prop="id" label="功能id" align="center"></el-table-column>
                  <el-table-column prop="functionName" label="功能名称"></el-table-column>
                  <el-table-column prop="personCharge" label="负责人"></el-table-column>
                  <el-table-column fixed="right" label="操作" width="90" align="center">
                    <template slot-scope="scope">
                      <i style="font-size: 1.1rem;" class="el-icon-zoom-in" @click="onShowFunctionDetail(scope.row)"></i>
                      <i style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEditFunction(scope.row)"></i>
                      <i style="font-size: 1.1rem;" class="el-icon-delete" @click="onShowDeleteFunction(scope.row)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="组员管理">
              <el-row style="margin-top: 1rem;">
                <el-button style="background: #309aec;
                                color: white;
                                margin-left: 1rem;
                                border-color: #309aec;"
                           round @click="onShowAddGroup">新增组员</el-button>
              </el-row>
              <div>
                <el-table
                  :data="groupList"
                  style="width: 100%; margin-bottom: 20px; margin-top: 1rem;"
                  row-key="name"
                  default-expand-all
                  stripe class="visitor-table" align="center">
                  <el-table-column type="selection" width="30" align="center"></el-table-column>
                  <el-table-column prop="id" label="组员id" align="center"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="60"></el-table-column>
                  <el-table-column prop="role" label="角色" width="90"></el-table-column>
                  <el-table-column prop="email" label="邮箱"></el-table-column>
                  <el-table-column prop="department" label="部门" width="70"></el-table-column>
                  <el-table-column prop="bossEmail" label="项目上级邮箱"></el-table-column>
                  <el-table-column prop="phone" label="电话"></el-table-column>
                  <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                      <i style="font-size: 1.1rem;" class="el-icon-zoom-in" @click="onShowGroupDetail(scope.row)"></i>
                      <i style="font-size: 1.1rem;" class="el-icon-edit-outline" @click="onShowEditGroup(scope.row)"></i>
                      <i style="font-size: 1.1rem;" class="el-icon-delete" @click="onShowDeleteGroup(scope.row)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="工时管理" class="choose-time">
              <div style="margin-top: 1rem;">
                <el-date-picker
                  v-model="formSearchTime"
                  type="date"
                  placeholder="选择需要查询工时的日期"
                ></el-date-picker>
                <el-button style="margin-left: 1rem;" type="primary" @click="">查询</el-button>
              </div>
              <div>
                <el-table
                  :data="timeList"
                  style="width: 100%;margin-bottom: 20px; margin-top: 1rem;"
                  row-key="name"
                  default-expand-all
                  stripe class="visitor-table" align="center">
                  <el-table-column prop="id" label="组员id" width="110" align="center"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="role" label="角色"></el-table-column>
                  <el-table-column prop="function" label="完成功能"></el-table-column>
                  <el-table-column prop="activity" label="完成活动"></el-table-column>
                  <el-table-column prop="starttime" label="开始时间" :formatter="format_date"></el-table-column>
                  <el-table-column prop="endtime" label="结束时间" :formatter="format_date"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="归档管理">
              <div>
                <el-table
                  :data="documentList"
                  style="width: 100%;margin-bottom: 20px; margin-top: 1rem;"
                  row-key="name"
                  default-expand-all
                  stripe class="visitor-table" align="center">
                  <el-table-column prop="type" label="文档类型" align="center"></el-table-column>
                  <el-table-column label="上传入口" align="center">
                    <template slot-scope="scope">
                      <el-upload
                        class="upload-demo"
                        action=""
                        :on-change="handleChange"
                        :file-list="fileList">
                        <i style="font-size: 1.1rem;" class="el-icon-upload2"></i>
<!--                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column label="下载文档" align="center">
                    <template slot-scope="scope">
                      <i style="font-size: 1.1rem;" class="el-icon-download"></i>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" prop="whetherComplete" label="是否完整提交">
                    <template slot-scope="scope">
                      <button @click="handleTodayVisit(scope.$index, scope.row)"
                              style="border-radius: 1rem;
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
                      <button @click="handleTodayVisit(scope.$index, scope.row)"
                              style="border-radius: 1rem;
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
              缺陷管理
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

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
        <el-form-item class="form_input" v-show="this.editFunctionDialogParam.title!='新增功能'" label="功能id" prop="id"></el-input>
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
        <el-button v-show="this.editFunctionDialogParam.title!='查看功能'" type="primary" @click="onAddFunction();">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="editGroupDialogParam.title"
      :visible.sync="editGroupDialogParam.show"
      width="700px"
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
        <el-form-item class="form_input_group" label="搜索组员" prop="name">
          <el-autocomplete class="form_input_group"
            v-model="formEditGroup.name"
            :fetch-suggestions="querySearchAsync"
            placeholder="搜索员工ID或姓名"
            @select="handleSelect"
          ></el-autocomplete>
<!--          <el-input v-model="formEditGroup.name" placeholder="搜索员工ID或姓名"></el-input>-->
        </el-form-item>
        <el-form-item class="form_input_group" label="" prop="head">
          <el-button style="background: #309aec;
                                color: white;
                                margin-left: 1rem;
                                width: 4rem;
                                border-color: #309aec;"
                     round >搜索</el-button>
        </el-form-item>
        <el-form-item class="form_input_group" label="部门" prop="name">
          <el-input v-model="formEditGroup.department" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input_group" label="邮箱" prop="name">
          <el-input v-model="formEditGroup.email" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input_group" label="电话" prop="name">
          <el-input v-model="formEditGroup.phone" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input_group" label="项目上级邮箱" prop="name">
          <el-input v-model="formEditGroup.bossEmail" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input_group" label="角色" prop="head">
          <el-input v-model="formEditGroup.role" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editGroupDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editGroupDialogParam.title!='查看组员'" type="primary" @click="onAddGroup();">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import {searchProject, searchProjectSubFunction} from '../../api/api'
  import {searchProjectFunction, addProjectFunction, updateProjectFunction} from '../../api/api'


  export default {
        name: "projectDetail",
        data () {
          return {
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
            functionList: [],
            loadingFunc: false,
            formSearchFunc: {
              functionName: "",
              id: "",
              personCharge: "",
              projectId: ""
            },


            groupList: [
              {
                id: "10165101240",
                name: "组员1",
                role: "开发人员",
                email: "380923800@qq.com",
                department: "技术部",
                bossEmail: "10165101240@stu.ecnu.edu.cn",
                phone: "18918058616"
              }
            ],
            timeList: [
              {
                id: "10165101240",
                name: "组员1",
                role: "开发人员",
                function: "3142",
                activity: "32321",
                starttime: "",
                endtime: ""
              }
            ],
            documentList: [{
                type: "项目基础数据表",
                whetherComplete: true
              },
              {
                type: "项目提案书",
                whetherComplete: false
              },
              {
                type: "项目报价书",
                whetherComplete: true
              },
              {
                type: "项目估算表（功能点）",
                whetherComplete: true
              },
              {
                type: "项目计划书",
                whetherComplete: true
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
                whetherComplete: true
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
                whetherComplete: true
              },
              {
                type: "最佳经验和教训",
                whetherComplete: false
              },
              {
                type: "开发工具",
                whetherComplete: true
              },
              {
                type: "开发模板（设计模板，测试模板）",
                whetherComplete: true
              },
              {
                type: "各阶段检查单",
                whetherComplete: false
              },
              {
                type: "QA总结",
                whetherComplete: true
              }],
            formEditFunction: {
                //id: "",
                functionName: "",
                personCharge: "",
                projectId: ""
            },
            formEditGroup: {
              id: "",
              name: "",
              role: "",
              department: '',
              phone: '',
              email: '',
              bossEmail: ''
            },
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
            formSearchTime: ""
          }
        },
        created() {

        },
        mounted() {
          console.log("111111111111111111");
          console.log(this.$route);
          this.onChangeQueryId(this.$route.query.id);
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
          getAllFunction(projectId){

            this.loadingFunc = true
            searchProjectFunction(projectId)
              .then(response => {
                var json = response;
                console.log(json);
                if (json.msg == "查询成功") {

                  this.functionList = json.data.data;
                  console.log("功能列表查询成功");

                  // for (var i=0;i<json.count;i++){
                  //
                  //   console.log("正在获取是否有子功能；"+i);
                  //   searchProjectSubFunction(this.functionList[i].id)
                  //     .then(res => {
                  //       console.log(res);
                  //       if(res.msg == "查询成功"&&res.count>0){
                  //         this.functionList[i].hasChildren = true;
                  //       }else {
                  //         this.$message({ message: json.message, type: "warning" });
                  //       }
                  //     })
                  //     .catch(error => {
                  //       this.$message({ message: "执行异常,请重试", type: "error" });
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
                this.$message({ message: "执行异常,请重试", type: "error" });
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
                  this.getAllFunction(this.formEdit.id);
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
          onShowAddFunction() {
            this.formEditFunction={
              functionName: "",
              personCharge: ""
            }
            this.editFunctionDialogParam.title = "新增功能";//设置标题
            this.editFunctionDialogParam.show = true;//显示弹框
            this.editFunctionDialogParam.formEditFunctionDisabled=false;//设置可编辑
          },
          onShowEditFunction(rowData) {
            this.editFunctionDialogParam.title = "编辑功能";
            this.editFunctionDialogParam.show = true;
            this.editFunctionDialogParam.formEditFunctionDisabled=false;
            this.formEditFunction=Object.assign({},rowData);


          },
          onShowDeleteFunction(rowData) {

          },
          onShowFunctionDetail(rowData) {

            this.editFunctionDialogParam.title = "查看功能";
            this.editFunctionDialogParam.show = true;
            this.editFunctionDialogParam.formEditFunctionDisabled=true;

            this.formEditFunction=Object.assign({},rowData);

          },


          onShowAddGroup() {
            this.editGroupDialogParam.title = "新增组员";//设置标题
            this.editGroupDialogParam.show = true;//显示弹框
            this.editGroupDialogParam.formEditGroupDisabled=false;//设置可编辑
          },
          onShowEditGroup(rowData) {
            this.editGroupDialogParam.title = "编辑功能";
            this.editGroupDialogParam.show = true;
            this.editGroupDialogParam.formEditGroupDisabled=false;

            this.formEditGroup=Object.assign({},rowData);
          },
          onShowDeleteGroup(rowData) {

          },
          onShowGroupDetail(rowData) {

            this.editGroupDialogParam.title = "查看功能";
            this.editGroupDialogParam.show = true;
            this.editGroupDialogParam.formEditGroupDisabled=true;

            this.formEditGroup=Object.assign({},rowData);

          },
          handleTodayVisit() {

          },

          handleDialogClose() {       //功能弹窗关闭
            this.$refs["formEditFunction"].resetFields();
          },
          onAddFunction() {
            if (this.editFunctionDialogParam.title == "新增功能") {
              this._saveFunction();
            }
            else if(this.editFunctionDialogParam.title == "编辑功能"){
              this._editFunction();
            }
          },
          _saveFunction() {

            this.formEditFunction.projectId=this.formEdit.id;
            addProjectFunction(this.formEditFunction)
              .then(response => {
                var json = response;
                console.log(json);
                this.editFunctionDialogParam.show = false;
                this.getAllFunction(this.formEditFunction.projectId);
              })
              .catch(error => {
                this.$message({ message: "执行异常,请重试", type: "error" });
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
                this.$message({ message: "执行异常,请重试", type: "error" });
              })
              .finally(() => {

              });

          },
          format_date(row, column) {
            var date = row[column.property];
            if (date == undefined) {
              return "";
            }
            return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
          },
          handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
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
          }

        }
    }
</script>

<style lang="scss">
._detailpage {
  font-family: "PingFang SC" !important;

  .status_button {
    border-radius: 1rem;
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
      border-radius: 2rem;
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
    border-radius: 3rem;
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
    border-radius: 2rem !important;
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
      border-radius: 2rem;
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
      border-radius: 2rem;
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
      width: 800px;
    }
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 2rem;
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
      border-radius: 2rem;
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
      border-radius: 2rem;
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
      border-radius: 2rem;
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
      border-radius: 2rem;
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
