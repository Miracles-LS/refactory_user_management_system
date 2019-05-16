<template>
  <div class="customersDetail container">
    <Alert v-if="alert" :message="alert"></Alert>
    <router-link to="/" class="btn btn-default">返回</router-link>
    <h1 class="page-header">{{customer.name}}
      <span class="pull-right">
        <router-link :to="'/edit/'+id" class="btn btn-primary">编辑</router-link>
        <button class="btn btn-danger" @click="deleteCustomer(id)">删除</button>
      </span>
    </h1>
    <ul class="list-group">
      <li class="list-group-item"><span class="glyphicon glyphicon-phone"></span>{{customer.phone}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-envelope"></span>{{customer.email}}</li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item"><span class="glyphicon glyphicon-education"></span>{{customer.education}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-flag"></span>{{customer.graduationschool}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon glyphicon-book"></span>{{customer.profession}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-list"></span>{{customer.profile}}</li>
    </ul>
  </div>
</template>

<script>
  import AV from '../leancloud'
  import Alert from './Alert'
  export default {
    name: 'customersDetail',
    data() {
      return {
        id: '',
        customer: {},
        alert: '',
        scrollTop:false
      }
    },
    methods: {
      fetchCustomers(id) {
        //leancloud
        var Customers = new AV.Query('personalDatas');
        Customers.get(id).then((res) => {
          this.customer = res._serverData;
        })
          .catch((error) => {
            console.log(error);
          })
        /*json-server + axios
        this.$axios.get('/users/'+id)
          .then((res) => {
              console.log(res)
            this.customer = res.data
          })
        */

        /*bmob
        const query = Bmob.Query("personalDatas");
        query.get(id).then(res => {
            console.log(res)
            this.customer = res
        });
        */
      },
      deleteCustomer(id) {
        //leancloud
        var personalData = AV.Object.createWithoutData('personalDatas', id);
        personalData.destroy().then((success) => {
          // 删除成功
          this.$router.push({ name: 'customers', params: { alert: '信息删除成功！' } })
        })
          .catch((error) => {
            console.log(error);
          })
        /*json-server + axios
          this.$axios.delete('/users/'+id)
          .then((res)=>{
              console.log(id)
              this.$router.push({name:'customers',params:{ alert:'用户信息删除成功！' }})
          })
        */

        /*bmob
          const query = Bmob.Query('personalDatas');
          query.destroy(id).then(res => {
            console.log(res)
            this.$router.push({name:'customers',params:{ alert:'信息删除成功！' }})
          }).catch(err => {
            console.log(err)
          })
        */
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.alert = this.$route.params.alert;
      this.fetchCustomers(this.id);
    },
    updated() {
      if (this.alert) {
        setTimeout(() => {
          this.alert = ''
        }, 5000);
        if (!this.scrollTop) {
          window.scrollTo(0, 0);
          this.scrollTop = true;
        }
      }
    },
    components: {
      Alert
    }
  }
</script>
<style scoped>
  .glyphicon {
    margin-right: 10px;
  }

  button {
    margin-left: 10px;
  }
</style>