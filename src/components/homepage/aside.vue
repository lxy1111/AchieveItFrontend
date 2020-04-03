<template>
  <!-- 没用el-aside因为自带300宽度 -->
  <div class="_aside">
    <el-menu
      :default-active="onRoutes"
      :collapse="navShow"
      class="el-menu-vertical-demo menu"
      router
    >
      <template v-for="(menu_one,i) in menuData">

<!--        <el-submenu v-if="getPermitMenus(menu_one.subs).length>0"  :key="i" :index="menu_one.path">-->
<!--          <template slot="title">-->
<!--            <i :class="menu_one.icon"></i>-->
<!--            <span>{{menu_one.title}}</span>-->
<!--          </template>-->

<!--          <el-menu-item-->
<!--            v-for="(menu_two,i) in getPermitMenus(menu_one.subs)"-->
<!--            :key="i"-->
<!--            :index="menu_two.path"-->
<!--          >-->
<!--            <i :class="menu_two.icon"></i>-->
<!--            <span>{{menu_two.title}}</span>-->
<!--          </el-menu-item>-->
<!--        </el-submenu>-->

        <el-menu-item v-if="getPermitMenus(menu_one.subs).length==0" :key="i" :index="menu_one.path">
          <el-col :span="24">
            <i style="font-size: 15px; margin-top: 20px;" :class="menu_one.icon"></i>
          </el-col>
          <el-col style="line-height: 18px" :span="24">
            <span>{{menu_one.title[0]}}</span>
          </el-col>
          <el-col style="line-height: 18px" :span="24">
            <span>{{menu_one.title[1]}}</span>
          </el-col>
          <el-col style="line-height: 18px" :span="24">
            <span>{{menu_one.title[2]}}</span>
          </el-col>
          <el-col style="line-height: 18px" :span="24">
            <span>{{menu_one.title[3]}}</span>
          </el-col>
        </el-menu-item>

      </template>

    </el-menu>
  </div>
</template>
<style lang="scss">
._aside {

  font-family: "PingFang SC";
  .el-menu-item, .el-submenu__title {
    height: 50%;
  }
  .menu {
    height: 100%;
    background-color: whitesmoke;
  }
  .menu:not(.el-menu--collapse) {
    //设置才可以有折叠特效
    width: 55px;
  }
  .el-menu-item.is-active {
    color: #fff;
    font-family: "PingFang SC";
    background-color: rgba(67, 158, 168, 0.8);

    i {
      color: #fff;
      width: 16px;
    }
  }
  .el-menu-item {
    color: rgba(67, 158, 168, 1);
    font-family: "PingFang SC";
    margin-bottom: 2px;
    background-color: rgba(67, 158, 168, 0.2);

    i {
      color: rgba(67, 158, 168, 1);
      width: 16px;
    }
  }
  .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: rgba(67, 158, 168, 0.8);
    color: #fff;

    i {
      color: #fff;
      width: 16px;
    }
  }

}
</style>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      navShow: false, //导航是否折叠
      menuData: [
        {
          icon: "el-icon-document",
          path: "tablepage",
          title: "项目管理",
          subs: [

          ]
        },
        // {
        //   icon: "el-icon-data-analysis",
        //   path: "riskIdentification",
        //   title: "风险管理",
        //   subs: [
        //
        //   ]
        // },
        {
          icon: "el-icon-s-platform",
          path: "deviceManagement",
          title: "设备管理",
          subs: [

          ]
        }
      ]
    };
  },
  created() {
    var permitPathList = this.getPermitPathList();
    this.setMenuPermit(this.menuData, permitPathList); //注意:必须写到created中,先初始化menuData值再渲染页面
    // bus.$on("navShowChange", navShow => {
    //   this.navShow = navShow;
    // });
    // console.log("导航栏：："+this.navShow);
  },
  mounted() {},
  methods: {
    //获取带权限的菜单
    getPermitMenus(menuList) {
      return menuList.filter(item => {
        return item.hasPermit == true;
      });
    },
    //给菜单设置权限
    setMenuPermit(menuList, permitPathList) {
      for (var i = 0; i < menuList.length; i++) {
        var menu = menuList[i];
        if (menu.page && menu.path) {
          //如果打开页面的菜单
          var hasPermit = permitPathList.some(permitPath => {
            return permitPath == "/" + menu.path;
          });
          menu.hasPermit = hasPermit;
        }
        if (menu.subs) {
          this.setMenuPermit(menu.subs, permitPathList);
        }
      }
    },
    //获取有权限的path集合
    getPermitPathList() {
      var ruleList = this.getRuleList();
      var homeChilds = this.getHomeChilds();
      var pathList = []; //有权限的path
      for (var i = 0; i < homeChilds.length; i++) {
        var route = homeChilds[i];
        if (route.meta && route.meta.role) {
          var routeRoles = route.meta.role;
          var hasPermission = ruleList.some(item => {
            return routeRoles.includes(item);
          });
          if (hasPermission && !pathList.includes(route.path)) {
            pathList.push(route.path);
          }
        }
      }
      return pathList;
    },
    //获取子路由
    getHomeChilds() {
      var routes = this.$router.options.routes;
      var homeRoute = routes.find(item => {
        return item.path == "/home";
      });
      return homeRoute.children;
    },
    //获取登陆的角色集合
    getRuleList() {
      var ruleList = []; //角色数组
      var strRule = sessionStorage.getItem("position");
      if (strRule.indexOf("|") != -1) {
        ruleList = strRule.split("|");
      } else {
        ruleList.push(strRule);
      }
      return ruleList;
    }
  },
  computed: {
    onRoutes() {
      //监听路由,设置默认激活项目
      return this.$route.path.replace("/", "");
    }
  }
};
</script>
