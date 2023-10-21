<template>
  <div class="edit-todo-form">
    <v-sheet
      class="bg-grey-lighten-1 pa-10 rounded-xl elevation-24"
      width="400"
    >
      <h3>Todo #{{ todo.id }}</h3>
      <form @submit.prevent="saveTodo()">
        <v-card>
          <v-text-field
            v-model="name"
            label="Name"
            hint="Enter todo name"
            id="name"
          />
        </v-card>
        <div class="d-flex justify-center align-center mt-5">
          <v-btn type="submit">Save Todo</v-btn>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Todo } from "@/models/Todo";
import { EditTodoFormPresenter } from "@/presenters/EditTodoFormPresenter";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "EditTodoForm",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    todos: {
      type: Array<{ id: number; name: string; done: boolean }>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:todos"],
  setup(props) {
    const name = ref(props.todo.name);
    const presenter = ref();
    return { name, presenter };
  },
  mounted() {
    this.presenter = new EditTodoFormPresenter(this, this.model);
  },
  computed: {
    model() {
      return new Todo(this.todo.id, this.name, false);
    },
  },
  watch: {
    model() {
      this.presenter.setModel(this.model);
    },
  },
  methods: {
    saveTodo() {
      this.presenter.updateTodo();
      this.$emit("update:todos", this.todos);
    },
  },
});
</script>
