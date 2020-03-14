<template>
  <div class="login_wrapper" >
    <div class="logo-div">
      <img class="logo-div-img" src="../assets/achieveIt.png">
    </div>
    <div class="plane-img">
      <img style="position: absolute;
                    top: 0%;
                    left: 0;
                    right: 0;
                    opacity: 0.3;
                    height: 100%;
                    width: 100%;" src="../assets/a223a95f17fe4ee4b64d2dac60b9a082.jpg">
    </div>
    <div class="login">

      <span class="login-title1">登录AchieveIt</span>

      <el-row style="margin-top: 0rem; background: white" :gutter="0" type="flex" class="row-bg" justify="start">
        <el-col :span="24">
          <input class="loginInfoInput1" v-model="loginInfo.username" placeholder="请输入账号"></input>
        </el-col>
      </el-row>
      <el-row style="background: white" :gutter="0" type="flex" class="row-bg" justify="start">
        <el-col :span="24">
          <input type="password" class="loginInfoInput2" v-model="loginInfo.password" placeholder="请输入密码"></input>
        </el-col>
      </el-row>
      <el-row style="background: white" :gutter="0" type="flex" class="row-bg" justify="start">
        <el-col :span="24">
          <button class="loginConfirm" @click="login">
            <div class="loginConfirm-text">
              登   录
            </div>
          </button>
        </el-col>
      </el-row>
      <el-row style="background: white" v-if="loginState=='false'" :gutter="0" type="flex" class="row-bg" justify="start">
        <el-col :span="24">
          <div class="loginFail">
            <div class="loginFail-Text">
              信息有误，请重新输入
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <p class="bei">AchieveIt软件项目管理系统</p>


    <el-dialog
      title="登录失败"
      class="small-dialog"
      :visible.sync="dialogLoginFail"
      width="30%"
      :before-close="handleClose">
      <span style="font-size: 0.8rem; font-family: PingFang SC;">{{loginMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="confirm-button" type="primary" @click="dialogLoginFail = false">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<style lang="scss">
  $input_width:300px;

  .login_wrapper {
    background:linear-gradient(166deg, rgba(54, 171, 168, 0.1) 0%, rgba(54, 171, 168, 0.9) 100%);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-div{
      position: absolute;
      left: 0;
      top: 0;
      width: 10rem;
      height: 4rem;
      background: rgba(255, 255, 255, 0.9);
      opacity: 1;
      border-bottom-right-radius: 0.8rem;
    }
    .logo-div-img{
      position: absolute;
      width: 90%;
      height: 50%;
      top: 30%;
      bottom: 30%;
      left: 5%;
      right: 20%;
    }
    .login {

      position: absolute;
      text-align: center;
      border-radius: 1rem;
      background: rgba(255,255,255,0.16);
      box-shadow:0px 0rem 3rem rgba(0,0,0,0.16);
      height: 22rem;
      width: 18rem;
      left: 50%;
      top: 40%;
      transform: translate(-50%,-50%);

      .title {
        text-align: center;
        font-size: 1rem;
        color: #505458;
      }
      .el-form-item__content {
        width: $input_width;
      }
      .el-button {
        width: $input_width;
      }
      .el-form {

        .error {
          display: block;
          text-align: center;
          color: red;
        }
      }
    }
  }
  .recover{
    position:absolute;
    bottom:0px;
    cursor:pointer;
    color:#E6A23C;
    // display: none;
  }
  .bei{
    position:absolute;
    font-family: "PingFang SC";
    bottom:20px;
    cursor:pointer;
    color: #505458;
    font-size: 0.8rem;
  }
  .login-title1{
    font-size: 1.1rem;
    font-family: "PingFang SC";
    font-weight: bolder;
    color: #5e5e5e;
    opacity: 1;
    position: absolute;
    text-align: center;
    left: 50%;
    -webkit-transform: translate(-50%,0%);
    transform: translate(-50%,-0%);
    top: 13%;
  }
  .login-title2{
    font-size: 0.8rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: grey;
    opacity: 1;
    position: absolute;
    text-align: center;
    left: 50%;
    -webkit-transform: translate(-50%,0%);
    transform: translate(-50%,-0%);
    top: 19%;
  }
  .loginInfoInput1{
    background:rgba(251,251,251,0.5);
    border:0px solid rgba(255,255,255,1);
    opacity:1;
    border-radius:2rem;
    font-size:0.8rem;
    font-family:PingFang SC;
    font-weight:normal;
    line-height:21px;
    color:black;
    opacity:1;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0%);
    margin-top: 40%;
    padding-left: 1rem;
    width: 70%;
    height: 2.5rem;
    box-shadow:0 0rem 3rem rgba(0,0,0,0.1);
  }

  .loginInfoInput2{
    background:rgba(251,251,251,0.5);
    border:0px solid rgba(255,255,255,1);
    opacity:1;
    border-radius:2rem;
    font-size:0.8rem;
    font-family:PingFang SC;
    font-weight:normal;
    line-height:21px;
    color:black;
    opacity:1;
    position: absolute;
    left: 50%;
    margin-top: 60%;
    transform: translate(-50%,0%);
    padding-left: 1rem;
    width: 70%;
    height: 2.5rem;
    box-shadow:0 0rem 3rem rgba(0,0,0,0.1);
  }
  .loginConfirm{
    background: #439ea8;
    box-shadow:0px 0px 20px rgba(32,136,255,0.18);
    opacity:1;
    border-radius:2rem;
    border: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0%);
    padding-left: 1rem;
    width: 75%;
    height: 2.5rem;
    margin-top: 80%;
  }
  .loginConfirm-text{
    font-size:0.85rem;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:25px;
    color:rgba(255,255,255,1);
    opacity:1;
  }
  .loginFail{
    width: 70%;
    height: 1.6rem;
    background:rgba(229,121,121,0.13);
    border:1px solid rgba(229,121,121,0.30980392156862746);
    opacity:1;
    border-radius:4px;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0%);
    margin-top: 100%;
  }
  .loginFail-Text{
    font-size:0.7rem;
    font-family:PingFang SC;
    font-weight:500;
    color: rgb(214, 132, 132);
    padding: 2.5% 0;
  }
</style>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loginInfo:{
          username: "",
          password: "",
          jobId: "",
          department: "",
          displayName: "",
          jobPosition: "",
          phoneNumber: "",
          userRole: ""
        },
        loginState: "",
        dialogLoginFail:false,
        loginMsg:""

      }
    },
    mounted() {


    },
    methods: {
      handleClose(done) {
        done();
      },
      login() {

        var data=
          {
            username: this.loginInfo.username,
            password: this.loginInfo.password
          };

        this.$router.push({
          path: '/index',
          params: { myInfo: this.loginInfo }
        });

      }

    }
  }
</script>
