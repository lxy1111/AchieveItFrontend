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
                  <el-form-item class="form_input" label="项目id" prop="name">
                    <el-input v-model="formEdit.name" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="项目名称" prop="city">
                    <el-input v-model="formEdit.city" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="项目状态" prop="city">
                    <button @click=""
                            style="border-radius: 1rem;
                            border: 0px;
                            position: relative;
                            width: 4.7rem;
                            height: 1.8rem;
                            color: #309aec;
                            font-size: 0.9rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(48,154,236,0.09);"
                    >申请立项</button>
                  </el-form-item>
                  <el-form-item class="form_select" label="项目上级" prop="type">
                    <el-select v-model="formEdit.type" placeholder="">
                      <el-option label="留言" value="1"></el-option>
                      <el-option label="建议" value="2"></el-option>
                      <el-option label="BUG" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="客户信息" prop="age">
                    <el-input v-model="formEdit.age" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="主要里程碑" prop="qq">
                    <el-input v-model="formEdit.qq" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="主要功能" prop="qq">
                    <el-input type="textarea" autosize v-model="formEdit.qq" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input_big" label="采用技术" prop="qq">
                    <el-input v-model="formEdit.qq" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_input" label="业务领域" prop="qq">
                    <el-input v-model="formEdit.qq" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item class="form_date" label="预定时间" prop="createDate">
                    <el-date-picker
                      v-model="formSearch.createDate"
                      type="date"
                      placeholder="选择预定时间"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item class="form_date" label="交付时间" prop="createDate">
                    <el-date-picker
                      v-model="formSearch.createDate"
                      type="date"
                      placeholder="选择交付时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="功能列表">
              <el-row style="margin-top: 1rem;">
                <el-col :span="16">
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
                <el-col :span="8">
                  <el-button style="background: #309aec;
                                  color: white;
                                  margin-left: 1rem;
                                  border-color: #309aec;"
                             round @click="onShowAddFunction">新建功能</el-button>
                  <el-button style="" type="danger" round>批量删除</el-button>
                </el-col>
              </el-row>
              <div>
                <el-table
                  :data="functionList"
                  style="width: 100%;margin-bottom: 20px; margin-top: 1rem;"
                  row-key="name"
                  default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  stripe class="visitor-table" align="center">
                  <el-table-column type="selection" align="center"></el-table-column>
                  <el-table-column prop="id" label="功能id" align="center"></el-table-column>
                  <el-table-column prop="name" label="功能名称"></el-table-column>
                  <el-table-column prop="head" label="负责人"></el-table-column>
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
        <el-form-item class="form_input" label="功能id" prop="id">
          <el-input v-model="formEditFunction.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="功能名称" prop="name">
          <el-input v-model="formEditFunction.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="负责人" prop="head">
          <el-input v-model="formEditFunction.head" placeholder=""></el-input>
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
        label-width="68px"
        :rules="formEditGroupRules"
        :disabled="editGroupDialogParam.formEditGroupDisabled"
      >
        <el-form-item class="form_input" label="组员id" prop="id">
          <el-input v-model="formEditGroup.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="姓名" prop="name">
          <el-input v-model="formEditGroup.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="角色" prop="head">
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
    export default {
        name: "projectDetail",
        data () {
          return {
            fileList: [
            //   {
            //   name: 'food.jpeg',
            //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // }, {
            //   name: 'food2.jpeg',
            //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // }
            ],
            functionList: [
              {
                id: "功能1",
                name: "北京",
                head: "1",
                detail: 18,
                children: [{
                  name: "43",
                  id: "46",
                  head: "667",
                  detail: 18
                }]
              },
              {
                name: "功能2",
                id: "上海",
                head: "2",
                detail: 19
              },
              {
                name: "功能3",
                id: "上海",
                head: "2",
                detail: 19
              },
              {
                name: "功能4",
                id: "上海",
                head: "2",
                detail: 19
              },
              {
                name: "功能5",
                id: "上海",
                head: "2",
                detail: 19
              }
            ],
            groupList: [
              {
                id: "10165101240",
                name: "组员1",
                role: "开发人员",
                email: "380923800@qq.com",
                department: "技术部",
                bossEmail: "10165101240@stu.ecnu.edu.cn",
                phone: "18918058616"
              },
              {
                name: "组员2",
                id: "10165101110",
                role: "测试人员",
                email: "380923800@qq.com",
                department: "技术部",
                bossEmail: "10165101240@stu.ecnu.edu.cn",
                phone: "18918058616"
              },
              {
                name: "组员3",
                id: "10165101000",
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
              },
              {
                name: "组员2",
                id: "10165101110",
                role: "测试人员",
                function: "7774574",
                activity: "2446",
                starttime: "",
                endtime: ""
              },
              {
                name: "组员3",
                id: "10165101000",
                role: "开发人员",
                function: "9876",
                activity: "24554",
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
                id: "",
                name: "",
                head: "",
                detail: "",
                children: [{

                }]
            },
            formEditGroup: {
              id: "",
              name: "",
              role: ""
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
              name: "",
              city: "",
              type: "",
              age: null,
              gender: null,
              qq: ""
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
        mounted() {
          this.formEdit = this.$route.params.projectInfo;
          this.$route.meta.title="查看项目-"+this.formEdit.name;
        },
        methods: {

          onShowAddFunction() {
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
            this.$refs["formEditFunction"].validate(valid => {
              if (valid) {
                var param = Object.assign({}, this.formEditFunction);
                this.$http
                  .post("/api/msg-api/add", param)
                  .then(response => {
                    var json = response.data;
                    if (json.status == "SUCCESS") {
                      this.$message({ message: "执行成功", type: "success" });
                      this.onSearch();
                      this.editFunctionDialogParam.show = false;
                    } else {
                      this.$message({ message: json.message, type: "error" });
                    }
                  })
                  .catch(error => {
                    this.$message({ message: "执行异常,请重试", type: "error" });
                  })
                  .finally(() => {});
              }
            });
          },
          _editFunction() {
            this.$refs["formEditFunction"].validate(valid => {
              if (valid) {
                var param = Object.assign({}, this.formEdit);
                this.$http
                  .post("/api/msg-api/update", param)
                  .then(response => {
                    var json = response.data;
                    if (json.status == "SUCCESS") {
                      this.$message({ message: "执行成功", type: "success" });
                      this.onSearch();
                      this.editFunctionDialogParam.show = false;
                    } else {
                      this.$message({ message: json.message, type: "error" });
                    }
                  })
                  .catch(error => {
                    this.$message({ message: "执行异常,请重试", type: "error" });
                  })
                  .finally(() => {});
              }
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
          }

        }
    }
</script>

<style lang="scss">
._detailpage {
  font-family: "PingFang SC" !important;

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
      width: 200px;
      font-family: "PingFang SC";
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
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
      padding: 0 30px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      font-family: "PingFang SC";
    }
  }

}
</style>
