<template>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';
// import login from './components/Login.vue';
import { mapStores } from 'pinia';
import userModalStores from './stores/modal'

export default {
  data() {
    return {
      message: 'Hello World',
    }
  },
  computed: {
    ...mapStores(userModalStores)
  }
}
</script>