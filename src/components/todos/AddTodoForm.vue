<template>
  <div class="add-todo-form">
    <v-sheet
      class="bg-grey-lighten-1 pa-10 rounded-xl elevation-24"
      width="400"
    >
      <h3>Todo #{{ newId }}</h3>
      <form action="" @submit.prevent="addTodo">
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
export default defineComponent({
  name: "AddTodoForm",
  props: {
    newId: Number,
  },
  setup(props) {
    const name = ref("");
    const data = ref({});
    const addTodo = () => {
      data.value = {
        id: props.newId,
        name: name.value,
        done: false,
      };
      console.log(JSON.stringify(data.value));
      fetch("http://localhost:3000/todos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data.value),
      });
    };
    return { name, addTodo };
  },
});
</script>
