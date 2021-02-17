<template lang="pug">
details(class="inline" ref="detailsRef" v-on:toggle="popupToggled()")
  summary
    slot(name="handle")
  div
    slot(name="content") Put your contents here
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useDetails from './details';

export default defineComponent({
  setup(props, context) {
    const { open, close, detailsRef, popupToggled } = useDetails(context);

    return {
      open,
      close,
      popupToggled,
      detailsRef,
    };
  },
});
</script>
<style scope>
/* Experimental : Details implementation */
details.popup summary {
  outline: none;
  cursor: pointer;
  display: inline-block;
}

details.popup summary::-webkit-details-marker {
  display: none;
}
</style>
