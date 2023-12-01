<template>
  <view class="item-config-container">
    <view class="item-container">
      <view class="item-selector-container" @click="toItemSelector">
        <image
          :src="imageUrl('maple_items/AbsolabDesperado.png')"
          mode="scaleToFill"
          class="item-image"
        />
        <view class="item-name">Absolab Desperado</view>
        <uni-icons type="bottom" size="14" color="#c0c4cc"></uni-icons>
      </view>
      <view class="star-item">
        <view class="item-star-label">
          <image
            :src="imageUrl('starforce/ui.starcatch.star.png')"
            mode="scaleToFill"
            class="star-image"
          />
          <view class="name">星星</view>
        </view>
        <uni-number-box
          type="number"
          class="flame-form"
          min="0"
          max="7"
          value="0"
          data-id="dex"
        />
      </view>
    </view>
    <uni-collapse>
      <uni-collapse-item
        title="卷轴"
        :thumb="imageUrl('maple_items/etc/WhiteScroll.png')"
      >
        <view class="scroll-container">
          <view class="info">最大强化数: 10</view>
          <view class="scroll-item">
            <view class="item-scroll-label">
              <image
                :src="imageUrl('maple_items/etc/SpellTrace.png')"
                mode="scaleToFill"
                class="scroll-image"
              />
              <view class="name">100%</view>
            </view>
            <uni-number-box
              type="number"
              class="flame-form"
              min="0"
              max="7"
              value="0"
              data-id="dex"
            />
          </view>
          <view class="scroll-item">
            <view class="item-scroll-label">
              <image
                :src="imageUrl('maple_items/etc/SpellTrace.png')"
                mode="scaleToFill"
                class="scroll-image"
              />
              <view class="name">70%</view>
            </view>
            <uni-number-box
              type="number"
              class="flame-form"
              min="0"
              max="7"
              value="0"
              data-id="dex"
            />
          </view>
        </view>
      </uni-collapse-item>
      <uni-collapse-item title="火花" :thumb="imageUrl('cube/flames.png')" open>
        <view class="flame-container">
          <view class="flame-config-item">
            <uni-data-checkbox
              multiple
              v-model="checkbox1"
              :localdata="[{ value: 0, text: '使用火花等级' }]"
            ></uni-data-checkbox>
            <view class="tips"
              >如果勾选，那么每个数值框的值将对应一个火花等级，火花等级范围从0到7。如果不勾选，那么您可以填写任何您想要的火花属性数值。</view
            >
          </view>
          <view class="flame-config-item">
            <uni-data-checkbox
              multiple
              v-model="checkbox1"
              :localdata="[{ value: 0, text: '限制火花强化数量为4' }]"
            ></uni-data-checkbox>
            <view class="tips"
              >建议将火花等级设置在3到7之间，并且最多有4种火焰类型。</view
            >
          </view>
          <view class="item-flame-form">
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">STR</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="str"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">DEX</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="dex"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">INT</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="int"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">LUK</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="luk"
            /></view>
            <view class="flame-box item-weapon item-armor"
              ><view class="item-flame-label">STR,DEX</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="str,dex"
            /></view>
            <view class="flame-box item-weapon item-armor"
              ><view class="item-flame-label">STR,INT</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="str,int"
            /></view>
            <view class="flame-box item-weapon item-armor"
              ><view class="item-flame-label">STR,LUK</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="str,luk"
            /></view>
            <view class="flame-box item-weapon item-armor"
              ><view class="item-flame-label">DEX,INT</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="dex,int"
            /></view>
            <view class="flame-box item-weapon item-armor"
              ><view class="item-flame-label">DEX,LUK</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="dex,luk"
            /></view>
            <view class="flame-box item-weapon item-armor"
              ><view class="item-flame-label">INT,LUK</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="int,luk"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">All Stats</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="all_stat"
                data-type="%"
              /><view class="flame-percent hidden">%</view></view
            >
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">Attack Power</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="watt"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">Magic Attack</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="matt"
            /></view>
            <view class="flame-box item-weapon item-custom-flame"
              ><view class="item-flame-label">Damage</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="damage"
                data-type="%"
              /><view class="flame-percent hidden">%</view></view
            >
            <view class="flame-box item-weapon item-custom-flame"
              ><view class="item-flame-label">Boss Damage</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="boss_damage"
                data-type="%"
              /><view class="flame-percent hidden">%</view></view
            >
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">Req Level</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="reqlvl"
                data-type="-"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">Max HP</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="hp"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">Max MP</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="mp"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">Defense</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="def"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">Jump</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="jump"
            /></view>
            <view class="flame-box item-weapon item-armor item-custom-flame"
              ><view class="item-flame-label">Speed</view>
              <uni-number-box
                type="number"
                class="flame-form"
                min="0"
                max="7"
                value="0"
                data-id="speed"
            /></view>
          </view>
        </view>
      </uni-collapse-item>
      <uni-collapse-item
        title="魔方"
        :thumb="imageUrl('cube/cubes_gms.png')"
        open
      >
        <view class="cube-container">
          <view class="cube-config-container">
            <view class="cube-config-item">
              <view class="title">潜能等级</view>
              <MtSelect :range="potentialTierRange"></MtSelect>
            </view>
          </view>
          <view class="potential-info">
            <view class="potential-item">
              <MtSelect
                className="potential-select"
                :range="[{ title: '123', value: '123' }]"
              />
            </view>
            <view class="potential-item">
              <MtSelect
                className="potential-select"
                :range="[{ title: '123', value: '123' }]"
              />
            </view>
            <view class="potential-item">
              <MtSelect
                className="potential-select"
                :range="[{ title: '123', value: '123' }]"
              />
            </view>
          </view>
          <view class="cube-config-container">
            <view class="cube-config-item">
              <view class="title">附加潜能等级</view>
              <MtSelect :range="potentialTierRange"></MtSelect>
            </view>
          </view>
          <view class="potential-info">
            <view class="potential-item">
              <MtSelect
                className="potential-select"
                :range="[{ title: '123', value: '123' }]"
              />
            </view>
            <view class="potential-item">
              <MtSelect
                className="potential-select"
                :range="[{ title: '123', value: '123' }]"
              />
            </view>
            <view class="potential-item">
              <MtSelect
                className="potential-select"
                :range="[{ title: '123', value: '123' }]"
              />
            </view>
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
    <view class="space-area"></view>
    <view class="bottom-container">
      <button class="button" @click="toEnhance">确认</button>
    </view>
  </view>
