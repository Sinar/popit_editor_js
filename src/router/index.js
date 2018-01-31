import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Person from '@/components/Person'
import PersonEdit from '@/components/PersonEdit'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/persons/create',
      name: 'Person',
      component: Person
    },
    {
      path: '/persons/edit/:entity_id',
      name: 'PersonEdit',
      component: PersonEdit
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
