<template>
  <div id="app" class="container-fluid">
    <AppHeader></AppHeader>
    <transition name="page" mode="out-in" v-if="!isLoading">
      <router-view></router-view>
    </transition>
    <AppLoadingIndicator v-if="isLoading"></AppLoadingIndicator>
  </div>
</template>

<script lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppLoadingIndicator from './components/AppLoadingIndicator.vue';
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppLoadingIndicator,
  },
  beforeCreate() {
    this.$store.dispatch('fetchData');
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
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
