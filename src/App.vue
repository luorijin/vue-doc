<template>
  <div id="app">
    <div class="luo-nav">
        <header>LUO-UI</header>
        <div class="nav-list">
            <nav-list :data="navData"></nav-list>
        </div>
    </div>
    <div class="luo-container">
        <header>
            <div class="container-2">
              <div class="component-title">LUO-UI</div>
            </div>
       </header>
        <div class="container markdown-body">
            <router-view/>
        </div>
    </div>
  </div>
</template>

<script>
import navData from '@/configData/nav.config.json';
import navList from '@/components/nav-list'
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

<style lang="less" src="@/less/body.less"></style>
