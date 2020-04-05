<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/*基础样式 start*/
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: whitesmoke;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: rgba(0, 0, 0, .1);
  border-radius: 10px;
}
/*基础样式 end*/
</style>
