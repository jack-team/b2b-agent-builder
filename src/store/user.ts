
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserInfoTypes = {
  email: string;
  userId: string;
}

type UserModelState = {
  user: UserInfoTypes | null;
}

type UserModelMethods = {
  logout: () => void;
  updateUser: (user: UserInfoTypes) => void;
}

export const useUserStore = create(
  persist<UserModelState & UserModelMethods>(
    (set) => ({
      user: null,
      logout: () => {
        set({ user: null });
      },
      updateUser: (user) => {
        set({ user });
      }
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useUserStore;