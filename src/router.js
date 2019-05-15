import Vue from 'vue'
import Router from 'vue-router'
import Customers from './views/Customers.vue'
import About from './views/About.vue'
import Add from './views/Add.vue'
import CustomersDetail from './views/CustomersDetail.vue'
import Edit from './views/Edit.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Person from './views/Person.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'customers',
      component: Customers,
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/me',
      name: 'person',
      component: Person
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/customer/:id',
      name: 'customersDetail',
      component: CustomersDetail
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path:'*',
      component:Customers
    }
  ]
})
