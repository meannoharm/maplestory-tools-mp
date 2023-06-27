<template>
  <view class="tools-container">
    <uni-grid column="3" :highlight="true" @change="change">
      <uni-grid-item
        v-for="(item, index) in toolList"
        :index="index"
        :key="item.title"
        @change="change"
      >
        <view class="grid-item-box" style="background-color: #fff">
          <image
            v-if="item.icon"
            :src="item.icon"
            class="image"
            mode="aspectFit"
          ></image>
          <uni-icons v-else type="image" :size="30" color="#777" />
          <text class="text">{{ item.title }}</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script setup>
  import { onShareAppMessage } from '@dcloudio/uni-app';

  uni.showShareMenu({
    withShareTicket: true,
  });

  onShareAppMessage(() => ({
    title: '冒险岛实用工具',
    path: `/pages/tools/tools`,
  }));

  const toolList = [
    {
      title: '六岛打炮',
      icon: 'https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/assets/icons/dapao.png',
      active: () => {
        uni.navigateTo({
          url: './imageInfo/imageInfo?tool=dapao',
        });
      },
    },
    {
      title: '二岛做菜',
      icon: 'https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/assets/icons/zuocai.png',
      active: () => {
        uni.navigateTo({
          url: './imageInfo/imageInfo?tool=zuocai',
        });
      },
    },
    {
      title: '纸娃娃',
      icon: 'https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/tools-image/zhiwawa.png',
      active: () => {
        uni.navigateToMiniProgram({
          appId: 'wxc15800ea409b3a0d',
        });
      },
    },
  ];
  const change = (e) => {
    toolList[e.detail.index].active();
  };
</script>

<style lang="scss" scoped>
  .tools-container {
    padding: 8px;

    .grid-item-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px 0;

      .image {
        width: 40px;
        height: 40px;
      }

      .text {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
</style>
