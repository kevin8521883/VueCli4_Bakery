<template>
  <div>
    <footer class="footer text-center py-5 bg-dessert">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 mb-3">
            <div class="h4 pb-3">關於我們</div>
            <ul>
              <li class="h6">
                <a href="https://github.com/kevin8521883/VueCli4_Bakery" class="text-dark h6">關於Bakery</a>
              </li>
              <li class="h6">
                <a href="https://github.com/kevin8521883/VueCli4_Bakery" class="text-dark h6">隱私權政策</a>
              </li>
              <li class="h6">
                <a href="https://github.com/kevin8521883/VueCli4_Bakery" class="text-dark h6">服務條款</a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-4 mb-3">
            <div class="h4 pb-3">關注我們</div>
            <ul>
              <li class="h6">
                <a href="https://github.com/kevin8521883/VueCli4_Bakery" class="text-dark">
                  <i class="fab fa-facebook-square"></i>
                  Facebook
                </a>
              </li>
              <li class="h6">
                <a href="https://github.com/kevin8521883/VueCli4_Bakery" class="text-dark">
                  <i class="fab fa-instagram"></i>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-4 mb-3">
            <div class="h4 pb-3">客服專線</div>
            <ul>
              <li class="h6">
                <i class="fas fa-phone-square-alt"></i>
                01-123-4567
              </li>
              <li class="h6">
                <i class="fab fa-line"></i>
                Bakery1116
              </li>
              <li class="h6">
                <i class="fas fa-envelope"></i>
                Bakery1116@gmail.com
              </li>
              <li class="h6">
                <i class="fas fa-clock"></i>
                週一 ~ 週日 9:00~18:00
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pt-3">
        <router-link to="/login" class="h4 text-dark">
          <i class="fas fa-user-cog"></i>
          管理員登入
        </router-link>
      </div>

      <p class="text-dark mt-3">&copy;資料、圖片來源皆來自網路，僅用來做為學習用途。</p>
    </footer>
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
