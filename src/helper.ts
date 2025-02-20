import type { Auth, User } from "firebase/auth";
import { useUserStore } from "./stores/userStore";
import { child, get, getDatabase, ref } from "firebase/database";
import { userNotesStore } from "./stores/userNotesStore";
import router from "./router";
import { authGuard } from "./router/helpers";

const getDataFromDB = (auth: Auth) => {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `notes/${auth.currentUser?.uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) userNotesStore().syncStorageAndDatabase(Object.values(snapshot.val()));
      else userNotesStore().syncStorageAndDatabase();
    })
    .catch((error) => console.error(error))
    .finally(() => {
      userNotesStore().setListLoading(false);
      router.beforeEach(authGuard);
    });

  if (router.currentRoute.value.fullPath.includes("auth")) {
    router.push({ name: "home" });
  }
};

const handleUnauthenticatedState = (userStatus: boolean) => {
  useUserStore().setLoginStatus(userStatus);
  userNotesStore().setListLoading(false);
  if (router.currentRoute.value.fullPath.includes("oobCode")) return;
  router.push({ name: "login" });
};

export const handleAuthStateChange = (user: User | null, auth: Auth) => {
  const userStatus = user !== null;
  if (userStatus) {
    useUserStore().setLoginStatus(userStatus);
    getDataFromDB(auth);
  } else {
    handleUnauthenticatedState(userStatus);
  }
};

export const loadUserPreferences = () => {
  if (window?.localStorage?.getItem("theme") !== null) {
    document.documentElement.className = window?.localStorage?.getItem("theme") as string;
  }
  if (window?.localStorage?.getItem("font") !== null) {
    document.documentElement.style.setProperty(
      "--family-dynamic",
      window?.localStorage?.getItem("font") as string,
    );
  }
};
