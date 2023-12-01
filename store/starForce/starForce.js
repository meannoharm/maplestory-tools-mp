import { defineStore } from 'pinia';

export const useStarForceStore = defineStore('starForce', {
  state: () => ({
    isStarCatchCheck: false,
    isSafeGuardCheck: false,
  }),
  actions: {
    toggleStarCatchCheck() {
      this.isStarCatchCheck = !this.isStarCatchCheck;
    },
    toggleSafeGuardCheck() {
      this.isSafeGuardCheck = !this.isSafeGuardCheck;
    }
  }
});
