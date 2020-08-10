<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      // messages: []
    }
  },
  methods: {
    // updateMessage (message, status) {
    //   const vm = this
    //   const timestamp = Math.floor(new Date() / 1000)
    //   vm.messages.push({
    //     message,
    //     status,
    //     timestamp
    //   })
    //   vm.removeMessageWithTiming(timestamp)
    // },
    removeMessage (num) {
      this.$store.dispatch('removeMessage', num)
    }
    // removeMessageWithTiming (timestamp) {
    //   const vm = this
    //   setTimeout(() => {
    //     vm.messages.forEach((item, i) => {
    //       if (item.timestamp === timestamp) {
    //         vm.messages.splice(i, 1)
    //       }
    //     })
    //   }, 3000)
    // }
  },
  // created () {
  //   const vm = this
  //   vm.$bus.$on('message:push', (message, status = 'warning') => {
  //     vm.updateMessage(message, status)
  //   })
  // },
  computed: {
    messages () {
      return this.$store.state.messages
    }
  }
}
</script>
