
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DexieStorage } from '@/utils/dexieStorage';

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

const storage = new DexieStorage('user');

export const useUserStore = create(persist<UserModelState & UserModelMethods>(
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
    name: 'user-store',
    storage: createJSONStorage(() => storage)
  }
));

export default useUserStore;