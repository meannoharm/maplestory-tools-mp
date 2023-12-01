<template>
  <view class="sfp-main-border">
    <view class="sfp-main-header"></view>
    <view class="sfp-data">
      <text class="sfp-data-margin"></text>
      <text class="sf-data-meso">0</text> Meso
      <br />
      <text class="sfp-data-description sfp-data-destroyable" v-if="false">
        Equipment may be destroyed<br />
        if the enhancement fails.<br />
      </text>
      <text class="sfp-data-description sfp-data-downgradeable" v-if="false">
        Enhancement level will drop<br />
        if the enhancement fails.<br />
      </text>
      <text class="sfp-data-description sfp-data-bothways" v-if="false">
        If enhancement fails, the equipment may be<br />
        destroyed or the enhancement level may drop.<br />
      </text>
      Attempt the enhancement?
    </view>
    <view class="sfp-button-container">
      <text class="maple-button sfp-button sfp-button-ok"></text>
      <text class="maple-button sfp-button sfp-button-cancel"></text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .sfp-main-border {
    position: relative;
    background: url(#{$imgBaseUrl}/assets/starforce/ui.popup.png);
    background-repeat: no-repeat;
    display: inline-block;
    width: 291px;
    height: 162px;
    z-index: 55;
    .sfp-main-header {
      position: absolute;
      display: inline-block;
      width: 274px;
      height: 25px;
      cursor: pointer;
      top: 14px;
      left: 15px;
    }
    .sfp-data {
      position: absolute;
      display: inline-block;
      width: 279px;
      height: 146px;
      top: 10px;
      left: 10px;
      font-family: Arial;
      text-align: center;
      color: white;
      font-size: 12px;
      .sfp-data-margin {
        display: block;
        width: 100%;
        clear: both;
        padding: 12px;
      }
    }
    .sfp-button-container {
      position: absolute;
      display: inline-block;
      width: 279px;
      height: 60px;
      top: 115px;
      text-align: center;
      left: 10px;
      .sfp-button {
        background-repeat: no-repeat !important;
        position: relative;
        display: inline-block;
        width: 84px;
        height: 26px;
        left: 4px;
        top: 15px;
        cursor: pointer;
        &.sfp-button-ok {
          background: url(#{$imgBaseUrl}/assets/starforce/ui.popup.button.ok.png);
          &:active {
            background: url(#{$imgBaseUrl}/assets/starforce/ui.popup.button.ok.click.png);
          }
          &:hover {
            background: url(#{$imgBaseUrl}/assets/starforce/ui.popup.button.ok.mouseover.png);
          }
        }
        &.sfp-button-cancel {
          background: url(#{$imgBaseUrl}/assets/starforce/ui.popup.button.cancel.png);
          &:active {
            background: url(#{$imgBaseUrl}/assets/starforce/ui.popup.button.cancel.click.png);
          }
          &:hover {
            background: url(#{$imgBaseUrl}/assets/starforce/ui.popup.button.cancel.mouseover.png);
          }
        }
      }
    }
  }

  @keyframes sf-key-chance-time {
    0% {
      background-position-y: 0px;
    }
    100% {
      background-position-y: -852px;
    }
  }
</style>
