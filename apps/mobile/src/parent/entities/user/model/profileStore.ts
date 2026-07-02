import { create } from "zustand";

import { mockUserProfile } from "./mock";
import type { UserProfile } from "./types";

interface ProfileState {
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

export const useUserProfileStore = create<ProfileState>((set) => ({
  profile: mockUserProfile,
  updateProfile: (profile) =>
    set((state) => ({
      profile: {
        ...state.profile,
        ...profile,
      },
    })),
}));
