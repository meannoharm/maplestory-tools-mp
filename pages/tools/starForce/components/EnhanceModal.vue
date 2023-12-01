<template>
  <view class="sf-main-container masteria sf-main-border">
    <view class="sf-main-header"></view>
    <view class="sf-main-header-buttons">
      <view class="sf-header-icon sf-button-x"></view>
    </view>
    <view class="sf-main sf-enchant">
      <view class="sf-main-button-header">
        <view class="maple-button sf-button-header sf-header-scroll"></view>
        <view
          class="maple-button sf-button-header sf-header-starforce active"
        ></view>
        <view class="maple-button sf-button-header sf-header-transfer"></view>
      </view>
      <view class="sf-header-text">
        <view class="sf-text sf-text-start"></view>
      </view>
      <view class="sf-star-chance sf-star-chance-time" v-if="false"></view>
      <view class="sf-item-container sf-item-main">
        <view class="sf-item item-arcaneumbradagger"></view>
      </view>
      <view class="sf-starforce-data" data-simplebar>
        <view class="sf-starforce-margin"></view>
        <view class="sf-starforce-data-description"> Loading... </view>
      </view>
      <view class="sf-star-item"></view>
      <view class="sf-enchant-effects sf-variable-animation"></view>
      <view
        class="sf-starcatch sf-checkbox"
        :class="{ checked: starForceStore.isStarCatchCheck }"
        @click="handleStarCatchCheck"
      ></view>
      <view
        class="sf-safeguard sf-checkbox disabled"
        :class="{ checked: starForceStore.isSafeGuardCheck }"
        @click="handleSafeGuardCheck"
      ></view>
      <view class="sf-main-mesos">
        <view class="sf-main-mesos-amount sf-data-meso number-locale"
          >164,800</view
        >
        <view
          class="sf-main-shadowknight-amount sf-data-shadowknight number-locale"
        ></view>
      </view>
      <view class="sf-button-container">
        <text class="maple-button sf-button sf-button-enhance"></text>
        <text class="maple-button sf-button sf-button-cancel"></text>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { useStarForceStore } from '/store/starForce/starForce';
  const starForceStore = useStarForceStore();

  const handleStarCatchCheck = () => {
    starForceStore.toggleStarCatchCheck();
  };

  const handleSafeGuardCheck = () => {
    starForceStore.toggleSafeGuardCheck();
  };
</script>

