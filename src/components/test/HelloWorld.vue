<template>
  <div class="hello">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>所有项目统计</span>
          </div>
          <div class="text item">
            <div style="page-break-inside: avoid" id="projectOverall" ref="projectOverall"></div>
          </div>

        </el-card>
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>我的立项项目统计</span>
          </div>
          <div class="text item">
            <div style="page-break-inside: avoid" id="myProjectOverall" ref="myProjectOverall"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>所有项目统计</span>
          </div>
          <div class="text item">
            <div style="page-break-inside: avoid" id="projectOverall2" ref="projectOverall2"></div>
          </div>

        </el-card>
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>我的立项项目统计</span>
          </div>
          <div class="text item">
            <div style="page-break-inside: avoid" id="myProjectOverall2" ref="myProjectOverall2"></div>
          </div>
        </el-card>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>设备统计</span>
          </div>
          <div class="text item">
            <div style="page-break-inside: avoid" id="device" ref="device"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="margin: 0.5rem;">
          <div slot="header" class="clearfix">
            <span>设备统计</span>
          </div>
          <div class="text item">
            <div style="page-break-inside: avoid" id="device2" ref="device2"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>


<script>
  import echarts from 'echarts'
  import {searchProject,searchDevice,getPMTask} from '../../api/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
        returned:0,
        using:0,
        applying:0,
        applied:0,
        rejected:0,
        ongoing:0,
        submitted:0,
        end:0,
        archive:0,

        applying2:0,
        applied2:0,
        rejected2:0,
        ongoing2:0,
        submitted2:0,
        end2:0,
        archive2:0,
        formSearch2: {
            deadline: "",
            deviceowner: "",
            id: "",
            pageNum: 1,
            pageSize: 100000000,
            projectID: "",
            status: ""
        },
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
            pageNum:'',
            pageSize:''
        },
        tableData:'',
        tableData2:'',
        tableData3:'',
        chart:'',
        chart2:'',
      msg: 'Welcome to AchieveIt !!!'
    }
  },

    mounted(){
        this.onSearch()
        this.showPMTask()
        this.showDevice()


    },
    methods:{
      showDevice(){
          searchDevice(this.formSearch2)
              .then(response => {
                  var json = response;
                  console.log(json);
                  if (json.msg == "查询成功") {
                      this.tableData3 = json.data.deviceList;
                      this.calcNum3()
                      this.initEcharts3()
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


      initEcharts(){
          this.chart = echarts.init(this.$refs.projectOverall);
          this.chart.setOption({
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {
                  orient: 'vertical',
                  left: 10,
                  data: ['申请立项', '已立项', '已驳回', '进行中', '已交付','已结束','已归档']
              },
              series: [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          label: {
                              show: true,
                              fontSize: '30',
                              fontWeight: 'bold'
                          }
                      },
                      labelLine: {
                          show: false
                      },
                      data: [
                          {value: this.applying, name: '申请立项'},
                          {value: this.applied, name: '已立项'},
                          {value: this.rejected, name: '已驳回'},
                          {value: this.ongoing, name: '进行中'},
                          {value: this.submitted, name: '已交付'},
                          {value: this.end, name: '已结束'},
                          {value: this.archive, name: '已归档'}
                      ]
                  }
              ]
          });

          let charts = echarts.init(this.$refs.projectOverall2);
          charts.setOption(
          {
              color: ['#3398DB'],
                  tooltip: {
              trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
              grid: {
                  left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
              },
              xAxis: [
                  {
                      type: 'category',
                      data: ['申请立项', '已立项', '已驳回', '进行中', '已交付','已结束','已归档'],
                      axisTick: {
                          alignWithLabel: true
                      }
                  }
              ],
                  yAxis: [
              {
                  type: 'value'
              }
          ],
              series: [
              {
                  name: '直接访问',
                  type: 'bar',
                  barWidth: '60%',
                  data: [this.applying, this.applied, this.rejected, this.ongoing, this.submitted, this.end, this.archive]
              }
          ]
          })
      },

        initEcharts3(){
            this.chart = echarts.init(this.$refs.device);
            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['使用中', '已归还']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: this.using, name: '使用中'},
                            {value: this.returned, name: '已归还'},]
                    }
                ]
            });

            let charts = echarts.init(this.$refs.device2);
            charts.setOption(
                {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['使用中', '已归还'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: [this.using, this.returned]
                        }
                    ]
                })
        },
        initEcharts2(){
            this.chart2 = echarts.init(this.$refs.myProjectOverall);
            this.chart2.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['申请立项', '已立项', '已驳回', '进行中', '已交付','已结束','已归档']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: this.applying2, name: '申请立项'},
                            {value: this.applied2, name: '已立项'},
                            {value: this.rejected2, name: '已驳回'},
                            {value: this.ongoing2, name: '进行中'},
                            {value: this.submitted2, name: '已交付'},
                            {value: this.end2, name: '已结束'},
                            {value: this.archive2, name: '已归档'}
                        ]
                    }
                ]
            });
            let charts = echarts.init(this.$refs.myProjectOverall2);
            charts.setOption(
                {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['申请立项', '已立项', '已驳回', '进行中', '已交付','已结束','已归档'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: [this.applying2, this.applied2, this.rejected2, this.ongoing2, this.submitted2, this.end2, this.archive2]
                        }
                    ]
                })

        },
        calcNum3(){
            for(var i=0;i<this.tableData3.length;i++){
                if (this.tableData3[i].status==1){
                    this.returned+=1
                }else if (this.tableData3[i].status==2){
                    this.using+=1
                }
            }

        },
      calcNum(){
          for(var i=0;i<this.tableData.length;i++){
              if (this.tableData[i].status==0){
                  this.applying+=1
              }else if (this.tableData[i].status==1){
                  this.applied+=1
              }else if (this.tableData[i].status==2){
                  this.rejected+=1
              }else if (this.tableData[i].status==3){
                  this.ongoing+=1
              }else if (this.tableData[i].status==4){
                  this.submitted+=1
              }else if (this.tableData[i].status==5){
                  this.end+=1
              }else if (this.tableData[i].status==6){
                  this.archive+=1
              }
          }

      },
        calcNum2(){
            for(var i=0;i<this.tableData2.length;i++){
                if (this.tableData2[i].status==0){
                    this.applying2+=1
                }else if (this.tableData2[i].status==1){
                    this.applied2+=1
                }else if (this.tableData2[i].status==2){
                    this.rejected2+=1
                }else if (this.tableData2[i].status==3){
                    this.ongoing2+=1
                }else if (this.tableData2[i].status==4){
                    this.submitted2+=1
                }else if (this.tableData2[i].status==5){
                    this.end2+=1
                }else if (this.tableData2[i].status==6){
                    this.archive2+=1
                }
            }

        },

        showPMTask(){
            //查询
            getPMTask({
                pageNum: '',
                pageSize: ''
            })
                .then(response => {
                    var json = response;
                    console.log(json);
                    if (json.msg == "查询成功！") {
                         this.tableData2 = json.data.data;
                         this.calcNum2()
                        this.initEcharts2()

                    } else {
                        this.$message({ message: json.msg, type: "warning" });
                    }
                })
                .catch(error => {
                    this.$message({ message: "执行异常,请重试", type: "error" });
                })
                .finally(() => {

                });

        },
        onSearch() {
            //查询

            searchProject(this.formSearch)
                .then(response => {
                    var json = response;
                    console.log(json);
                    if (json.msg == "查询成功") {
                        this.tableData = json.data.data;
                        this.calcNum()
                        this.initEcharts()
                    } else {
                        this.$message({ message: json.message, type: "warning" });
                    }
                })
                .catch(error => {
                    this.$message({ message: "执行异常,请重试", type: "error" });
                })
                .finally(() => {

                });
        },




    }




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .hello {
    font-family: "PingFang SC" !important;
  }
  #projectOverall{
    width: 600px;
    height: 400px;
  }
  #projectOverall2{
    width: 600px;
    height: 400px;
  }
  #myProjectOverall{
    width: 600px;
    height: 400px;
  }
  #myProjectOverall2{
    width: 600px;
    height: 400px;
  }
  #device{
    width: 600px;
    height: 400px;
  }
  #device2{
    width: 600px;
    height: 400px;
  }
</style>
