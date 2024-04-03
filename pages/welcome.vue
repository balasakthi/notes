<template>
  <LoginForm @success="navigateTo('/')" />
</template>

<script setup>
definePageMeta({
  layout: "userauth",
  middleware: "already-auth",
});
</script>
