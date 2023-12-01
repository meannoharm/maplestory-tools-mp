<template>
  <picker
    @change="handleChange"
    :value="valueIndex"
    :range="props.range.map((item) => item.text)"
  >
    <view class="mt-select-content" :class="props.className">
      <view class="text">{{ valueIndex === null ? props.placeholder : props.range[valueIndex].text }}</view>
      <uni-icons type="bottom" size="14"></uni-icons>
    </view>
  </picker>
</template>

<script setup>
  import { computed } from 'vue';

  const emit = defineEmits(['change', 'update:value']);
  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
    range: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  });

  const valueIndex = computed(() => {
    return props.range.indexOf(props.value) === -1
      ? null
      : props.range.indexOf(props.value);
  });

  const handleChange = (e) => {
    emit('update:value', props.range[e.detail.value].value);
    emit('change', props.range[e.detail.value].value);
  };
</script>

<style scoped lang="scss">
  .mt-select-content {
    display: flex;
    align-items: center;
    height: 28px;
    font-size: 14px;
    color: #3a3a3a;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 8px;
    .text {
      margin-right: auto;
    }
  }
</style>
