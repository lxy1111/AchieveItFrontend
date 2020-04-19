<template>
  <div class="_tablepage">
    <!-- 查询区 start -->

    <!-- 查询区 end -->

    <!-- 操作区 start -->
    <el-row class="operate">
      <el-col :span="18">
        <el-collapse>
          <el-collapse-item title="设备查询" name="1">

            <template slot="title">
              <el-button type="primary">设备查询</el-button>
            </template>

            <el-form
              :inline="true"
              :model="formSearch"
              ref="formSearch"
              class="demo-form-inline"
              label-width="100px"
            >
              <el-form-item class="small_form_input" label="设备id" prop="id">
                <el-input v-model="formSearch.id" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_input" label="资产管理者" prop="deviceowner">
                <el-input v-model="formSearch.deviceowner" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_input" label="设备状态" prop="status">
                <el-input v-model="formSearch.status" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_input" label="资产使用期限" prop="deadline">
<!--                <el-date-picker-->
<!--                  v-model="formSearch.deadline"-->
<!--                  type="date"-->
<!--                  placeholder="选择资产使用期限"-->
<!--                ></el-date-picker>-->
                <el-input v-model="formSearch.deadline" placeholder=""></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" @click="onReset" plain>重置</el-button>
              </el-form-item>
            </el-form>

          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="2">
        <el-button style="margin-top: 7px; background: #309aec; color: white; border-color: #309aec;" round @click="onShowAdd">新增设备</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="margin-top: 7px;" type="danger" round @click="deleteInBatches">批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作区 end -->
    <!--表格 start-->

    <el-table :data="tableData" stripe class="visitor-table" style="width: 100%" align="center" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection" width="30" align="center"></el-table-column>
      <el-table-column prop="id" label="设备id"  align="center"></el-table-column>
      <el-table-column prop="deviceowner" label="资产管理者" align="center" ></el-table-column>
      <el-table-column prop="status" label="设备状态" align="center" >
        <template slot-scope="scope">
          <button style="border-radius: 0.2rem;
                            border: 0px;
                            position: relative;
                            width: 4rem;
                            height: 1.5rem;
                            color: #5daf34;
                            font-size: 0.83rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(48,154,236,0.09);"
                  v-if="scope.row.status==1"
          >已归还</button>
          <button style="border-radius: 0.2rem;
                            border: 0px;
                            position: relative;
                            width: 4rem;
                            height: 1.5rem;
                            color: #309aec;
                            font-size: 0.83rem;
                            font-weight: bolder;
                            font-family: PingFang SC;
                            background: rgba(48,154,236,0.09);"
                  v-if="scope.row.status==2" @click="changeStatus(scope.row,1)"
          >使用中</button>
        </template>
      </el-table-column>
      <el-table-column prop="deadline" label="资产使用期限(天)" ></el-table-column>

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
      width="500px"
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
        <el-form-item class="form_input" label="资产管理者" prop="deviceowner">
          <el-input v-model="formEdit.deviceowner" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_date" label="资产使用期限(天)" prop="createDate">
          <el-input v-model="formEdit.deadline" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editDialogParam.title!='查看'" type="primary" @click="onAdd()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增，编辑，查看 end -->
  </div>
</template>

<style lang="scss">
  .el-main {
    padding: 8px !important;
  }
  ._tablepage {

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
        width: 150px;
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
        width: 90%;
        font-family: "PingFang SC";
      }
    }

    .form_input {
      .el-form-item__content {
        width: 160px;
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
        width: 90%;
        font-family: "PingFang SC";
      }
    }
    .form_select {
      .el-select {
        width: 150px;
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
        width: 180px;
        font-family: "PingFang SC";
      }

      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 180px;
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
      width: 100px !important;
      font-family: "PingFang SC";
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
  }
</style>


<script>
  import {editDevice,addDevice,deleteDevice, searchDevice} from "../../api/api";
  import qs from 'qs'
    export default {
        name: "deviceManagement",
        data() {
            return {
                pageInfo: {
                    //分页
                    currentPage: 1,
                    pageSize: 10,
                    pageTotal: 0
                },
                tableData: [

                ],
                multipleSelection:'',
                formSearch: {
                  deadline: "",
                  deviceowner: "",
                  id: "",
                  pageNum: 0,
                  pageSize: 0,
                  projectID: "",
                  status: ""
                },
                formEdit: {
                  deadline: "",
                  deviceowner: "",
                  id: "",
                  projectID: "",
                  status: 0
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

                loading: false //加载提示
            };
        },
        mounted() {
            this.onSearch();
        },
        methods: {
            changeStatus(rowData,status){
                var checkstatus=''
                if(status==1){
                    checkstatus='已归还'
                }else{
                    checkstatus='使用中'
                }
                this.$confirm('确认更新状态为'+checkstatus+'吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rowData.status = status
                    editDevice(rowData).then(response => {
                        var json = response;
                        if(response.msg=='更新成功！'){
                            this.$message({message: "更新成功", type: "success"});
                        }else{
                            this.$message({message: response.msg, type: "error"});
                        }
                    })
                        .catch(error => {
                            this.$message({message: "执行异常,请重试", type: "error"});
                        })
                        .finally(() => {

                        });
                })


            },
            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log(val)
            },
            deleteInBatches(){
                this.$confirm('确认删除吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids=[]
                    for(var i=0;i<this.multipleSelection.length;i++){
                        ids.push(this.multipleSelection[i].id)
                    }
                    let param={
                        ids:ids,
                    }
                    deleteDevice(ids).then(response=>{
                        this.onSearch()
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })

                    })

                }).catch((error) => {
                    this.$message({
                        type: 'info',
                        message: error
                    });
                }).finally(()=>{
                    this.onSearch()


                });

            },
            onShowDeleteDevice(rowData){

                this.$confirm('确认删除妈, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDevice(rowData.id).then(response=>{
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
            onSearch() {
                //查询
                this.loading = true;
                this.formSearch.pageNum = this.pageInfo.currentPage;
                this.formSearch.pageSize = this.pageInfo.pageSize;

                searchDevice(this.formSearch)
                .then(response => {
                  var json = response;
                  console.log(json);
                  if (json.msg == "查询成功") {
                    this.tableData = json.data.deviceList;
                    var count=json.count
                      this.pageInfo.pageTotal=count
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

              console.log("新增设备------调用_save:");
              console.log(this.formEdit);
              this.formEdit.status=2
                addDevice(this.formEdit).then(response=>{
                    var json = response;
                    console.log(json);
                    if (json.msg == "新增成功！") {
                        this.$message({message:'新增成功',type:'success'})
                        this.onSearch()
                        this.editDialogParam.show=false
                    } else {
                        this.$message({ message: json.message, type: "warning" });
                        this.editDialogParam.show=false
                    }

                })

            },
            _edit() {

              editDevice(this.formEdit)
                .then(response => {
                  var json = response;
                  console.log(json);
                })
                .catch(error => {
                  this.$message({ message: "执行异常,请重试", type: "error" });
                })
                .finally(() => {

                });

            },
            onShowAdd() {

                this.formEdit = {
                  deadline: "",
                  deviceowner: "",
                  id: "",
                  projectID: "",
                  status: ""
                };



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
                //this.$refs["formSearch"].resetFields();

              this.formSearch={
                deadline: "",
                deviceowner: "",
                id: "",
                pageNum: 0,
                pageSize: 0,
                projectID: "",
                status: ""
              }

              this.onSearch();

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
                this.onSearch();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageInfo.currentPage = val;
                this.onSearch();
            },
            handleDialogClose() {
                this.$refs["formEdit"].resetFields();
            }
        }
    };
</script>

