<template lang="pug">
DetailsPopup(ref="popupRef" style="position: absolute; top: 12px; right: 10px")
  template(v-slot:content v-if="board && list")
    h5 Do you want to archive {{ list?.name }} list?
    button(class="btn btn-sm btn-danger" @click="handleTaskListArchive(list)") Yes, please
</template>

<script lang="ts">
import DetailsPopup from '../Details/DetailsPopup.vue';
import { useStore } from 'vuex';
import { Board, List } from '../../types';
import { onMounted, ref, defineComponent } from 'vue';
import { bus } from '../../utils';

interface BoardListEventData {
  board: Board;
  list: List;
}
export default defineComponent({
  components: { DetailsPopup },
  setup() {
    const store = useStore();
    const board = ref<Board>();
    const list = ref<List>();
    const popupRef = ref<typeof DetailsPopup>();

    function handleTaskListArchive() {
      store.dispatch('archiveTaskList', {
        boardId: board.value?.id,
        listId: list.value?.id,
      });
      popupRef.value?.close();
    }

    function handleTaskListArchiving(data?: BoardListEventData) {
      board.value = data?.board;
      list.value = data?.list;
      popupRef.value?.open();
    }

    onMounted(() => bus.on('tasklist-archiving', handleTaskListArchiving));

    return {
      board,
      list,
      popupRef,
      handleTaskListArchive,
    };
  },
});
</script>
