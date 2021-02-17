<template lang="pug">
div(class="scrolling-wrapper")
  draggable(v-model="lists" class="row flex-nowrap mt-1" v-bind="dragOptions")
    template(#item="{ element }")
      TaskList(:board="getBoard" :list="element")
</template>

<script lang="ts">
import TaskList from '../components/Lists/TaskList.vue';
import Draggable from 'vuedraggable';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Board, List } from '../types';
export default {
  components: { TaskList, Draggable },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const boards = computed<Board[]>(() => store.getters.allBoards);
    const isLoading = computed<Boolean>(() => store.getters.isLoading);
    const param = computed(() => route.params.id as string);
    const getBoard = computed(() =>
      boards.value.find((b) => b.id == param.value)
    );

    const dragOptions = computed(() => {
      return {
        animation: '200',
        ghostClass: 'ghost',
        handle: '.heading',
        group: 'kanban-board-lists',
      };
    });

    const lists = computed<List[]>({
      get() {
        return getBoard.value
          ? getBoard.value?.lists.filter((l) => !l.archived)
          : [];
      },
      set(value) {
        store.dispatch('reorderTaskLists', {
          boardId: param.value,
          lists: value,
        });
      },
    });

    onMounted(() => {
      if (getBoard.value) {
        store.dispatch('setActiveTaskBoard', {
          board: getBoard.value,
        });
      }
    });

    // disabled: !this.shouldAllowListOrder,
    // function shouldAllowListOrder() {
    //   return this.isDesktop || this.isTablet;
    // }

    //   return this.boards.find((b) => b.id == this.param);
    // },

    return {
      isLoading,
      lists,
      dragOptions,
      getBoard,
    };
  },
};
</script>
