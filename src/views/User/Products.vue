<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control btn-round"
              @keyup.enter="searchProducts"
              v-model.trim="keyPoint"
              placeholder="搜尋商品"
            />
            <div class="input-group-append">
              <button class="btn btn-primary btn-round" @click="searchProducts">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <ul class="ul-category">
            <li>
              <a
                class="h5"
                :class="{'active':category==='All'}"
                @click.prevent="changeCategory('All')"
              >全部商品</a>
            </li>
            <li v-for="(item, index) in filterCategory" :key="index">
              <a
                class="h5"
                :class="{'active':category===item}"
                @click.prevent="changeCategory(item)"
              >{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="col-md-9 mt-4 mt-md-0">
          <div v-if="products.length">
            <div class="text-center h2" v-if="filterProducts.length==0">目前無此商品</div>
          </div>
          <div class="row">
            <div
              class="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              v-for="(item) in filterProducts"
              :key="item.id"
            >
              <div class="card shadow-sm card-round">
                <router-link :to="{path : `/product/${item.id}` }" class="pic">
                  <div :style="{backgroundImage :`url(${item.imageUrl})`}" class="pic-enlarge"></div>
                </router-link>
                <router-link :to="{path : `/product/${item.id}` }" class="card-body text-decoration-none">
                  <h5 class="card-title text-dark">{{ item.title }}</h5>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div
                      class="h4 text-dark"
                      v-if="item.price===item.origin_price"
                    >{{ item.origin_price | currency }}</div>
                    <del
                      class="h6 text-secondary"
                      v-if="item.price!=item.origin_price"
                    >{{ item.origin_price | currency }}</del>
                    <div
                      class="h4 text-danger"
                      v-if="item.price!=item.origin_price"
                    >{{ item.price | currency }}</div>
                  </div>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <a class="text-danger" @click.prevent="addMyFavorite(item.id)" title="加入最愛">
                      <i class="far fa-heart fa-lg" :class="{'fas fa-heart fa-lg':item.isLike}"></i>
                    </a>
                    <a class="text-danger" @click.prevent="addtoCart(item.id)" title="加入購物車">
                      <i class="fas fa-cart-plus fa-2x"></i>
                    </a>
                  </div>
                </router-link>
              </div>
            </div>
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
      products: [],
      category: 'All',
      categoryItem: [],
      keyPoint: '',
      search: false,
      myFavorite: JSON.parse(localStorage.getItem('myFavorite')) || [],
      cart: {
        carts: {}
      }
    }
  },
  methods: {
    getProducts () {
      const vm = this
      vm.$store.dispatch('updataLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then(res => {
        vm.products = res.data.products
        vm.products.forEach(function (item) {
          vm.$set(item, 'isLike', false)
        })
        vm.products.forEach(function (item) {
          vm.myFavorite.forEach(function (itemLove) {
            if (itemLove === item.id) {
              item.isLike = true
            }
          })
        })
        vm.$store.dispatch('updataLoading', false)
      })
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    addtoCart (id, qty = 1) {
      this.$store.dispatch('addToCart', { id: id, qty: qty })
      // const vm = this
      // vm.$store.dispatch('updataLoading', true)
      // vm.getCart()
      // vm.cart.carts.filter(function (item) {
      //   if (item.product_id === id) {
      //     console.log(item.product_id, ' + ', id)
      //     qty = item.qty + qty
      //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
      //     vm.$http.delete(api).then(res => {})
      //   }
      // })
      // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      // const productItem = {
      //   product_id: id,
      //   qty: qty
      // }
      // vm.$http.post(api, { data: productItem }).then(res => {
      //   if (res.data.success) {
      //     vm.$bus.$emit('upDataCart')
      //     vm.$bus.$emit('message:push', res.data.message, 'success')
      //   } else {
      //     vm.$bus.$emit('message:push', res.data.message, 'danger')
      //   }
      //   vm.getCart()
      //   vm.$store.dispatch('updataLoading', false)
      // })
    },
    changeCategory (item) {
      const vm = this
      vm.keyPoint = ''
      vm.category = item
    },
    searchProducts () {
      const vm = this
      vm.search = true
    },
    addMyFavorite (id) {
      const vm = this
      vm.products.forEach(function (item) {
        if (item.id === id) {
          item.isLike = !item.isLike
        }
      })
      const index = vm.myFavorite.findIndex(function (item) {
        return item === id
      })
      if (index === -1) {
        vm.myFavorite.push(id)
      } else {
        vm.myFavorite.splice(index, 1)
      }
      localStorage.setItem('myFavorite', JSON.stringify(vm.myFavorite))
      vm.$bus.$emit('upDataFavorite', vm.myFavorite)
    }
  },
  computed: {
    filterProducts () {
      const vm = this
      if (vm.search) {
        vm.search = false
        return vm.products.filter(function (item) {
          return item.title.match(vm.keyPoint)
        })
      } else if (vm.category === 'All') {
        return vm.products
      } else if (vm.category !== 'All') {
        return vm.products.filter(function (item) {
          return item.category === vm.category
        })
      } else {
        return vm.products
      }
    },
    filterCategory () {
      const vm = this
      vm.products.forEach(item => {
        vm.categoryItem.push(item.category)
      })
      return vm.categoryItem.filter(function (item, index, arr) {
        return arr.indexOf(item) === index
      })
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    const vm = this
    vm.getProducts()
    vm.getCart()
    vm.$bus.$on('goAllProducts', category => {
      vm.category = category
    })
    vm.$bus.$emit('upDataFavorite', vm.myFavorite)
  }
}
</script>
