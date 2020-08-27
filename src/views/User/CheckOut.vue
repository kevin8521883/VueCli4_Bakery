<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="container">
            <div class="row justify-content-around">
              <div class="col-md-3 p-2 rounded-pill border border-primary text-primary text-center">1.填寫訂購資料</div>
              <div
                class="col-md-3 p-2 rounded-pill border border-primary text-primary text-center my-3 my-md-0"
                :class="{'alert-primary' :!order.is_paid}"
              >2.金流付款</div>
              <div
                class="col-md-3 p-2 rounded-pill border border-primary text-primary text-center"
                :class="{'alert-primary':order.is_paid}"
              >3.訂單完成</div>
            </div>
          </div>
        </div>
        <form class="col-md-6 mt-5" @submit.prevent="payOrder">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <th class="text-nowrap">品名</th>
                <th class="text-nowrap" width="100">數量</th>
                <th class="text-nowrap text-right" width="150">總價格</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="text-nowrap align-middle">{{ item.product.title }}</td>
                  <td class="text-nowrap align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="text-nowrap align-middle text-right">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ order.total | currency }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <th class="text-nowrap" width="100">Email</th>
                  <td class="text-nowrap">{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th class="text-nowrap">姓名</th>
                  <td class="text-nowrap">{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th class="text-nowrap">收件人電話</th>
                  <td class="text-nowrap">{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th class="text-nowrap">收件人地址</th>
                  <td class="text-nowrap">{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th class="text-nowrap">付款狀態</th>
                  <td class="text-nowrap">
                    <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
          </div>
          <div class="text-center" v-if="order.is_paid === true">
            <router-link to="/" class="btn btn-outline-secondary mr-1">回首頁</router-link>
            <router-link to="/products" class="btn btn-outline-primary ml-1">繼續購物去</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orderId: '',
      order: {
        user: {}
      }
    }
  },
  methods: {
    getOrder () {
      const vm = this
      vm.$store.dispatch('updataLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$http.get(api).then((res) => {
        vm.order = res.data.order
        vm.$store.dispatch('updataLoading', false)
      })
    },
    payOrder () {
      const vm = this
      vm.$store.dispatch('updataLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$http.post(api).then((res) => {
        vm.getOrder()
        vm.$store.dispatch('updataLoading', false)
      })
    }
  },
  created () {
    const vm = this
    vm.orderId = vm.$route.params.orderId
    vm.getOrder()
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
