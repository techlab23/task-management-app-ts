<template lang="pug">
DetailsPopup(ref="restoreListpopupRef" v-show="activeBoard")
  template(v-slot:handle)
    span(class="nav-item btn btn-sm btn-app mr-2") Archived Lists ({{ archivedLists.length }})
  template(v-slot:content)
    h5 Restore your lists for {{ boardName }}
      ul.mt-3(class="list-group mb-2")
        li(v-for="list in archivedLists" :key="list.id" class="list-group-item d-flex justify-content-between align-items-center")
          label {{ list.name }} 
            small ({{ list.items.length }} items)
          button(class="btn btn-sm btn-success" @click="handleTaskListRestore(list)") Restore
        li(class="list-group-item" v-show="archivedLists.length == 0") Nothing to restore

      button(class="btn btn-sm btn-app" @click="close") Done
</template>

<script lang="ts">
import DetailsPopup from '../Details/DetailsPopup.vue';
import { useStore } from 'vuex';
import { Board, List } from '../../types';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  components: { DetailsPopup },
  setup() {
    const store = useStore();
    const restoreListpopupRef = ref<typeof DetailsPopup>();
    const activeBoard = computed<Board>(
      () => store.getters.activeBoard as Board
    );
    const archivedLists = computed<List[]>(
      () => store.getters.archivedLists as List[]
    );
    const boardName = computed<string>(() => activeBoard.value?.name || '');

    function handleTaskListRestore(list: List) {
      store.dispatch('restoreTaskList', {
        boardId: activeBoard.value?.id,
        listId: list.id,
      });
    }

    function close() {
      restoreListpopupRef.value?.close();
    }

    return {
      activeBoard,
      boardName,
      restoreListpopupRef,
      archivedLists,
      handleTaskListRestore,
      close,
    };
  },
});
</script>
