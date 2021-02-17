<template lang="pug">
details(class="popup" ref="detailsRef" v-on:toggle="popupToggled()")
  summary
    slot(name="handle")
  div
    slot(name="content") Put your contents here
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useDetails from './details';

export default defineComponent({
  setup(_, context) {
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

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

details.popup div {
  position: fixed;
  top: 50%;
  left: 50%;
  animation: fadein 200ms ease-in-out;
  transform: translate(-50%, -50%);
  max-height: calc(100vh - 80px);
  max-width: 600px;
  width: calc(100% - 80px);
  overflow-y: auto;
  z-index: 999;
  color: #000;
  background-color: #fff;
  padding: 20px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

details[open].popup summary:before {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: fadein 200ms ease-in-out;
  cursor: default;
  content: '';
  z-index: 99;
  background: rgba(27, 31, 35, 0.5);
}
</style>
