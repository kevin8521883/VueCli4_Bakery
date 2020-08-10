import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
import AOS from 'aos'
import 'aos/dist/aos.css'
import clipboard from 'clipboard'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './bus'
import currencyFilter from './filters/currency'
import dateFiliter from './filters/date'
import store from './strore'

AOS.init({
  once: true,
  duration: 800
})
Vue.prototype.clipboard = clipboard
Vue.use(VueI18n)
Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFiliter)

const i18n = new VueI18n({
  locale: 'zhTW'
})

Vue.use(VeeValidate, {
  events: 'input|blur', //  這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
