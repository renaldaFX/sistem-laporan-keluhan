<template>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';
import { mapWritableState } from 'pinia';
import { auth } from './firebase/firebase'
import { useUserStore } from './stores/user'

export default {
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>