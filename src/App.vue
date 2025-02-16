<template>
  <RouterView />
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, type Auth } from 'firebase/auth';
import { getDatabase, ref as fireref, child, get } from 'firebase/database';
import { onMounted, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useUserStore } from './stores/userStore';
import type { NoteData } from './stores/types';
import { userNotesStore } from './stores/userNotesStore';

const userStore = useUserStore();
const notesStore = userNotesStore();
const router = useRouter();

let auth: Auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    const userStatus = user !== null;
    if (userStatus) {
      userStore.setLoginStatus(userStatus);
      const dbRef = fireref(getDatabase());

      get(child(dbRef, `notes`))
        .then((snapshot) => {
          if (snapshot.exists()) notesStore.syncStorageAndDatabase(Object.values(snapshot.val()));
          else console.log('No data available');
        })
        .catch((error) => console.error(error));
      if (router.currentRoute.value.fullPath.includes('auth')) router.push({ name: 'home' });
    } else {
      userStore.setLoginStatus(userStatus);
      router.push({ name: 'login' });
    }
  });
});

onMounted(() => {
  if (window?.localStorage?.getItem('theme') !== null) {
    document.documentElement.className = window?.localStorage?.getItem('theme') as string;
  }
  if (window?.localStorage?.getItem('font') !== null) {
    document.documentElement.style.setProperty(
      '--family-dynamic',
      window?.localStorage?.getItem('font') as string,
    );
  }
});
</script>

<style scoped></style>
