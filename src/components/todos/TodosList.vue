<template>
  <v-sheet class="bg-grey-lighten-2 rounded-xl" width="500">
    <div v-if="todosLoaded">
      <v-list lines="one" class="bg-grey-lighten-2 rounded-xl">
        <v-list-item v-for="todo in displayedTodos" :key="todo.id" class="px-5">
          <v-card class="d-flex align-center px-3 my-2">
            <v-checkbox
              density="compact"
              v-if="todo.done"
              v-model="todo.done"
              color="teal-darken-3"
              @update:model-value="updateTodo(todo)"
            >
              <template v-slot:label>
                <span
                  class="text-h6 text-decoration-line-through text-teal-darken-2"
                >
                  {{ todo.name }}
                </span>
              </template>
            </v-checkbox>
            <v-checkbox
              density="compact"
              v-else
              v-model="todo.done"
              color="black"
              @update:model-value="updateTodo(todo)"
            >
              <template v-slot:label>
                <span class="text-h6">{{ todo.name }}</span>
              </template>
            </v-checkbox>
            <v-btn
              @click="
                {
                  showEditForm = true;
                  todoItem = todo;
                }
              "
              class="ml-3 mb-4 text-h7 bg-grey-lighten-5"
              icon="mdi-pencil"
            ></v-btn>
            <v-btn
              @click="removeTodo(todo)"
              class="ml-3 mb-4 text-h7 bg-grey-lighten-5"
              icon="mdi-trash-can"
            ></v-btn>
          </v-card>
        </v-list-item>
      </v-list>
      <v-pagination
        v-model="page"
        :length="length"
        rounded="circle"
        class="pagination"
      ></v-pagination>
    </div>
    <h3 v-else>No Todos Found</h3>
    <div class="d-flex justify-center align-center">
      <v-btn
        @click="showTodoForm = true"
        prepend-icon="mdi-plus"
        class="rounded-xl ma-5"
      >
        Add More Todo
      </v-btn>
      <v-checkbox
        v-model="showCompleted"
        density="compact"
        label="Show Completed"
        class="d-inline-flex flex-row-reverse mr-5"
        @update:model-value="loadTodos"
      ></v-checkbox>
    </div>
    <v-overlay
      v-model="showTodoForm"
      contained
      class="align-center justify-center"
    >
      <AddTodoForm :new-id="newId" @load-todos="loadTodos" />
    </v-overlay>
    <v-overlay
      v-model="showEditForm"
      contained
      class="align-center justify-center"
    >
      <EditTodoForm :todo="todoItem" @load-todos="loadTodos" />
    </v-overlay>
  </v-sheet>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { defineComponent, ref } from "vue";
import AddTodoForm from "./AddTodoForm.vue";
import EditTodoForm from "./EditTodoForm.vue";
import { computed } from "vue";
export default defineComponent({
  name: "TodosList",
  setup() {
    const todos = ref([{ id: Number, name: String, done: Boolean }]);
    const todosLoaded = ref(false);
    const todoItem = ref();
    const showTodoForm = ref(false);
    const showEditForm = ref(false);
    const showCompleted = ref(false);
    const filteredTodos = computed(() => {
      return showCompleted.value
        ? todos.value
        : todos.value.filter((todo) => !todo.done);
    });
    const displayedTodos = computed(() => {
      let todosCopy = filteredTodos.value.slice();
      let pageIndex = page.value > 0 ? page.value : 1;
      let start = (pageIndex - 1) * 4;
      let end = pageIndex * 4;
      return todosCopy.splice(start, end);
    });
    const page = ref(1);
    const length = computed(() => {
      return Math.ceil(filteredTodos.value.length / 4);
    });
    const newId = ref();
    onMounted(() => {
      loadTodos();
    });
    const loadTodos = async () => {
      await fetch("http://localhost:3000/todos")
        .then((res) => res.json())
        .then((data) => {
          todos.value = data;
          todosLoaded.value = true;
          newId.value = findNewId();
        })
        .catch((err) => console.log(err.message));
      if (displayedTodos.value.length === 0) {
        page.value--;
      }
    };
    const findNewId = () => {
      let max = Number(todos.value[0].id);
      for (let i = 0; i < todos.value.length - 1; i++) {
        if (todos.value[i].id < todos.value[i + 1].id) {
          max = Number(todos.value[i + 1].id);
        }
      }
      return max + 1;
    };
    const data = ref({});
    const updateTodo = async (todo: any) => {
      data.value = {
        id: todo.id,
        name: todo.name,
        done: todo.done,
        deleted: todo.deleted,
      };
      await fetch(`http://localhost:3000/todos/${todo.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data.value),
      });
      loadTodos();
    };
    const removeTodo = async (todo: any) => {
      todos.value = todos.value.filter((t) => t !== todo);
      await fetch(`http://localhost:3000/todos/${todo.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      loadTodos();
    };
    return {
      todos,
      todosLoaded,
      todoItem,
      showTodoForm,
      showEditForm,
      showCompleted,
      filteredTodos,
      displayedTodos,
      page,
      length,
      newId,
      loadTodos,
      updateTodo,
      removeTodo,
    };
  },
  components: { AddTodoForm, EditTodoForm },
});
</script>
