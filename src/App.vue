<template>
  <RouterView />
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, type Auth } from "firebase/auth";
import { onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";
import { userNotesStore } from "./stores/userNotesStore";
import { handleAuthStateChange, loadUserPreferences } from "./helper";

const notesStore = userNotesStore();
const router = useRouter();
let auth: Auth;

onMounted(() => {
  notesStore.setListLoading(true);
  auth = getAuth();
  onAuthStateChanged(auth, (user) => handleAuthStateChange(user, auth));
});

onMounted(loadUserPreferences);
</script>

<style scoped></style>
