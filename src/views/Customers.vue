<template>
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <h1 class="page-header">后台管理系统</h1>
    <router-link to="/add" class="btn btn-primary">添加数据</router-link>
    <input type="text" class="form-control" placeholder="搜索" v-model="filterInput">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in filterBy(customers,filterInput)" :key="index">
          <td>{{customer.name}}</td>
          <td>{{customer.phone}}</td>
          <td>{{customer.email}}</td>
          <td>
            <router-link :to="'/customer/'+ customer.id" class="btn btn-default">详情</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert.vue'
  import AV from '../leancloud.js'
  var Customers = new AV.Query('personalDatas'); // (数据库名)。只注册一次
  export default {
    name: 'customers',
    data() {
      return {
        customers: [],
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      fetchCustomers() {
        /*
        json-server + axios
        this.$axios.get('/users')
          .then((res) => {
            this.customers = res.data
          })
        */

        /*bmob
          const query = Bmob.Query("personalDatas");
          query.find().then(res => {
              console.log(res)
              this.customers = res
          });
        */

        //leancloud
        var customersArr = [];
        Customers.find().then((data) => {
          data.forEach ((customer)=>{
            let customerObj = {};
            customerObj = customer._serverData;
            customerObj.id = customer.id;
            customersArr.push(customerObj);
          }) 
          this.customers = customersArr
        })
      },
      filterBy(customers, value) {
        return customers.filter((customer) => {
          return customer.name.match(value) || customer.email.match(value) || customer.phone.match(value);
        })
      }
    },
    components: {
      Alert
    },
    created() {
      this.fetchCustomers();
      if (this.$route.params.alert) {
        this.alert = this.$route.params.alert
      }
    },
    mounted() {
      //判断用户是否登录
      if(!this.$store.state.userName){
        this.$router.push('/login')
      }
    },
    updated() {
      this.fetchCustomers();
      if(this.alert){
        setTimeout(() => {
          this.alert=''
        }, 3000);
      }
    },
  }
</script>
<style scoped>
  .btn-primary {
    margin-bottom: 20px;
    float: right;
  }
</style>