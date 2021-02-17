<template lang="pug">
DetailsPopup(ref="newBoardPopupRef" v-show="!this.activeBoard" @popup-toggled="handlePopupToggled")
  template(v-slot:handle)
    span(class="nav-item btn btn-sm btn-app mr-2") + New Board
  template(v-slot:content)
    VeeForm(ref="boardFormRef" v-slot="{ handleSubmit }" :validation-schema="schema" :initial-values="boardForm")
      form(@submit="handleSubmit($event, handleSaveBoard)")
        h4 {{ heading }}
        Field(v-model="boardForm.name" type="text" name="name" v-slot="{ field }")
          input(v-bind="field" placeholder="Enter your board name" class="form-control my-1")
        ErrorMessage(name="name" class="text-danger" as="p")
        Field(v-model="boardForm.description" type="text" name="description" v-slot="{ field }")
          textarea(v-bind="field" rows="2" class="form-control my-1" placeholder="Enter your board description")
        ErrorMessage(name="description" class="text-danger" as="p")

        button(class="btn btn-sm btn-app mt-2" type="submit") Save Board
</template>
<script lang="ts">
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import DetailsPopup from '../Details/DetailsPopup.vue';
import { useStore } from 'vuex';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { bus } from '../../utils';
import { Board } from '../../types';

export default defineComponent({
  components: {
    DetailsPopup,
    VeeForm,
    Field,
    ErrorMessage,
  },
  setup() {
    // Data Vars
    const newBoardPopupRef = ref<typeof DetailsPopup>();
    const boardFormRef = ref<typeof VeeForm>();
    const store = useStore();
    // Validation Schema
    const schema = yup.object({
      name: yup.string().required().label('Board name'),
      description: yup.string().required().label('Board description'),
    });
    const boardForm = ref({ id: '', name: '', description: '' });

    // Computeds
    const activeBoard = computed(() => store.getters.activeBoard);
    const heading = computed(() =>
      boardForm.value.id ? 'Update board information' : 'Create new board'
    );

    // Methods
    function handleTaskBoardEditing(board: Board) {
      boardForm.value.id = board.id;
      boardForm.value.name = board.name;
      boardForm.value.description = board.description;
      newBoardPopupRef.value?.open();
    }

    function handlePopupToggled(isOpen: boolean) {
      if (!isOpen) {
        boardForm.value.id = '';
        boardForm.value.name = '';
        boardForm.value.description = '';
        boardFormRef.value?.resetForm();
      }
    }

    function handleSaveBoard() {
      store.dispatch('saveTaskBoard', { ...boardForm.value });
      newBoardPopupRef.value?.close();
    }

    // Lifecycle hooks
    onMounted(() => bus.on('taskboard-editing', handleTaskBoardEditing));

    return {
      schema,
      boardForm,
      newBoardPopupRef,
      boardFormRef,
      handlePopupToggled,
      handleSaveBoard,
    };
  },
});
</script>
