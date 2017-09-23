import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)

import App from './App'
import Hello from './components/Hello'
import About from './components/About'
import Ours from './components/Ours'
import News from './components/OursSub/News'
import Message from './components/OursSub/Message'
import NewsParame from './components/OursSub/NewsSub/NewsParame'

// 引入 bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


var router = new VueRouter({
    routes: [
      { path: '/Hello', component: Hello },
      { path: '/About', component: About },
      { path: '/Ours', 
          component: Ours,
          children: [ //嵌套路由，path路径不要加斜杠，组件加<router-view></router-view>嵌套
              {
                  path :'',
                  component: News
              },
              {
                  path :'News',
                  component: News,
                  children:[
                      {
                          path :'NewsParame/:id',
                          name : 'newsparame',
                          component: NewsParame
                      }
                  ]
              },
              {
                  path :'Message',
                  component: Message
              }
          ]
      },
      { path: '/', redirect: '/Hello' }
    ]
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})

