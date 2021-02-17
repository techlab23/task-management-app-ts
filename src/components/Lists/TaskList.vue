<template lang="pug">
div(class="col-3 list-column list-width")
  div(class="heading" :style="{ backgroundColor: list.headerColor }")
    h4(class="heading-text text-center") {{ list.name }}
    TaskListActions(:board="board" :list="list")

  div(class="cards cards-list")
    draggable(v-model="items" v-bind="dragOptions" :item-key="id")
      template(#item="{ element }")
        TaskListItem(:item="element" :list="list" :board="board" @item-edited="itemEdited" @item-cancelled="itemCancelled" @item-editing="itemEditing")
    TaskListItem(:item="defaultItem" :list="list" :board="board" class="fixed-card" @item-edited="itemEdited" @item-cancelled="itemCancelled" @item-editing="itemEditing")
</template>
<script lang="ts">
import Draggable from 'vuedraggable';
import TaskListActions from './TaskListActions.vue';
import TaskListItem from '../Items/TaskListItem.vue';
import { useStore } from 'vuex';
import { computed, PropType, ref, defineComponent } from 'vue';
import { Board, Item, List } from '../../types';

export default defineComponent({
  components: { TaskListItem, TaskListActions, Draggable },
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
    const store = useStore();
    const isEditing = ref(false);
    const defaultItem = ref<Item>({ id: '', text: '' });
    const dragOptions = computed(() => {
      return {
        animation: 200,
        ghostClass: 'ghost',
        group: 'kanban-board-list-items',
      };
    });

    // disabled: this.isEditing || !this.shouldAllowTaskItemsReorder,
    // function shouldAllowTaskItemsReorder() {
    //   return this.isDesktop || this.isTablet;
    // },

    const items = computed<Item[]>({
      get() {
        return props.list.items;
      },
      set(reorderedListItems) {
        const payload = {
          boardId: props.board.id,
          listId: props.list.id,
          items: reorderedListItems,
        };
        store.dispatch('reorderTaskListItems', payload);
      },
    });

    function itemEditing() {
      isEditing.value = true;
    }
    function itemEdited() {
      isEditing.value = false;
    }
    function itemCancelled() {
      isEditing.value = false;
    }

    return {
      isEditing,
      defaultItem,
      items,
      itemEditing,
      itemEdited,
      itemCancelled,
      dragOptions,
    };
  },
});
</script>
