<template>
  <RouterView />
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, type Auth } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useUserStore } from './stores/userStore';

const userStore = useUserStore();
const router = useRouter();

let auth: Auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    const userStatus = user !== null;
    if (userStatus) {
      userStore.setLoginStatus(userStatus);
      if (router.currentRoute.value.fullPath.includes('auth')) router.push({ name: 'home' });
    } else {
      router.push({ name: 'login' });
    }
  });
});
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
