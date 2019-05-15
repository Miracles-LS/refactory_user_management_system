<template>
    <div class="login container">
        <div class="alert alert-danger alert-dismissible" role="alert" v-if="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
            {{alert}}
        </div>
        <Alert v-if="warning" :message="warning"></Alert>
        <h1>用户登录</h1>
        <form v-on:submit.prevent="loginUser">
            <div class="well">
                <div class="form-group">
                    <label for="userName">用户名</label>
                    <input type="text" class="form-control" id="userName" placeholder="请输入用户名"
                        v-model="userName">
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" class="form-control" id="password" placeholder="请输入密码"
                        v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">登录</button>
                <router-link to="/register">没有账号？请先注册</router-link>
            </div>
        </form>
    </div>
</template>
<script>
    import AV from '../leancloud.js'
    import Alert from './Alert'
    export default {
        name: 'login',
        data() {
            return {
                userName: '',
                password: '',
                alert:'',
                warning:''
            }
        },
        methods: {
            loginUser() {
                AV.User.logIn(this.userName, this.password)
                    .then((res) => {
                        this.$store.dispatch('changeUserName',this.userName)
                        this.$store.dispatch('userLogin','true')
                        this.$router.push({name:'customers',params:{ alert:'登录成功！'}})
                    })
                    .catch((error) => {
                        let errorStr = error.message.toString();
                        this.alert = errorStr.substring(0,errorStr.indexOf('['))
                    })
            }
        },
        created() {
            if (this.$store.state.userName) {
                this.userName = this.$store.state.userName
            }
            if(this.$route.params.warning){
                this.warning =this.$route.params.warning
                setTimeout(() => {
                    this.warning = '';
                }, 3000);
            }
        },
        updated() {
            if(this.alert){
                setTimeout(() => {
                    this.alert = '';
                }, 3000);
            }
        },
        components:{
            Alert
        }
    }
</script>
<style scoped>
    h1 {
        margin: 50px 0;
    }

    button {
        margin-right: 10px;
    }
</style>