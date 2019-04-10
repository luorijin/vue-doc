<template>
  <div id="app">
    <div class="luo-nav">
        <header>LUO-UI</header>
        <div class="nav-list">
            <nav-list :data="navData"></nav-list>
        </div>
    </div>
    <div class="luo-container">
        <div class="container markdown-body">
            <router-view/>
        </div>
    </div>
  </div>
</template>

<script>
import navData from '@/src/configData/nav.config.json';
import navList from '@/src/components/nav-list'
export default {
  name: 'App',
  data(){
    return{
      navData:navData['zh-CN']
    }
  },
  components:{
    navList
  }
}
</script>

<style lang="less" src="@/src/less/body.less"></style>