<style lang="scss" scoped>
  .sf-main-container {
    user-select: none;
    &.sf-main-border {
      // position: absolute;
      background: url(#{$imgBaseUrl}/assets/starforce/enchantUI.main.backgrnd.png);
      background-repeat: no-repeat;
      display: inline-block;
      width: 345px;
      height: 295px;
    }
    .sf-main-header {
      z-index: 50;
      position: absolute;
      display: inline-block;
      width: 343px;
      height: 30px;
      cursor: pointer;
    }
    .sf-main-header-buttons {
      position: absolute;
      display: inline-block;
      width: 304px;
      height: 30px;
      cursor: pointer;
      .sf-header-icon {
        background-repeat: no-repeat !important;
        position: relative;
        width: 14px;
        height: 14px;
        left: 33px;
        top: 3px;
        float: right;
        background: url(#{$imgBaseUrl}/assets/starforce/ui.button.close.x.png);
      }
    }
    .sf-main {
      background: url(#{$imgBaseUrl}/assets/starforce/tab_hyper.backgrnd2.png);
      background-repeat: no-repeat !important;
      position: relative;
      display: inline-block;
      width: 325px;
      height: 267px;
      left: 11px;
      top: 22px;
      .sf-main-button-header {
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 34px;
        left: 6px;
        top: 6px;
        .sf-button-header {
          background-repeat: no-repeat !important;
          position: relative;
          display: inline-block;
          width: 102px;
          height: 22px;
          cursor: pointer;
          margin-right: 3px;
        }
        .sf-header-scroll {
          background: url(#{$imgBaseUrl}/assets/starforce/ui.button.scroll.png);
        }
        .sf-header-starforce.active {
          background: url(#{$imgBaseUrl}/assets/starforce/ui.button.starforce.active.png);
        }
        .sf-header-transfer {
          background: url(#{$imgBaseUrl}/assets/starforce/ui.button.transfer.png);
        }
      }
      .sf-header-text {
        position: absolute;
        display: inline-block;
        text-align: center;
        width: 100%;
        left: 18px;
        top: 37px;
        .sf-text {
          position: relative;
          background-repeat: no-repeat !important;
          display: inline-block;
          width: 230px;
          height: 25px;
        }
        .sf-text-start {
          background: url(#{$imgBaseUrl}/assets/starforce/text.starforce.start.png);
        }
      }

      .sf-star-chance {
        background-repeat: no-repeat !important;
        position: absolute;
        height: 146px;
        width: 386px;
        top: 30px;
        left: -2px;
        animation: sf-key-chance-time 0.7s steps(6) forwards infinite;
        &.sf-star-chance-time {
          background: url(#{$imgBaseUrl}/assets/starforce/ui.animations.spritesheet.starforce.chance_time.png);
        }
      }

      .sf-item-main {
        position: relative;
        top: 87px;
        left: 32px;
        .sf-item {
          position: absolute;
          width: 60px;
          height: 60px;
          image-rendering: pixelated;
        }
      }

      .sf-starforce-data {
        position: absolute !important;
        display: inline-block;
        width: 186px;
        height: 106px;
        left: 126px;
        top: 59px;
        overflow-x: hidden;
        color: white;
        font-family: Arial;
        .simplebar-wrapper {
          overflow: hidden;
          width: inherit;
          height: inherit;
          max-width: inherit;
          max-height: inherit;
        }
      }

      .sf-checkbox {
        background: url(#{$imgBaseUrl}/assets/starforce/ui.checkbox.unchecked.png);
        &.disabled {
          background: url(#{$imgBaseUrl}/assets/starforce/ui.checkbox.unchecked.disabled.png);
        }
        &.checked {
          background: url(#{$imgBaseUrl}/assets/starforce/ui.checkbox.checked.png);
        }
      }
      .sf-starcatch {
        background-repeat: no-repeat !important;
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        left: 138px;
        top: 178px;
        cursor: pointer;
      }
      .sf-safeguard {
        background-repeat: no-repeat !important;
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        left: 274px;
        top: 178px;
        cursor: pointer;
      }

      .sf-main-mesos {
        position: absolute;
        top: 207px;
        font-size: 12px;
        font-family: Arial;
        color: white;
        left: 174px;
        .sf-data-shadowknight {
          position: absolute;
          top: 30px;
          font-size: 12px;
          font-family: Arial;
          color: white;
          left: 18px;
        }
      }

      .sf-button-container {
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 61px;
        top: 215px;
        text-align: center;
        left: -6px;
        .sf-button {
          background-repeat: no-repeat !important;
          position: relative;
          display: inline-block;
          width: 89px;
          height: 28px;
          left: 9px;
          top: 15px;
          cursor: pointer;
          &.sf-button-enhance {
            background: url(#{$imgBaseUrl}/assets/starforce/button.enchant.start.png);
            &:hover {
              background: url(#{$imgBaseUrl}/assets/starforce/button.enchant.mouseover.png);
            }
            &:active {
              background: url(#{$imgBaseUrl}/assets/starforce/button.enchant.press.png);
            }
          }
          &.sf-button-cancel {
            background: url(#{$imgBaseUrl}/assets/starforce/button.cancel.start.png);
            &:hover {
              background: url(#{$imgBaseUrl}/assets/starforce/button.cancel.mouseover.png);
            }
            &:active {
              background: url(#{$imgBaseUrl}/assets/starforce/button.cancel.press.png);
            }
          }
        }
      }
    }
  }
</style>
