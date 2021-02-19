<template lang="pug">
h1 Hello {{ name }}
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const name = ref('')
    name.value = 'World'

    return {
      name,
    }
  },
})
</script>
