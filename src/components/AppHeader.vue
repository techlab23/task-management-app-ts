<template lang="pug">
nav(class="navbar navbar-light bg-faded")
  router-link(to="/" class="navbar-brand")
    label Kanban Board
      span(class="text-uppercase" v-show="this.activeBoard") : {{ boardName }}
  div(class="d-flex justify-content-end" v-if="!isLoading")
    TaskListRestore
    TaskListEdit
    TaskBoardEdit
    TaskListArchive
</template>
<script lang="ts">
import TaskBoardEdit from './Boards/TaskBoardEdit.vue';
import TaskListEdit from './Lists/TaskListEdit.vue';
import TaskListRestore from './Lists/TaskListRestore.vue';
import TaskListArchive from './Lists/TaskListArchive.vue';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { Board } from '../types';
export default defineComponent({
  components: { TaskBoardEdit, TaskListEdit, TaskListRestore, TaskListArchive },
  setup() {
    const store = useStore();
    const activeBoard = computed<Board>(() => store.getters.activeBoard);
    const isLoading = computed<boolean>(() => store.getters.isLoading);
    const boardName = computed<string>(() => activeBoard.value?.name || '');
    return {
      boardName,
      activeBoard,
      isLoading,
    };
  },
});
</script>
