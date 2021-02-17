<template lang="pug">
DetailsDropdown(ref="dropdownRef" style="position: absolute; top: 12px; right: 10px")
  template(v-slot:handle) ...
  template(v-slot:content)
    label(class="content-item" @click="showListEditPopup") Edit
    label(class="content-item" @click="showArchiveListPopup") Archive
</template>

<script lang="ts">
import { PropType, ref, defineComponent } from 'vue';
import { Board, List } from '../../types';
import { bus } from '../../utils';
import DetailsDropdown from '../Details/DetailsDropdown.vue';
export default defineComponent({
  components: { DetailsDropdown },
  props: {
    board: {
      type: Object as PropType<Board>,
      required: true,
    },
    list: {
      type: Object as PropType<List>,
      required: true,
    },
  },

  setup(props) {
    const dropdownRef = ref<typeof DetailsDropdown>();

    function showListEditPopup() {
      bus.emit('tasklist-editing', props.list);
      dropdownRef.value?.close();
    }

    function showArchiveListPopup() {
      bus.emit('tasklist-archiving', {
        board: props.board,
        list: props.list,
      });
      dropdownRef.value?.close();
    }

    return {
      dropdownRef,
      showListEditPopup,
      showArchiveListPopup,
    };
  },
});
</script>
