<template>
  Profile
  <pre>{{ userStore.user }}</pre>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

definePageMeta({
  middleware: "auth",
});
</script>
