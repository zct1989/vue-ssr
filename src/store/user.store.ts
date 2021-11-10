import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { Ref } from 'vue';

const STORE_ID = 'user';

type State = {
  token: Ref<string>;
  current: any;
};

const initialState: State = {
  token: useStorage('store_token', ''),
  current: undefined,
};

export const useStore = defineStore(STORE_ID, {
  state: () => initialState,
  actions: {
    updateToken(token: string) {
      this.token = token;
    },
    updateCurrent(user: any) {
      this.current = user;
    },
  },
});
