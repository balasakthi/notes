<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img
        src="/images/logo.svg"
        alt="Notes logo"
        class="mb-5 w-6rem flex-shrink-0"
      />
      <form @submit.prevent="handleLogin()">
        <div>
          <div
            class="w-full surface-card py-8 px-5 sm:px-8"
            style="border-radius: 53px"
          >
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-3">Notes</div>
              <span class="text-600 font-medium">Sign in to continue</span>
            </div>

            <div>
              <label class="block text-900 text-xl font-medium mb-2"
                >Email</label
              >
              <InputText
                type="email"
                placeholder="example@domain.com"
                class="w-full md:w-30rem mb-5"
                style="padding: 1rem"
                v-model="email"
                required
              />

              <label class="block text-900 font-medium text-xl mb-2"
                >Password</label
              >
              <Password
                v-model="password"
                placeholder="Password"
                :toggleMask="true"
                class="w-full mb-3"
                inputClass="w-full"
                :inputStyle="{ padding: '1rem' }"
                :feedback="false"
                required
              ></Password>

              <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
              >
                <div class="flex align-items-center">
                  <Checkbox v-model="checked" binary class="mr-2"></Checkbox>
                  <label>Remember me</label>
                </div>
                <a
                  class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
                  >Forgot password?</a
                >
              </div>
              <div v-if="userStore.error">
                <p class="text-red-600">{{ userStore.error }}</p>
              </div>
              <Button
                type="submit"
                label="Sign In"
                class="w-full p-3 text-xl"
                :loading="isLoading"
              ></Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const checked = ref(false);
const isLoading = ref(false);

const emits = defineEmits(["success"]);

const handleLogin = async () => {
  await userStore.signIn({
    email: email.value,
    password: password.value,
  });

  emits("success");
};
</script>

<style scoped></style>
