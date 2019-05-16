<template>
    <div class="add container">
        <router-link to="/" class="btn btn-default">返回</router-link>
        <h1 class="page-header">添加数据</h1>
        <Alert v-if="alert" :message="alert"></Alert>
        <form v-on:submit.prevent="addCustomer">
            <div class="well">
                <h4>用户信息</h4>
                <div class="form-group">
                    <label>姓名</label>
                    <input type="text" class="form-control" placeholder="name" v-model="customer.name">
                </div>
                <div class="form-group">
                    <label>电话</label>
                    <input type="tel"class="form-control" placeholder="phone" v-model="customer.phone" maxlength="11">
                </div>
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="text" class="form-control" placeholder="email" v-model="customer.email">
                </div>
                <div class="form-group">
                    <label>学历</label>
                    <input type="text" class="form-control" placeholder="education" v-model="customer.education">
                </div>
                <div class="form-group">
                    <label>毕业学校</label>
                    <input type="text" class="form-control" placeholder="graduationschool" v-model="customer.graduationschool">
                </div>
                <div class="form-group">
                    <label>职业</label>
                    <input type="text" class="form-control" placeholder="profession" v-model="customer.profession">
                </div>
                <div class="form-group">
                    <label>个人简介</label>
                    <textarea rows="10" class="form-control" v-model="customer.profile"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">添加</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Alert from './Alert'
    import AV from '../leancloud'
    import CheckExpFun from '../checkExpFun'
    var Customers = AV.Object.extend('personalDatas'); // (数据库名)。只注册一次
    export default {
        name: 'add',
        data() {
            return {
                alert:'',
                customer:{
                    name:'',
                    phone:'',
                    email:'',
                    education:'',
                    graduationschool:'',
                    profession:'',
                    profile:''
                }
            }
        },
        methods: {
            addCustomer(){
                if(!this.customer.name || !this.customer.phone || !this.customer.email){
                    this.alert='请输入对应的信息！';
                    return
                }else if((!CheckExpFun.checkPhone(this.customer.phone))||(this.customer.phone.length<11)){
                    this.alert = '请输入正确的电话号码！'
                    return
                }else if(!CheckExpFun.checkEmail(this.customer.email)){
                    this.alert = '请输入正确的邮箱！'
                    return
                }else{
                    /* json-server + axios
                        this.$axios.post('/users',this.customer)
                        .then((res)=>{
                            console.log(res)
                            this.$router.push({name:'customers',params:{ alert:'用户信息添加成功！' }});
                        })
                    */

                    /*bmob
                    const query = Bmob.Query('personalDatas');
                    query.save(this.customer).then(res => {
                        console.log(res)
                        this.$router.push({name:'customers',params:{ alert:'信息添加成功！'}});
                    }).catch(err => {
                        console.log(err)
                    }) 
                    */
                    var customers = new Customers();
                    customers.save(this.customer)
                        .then((res) => {
                            this.$router.push({name:'customers',params:{ alert:'信息添加成功！'}});
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }                
            }
        },
        updated() {
            if(this.alert){
                setTimeout(() => {
                    this.alert = ''
                }, 5000);
                window.scrollTo(0,0);
            }
        },
        components:{
            Alert
        }
    }
</script>