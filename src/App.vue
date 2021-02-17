<template lang="pug">
div(id="app" class="container-fluid")
  AppHeader
  transition(name="page" mode="out-in" v-if="!isLoading")
    router-view
  AppLoadingIndicator(v-if="isLoading")
</template>

<script lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppLoadingIndicator from './components/AppLoadingIndicator.vue';
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  components: { AppHeader, AppLoadingIndicator },
  setup() {
    const store = useStore();
    store.dispatch('fetchData');
    const isLoading = computed<boolean>(() => store.getters.isLoading);
    return {
      isLoading,
    };
  },
});
</script>

<style>
body {
  background-color: rgba(72, 163, 184, 0.05) !important;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
