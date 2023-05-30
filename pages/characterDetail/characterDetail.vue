<template>
	<view class="character-detial-container">
		<view class="mask" v-if="!isCharacterExist">
			<view class="character-not-exist">未查询到用户</view>
		</view>
		<uni-card class="basic-info-card" :isFull="true" :title="characterData.Name || '-'"
			:sub-title="characterData.Class || '-'" :extra="characterData.Server || '-'">
			<image class="character-image" :src="characterData.CharacterImageURL" mode="widthFix"></image>
			<view class="level-content">等级 {{ characterData.Level }} ({{ characterData.EXPPercent }}%)
			</view>
			<view class="global-rank sub-content">全球排名
				{{characterData.GlobalRanking ? numeral(characterData.GlobalRanking).format("0,0") : '-'}} | 职业全球排名
				{{characterData.ClassRank ? numeral(characterData.ClassRank).format("0,0") : '-'}}
			</view>
			<view class="server-rank sub-content">服务器排名
				{{characterData.ServerRank ? numeral(characterData.ServerRank).format("0,0") : '-'}} | 职业服务器排名
				{{ characterData.ServerClassRanking? numeral(characterData.ServerClassRanking).format("0,0"): '-' }}
			</view>
		</uni-card>
		<view style="height: 8px" />
		<uni-card v-if="characterData.GraphData && characterData.GraphData.length > 0" class="exp-info-card" title="日经验"
			:isFull="true">
			<view class="exp-chart-container">
				<DailyExpChart :graphData="characterData.GraphData" />
			</view>
		</uni-card>
		<view style="height: 8px" />
		<uni-card v-if="characterData.LegionLevel && characterData.LegionLevel >= 500" class="legion-info-card"
			:title="`${legionRankMap[legionLevel[0]]}联盟${legionLevel[1]}`"
			:thumbnail="iconPathMap[`${legionLevel[0]}_${legionLevel[1]}`]" :sub-title="characterData.LegionLevel + ''"
			:isFull="true">
			<view class="sub-content">联盟排名
				{{characterData.LegionRank ? numeral(characterData.LegionRank).format("0,0") : '-'}}
			</view>
			<view class="sub-content">联盟战力
				{{ characterData.LegionPower ? numeral( characterData.LegionPower).format("0,0") : '-'}}
			</view>
			<view class="sub-content">
				<image class="legion-icon" :src="iconPathMap.Legion_Coin"></image>
				每日联盟币
				{{characterData.LegionCoinsPerDay? numeral(characterData.LegionCoinsPerDay).format("0,0") : '-'}}
			</view>
		</uni-card>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref,
		onMounted,
		computed
	} from "vue";
	import numeral from "numeral";
	import DailyExpChart from "./components/DailyExpChart.vue";
	import {
		legionRankMap,
		iconPathMap,
		jobMap
	} from '/constant/index.js'

	const baseInfo = ref({
		region: "",
		name: "",
	});
	const characterData = ref({});
	const isCharacterExist = ref(true);
	const isLoading = ref(false);

	onLoad((option) => {
		if (!option.name) {
			uni.switchTab({
				url: "/pages/characterSearch/characterSearch",
			});
		}
		baseInfo.value.name = option.name;
		baseInfo.value.region = option.region || "gms";
	});

	onMounted(() => {
		uni.showLoading({
			title: "查询中",
			mask: true
		})
		uniCloud.callFunction({
				name: "get-maplestory-character-info",
				data: {
					userName: baseInfo.value.name,
					region: baseInfo.value.region
				}
			})
			.then((res) => {
				if (res.result.data) {
					characterData.value = res.result.data.CharacterData;
				} else {
					isCharacterExist.value = false;
				}
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				uni.hideLoading()
			});
	});

	const legionLevel = computed(() => {
		const levelList = ["Nameless", "Renowned", "Heroic", "Legendary", "Supreme"]
		let levelIndex = 0;
		let star = 0;
		if (characterData.value.LegionLevel >= 500) {
			levelIndex = parseInt((characterData.value.LegionLevel - 500) / 2500)
			star = parseInt((characterData.value.LegionLevel - 500 - (levelIndex * 2500)) / 500) + 1
		}
		return [levelList[levelIndex], star]
	})
</script>

<style lang="scss" scoped>
	.character-detial-container {
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 999;
			display: flex;
			align-items: center;
			justify-content: center;

			.character-not-exist {
				color: #ddd;
				margin-bottom: 120px;
			}
		}

		.basic-info-card {
			.character-image {
				width: 120px;
				height: 120px;
				margin-bottom: 8px;
			}

			.level-content {}

			.sub-content {
				font-size: 12px;
				color: #999;
			}
		}

		.exp-info-card {
			.exp-chart-container {
				width: 100%;
				height: 300px;
			}
		}

		.legion-info-card {
			.sub-content {
				font-size: 12px;
				color: #999;
				display: flex;
				align-items: center;

				.legion-icon {
					height: 12px;
					width: 12px;
					margin-right: 4px;
				}
			}
		}
	}
</style>