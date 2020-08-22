import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    messages: [],
    myFavorite: JSON.parse(localStorage.getItem('myFavorite')) || [],
    cart: {
      carts: {}
    },
    totalQty: 0,
    sameProduct: false,
    itemId: ''
  },
  actions: {
    updataLoading (context, status) {
      context.commit('LOADING', status)
    },
    getProducts (context) {
      context.dispatch('updataLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      axios.get(api).then(res => {
        context.commit('GET_PRODUCTS', res)
        context.dispatch('updataLoading', false)
      })
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
      console.log(item.id)
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
      context.commit('ADD_SAMEPRODUCT', { id: id, qty: qty })
      if (context.state.sameProduct) {
        console.log(context.state.itemId)
        const delApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${context.state.itemId}`
        const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const sameProductItem = {
          product_id: id,
          qty: context.state.totalQty
        }
        axios.delete(delApi).then(() => {
          return axios.post(addApi, { data: sameProductItem })
        }).then((item) => {
          context.dispatch('updateMessage', { message: item.data.message, status: 'success' })
          context.dispatch('getCart')
          context.dispatch('updataLoading', false)
        })
      } else {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const productItem = {
          product_id: id,
          qty: qty
        }
        axios.post(api, { data: productItem }).then(res => {
          if (res.data.success) {
            context.dispatch('updateMessage', { message: res.data.message, status: 'success' })
          } else {
            context.dispatch('updateMessage', { message: res.data.message, status: 'danger' })
          }
          context.dispatch('getCart')
          context.dispatch('updataLoading', false)
        })
      }
    },
    addMyFavorite (context, id) {
      context.commit('ADD_MYFAVORITE', id)
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    GET_PRODUCTS (state, res) {
      state.products = res.data.products
      state.products.forEach(function (item) {
        Vue.set(item, 'isLike', false)
      })
      state.products.forEach(function (item) {
        state.myFavorite.forEach(function (itemLove) {
          if (itemLove === item.id) {
            item.isLike = true
          }
        })
      })
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
    },
    ADD_MYFAVORITE (state, id) {
      state.products.forEach(function (item) {
        if (item.id === id) {
          item.isLike = !item.isLike
        }
      })
      const index = state.myFavorite.findIndex(function (item) {
        return item === id
      })
      if (index === -1) {
        state.myFavorite.push(id)
      } else {
        state.myFavorite.splice(index, 1)
      }
      localStorage.setItem('myFavorite', JSON.stringify(state.myFavorite))
    },
    ADD_SAMEPRODUCT (state, payload) {
      state.totalQty = 0
      state.itemId = ''
      state.sameProduct = false
      state.cart.carts.filter(function (item) {
        if (item.product_id === payload.id) {
          state.itemId = item.id
          state.sameProduct = true
          state.totalQty = payload.qty + item.qty
        }
      })
    }
  }
})
