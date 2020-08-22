<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-5">
      <div v-if="cart.final_total">
        <div class="row justify-content-center">
          <div class="col-md-9">
            <div class="container">
              <div class="row justify-content-around">
                <div class="col-md-3 p-2 rounded-pill alert-success text-center">1.填寫訂購資料</div>
                <div
                  class="col-md-3 p-2 rounded-pill alert-secondary text-center my-3 my-md-0"
                >2.金流付款</div>
                <div class="col-md-3 p-2 rounded-pill alert-secondary text-center">3.訂單完成</div>
              </div>
            </div>
          </div>
          <div class="col-md-9 mt-5">
            <div class="table-responsive">
            <table class="table">
              <thead>
                <th></th>
                <th width="75" class="d-none d-md-table-cell"></th>
                <th class="text-nowrap">品名</th>
                <th class="text-nowrap">數量</th>
                <th class="text-nowrap">單價</th>
                <th class="text-nowrap">總價格</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click.prevent="delCart(item)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="d-none d-md-table-cell">
                    <router-link :to="{path: `/product/${item.product.id}`}">
                      <img height="50" :src="item.product.imageUrl" alt />
                    </router-link>
                  </td>
                  <td class="text-nowrap align-middle">
                    <router-link
                      :to="{path: `/product/${item.product.id}`}"
                      class="text-dark"
                    >{{ item.product.title }}</router-link>
                    <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                  </td>
                  <td class="text-nowrap align-middle">
                    <select
                     :value="item.qty"
                      @change="e => changeCartNum(item.id, item.product_id, e)"
                    >
                      <option :value="num" v-for="(num) in 10" :key="num">{{ num }}</option>
                    </select>
                    /{{ item.product.unit }}
                  </td>
                  <td class="text-nowrap align-middle">{{ item.product.price | currency }}</td>
                  <td class="text-nowrap align-middle">{{ item.product.price * item.qty|currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="cart.final_total==cart.total">
                  <td colspan="3">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" v-model="coupons.code" placeholder="請輸入優惠碼" />
                      <div class="input-group-append">
                        <button
                        class="btn btn-outline-secondary"
                        @click.prevent="useCoupons"
                        type="button"
                        >套用優惠碼</button>
                      </div>
                    </div>
                  </td>
                  <td colspan="3" class="text-right align-middle text-nowrap">
                    總計：
                    <span>{{ cart.total | currency }}</span>
                  </td>
                </tr>
                <tr v-if="cart.final_total!==cart.total">
                  <td colspan="3" class="align-middle">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" v-model="coupons.code" placeholder="請輸入優惠碼" />
                      <div class="input-group-append">
                        <button
                        class="btn btn-outline-secondary"
                        @click.prevent="useCoupons"
                        type="button"
                        >套用優惠碼</button>
                      </div>
                    </div>
                  </td>
                  <td colspan="3" class="text-right text-secondary align-middle text-nowrap">
                    折扣前總計：
                    <span>{{ cart.total | currency }}</span>
                  </td>
                </tr>
                <tr v-if="cart.final_total!==cart.total">
                  <td colspan="6" class="h5 text-right">
                    折扣後總計：
                    <span class="h4 text-danger">{{ cart.final_total|currency }}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
            </div>
            <!-- <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" v-model="coupons.code" placeholder="請輸入優惠碼" />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  @click.prevent="useCoupons"
                  type="button"
                >套用優惠碼</button>
              </div>
            </div> -->
          </div>
        </div>
        <div class="my-5 row justify-content-center">
          <form class="col-md-6" @submit.prevent="creatOrder">
            <div class="form-group">
              <label for="userEmail">
                Email
                <span class="text-danger">*必填</span>
              </label>
              <input
                :class="{'is-invalid':errors.has('email')}"
                type="email"
                v-model="form.user.email"
                class="form-control"
                name="email"
                id="userEmail"
                v-validate="'required|email'"
                placeholder="請輸入 Email"
              />
              <span class="text-danger" v-if="errors.has('email')">必須輸入Email</span>
            </div>
            <div class="form-group">
              <label for="username">
                收件人姓名
                <span class="text-danger">*必填</span>
              </label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                :class="{'is-invalid':errors.has('name')}"
                v-validate="'required'"
                v-model="form.user.name"
                placeholder="輸入姓名"
              />
              <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
            </div>
            <div class="form-group">
              <label for="usertel">
                收件人電話
                <span class="text-danger">*必填</span>
              </label>
              <input
                type="tel"
                class="form-control"
                id="usertel"
                name="tel"
                :class="{'is-invalid':errors.has('tel')}"
                v-validate="'required|digits:10'"
                v-model="form.user.tel"
                placeholder="請輸入電話"
              />
              <span class="text-danger" v-if="errors.has('tel')">必須輸入10位數電話號碼</span>
            </div>
            <div class="form-group">
              <label for="useraddress">
                收件人地址
                <span class="text-danger">*必填</span>
              </label>
              <input
                type="text"
                class="form-control"
                name="address"
                id="useraddress"
                :class="{'is-invalid':errors.has('address')}"
                v-validate="'required'"
                v-model="form.user.address"
                placeholder="請輸入地址"
              />
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                name
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="cart.final_total==0">
        <div
          class="cart-none text-center d-flex justify-content-center align-items-center"
        >
          <div>
            <div class="h3 mb-3">您的購物車內還沒有任何商品</div>
            <button class="btn btn-outline-primary" @click.prevent="goShop">
              <i class="fas fa-cart-plus"></i> 點擊此處去購物
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      coupons: {
        code: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    delCart (item) {
      this.$store.dispatch('delCart', item)
    },
    changeCartNum (orderId, id, e) {
      const vm = this
      vm.$store.dispatch('updataLoading', true)
      const delApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${orderId}`
      const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const productItem = {
        product_id: id,
        qty: parseInt(e.target.value)
      }
      vm.$http.delete(delApi).then(res => {
        vm.$http.post(addApi, { data: productItem }).then(res => {
          vm.getCart()
          vm.$store.dispatch('updataLoading', false)
          vm.$store.dispatch('updateMessage', { message: '變更商品成功', status: 'success' })
        })
      })
    },
    useCoupons () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.$http.post(api, { data: vm.coupons }).then(res => {
        if (res.data.success) {
          vm.getCart()
          vm.$store.dispatch('updateMessage', { message: res.data.message, status: 'success' })
        } else {
          vm.$store.dispatch('updateMessage', { message: res.data.message, status: 'danger' })
          vm.coupons.code = ''
        }
      })
    },
    creatOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.$validator.validate().then(res => {
        if (res) {
          vm.$http.post(api, { data: vm.form }).then(res => {
            vm.$store.dispatch('getCart')
            vm.$router.push(`/checkout/${res.data.orderId}`)
          })
        } else {
          vm.$store.dispatch('updateMessage', { message: '欄位不得為空', status: 'danger' })
        }
      })
    },
    goShop () {
      const vm = this
      vm.$router.push('/products')
    }
  },
  created () {
    const vm = this
    vm.getCart()
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    cart () {
      return this.$store.state.cart
    }
  }
}
</script>
