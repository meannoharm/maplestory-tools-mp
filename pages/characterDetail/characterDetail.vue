<template>
	<view class="character-detial-container">
		<view class="loading-mask"></view>
		<uni-card class="basic-info-card" :isFull="true" :title="characterData.Name || '-'"
			:sub-title="characterData.Class || '-'" :extra="characterData.Server || '-'">
			<image class="character-image" :src="characterData.CharacterImageURL" mode="widthFix"></image>
			<view class="level-content">等级 {{ characterData.Level }} | {{ characterData.EXPPercent }}%
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
		<uni-card class="exp-info-card" title="日经验" :isFull="true">
			<view class="exp-chart-container">
				<DailyExpChart :graphData="characterData.GraphData" />
			</view>
		</uni-card>
		<view style="height: 8px" />
		<uni-card v-if="characterData.LegionLevel" class="legion-info-card"
			:title="`${legionRankMap[legionLevel[0]]}联盟`"
			:thumbnail="`/static/legion/${legionLevel[0]}_Legion_Rank_${legionLevel[1]}.webp`"
			:sub-title="characterData.LegionLevel + ''" :isFull="true">
			<view class="sub-content">联盟排名
				{{characterData.LegionRank ? numeral(characterData.LegionRank).format("0,0") : '-'}}
			</view>
			<view class="sub-content">联盟战力
				{{ characterData.LegionPower ? numeral( characterData.LegionPower).format("0,0") : '-'}}
			</view>
			<view class="sub-content">每日联盟币
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
	import {
		getCharacterInfo
	} from "../../api";
	import DailyExpChart from "./components/DailyExpChart.vue";
	import TotalExpChart from "./components/TotalExpChart.vue";
	import {
		legionRankMap
	} from '/constant/index.js'

	const baseInfo = ref({
		region: "",
		name: "",
	});
	const characterData = ref({});
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
		isLoading.value = true;
		getCharacterInfo(baseInfo.value.name, baseInfo.value.region)
			.then((res) => {
				characterData.value = res.data.CharacterData;
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				isLoading.value = false;
			});
	});

	const legionLevel = computed(() => {
		const levelList = ["Nameless", "Renowned", "Heroic", "Legendary", "Supreme"]
		const levelIndex = parseInt(characterData.value.LegionLevel / 2500) - 1
		const star = parseInt((characterData.value.LegionLevel - levelIndex * 2500) / 500)
		return [levelList[levelIndex], star]
	})
	const legionIconPath = computed(() => ``)
</script>

<style lang="less" scoped>
	.character-detial-container {
		.loading-mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 999;
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
			}
		}
	}
</style>