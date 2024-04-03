<template>
  <Menubar :model="navBarMenu">
    <template #start>
      <NuxtLink to="/">
        <img src="/images/logo.svg" width="75" alt="Logo" srcset=""
      /></NuxtLink>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <NuxtLink
        v-ripple
        class="flex align-items-center"
        v-bind="props.action"
        :to="item.to"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge
          v-if="item.badge"
          :class="{ 'ml-auto': !root, 'ml-2': root }"
          :value="item.badge"
        />
        <span
          v-if="item.shortcut"
          class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          :class="[
            'pi pi-angle-down',
            { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
          ]"
        ></i>
      </NuxtLink>
    </template>

    <template #end>
      <div class="flex align-items-center gap-2">
        <Avatar
          style="cursor: pointer"
          class="mr-3"
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
          size="large"
          @click="toggle"
        />

        <Menu ref="menu" :model="profileMenu" id="overlay_menu" :popup="true">
          <template #item="{ item, props }">
            <router-link
              v-if="item.route"
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
            >
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a
              v-else
              v-ripple
              :href="item.url"
              :target="item.target"
              v-bind="props.action"
            >
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </div>
    </template>
  </Menubar>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const menu = ref();

const navBarMenu = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    to: "/",
  },
  {
    label: "Features",
    icon: "pi pi-star",
    to: "/features",
  },

  {
    label: "Contact",
    icon: "pi pi-envelope",
    badge: 3,
    to: "/contact",
  },
]);

const profileMenu = ref([
  {
    label: "Profile",
    icon: "pi pi-user",
    route: "/profile",
  },
  {
    label: "sign out",
    icon: "pi pi-sign-out",
    command: async () => {
      userStore.logout();
    },
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
