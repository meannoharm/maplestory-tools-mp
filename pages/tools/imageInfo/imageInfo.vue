<template>
  <view class="image-info-container">
    <image
      :src="imageMap[tool]"
      mode="aspectFit"
      @click="handleClick"
      class="image"
    ></image>
    <view class="tips">轻触图片放大</view>
  </view>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app';
  import { ref } from 'vue';
  import { onShareAppMessage } from '@dcloudio/uni-app';

  uni.showShareMenu({
    withShareTicket: true,
  });

  onShareAppMessage(() => ({
    title: `${titleMap[tool.value]}-冒险岛实用工具`,
    path: `/pages/tools/imageInfo/imageInfo?tool=${tool.value}`,
  }));

  const tool = ref('');

  onLoad((option) => {
    tool.value = option.tool || '';
    if (tool.value) {
      uni.setNavigationBarTitle({
        title: titleMap[tool.value],
      });
    }
  });

  const imageMap = {
    dapao:
      'https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/tools-image/dapao.jpeg',
    zuocai:
      'https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/tools-image/zuocai.jpeg',
  };

  const titleMap = {
    dapao: '六岛打炮',
    zuocai: '二岛做菜',
  };

  const handleClick = () => {
    uni.previewImage({
      urls: [imageMap[tool.value]],
    });
  };
</script>

<style lang="scss" scoped>
  .image-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .image {
      width: 100%;
    }
    .tips {
      font-size: 14px;
      color: #999;
    }
  }
</style>
