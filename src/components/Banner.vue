<template>
  <div>
    <div class="swiper-container swiper-banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide banner1"></div>
        <div class="swiper-slide banner2"></div>
        <div class="swiper-slide banner3"></div>
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
