<template>
  <div class="add-todo-form">
    <v-sheet
      class="bg-grey-lighten-1 pa-10 rounded-xl elevation-24"
      width="400"
    >
      <h3>Todo #{{ newId }}</h3>
      <form action="" @submit.prevent="newTodo">
        <v-card>
          <v-text-field
            v-model="name"
            label="Name"
            hint="Enter todo name"
            id="name"
          />
        </v-card>
        <div class="d-flex justify-center align-center mt-5">
          <v-btn type="submit">Add Todo</v-btn>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Todo } from "@/models/Todo";
import { AddTodoFormPresenter } from "@/presenters/AddTodoFormPresenter";
export default defineComponent({
  name: "AddTodoForm",
  props: {
    newId: {
      type: Number,
      required: true,
    },
    todos: {
      type: Array<{ id: number; name: string; done: boolean }>,
      required: true,
    },
  },
  emits: ["update:todos"],
  setup() {
    const name = ref("");
    const presenter = ref();
    return { name, presenter };
  },
  mounted() {
    this.presenter = new AddTodoFormPresenter(this, this.todo);
  },
  computed: {
    todo(): Todo {
      return new Todo(this.newId, this.name, false);
    },
  },
  watch: {
    todo() {
      this.presenter.setModel(this.todo);
    },
  },
  methods: {
    newTodo() {
      this.presenter.newTodo();
      this.$emit("update:todos", this.todos);
    },
  },
});
</script>
