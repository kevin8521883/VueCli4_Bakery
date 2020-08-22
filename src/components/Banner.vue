<template>
  <div>
    <div class="swiper-container swiper-banner">
      <div class="swiper-wrapper">
        <router-link to='/products' class="swiper-slide banner1 d-flex align-items-center justify-content-center text-decoration-none">
          <div class="banner-link w-75 text-center text-white p-5">
            <h2>美味餅乾</h2>
             <router-link to="/products" class="banner-btn mt-3 py-2 px-5 btn btn-primary border-0">了解更多</router-link>
          </div>
        </router-link>
        <router-link to='/products' class="swiper-slide banner2 d-flex align-items-center justify-content-center text-decoration-none">
          <div class="banner-link w-75 text-center text-white p-5">
            <h2>造型蛋糕</h2>
            <router-link to="/products" class="banner-btn mt-3 py-2 px-5 btn btn-primary border-0">了解更多</router-link>
          </div>
        </router-link>
        <router-link to='/products' class="swiper-slide banner3 d-flex align-items-center justify-content-center text-decoration-none">
          <div class="banner-link w-75 text-center text-white p-5">
            <h2>創意甜點</h2>
            <router-link to="/products" class="banner-btn mt-3 py-2 px-5 btn btn-primary border-0">了解更多</router-link>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  mounted () {
    /* eslint-disable no-new */
    new Swiper('.swiper-banner', {
      direction: 'horizontal',
      loop: true,
      effect: 'fade',
      speed: 1500,
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  }
}
</script>
