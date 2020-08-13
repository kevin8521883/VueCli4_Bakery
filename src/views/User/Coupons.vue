<template>
  <div>
    <div class="container my-5">
      <div class="h2 text-center pb-5">
        <span class="page-title">優惠活動</span>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3" data-aos="fade-up">
          <div class="coupon d-flex">
            <div class="left">
              <div class="h-100 d-flex justify-content-center align-items-center">
                <i class="far fa-copy fa-2x cobyCoupon" data-clipboard-action="copy" data-clipboard-text="sohot" @click="copyCoupon('暑期也優惠')"></i>
              </div>
            </div>
            <div class="right d-flex flex-column justify-content-center align-items-center">
              <div class="h3 m-2">暑期也優惠</div>
              <div class="h6">結帳輸入優惠碼：sohot</div>
              <div class="h6">即享6.5折限時優惠</div>
              <div class="h6">優惠截止日期：2020/9/1</div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3" data-aos="fade-up">
          <div class="coupon d-flex">
            <div class="left">
              <div class="h-100 d-flex justify-content-center align-items-center">
                <i class="far fa-copy fa-2x cobyCoupon" data-clipboard-action="copy" data-clipboard-text="1010" @click="copyCoupon('沒事享優惠')"></i>
              </div>
            </div>
            <div class="right d-flex flex-column justify-content-center align-items-center">
              <div class="h3 m-2">沒事享優惠</div>
              <div class="h6">結帳輸入優惠碼：1010</div>
              <div class="h6">即享7折限時優惠</div>
              <div class="h6">優惠截止日期：2021/1/1</div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3" data-aos="fade-up">
          <div class="coupon d-flex">
            <div class="left">
              <div class="h-100 d-flex justify-content-center align-items-center">
                <i class="far fa-copy fa-2x cobyCoupon" data-clipboard-action="copy" data-clipboard-text="123" @click="copyCoupon('歡慶店開幕')"></i>
              </div>
            </div>
            <div class="right d-flex flex-column justify-content-center align-items-center">
              <div class="h3 m-2">歡慶店開幕</div>
              <div class="h6">結帳輸入優惠碼：123</div>
              <div class="h6">即享8折限時優惠</div>
              <div class="h6">優惠截止日期：2021/1/1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
export default {
  data () {
    return {}
  },
  methods: {
    copyCoupon (couponTitle) {
      const vm = this
      const clipboard = new Clipboard('.cobyCoupon')
      clipboard.on('success', function () {
        vm.$store.dispatch('updateMessage', { message: `已複製優惠券：${couponTitle}`, status: 'success' })
        clipboard.destroy()
      })
      clipboard.on('error', function () {
        vm.$store.dispatch('updateMessage', { message: '複製失敗請手動複製', status: 'danger' })
        clipboard.destroy()
      })
    }
  }
}
</script>