</template>

<script setup>
  import { imageUrl } from '/utils/utils';
  import MtSelect from '/components/MtSelect';

  const flameTierConfig = [];
  const toItemSelector = () => uni.navigateTo({ url: './ItemSelector' });
  const toEnhance = () => uni.navigateTo({ url: './Enhance' })

  const potentialTierRange = [
    { value: '', text: '无潜能' },
    { value: 'rare', text: 'Rare' },
    { value: 'epic', text: 'Epic' },
    { value: 'unique', text: 'Unique' },
    { value: 'legendary', text: 'Legendary' },
  ];
</script>

<style lang="scss">
  .item-config-container {
    .item-container {
      padding: 8px;
      border-bottom: 1px solid #ebeef5;
      .item-selector-container {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .item-image {
          width: 30px;
          height: 30px;
          margin-right: 8px;
        }
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 8px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        height: 35px;
        .item-name {
          margin-right: auto;
        }
      }
      .star-item {
        display: flex;
        align-items: center;
        .item-star-label {
          width: 100px;
          margin-right: 8px;
          display: flex;
          align-items: center;
          .name {
            font-size: 13px;
            color: #303133;
          }
          .star-image {
            width: 20px;
            height: 20px;
            margin-right: 4px;
          }
        }
      }
    }
    .scroll-container {
      padding: 8px;
      .info {
        margin-bottom: 8px;
        color: #666;
      }
      .scroll-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .item-scroll-label {
          width: 100px;
          margin-right: 8px;
          display: flex;
          align-items: center;
          .scroll-image {
            width: 25px;
            height: 25px;
            margin-right: 4px;
          }
        }
      }
    }
    .flame-container {
      padding: 8px;
      .flame-config-item {
        margin-bottom: 8px;
        .tips {
          color: #999;
          font-size: 10px;
        }
      }
      .item-flame-form {
        padding: 4px;
        .flame-box {
          display: flex;
          margin-bottom: 8px;
          align-items: center;
          .item-flame-label {
            width: 100px;
            margin-right: 8px;
          }
          .flame-percent {
            margin-left: 8px;
          }
        }
      }
    }
    .cube-container {
      padding: 8px;
      .cube-config-container {
        margin-bottom: 4px;
        .cube-config-item {
          display: flex;
          align-items: center;
          .title {
            margin-right: 8px;
          }
        }
      }
      .potential-info {
        margin-bottom: 8px;
        // border: 1px solid #dcdfe6;
        padding: 4px;
        .potential-item {
          margin-bottom: 4px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .space-area {
      height: 40px;
    }
    .bottom-container {
      z-index: 999999;
      height: 40px;
      background-color: #fff;
      // border-top: 1px solid #dcdfe6;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .button {
        height: 40px;
        width: 100%;
        &::after {
          border-radius: 0;
        }
      }
    }
  }
</style>
