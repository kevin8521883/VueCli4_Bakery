import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    messages: [],
    cart: {
      carts: {}
    }
  },
  actions: {
    updataLoading (context, status) {
      context.commit('LOADING', status)
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then(res => {
        if (res.data.success) {
          context.commit('GET_CART', res.data.data)
        }
      })
    },
    delCart (context, item) {
      context.dispatch('updataLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
      axios.delete(api).then(res => {
        context.dispatch('getCart')
        context.dispatch('updateMessage', { message: '商品已刪除', status: 'danger' })
        context.dispatch('updataLoading', false)
      })
    },
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('UPDATE_MESSAGE', { message, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessage (context, num) {
      context.commit('REMOVE_MESSAGE', num)
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVE_MESSAGE_TIMING', timestamp)
      }, 3000)
    },
    addToCart (context, { id, qty }) {
      context.dispatch('updataLoading', true)
      context.dispatch('getCart')
      // state.cart.carts.filter(function (item) {
      //   if (item.product_id === id) {
      //     qty = item.qty + qty
      //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
      //     axios.$http.delete(api).then(res => {})
      //   }
      // })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const productItem = {
        product_id: id,
        qty: qty
      }
      axios.post(api, { data: productItem }).then(res => {
        if (res.data.success) {
          context.dispatch('getCart')
          context.dispatch('updateMessage', { message: res.data.message, status: 'success' })
        } else {
          context.dispatch('updateMessage', { message: res.data.message, status: 'danger' })
        }
        context.dispatch('getCart')
        context.dispatch('updataLoading', false)
      })
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    GET_CART (state, payload) {
      state.cart = payload
    },
    UPDATE_MESSAGE (state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp
      })
    },
    REMOVE_MESSAGE (state, num) {
      state.messages.splice(num, 1)
    },
    REMOVE_MESSAGE_TIMING (state, timestamp) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1)
        }
      })
    }
  }
})
