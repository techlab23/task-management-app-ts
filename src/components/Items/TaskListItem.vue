<template lang="pug">
div(v-if="!isEditing" class="card tasklist-item"  @click.prevent="startEditing")
  div(class="card-body")
    div(:class="[ isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']")
      span {{ displayText }}

div(v-else class="card")
  div(class="card-body")
    VeeForm(ref="taskFormRef" v-slot="{ handleSubmit }" :validation-schema="schema" :initial-values="form")
      form(class="form" @submit="handleSubmit($event, save)")
        div(class="form-group")
          Field(v-model.trim="form.text" type="text" name="text" v-slot="{ field }")
            textarea(v-bind="field" rows="3" class="form-control" placeholder="Your item description")
          ErrorMessage(name="text" class="text-danger" as="p")
        div(:class="[isNewItem ? 'text-center' : 'd-flex justify-content-between', 'form-group']")
          button(class="btn btn-outline-secondary btn-sm mr-2") Save
          button(class="btn btn-outline-secondary btn-sm" @click.prevent="cancel") Cancel
          div(v-show="!isNewItem")
            button(class="btn btn-sm text-danger" @click.prevent="remove") Delete
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { computed, PropType, ref, defineComponent } from 'vue';
import { Board, Item, List } from '../../types';
import { bus } from '../../utils';

export default defineComponent({
  components: { VeeForm, Field, ErrorMessage },
  props: {
    board: {
      type: Object as PropType<Board>,
      required: true,
    },
    list: {
      type: Object as PropType<List>,
      required: true,
    },
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const taskFormRef = ref<typeof VeeForm>();
    const isEditing = ref(false);
    const form = ref<Item>({ id: '', text: '' });
    const isNewItem = computed(() => props.item.id == '');
    const displayText = computed(() =>
      isNewItem.value ? '+ New Item' : props.item.text
    );
    // Validation Schema
    const schema = yup.object({
      text: yup.string().required().label('Task'),
    });

    function startEditing() {
      form.value.id = props.item.id;
      form.value.text = props.item.text;
      isEditing.value = true;
      bus.emit('item-editing');
    }

    function clearForm() {
      form.value.id = '';
      form.value.text = '';
    }

    function save(value) {
      const updatedItem = {
        id: form.value.id,
        text: form.value.text,
      };

      store.dispatch('saveTaskListItem', {
        boardId: props.board.id,
        listId: props.list.id,
        item: updatedItem,
      });

      isEditing.value = false;
      bus.emit('item-edited');
      taskFormRef.value?.resetForm();
    }

    function cancel() {
      isEditing.value = false;
      bus.emit('item-cancelled');
    }

    function remove() {
      store.dispatch('deleteTaskListItem', {
        boardId: props.board.id,
        listId: props.list.id,
        item: props.item,
      });
      isEditing.value = false;
      bus.emit('item-cancelled');
    }

    return {
      schema,
      taskFormRef,
      isNewItem,
      displayText,
      isEditing,
      form,
      startEditing,
      save,
      cancel,
      remove,
    };
  },
});
</script>
