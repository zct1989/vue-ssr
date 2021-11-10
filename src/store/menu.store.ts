import { defineStore } from 'pinia';

const STORE_ID = 'menu';

type State = {
  collapsed: boolean;
  menus: any[];
};

const initialState: State = {
  collapsed: false,
  menus: [],
};

export const useStore = defineStore(STORE_ID, {
  state: () => initialState,
  actions: {
    updateCollapsed() {
      this.collapsed = !this.collapsed;
    },

    updateMenus(menus: any[]) {
      this.menus = menus;
    },
  },
});
