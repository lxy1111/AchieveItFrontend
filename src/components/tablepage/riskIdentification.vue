<template>
  <div class="_tablepage">
    <!-- 查询区 start -->

    <!-- 查询区 end -->

    <!-- 操作区 start -->
    <el-row class="operate">
      <el-col :span="18">
        <el-collapse>
          <el-collapse-item title="项目查询" name="1">

            <template slot="title">
              <el-button type="primary">风险查询</el-button>
            </template>

            <el-form
              :inline="true"
              :model="formSearch"
              ref="formSearch"
              class="demo-form-inline"
              label-width="82px"
            >
              <el-form-item class="small_form_input" label="风险id" prop="name">
                <el-input v-model="formSearch.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_input" label="风险类型" prop="city">
                <el-input v-model="formSearch.city" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_input" label="风险描述" prop="city">
                <el-input v-model="formSearch.city" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_select" label="风险级别" prop="type">
                <el-select v-model="formSearch.type" placeholder="">
                  <el-option label="留言" value="1"></el-option>
                  <el-option label="建议" value="2"></el-option>
                  <el-option label="BUG" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form_input" label="风险影响度" prop="age">
                <el-input v-model="formSearch.age" placeholder=""></el-input>
              </el-form-item>
              <!--      <el-form-item class="form_select" label="性别" prop="gender">-->
              <!--        <el-select v-model="formSearch.gender" placeholder="性别">-->
              <!--          <el-option label="男" value="1"></el-option>-->
              <!--          <el-option label="女" value="2"></el-option>-->
              <!--        </el-select>-->
              <!--      </el-form-item>-->
              <el-form-item class="form_input" label="风险应对策略" prop="qq">
                <el-input v-model="formSearch.qq" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_input" label="风险状态" prop="qq">
                <el-input v-model="formSearch.qq" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="small_form_input" label="风险责任人" prop="qq">
                <el-input v-model="formSearch.qq" placeholder=""></el-input>
              </el-form-item>
              <el-form-item class="form_date" label="风险跟踪频度" prop="createDate">
                <!--        <el-date-picker-->
                <!--          v-model="formSearch.createDate"-->
                <!--          type="daterange"-->
                <!--          range-separator="至"-->
                <!--          start-placeholder="开始日期"-->
                <!--          end-placeholder="结束日期"-->
                <!--        ></el-date-picker>-->
                <el-date-picker
                  v-model="formSearch.createDate"
                  type="date"
                  placeholder="选择预定时间"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="form_date" label="风险相关者" prop="createDate">
                <el-date-picker
                  v-model="formSearch.createDate"
                  type="date"
                  placeholder="选择交付时间"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" @click="onReset" plain>重置</el-button>
              </el-form-item>
            </el-form>

          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="3">
        <el-button style="margin-top: 7px; background: #309aec; color: white; border-color: #309aec;" round @click="onShowAdd">导入风险</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="margin-top: 7px;" type="danger" round>批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作区 end -->
    <!--表格 start-->

    <el-table :data="tableData" stripe class="visitor-table" style="width: 100%" align="center" v-loading="loading">
      <el-table-column type="selection" width="30" align="center"></el-table-column>
      <!--      <el-table-column type="expand" width="30">-->
      <!--        <template slot-scope="props">-->
      <!--          <el-form-->
      <!--            :inline="true"-->
      <!--            :model="formSearch"-->
      <!--            ref="formSearch"-->
      <!--            class="demo-form-inline"-->
      <!--            label-width="82px"-->
      <!--          >-->
      <!--            <el-form-item class="form_input" label="功能列表" prop="qq">-->
      <!--              <el-input v-model="formSearch.qq" placeholder=""></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item class="form_input" label="人员管理" prop="qq">-->
      <!--              <el-input v-model="formSearch.qq" placeholder=""></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item class="form_input" label="工时管理" prop="qq">-->
      <!--              <el-input v-model="formSearch.qq" placeholder=""></el-input>-->
      <!--            </el-form-item>-->

      <!--          </el-form>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="name" label="风险id"  align="center"></el-table-column>
      <el-table-column prop="city" label="风险类型" ></el-table-column>
      <el-table-column prop="type" label="风险描述"   :formatter="format_type"></el-table-column>
      <el-table-column prop="city" label="风险级别" show-overflow-tooltip tooltip-effect="dark" ></el-table-column>
      <el-table-column prop="name" label="风险影响度"  ></el-table-column>
      <el-table-column prop="age" label="风险应对策略"></el-table-column>
      <el-table-column prop="age" label="风险责任人"  ></el-table-column>
      <!--      <el-table-column prop="gender" label="性别"  :formatter="format_gender"></el-table-column>-->
      <el-table-column prop="createtime" label="风险跟踪频度"  ></el-table-column>
      <el-table-column prop="updatetime" label="风险相关者"  ></el-table-column>
      <el-table-column fixed="right" prop="status" label="风险状态" >
        <template slot-scope="scope">
          <button @click="handleTodayVisit(scope.$index, scope.row)"
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
                  v-if="scope.row.visitStatus=='non_arrival'">未到</button>
          <button @click="handleTodayVisit(scope.$index, scope.row)"
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
                  v-if="scope.row.visitStatus=='in'">已进入</button>
          <button @click="handleTodayVisit(scope.$index, scope.row)"
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
          >申请立项</button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button style="background: #309aec; color: white; border-color: #309aec;" round @click="onShowAdd">风险跟踪</el-button>
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
      width="700px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEdit"
        ref="formEdit"
        class="demo-form-inline-dialog"
        label-width="68px"
        :rules="formEditRules"
        :disabled="editDialogParam.formEditDisabled"
      >
        <el-form-item class="form_input" label="项目id" prop="name">
          <el-input v-model="formEdit.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="项目名称" prop="city">
          <el-input v-model="formEdit.city" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_select" label="项目上级" prop="type">
          <el-select v-model="formEdit.type" placeholder="">
            <el-option label="留言" value="1"></el-option>
            <el-option label="建议" value="2"></el-option>
            <el-option label="BUG" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_input" label="客户信息" prop="age">
          <el-input v-model="formEdit.age" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="主要里程碑" prop="qq">
          <el-input v-model="formEdit.qq" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="主要功能" prop="qq">
          <el-input type="textarea" autosize v-model="formEdit.qq" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="采用技术" prop="qq">
          <el-input v-model="formEdit.qq" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="业务领域" prop="qq">
          <el-input v-model="formEdit.qq" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="form_date" label="预定时间" prop="createDate">
          <!--        <el-date-picker-->
          <!--          v-model="formSearch.createDate"-->
          <!--          type="daterange"-->
          <!--          range-separator="至"-->
          <!--          start-placeholder="开始日期"-->
          <!--          end-placeholder="结束日期"-->
          <!--        ></el-date-picker>-->
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editDialogParam.title!='查看'" type="primary" @click="onAdd();">确 定</el-button>
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
        width: 160px;
        font-family: "PingFang SC";
      }

      .el-date-editor.el-input, .el-date-editor.el-input__inner {
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
    export default {
        name: "riskIdentification",
        data() {
            return {
                pageInfo: {
                    //分页
                    currentPage: 1,
                    pageSize: 5,
                    pageTotal: 80
                },
                tableData: [
                    {
                        name: "张三",
                        city: "北京",
                        type: "1",
                        age: 18,
                        gender: 1,
                        qq: 123444,
                        createtime: 1546587784000,
                        updatetime: 1546587784000
                    },
                    {
                        name: "李四",
                        city: "上海",
                        type: "2",
                        age: 19,
                        gender: 0,
                        qq: 555,
                        createtime: 1546587784000,
                        updatetime: 1546587784000
                    }
                ],
                formSearch: {
                    name: "",
                    city: "",
                    type: "",
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
            onSearch() {
                //查询
                this.loading = true;
                if (this.formSearch.createDate) {
                    this.formSearch.startdate = this.searchCreateDate[0];
                    this.formSearch.enddate = this.searchCreateDate[1];
                }
                var param = Object.assign({}, this.formSearch, this.pageInfo);
                this.$http
                    .post("/api/msg-api/queryList", param)
                    .then(response => {
                        var json = response.data;
                        if (json.status == "SUCCESS") {
                            this.tableData = json.data;
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
                this.$refs["formEdit"].validate(valid => {
                    if (valid) {
                        var param = Object.assign({}, this.formEdit);
                        this.$http
                            .post("/api/msg-api/add", param)
                            .then(response => {
                                var json = response.data;
                                if (json.status == "SUCCESS") {
                                    this.$message({ message: "执行成功", type: "success" });
                                    this.onSearch();
                                    this.editDialogParam.show = false;
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
            _edit() {
                this.$refs["formEdit"].validate(valid => {
                    if (valid) {
                        var param = Object.assign({}, this.formEdit);
                        this.$http
                            .post("/api/msg-api/update", param)
                            .then(response => {
                                var json = response.data;
                                if (json.status == "SUCCESS") {
                                    this.$message({ message: "执行成功", type: "success" });
                                    this.onSearch();
                                    this.editDialogParam.show = false;
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
            onShowAdd() {
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
                this.$refs["formSearch"].resetFields();
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

