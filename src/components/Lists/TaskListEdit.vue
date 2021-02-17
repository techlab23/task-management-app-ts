<template lang="pug">
DetailsPopup(ref="newListPopupRef" v-show="activeBoard" @popup-toggled="handlePopupToggled")
  template(v-slot:handle)
    span(class="nav-item btn btn-sm btn-app mr-2") + New List
  template(v-slot:content)
    VeeForm(ref="listFormRef" v-slot="{ handleSubmit }" :validation-schema="schema" :initial-values="listForm")
      form(@submit="handleSubmit($event, handleTaskListSave)")
        h5 {{ heading }}
        Field( v-model.trim="listForm.name" type="text" name="name" v-slot="{ field }")
          input(v-bind="field" class="form-control my-1" placeholder="Enter your list name")
        ErrorMessage(name="name" class="text-danger" as="p")

        button( class="btn btn-sm btn-app mt-2" type="submit") Save List
</template>

<script lang="ts">
import DetailsPopup from '../Details/DetailsPopup.vue';
import { useStore } from 'vuex';
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { computed, onMounted, ref, defineComponent } from 'vue';
import { Board, List } from '../../types';
import { bus } from '../../utils';

export default defineComponent({
  components: { DetailsPopup, VeeForm, Field, ErrorMessage },
  setup() {
    const newListPopupRef = ref<typeof DetailsPopup>();
    const listFormRef = ref<typeof VeeForm>();
    const listForm = ref({ id: '', name: '' } as List);

    const store = useStore();
    const schema = yup.object({
      name: yup.string().required().label('List name'),
    });
    const activeBoard = computed(() => store.getters.activeBoard as Board);
    const boardName = computed(() =>
      activeBoard ? activeBoard.value.name : ''
    );
    const heading = computed(() =>
      listForm.value.id ? 'Update list name' : 'Create new list'
    );

    function handleTaskListEditing(list: List) {
      listForm.value.id = list.id;
      listForm.value.name = list.name;
      newListPopupRef.value?.open();
    }

    function handlePopupToggled(isOpen: boolean) {
      if (!isOpen) {
        listForm.value.id = '';
        listForm.value.name = '';
        listFormRef.value?.resetForm();
      }
    }

    function handleTaskListSave() {
      store.dispatch('saveTaskList', {
        boardId: activeBoard.value.id,
        listId: listForm.value.id,
        name: listForm.value.name,
      });
      newListPopupRef.value?.close();
      listFormRef.value?.resetForm();
    }

    onMounted(() => bus.on('tasklist-editing', handleTaskListEditing));

    return {
      schema,
      listForm,
      activeBoard,
      boardName,
      heading,
      listFormRef,
      newListPopupRef,
      handleTaskListSave,
      handlePopupToggled,
    };
  },
});
</script>
