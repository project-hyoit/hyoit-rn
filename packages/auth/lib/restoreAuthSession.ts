import { clearToken, getToken } from "@hyoit/storage";
import { useAuthStore } from "../model/authStore";

const MOCK_ACCESS_TOKEN = "mock-access-token";
const MOCK_REFRESH_TOKEN = "mock-refresh-token";

export async function restoreAuthSession() {
  await useAuthStore.persist.rehydrate();

  try {
    const { accessToken, refreshToken } = await getToken();
    const store = useAuthStore.getState();

    const isMockSession =
      accessToken === MOCK_ACCESS_TOKEN && refreshToken === MOCK_REFRESH_TOKEN;

    if (accessToken && refreshToken && !isMockSession) {
      store.setSignedIn(true);
    } else {
      if (isMockSession) {
        await clearToken();
      }
      store.resetAuth();
    }
  } catch {
    useAuthStore.getState().resetAuth();
  } finally {
    useAuthStore.getState().setHydrated(true);
  }
}
