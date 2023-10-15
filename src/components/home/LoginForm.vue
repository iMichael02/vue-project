<template>
  <div
    class="login-form-wrapper bg-grey-lighten-2 px-16 py-10 rounded-xl w-100"
  >
    <v-btn icon="mdi-arrow-left" color="grey-lighten-1" @click="back"></v-btn>
    <v-sheet class="login-form-container bg-grey-lighten-2" width="300">
      <form
        action=""
        id="login-form"
        @submit.prevent="onSubmit"
        class="pt-5 w-100"
      >
        <div class="field w-100">
          <v-text-field
            label="Username"
            hint="Enter your username"
            @input="changeUsername"
            id="username"
          />
        </div>
        <div class="field">
          <v-text-field
            label="Password"
            type="password"
            hint="Enter your password"
            @input="changePassword"
            id="password"
          />
        </div>
        <div class="field d-flex justify-center align-center">
          <v-btn
            type="submit"
            class="auth-submit-button bg-teal-lighten-1 rounded-xl px-16"
          >
            Login
          </v-btn>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { mapMutations } from "vuex";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "LoginForm",
  props: {
    registerChosen: Boolean,
    username: String,
    password: String,
    back: Function,
    loginSuccess: Boolean,
  },
  setup() {
    const usernameInput = ref("");
    const passwordInput = ref("");
    const changeUsername = (e: InputEvent) => {
      let inputElement = e.target as HTMLInputElement;
      usernameInput.value = inputElement.value;
    };
    const changePassword = (e: InputEvent) => {
      let inputElement = e.target as HTMLInputElement;
      passwordInput.value = inputElement.value;
    };
    return {
      usernameInput,
      passwordInput,
      changeUsername,
      changePassword,
    };
  },
  methods: {
    ...mapMutations(["login"]),
    onSubmit(e: Event) {
      e.preventDefault();
      this.$emit("update:username", this.usernameInput);
      this.$emit("update:password", this.passwordInput);
      this.$emit("update:login-success", true);
      this.$emit("update:login-chosen", false);
      this.login();
      this.redirect();
    },
    redirect() {
      this.$router.push({ name: "todos" });
    },
  },
});
</script>
