<template>
    <div class="register container">
        <h1>用户注册</h1>
        <div class="alert alert-danger alert-dismissible" role="alert" v-if="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
            {{alert}}
        </div>
        <form v-on:submit.prevent="registerUser">
            <div class="well">
                <div class="form-group">
                    <label for="userName">设置用户名</label>
                    <input type="text" class="form-control" id="userName" placeholder="请输入用户名" v-model="userName">
                </div>
                <div class="form-group">
                    <label for="email">设置邮箱</label>
                    <input type="email" class="form-control" id="email" placeholder="请输入邮箱" v-model="email">
                </div>
                <div class="form-group">
                    <label for="password">设置密码</label>
                    <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="password">
                </div>
                <div class="form-group">
                    <label for="confirmPassword">确认密码</label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="请再次填写密码"
                        v-model="confirmPassword">
                </div>
                <button type="submit" class="btn btn-primary">注册</button>
            </div>
        </form>
    </div>
</template>
<script>
    import AV from '../leancloud'
    import CheckExpFun from '../checkExpFun'
    export default {
        name: 'register',
        data() {
            return {
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                alert: ''
            }
        },
        methods: {
            registerUser() {
                if (!this.userName || !this.email || !this.password || !this.confirmPassword) {
                    this.alert = '请填写对应的信息！';
                    return
                } else if (!CheckExpFun.checkEmail(this.email)) {
                    this.alert = '请填写正确的邮箱！'
                    return
                } else if (this.password != this.confirmPassword) {
                    this.alert = '确认密码填写入错误';
                    return
                } else {
                    // 新建 AVUser 对象实例
                    var user = new AV.User();
                    // 设置用户名
                    user.setUsername(this.userName);
                    // 设置密码
                    user.setPassword(this.password);
                    // 设置邮箱
                    user.setEmail(this.email);
                    user.signUp()
                        .then((res) => {
                            this.$store.dispatch('changeUserName', this.userName)
                            this.$router.replace({ name: 'login', params: { warning: '注册成功！' } });
                        })
                        .catch((er) => {
                            let errorStr = er.message.toString();
                            this.alert = errorStr.substring(0, errorStr.indexOf('['))
                        })
                }
            }
        },
        updated() {
            if (this.alert) {
                setTimeout(() => {
                    this.alert = ''
                }, 5000);
                window.scrollTo(0,0);
            }
        }
    }
</script>
<style scoped>
    h1 {
        margin: 50px 0;
    }
</style>