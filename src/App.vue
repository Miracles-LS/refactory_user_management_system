<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
            aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/customers">后台管理系统</router-link>
            </li>
            <li>
              <router-link to="/about">关于我们</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
              <li v-if="!userName">
                <router-link to="/login">登录</router-link>
                <router-link to="/register">注册</router-link>
              </li>
              <li v-else>
                <router-link to="/me"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>{{userName}}</router-link>
                <a v-on:click.prevent="logOut">退出登录</a>
              </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
  import AV from './leancloud.js'
  export default {
    name: 'app',
    data() { 
      return {
        userName: ''
      }
    },
    methods: {
      makeUserName(){
        if (this.$store.state.userName) {
          this.userName = this.$store.state.userName
        }
      },
      logOut(){
        //退出登录
        AV.User.logOut();
        // 现在的 currentUser 是 null 了
        var currentUser = AV.User.current();
        console.log(currentUser)
        if(!currentUser){
          this.$router.push('login')
          this.userName='';
          this.$store.dispatch('changeUserName','')
          this.$store.dispatch('userLogin','false')
        }
      }
    },
    created() {
      this.makeUserName()
    },
    updated() {
      this.makeUserName()      
    },

  }
</script>
<style lang="scss">
  .navbar-right li a{
    display: inline-block
  }
  a{
    cursor: pointer;
  }
</style>