<template>
  <Modal
    v-if="showModal"
    :isOpen="showModal"
    :note="selectedNote"
    @closed="onModalClosed"
  ></Modal>

  <div class="grid m-0">
    <div class="col-12 md:col-4 lg:col-3 xl:col-2 p-5">
      <Menu :model="items" />
    </div>

    <div class="col-12 md:col-8 lg:col-9 xl:col-10 p-5">
      <div class="flex justify-content-end">
        <div class="formgroup-inline">
          <div class="field">
            <InputText
              id="search"
              type="text"
              placeholder="Search"
              v-model="searchQuery"
            />
          </div>
          <Button
            @click="handleNewNote"
            label="New Note"
            icon="pi pi-plus-circle"
            rounded
          ></Button>
        </div>
      </div>

      <div class="grid pt-5">
        <div
          class="col-12 md:col-6 lg:col-4 xl:col-3"
          v-for="(notes, index) in filteredNotes"
          :key="index"
        >
          <Card
            class="mb-5"
            style="cursor: pointer"
            @click="handleUpdateNote(notes)"
          >
            <template #title>{{ notes.title }}</template>
            <template #content>
              <p class="m-0" v-html="notes.content"></p>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const showModal = ref(false);
const selectedNote = ref(false);
const searchQuery = ref("");

import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const apiToken = userStore.token;

function onModalClosed(isClosed) {
  showModal.value = isClosed;
}

const items = ref([
  { label: "Notes", icon: "pi pi-pen-to-square" },
  { label: "Archive", icon: "pi pi-warehouse" },
  { label: "Family", icon: "pi pi-tag" },
  { label: "Work", icon: "pi pi-tag" },
  { label: "Tasks", icon: "pi pi-tag" },
  { label: "Priority", icon: "pi pi-tag" },
]);

const notesData = ref([]);
const filteredNotes = ref([]);

watch(
  notesData,
  async () => {
    const response = await $fetch("https://my.1tool.com/suite/api/notes", {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    notesData.value = response.data;
  },
  { immediate: true }
);

const handleNewNote = () => {
  selectedNote.value = "";
  showModal.value = true;
};

const handleUpdateNote = (notes) => {
  selectedNote.value = notes;
  showModal.value = true;
  console.log(notes);
};

watchEffect(() => {
  const searchText = searchQuery.value.toLowerCase();
  filteredNotes.value = notesData.value.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText) ||
      item.content.toLowerCase().includes(searchText)
  );
});
</script>
