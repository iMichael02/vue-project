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
          <v-btn type="submit" @click="$emit('load-todos')">Save Todo</v-btn>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "EditTodoForm",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ["load-todos"],
  setup(props, emits) {
    const name = ref(props.todo.name);
    const saveTodo = async () => {
      await fetch(`http://localhost:3000/todos/${props.todo.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          id: props.todo.id,
          name: name.value,
          done: props.todo.done,
          deleted: props.todo.deleted,
        }),
      }).catch((err) => {
        console.log("Error while executing saveTodo():");
        console.log(err.message);
      });
      emits.emit("load-todos");
    };
    return { name, saveTodo };
  },
});
</script>
