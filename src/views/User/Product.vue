<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-5">
      <div class="row pb-5 mb-5">
        <div class="col-md-7">
          <img class="img-fluid rounded" :src="product.imageUrl" />
        </div>
        <div class="col-md-5 card-body" v-if="product.title">
          <h2 class="card-title">{{ product.title }}</h2>
          <hr />
          <blockquote class="blockquote mt-3">
            <p class="mb-0">{{ product.content }}</p>
            <footer class="blockquote-footer text-right">產品規格：{{ product.description }}</footer>
          </blockquote>
          <hr />
          <div class="text-right mb-3">
            <del
              v-if="product.origin_price!=product.price"
              class="text-secondary h6 pr-3"
            >原價 {{ product.origin_price | currency }}</del>
            <span v-if="product.origin_price!=product.price" class="h5">優惠價</span>
            <span v-if="product.origin_price===product.price" class="h5">售價</span>
            <span class="text-danger h4"> {{ product.price | currency }}</span>
          </div>
          <select class="form-control" v-model="product.num">
            <option :value="num" v-for="(num) in 10" :key="num">{{ num }} {{ product.unit }}</option>
          </select>
          <div class="mt-3 text-right">
            <span class="text-secondary h6 mr-3">小計 {{ product.price * product.num | currency }}</span>
            <button type="button" class="btn btn-outline-danger" @click.prevent="addToCart">
              <i class="fas fa-cart-plus"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-between align-items-baseline mb-3">
        <div class="h4">您可能會喜歡的</div>
        <router-link to="/products" class="btn btn-outline-secondary">
          <i class="fas fa-arrow-left"></i>
          回商品列表
        </router-link>
      </div>

      <div
        class="row"
        :class="{
          'd-none': filterProduct.length==0,
          'single-product':filterProduct.length==1,
          'multiple-product':filterProduct.length>1 && filterProduct.length <= 4,
          'more-product' : filterProduct.length>4
          }"
      >
        <div class="col-sm-6 col-md-3 mb-4" v-for="(item) in filterProduct" :key="item.id">
          <a class="card shadow-sm card-round" @click="getProduct(item.id)">
            <div class="pic" >
              <div
                :style="{backgroundImage :`url(${item.imageUrl})`}"
                class="pic-enlarge"
              ></div>
            </div>
            <div class="card-body">
              <span class="badge badge-secondary mb-2">{{ item.category }}</span>
              <h5 class="card-title">{{ item.title }}</h5>
            </div>
          </a>
        </div>
      </div>
      <div
        class="product-wrap mx-auto"
        :class="{'d-none': filterProduct.length==0,'multiple-swiper':filterProduct.length>1 && filterProduct.length<=4 , 'single-swiper':filterProduct.length==1}"
      >
      <swiper :options="swiperOption">
        <swiper-slide class="p-2" v-for="(item) in filterProduct" :key="item.id">
            <a class="card shadow-sm card-round" @click="getProduct(item.id)">
              <div class="pic" >
                <div
                  :style="{backgroundImage :`url(${item.imageUrl})`}"
                  class="pic-enlarge"
                ></div>
              </div>
              <div class="card-body">
                <span class="badge badge-secondary mb-2">{{ item.category }}</span>
                <h5 class="card-title">{{ item.title }}</h5>
              </div>
            </a>
        </swiper-slide>
      </swiper>
        <div class="swiper-button swiper-button-left fas fa-chevron-circle-left fa-2x text-primary"></div>
        <div class="swiper-button swiper-button-right fas fa-chevron-circle-right fa-2x text-primary"></div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/css/swiper.css'

export default {
  data () {
    return {
      swiperOption: {
        observer: true,
        loop: true,
        observeParents: true,
        slidesPerView: 1,
        breakpoints: {
          540: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          992: {
            slidesPerView: 4
          }
        },
        navigation: {
          nextEl: '.swiper-button-right',
          prevEl: '.swiper-button-left'
        }
      },
      productId: '',
      product: {}
    }
  },
  methods: {
    getProductId (id) {
      const vm = this
      this.$store.dispatch('updataLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$http.get(api).then(res => {
        vm.product = res.data.product
        vm.product.num = 1
        this.$store.dispatch('updataLoading', false)
      })
    },
    addToCart () {
      this.$store.dispatch('addToCart', { id: this.productId, qty: this.product.num })
    },
    getProducts () {
      this.$store.dispatch('getProducts')
    },
    getProduct (id) {
      const vm = this
      vm.$router.push(`/product/${id}`)
      vm.productId = id
      vm.getProductId(id)
    }
  },
  computed: {
    filterProduct () {
      const vm = this
      return vm.products.filter(item => {
        if (item.id !== vm.product.id) {
          return item.category === vm.product.category
        }
      })
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    products () {
      return this.$store.state.products
    }
  },
  created () {
    const vm = this
    vm.productId = vm.$route.params.productId
    vm.getProductId(vm.productId)
    vm.getProducts()
  }
}
</script>
