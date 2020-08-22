<template>
  <div class="d-flex flex-column min-height">
    <UserHeader></UserHeader>
    <Alert></Alert>
    <router-view></router-view>
    <Cart></Cart>
    <UserFooter class="mt-auto"></UserFooter>
  </div>
</template>
<script>
import UserHeader from '@/views/User/UserHeader'
import UserFooter from '@/views/User/UserFooter'
import Cart from '@/views/User/Cart'
import Alert from '@/components/Alert'
export default {
  data () {
    return {}
  },
  components: {
    UserHeader,
    UserFooter,
    Cart,
    Alert
  }
}
</script>
