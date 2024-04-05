<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :header="props.note ? props.note.title : 'New Note'"
    :style="{ width: '50rem' }"
    :closable="isClosable"
  >
    <form @submit.prevent="handleSubmit(title, content, props.note)">
      <div class="card p-fluid">
        <div class="field">
          <InputText
            id="title"
            type="text"
            placeholder="Title"
            v-model="title"
            required
          />
        </div>
        <div class="field">
          <Editor v-model="content" editorStyle="height: 320px" required />
          <!-- <Textarea
            id="content"
            rows="4"
            placeholder="Content"
            v-model="content"
            required
          /> -->
        </div>
      </div>

      <div v-if="error">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <div class="flex justify-content-end gap-2">
        <Button
          :icon="isDeleting ? 'pi pi-spin pi-spinner' : 'pi pi-trash'"
          severity="danger"
          text
          rounded
          aria-label="Filter"
          v-if="props.note"
          @click="handelDelete(props.note)"
        />
        <Button
          icon="pi pi-times-circle"
          type="button"
          label="Cancel"
          severity="secondary"
          @click="onModalClosed"
        ></Button>

        <Button
          icon="pi pi-save"
          type="submit"
          label="Save"
          :loading="isLoading"
        ></Button>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
import Editor from "primevue/editor";

const props = defineProps({ isOpen: Boolean, note: Object });
const emits = defineEmits(["closed"]);

const isVisible = ref(props.isOpen);
const title = ref(props.note.title);
const content = ref(props.note.content);
const error = ref("");
const isLoading = ref(false);
const isClosable = ref(false);
const isDeleting = ref(false);

const value = ref();

import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const apiToken = userStore.token;

const apiUrl = "https://my.1tool.com/suite/api/notes";

const onModalClosed = () => {
  isVisible.value = false;
  emits("closed", false);
};

const handleSubmit = async (title, content, note) => {
  isLoading.value = true;
  error.value = "";

  const fetchUrl = note ? apiUrl + "/" + note["id"] : apiUrl;
  const method = note ? "PUT" : "POST";

  try {
    const response = await $fetch(fetchUrl, {
      method: method,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ title, content }),
    });
    console.log(response.data);
    isLoading.value = false;
    onModalClosed();
  } catch (err) {
    error.value = err.data["message"];
    isLoading.value = false;
    console.log(err.data);
  }
};

const handelDelete = async (note) => {
  isDeleting.value = true;
  error.value = "";

  try {
    const response = await $fetch(
      "https://my.1tool.com/suite/api/notes/" + note["id"],
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    console.log(response.data);
    isDeleting.value = false;

    onModalClosed();
  } catch (err) {
    error.value = err.data["message"];
    isDeleting.value = false;
    console.log(err.data);
  }
};
</script>
