<template>
    <div class="edit container">
        <router-link :to="'/customer/'+ id" class="btn btn-default">返回</router-link>
        <h1 class="page-header">编辑用户</h1>
        <Alert v-if="alert" :message="alert"></Alert>
        <form v-on:submit.prevent="editCustomer">
            <div class="well">
                <h4>用户信息</h4>
                <div class="form-group">
                    <label>姓名</label>
                    <input type="text" class="form-control" placeholder="name" v-model="customer.name">
                </div>
                <div class="form-group">
                    <label>电话</label>
                    <input type="text" class="form-control" placeholder="phone" v-model="customer.phone">
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
                    <input type="text" class="form-control" placeholder="graduationschool"
                        v-model="customer.graduationschool">
                </div>
                <div class="form-group">
                    <label>职业</label>
                    <input type="text" class="form-control" placeholder="profession" v-model="customer.profession">
                </div>
                <div class="form-group">
                    <label>个人简介</label>
                    <textarea rows="10" class="form-control" v-model="customer.profile"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">确认</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Alert from './Alert.vue'
    import AV from '../leancloud.js'
    export default {
        name: 'edit',
        data() {
            return {
                id:'',
                alert:'',
                customer: {
                    name: '',
                    phone: '',
                    email: '',
                    education: '',
                    graduationschool: '',
                    profession: '',
                    profile: ''
                }
            }
        },
        methods: {
            fetchCustomers(){
                //leancloud
                var personalData = new AV.Query('personalDatas');
                personalData.get(this.id)
                    .then((res) => {
                        this.customer = res._serverData
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                /* json-server + axios
                    this.$axios.get('/users/'+this.id)
                    .then((res) => {
                        console.log(res)
                        this.customer = res.data
                    })
                */

                /*  bmob
                    const query = Bmob.Query('personalDatas');
                    query.get(this.id).then(res => {
                        // console.log(res)
                        this.customer = res
                    });
                */
            },
            editCustomer() {
                if (!this.customer.name || !this.customer.phone || !this.customer.email) {
                    console.log('请输入相应的内容')
                    this.alert = '请输入相应的内容！'
                } else {
                    //leancloud
                    var customers = AV.Object.createWithoutData('personalDatas', this.id);
                    customers.save(this.customer)
                        .then((res) => {
                            this.$router.push({name:'customers',params:{ alert:'信息编辑成功！'}});
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                    /* json-server + axios
                    this.$axios.put('/users/'+this.id, this.customer)
                        .then((res) => {
                            console.log(res)
                            this.$router.push({ name: 'customers', params: { alert: '用户信息编辑成功！' } });
                        })
                    */

                    /*bmob
                        const query = Bmob.Query('personalDatas');
                        query.set('id', this.id)
                        query.set('name',this.customer.name)
                        query.set('profile',this.customer.profile)
                        query.set('phone',this.customer.phone)
                        query.set('email',this.customer.email)
                        query.set('education',this.customer.education)
                        query.set('graduationschool',this.customer.graduationschool)
                        query.set('profession',this.customer.profession)
                        query.save().then(res => {
                            console.log(res)
                            // res.save(this.customer)
                            this.$router.push({name:'customers',params:{ alert:'信息编辑成功！'}});
                        }).catch(err => {
                            console.log(err)
                        }) 
                    */
                }
            }
        },
        created() {
            this.id=this.$route.params.id;
            this.fetchCustomers();
        },
        components:{
            Alert
        }
    }
</script>