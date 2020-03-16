<template>
  <div class="hello">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>项目统计</span>
          </div>
          <div class="text item">
            共10个项目
          </div>
          <div class="text item">
            申请立项  3个
          </div>
          <div class="text item">
            已立项  1个
          </div>
          <div class="text item">
            申请驳回  1个
          </div>
          <div class="text item">
            进行中  2个
          </div>
          <div class="text item">
            已交付  1个
          </div>
          <div class="text item">
            已结束  1个
          </div>
          <div class="text item">
            已归档  1个
          </div>
        </el-card>
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>风险管理</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>设备管理</span>
          </div>
          <div v-for="o in 17" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to AchieveIt !!!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .hello {
    font-family: "PingFang SC" !important;
  }
</style>
