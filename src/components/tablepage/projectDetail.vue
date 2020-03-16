<template>
  <div class="_detailpage">
    <el-row>
      <el-col :span="17">
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>功能列表</span>
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="name"
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              stripe class="visitor-table" align="center">
              <el-table-column type="selection" align="center"></el-table-column>
              <el-table-column prop="name" label="功能id" align="center"></el-table-column>
              <el-table-column prop="city" label="功能名称"></el-table-column>
              <el-table-column prop="city" label="优先级"></el-table-column>
              <el-table-column prop="city" label="负责人"></el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>工时管理</span>
          </div>
        </el-card>
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>人员管理</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>项目信息</span>
          </div>
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
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
    export default {
        name: "projectDetail",
        data () {
          return {
            tableData: [
              {
                name: "功能1",
                city: "北京",
                type: "1",
                age: 18,
                gender: 1,
                qq: 123444,
                createtime: 1546587784000,
                updatetime: 1546587784000,
                children: [{
                  name: "43",
                  city: "46",
                  type: "667",
                  age: 18,
                  gender: 1,
                  qq: 123444,
                }]
              },
              {
                name: "功能2",
                city: "上海",
                type: "2",
                age: 19,
                gender: 0,
                qq: 555,
                createtime: 1546587784000,
                updatetime: 1546587784000
              },
              {
                name: "功能3",
                city: "上海",
                type: "2",
                age: 19,
                gender: 0,
                qq: 555,
                createtime: 1546587784000,
                updatetime: 1546587784000
              },
              {
                name: "功能4",
                city: "上海",
                type: "2",
                age: 19,
                gender: 0,
                qq: 555,
                createtime: 1546587784000,
                updatetime: 1546587784000
              },
              {
                name: "功能5",
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
            editDialogParam: {
              title: "新增", //弹窗标题,值为:新增，查看，编辑
              show: false, //弹框显示
              formEditDisabled:false,//编辑弹窗是否可编辑
            }
          }
        },
        mounted() {
          this.formEdit = this.$route.params.projectInfo;
          this.$route.meta.title="查看项目-"+this.formEdit.name;
        }
    }
</script>

<style lang="scss">
._detailpage {
  font-family: "PingFang SC" !important;

  .project-info {

  }

  .el-form-item {
    margin-bottom: 2px !important;
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
      width: 150px;
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
      line-height: 30px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 90%;
      font-family: "PingFang SC";
    }
  }
  .form_input_big {
    .el-form-item__content {
      width: 150px;
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
      width: 150px;
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
      width: 150px;
      font-family: "PingFang SC";
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 150px;
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
