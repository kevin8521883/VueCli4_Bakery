<template>
  <div class="sticky-top">
    <nav class="navbar navbar-expand-lg bg-white border-bottom">
      <div class="container">
        <router-link to="/">
          <img src="https://upload.cc/i1/2020/07/11/WCPqay.png" alt height="40" />
          <h1 class="sr-only">Backery</h1>
        </router-link>
        <button
          class="navbar-toggler navbar-toggle-bar"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link header-navbtn text-center" to="/introduce">甜點故事</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link header-navbtn text-center" to="/products">商品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link header-navbtn text-center" to="/favorite">我的最愛</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link header-navbtn text-center" to="/coupons">優惠活動</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
