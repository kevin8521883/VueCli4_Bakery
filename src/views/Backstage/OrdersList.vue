<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="text-nowrap" width="120">購買時間</th>
            <th class="text-nowrap" width="300">Email</th>
            <th class="text-nowrap">購買款項</th>
            <th class="text-nowrap" width="120">應付金額</th>
            <th class="text-nowrap" width="120">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in sortOrder" :key="item.id">
            <td>{{ item.create_at | date }}</td>
            <td class="text-nowrap">{{ item.user.email }}</td>
            <td class="text-nowrap">
              <ul class="list-unstyled">
                <li
                  v-for="(itemProducts) in item.products"
                  :key="itemProducts.id"
                >{{ itemProducts.product.title }} 數量：{{ itemProducts.qty }} {{ itemProducts.product.unit }}</li>
              </ul>
            </td>
            <td class="text-right">{{ item.total | currency }}</td>
            <td>
              <span v-if="!item.is_paid" class="text-muted">尚未付款</span>
              <span v-else class="text-success">已付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :childPagination="Pagination" @childChangePage="getOrder" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      Pagination: {},
      order: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrder (page = 1) {
      const vm = this
      vm.$store.dispatch('updataLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.$http.get(api).then(res => {
        vm.order = res.data.orders
        vm.Pagination = res.data.pagination
        vm.$store.dispatch('updataLoading', false)
      })
    }
  },
  computed: {
    sortOrder () {
      const vm = this
      let newOrder = []
      if (vm.order.length) {
        newOrder = vm.order.sort((a, b) => {
          const aIsPaid = a.is_paid
          const bIsPaid = b.is_paid
          return bIsPaid - aIsPaid
        })
      }
      return newOrder
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    const vm = this
    vm.getOrder()
  }
}
</script>
