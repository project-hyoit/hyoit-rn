import { getToken } from "@hyoit/storage";
import { useAuthStore } from "../model/authStore";

export async function restoreAuthSession() {
  await useAuthStore.persist.rehydrate();

  try {
    const { accessToken, refreshToken } = await getToken();
    const store = useAuthStore.getState();

    if (accessToken && refreshToken) {
      store.setSignedIn(true);
    } else {
      store.resetAuth();
    }
  } catch {
    useAuthStore.getState().resetAuth();
  } finally {
    useAuthStore.getState().setHydrated(true);
  }
}
