<template lang="pug">
div(class="container-fluid")
  div(class="row")
    div(class="col")
      h4(class="my-3") Active Boards
  div(class="row equal")
    div(class="col-xs-12 col-sm-6 col-md-3 d-flex pb-3" v-for="board in unarchivedBoards" :key="board.id")
      div(class="card w-100 board-item")
        div(class="card-body")
          div(class="d-flex justify-content-between")
            h5(class="card-title flex-nowrap") {{ board.name }}
            span(@click="handleTaskBoardEditing(board)") ...
          p(class="card-text") {{ board.description }}
        div(class="card-footer bg-transparent")
          router-link(class="btn btn-sm btn-app mr-2 mb-1" :to="{ name: 'task-board', params: { id: board.id } }") View
          button(class="btn btn-sm btn-danger mb-1" @click="handleArchiveTaskBoard(board)") Archive
  
  div(class="row" v-show="archivedBoards.length > 0")
    div(class="col")
      h4(class="my-3") Archived Boards
  div(class="row equal" v-show="archivedBoards.length > 0")
    div(class="col-xs-12 col-sm-6 col-md-3 d-flex pb-3" v-for="board in archivedBoards" :key="board.id")
      div(class="card w-100 board-item")
        div(class="card-body")
          h5(class="card-title flex-nowrap") {{ board.name }}
            p(class="card-text") {{ board.description }}
        div(class="card-footer bg-transparent text-center")
          button(class="btn btn-sm btn-success" @click="handleRestoreTaskBoard(board)") Restore
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { onMounted, defineComponent, computed } from 'vue';
import { bus } from '../utils';
import { Board } from '../types';

export default defineComponent({
  setup() {
    const store = useStore();
    const unarchivedBoards = computed<Board[]>(
      () => store.getters.unarchivedBoards
    );

    const archivedBoards = computed<Board[]>(
      () => store.getters.archivedBoards
    );

    function handleTaskBoardEditing(board: Board) {
      bus.emit('taskboard-editing', board);
    }

    function handleArchiveTaskBoard(board: Board) {
      store.dispatch('archiveTaskBoard', { boardId: board.id });
    }

    function handleRestoreTaskBoard(board: Board) {
      store.dispatch('restoreTaskBoard', { boardId: board.id });
    }

    // Lifecycle hook
    onMounted(() => {
      store.dispatch('setActiveTaskBoard', { board: null });
    });

    return {
      unarchivedBoards,
      archivedBoards,
      handleRestoreTaskBoard,
      handleArchiveTaskBoard,
      handleTaskBoardEditing,
    };
  },
});
</script>
