<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponMOdal(false)">新增優惠券</button>
    </div>
    <div class="table-responsive">
      <table class="table mt-4">
        <thead>
          <tr>
            <th class="text-nowrap">名稱</th>
            <th class="text-nowrap">折扣百分比</th>
            <th class="text-nowrap">到期日</th>
            <th class="text-nowrap" width="120">是否啟用</th>
            <th class="text-nowrap" width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in Coupon" :key="item.id">
            <td class="text-nowrap">{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ item.due_date | date }}</td>
            <td v-if="item.is_enabled" class="text-success">已啟用</td>
            <td v-if="!item.is_enabled" class="text-danger">未啟用</td>
            <td class="btn-group text-nowrap">
              <button class="btn btn-sm btn-outline-primary" @click="openCouponMOdal(true,item)">編輯</button>
              <button class="btn btn-sm btn-outline-danger" @click="delCouponModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :childPagination="Pagination" @childChangePage="getCoupon" />
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="couponModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date" v-model="due_date" />
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="percent"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataCoupon()">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      modalTitle: '新增優惠券',
      Pagination: {},
      Coupon: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      due_date: '',
      isNew: false
    }
  },
  components: {
    Pagination
  },
  watch: {
    due_date () {
      const vm = this
      const timestamp = Math.floor(new Date(vm.due_date) / 1000)
      vm.tempCoupon.due_date = timestamp
    }
  },
  methods: {
    openCouponMOdal (isNew, item) {
      const vm = this
      $('#couponModal').modal('show')
      if (!isNew) {
        vm.modalTitle = '新增優惠券'
        vm.tempCoupon = {}
        vm.isNew = true
      } else {
        vm.modalTitle = '修改優惠券'
        vm.tempCoupon = Object.assign({}, item)
        vm.isNew = false
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000)
          .toISOString()
          .split('T')
        vm.due_date = dateAndTime[0]
      }
    },
    updataCoupon (id) {
      const vm = this
      vm.$store.dispatch('updataLoading', true)
      if (vm.isNew) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
        vm.$http.post(api, { data: vm.tempCoupon }).then(response => {
          vm.getCoupon()
          $('#couponModal').modal('hide')
        })
      } else {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        vm.$http.put(api, { data: vm.tempCoupon }).then(response => {
          vm.getCoupon()
          $('#couponModal').modal('hide')
        })
      }
    },
    getCoupon (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.$store.dispatch('updataLoading', true)
      vm.$http.get(api).then(response => {
        vm.Coupon = response.data.coupons
        vm.$store.dispatch('updataLoading', false)
        vm.Pagination = response.data.pagination
      })
    },
    delCouponModal (item) {
      const vm = this
      vm.tempCoupon = item
      $('#delCouponModal').modal('show')
    },
    delCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.$store.dispatch('updataLoading', true)
      vm.$http.delete(api).then(response => {
        vm.getCoupon()
      })
      $('#delCouponModal').modal('hide')
    }
  },
  created () {
    const vm = this
    vm.getCoupon()
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
