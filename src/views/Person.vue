<template>
    <div class="person container">
        <router-link to="/" class="btn btn-default">返回</router-link>
        <h1 class="page-header">个人信息</h1>
        <form v-on:submit.prevent="loginUser">
            <div class="well">
                <div class="form-group">
                    <label for="userName">用户名</label>
                    <input type="text" class="form-control" id="userName" placeholder="请输入用户名"
                        v-model="userName"  readonly="readonly">
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'person',
        data() {
            return {
                userName: ''
            }
        },
        created() {
            if (this.$store.state.userName) {
                this.userName = this.$store.state.userName
            }
        }
    }
</script>
<style scoped>
    h1 {
        margin: 50px 0;
    }
</style>