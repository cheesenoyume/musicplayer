import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Discovery from './components/Discovery.vue'
import Playlists from './components/Playlists.vue'
import Songs from './components/Songs.vue'
import Results from './components/Results.vue'
import Playlist from './components/Playlist.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs;
Vue.prototype.$ajax = axios;



Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
  linkActiveClass:"",
  linkExactActiveClass:"",
  routes:[
    {path:"/",component:Discovery},
    {path:"/playlists",component:Playlists},
    {path:"/songs",component:Songs},
    {path:"/results",component:Results},
    {path:"/playlist",component:Playlist}
  ],mode:"history"
}
)
new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')

Vue.filter('playTimeFormat', function (originVal) {
  let duration = originVal
  let min = parseInt(duration / 1000 / 60)
  if (min < 10) {
    min = '0' + min
  }
  let sec = parseInt((duration / 1000) % 60)
  if (sec < 10) {
    sec = '0' + sec
  }
  return `${min}:${sec}`
})