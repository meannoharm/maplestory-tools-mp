<template>
  <view class="enhance-container">
    <EnhanceModal></EnhanceModal>
    <ConfirmModal></ConfirmModal>
    <ItemDetail></ItemDetail>
  </view>
</template>

<script setup>
import EnhanceModal from './components/EnhanceModal.vue'
import ConfirmModal from "./components/ConfirmModal.vue"
import ItemDetail from "./components/ItemDetail.vue"
</script>

<style lang="scss" scoped>
  .enhance-container {
    position: relative;
    height: 100vh;
    width: 100vw;
  }
</style>
