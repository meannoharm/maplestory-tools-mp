<template>
  <view class="character-search-container">
    <view class="search-container" @click.stop="handleSearchClick">
      <view class="picker-content">
        <view class="text">gms</view>
        <uni-icons type="bottom" size="14"></uni-icons>
      </view>
      <view class="name-input">
        <uni-icons
          type="search"
          class="search-icon"
          size="22"
          color="#c0c4cc"
        />
        <view class="text">请输入角色名称</view>
      </view>
    </view>
    <uni-section title="关注角色" type="line">
      <uni-list
        v-if="
          userInfoStore.isLogin && userInfoStore.followCharacterList.length > 0
        "
      >
        <uni-list-item
          v-for="followCharacter in userInfoStore.followCharacterList"
          :key="followCharacter.character_name"
          :title="followCharacter.character_name"
          clickable
          :rightText="followCharacter.character_region"
          @click="handleFollowCharacterClick(followCharacter)"
        >
        </uni-list-item>
      </uni-list>
      <view v-else-if="!userInfoStore.isLogin" class="tips-container">
        <button class="button" size="mini" @click="handleLogin"
          >点击登录</button
        >
        <view class="sub-text">登录即可关注角色</view>
      </view>
      <view v-else-if="userInfoStore.isFollowListLoading" class="tips-container"
        >加载中</view
      >
      <view v-else class="tips-container">
        <view class="text">搜索查看详情后关注</view>
      </view>
    </uni-section>
  </view>
</template>

<script setup>
  import { onShow, onShareAppMessage } from '@dcloudio/uni-app';
  import { computed, watch, ref, onMounted } from 'vue';
  import { useUserInfoStore } from '/store/userInfo.js';
  import { regionMap } from '/constant/index.js';

  const userInfoStore = useUserInfoStore();

  onShow(() => {
    if (userInfoStore.isLogin) {
      userInfoStore.getFollowCharacterList();
    }
  });

  const handleFollowCharacterClick = (followCharacter) => {
    toDetail(followCharacter.character_name, followCharacter.character_region);
  };

  const toDetail = (name, region) => {
    uni.navigateTo({
      url: `/pages/characterDetail/CharacterDetail?name=${name}&region=${region}`,
    });
  };

  const handleSearchClick = () =>
    uni.navigateTo({
      url: '/pages/characterSearch/search/search',
    });

  const handleLogin = () => {
    userInfoStore.login();
  };

  uni.showShareMenu({
    withShareTicket: true,
  });

  onShareAppMessage(() => ({
    title: '冒险岛GMS角色查询',
    path: `/pages/characterSearch/CharacterSearch`,
    imageUrl:
      'https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/assets/images/maplestory-tools.png',
  }));
</script>

<style lang="scss" scoped>
  .character-search-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;

    .search-container {
      display: flex;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid #e5e5e5;

      // .region-select {
      // 	width: 80px;
      // }
      .picker-content {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #3a3a3a;
        margin-right: 8px;

        .text {
          margin-right: 4px;
        }
      }

      .name-input {
        display: flex;
        width: 100%;
        font-size: 14px;
        border-color: #e5e5e5;
        background-color: #fff;
        flex-direction: row;
        align-items: center;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        height: 35px;

        .search-icon {
          padding: 0 5px;
        }

        .text {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .auto-complete-list-container {
      height: 320px;
      position: absolute;
      background-color: #fff;
      padding-top: 8px;
      border-bottom: 1px solid #e5e5e5;
      z-index: 9999;
      top: 45px;
      left: 0;
      right: 0;

      .loading-container {
        width: 100%;
        height: 320px;
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .loading-icon-container {
          height: 60px;
          line-height: 60px;
          width: 60px;
          animation-name: loading;
          animation-duration: 3s;
          animation-iteration-count: infinite;
        }
      }
    }

    .follow-list-container {
      border-top: 1px solid #ebeef5;

      .follow-title {
        margin-bottom: 8px;
        font-size: 15px;
        color: #3a3a3a;
      }
    }

    .tips-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .button {
        margin: 8px auto;
        color: #007aff;
        background-color: transparent;
        border: 1px solid #007aff;
        border-radius: 5px;

        &::after {
          border: none;
        }
      }

      .sub-text {
        font-size: 12px;
        color: #3a3a3a;
      }
    }
  }

  @keyframes loading {
    0% {
      transform: rotate(0);
    }

    50% {
      transform: rotate(0.5turn);
    }

    100% {
      transform: rotate(1turn);
    }
  }
</style>
