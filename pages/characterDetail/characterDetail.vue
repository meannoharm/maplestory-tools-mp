<template>
	<view class="character-detial-container">
		<uni-card :isFull="true" :title="characterData.Name" :sub-title="characterData.Class"
			:extra="characterData.Server">
			<image class="character-image" :src="characterData.CharacterImageURL" mode="widthFix"></image>
			<view class="level-content">Lv {{characterData.Level}} ({{characterData.EXPPercent}}%)
			</view>
			<view class="global-rank sub-content">全球排名 {{characterData.GlobalRanking}} | 职业全球排名
				{{characterData.ClassRank}}
			</view>
			<view class="server-rank sub-content">服务器排名 {{characterData.ServerRank}} | 职业服务器排名
				{{characterData.ServerClassRanking}}
			</view>
		</uni-card>
		<uni-card title="日经验" :isFull="true">
			<view class="exp-chart-container">
				<qiun-data-charts type="column" :chartData="chartData" :fontSize="12" fontColor="#999" />
			</view>
		</uni-card>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ref,
		onMounted,
		computed
	} from 'vue';
	import {
		getCharacterInfo,
	} from "../../api";

	const baseInfo = ref({
		region: "",
		name: ""
	})
	const characterData = ref({})
	const isLoading = ref(false)

	onLoad((option) => {
		if (!option.name) {
			uni.switchTab({
				url: "/pages/characterSearch/characterSearch"
			})
		}
		baseInfo.value.name = option.name;
		baseInfo.value.region = option.region || 'gms';
	})

	onMounted(() => {
		isLoading.value = true;
		getCharacterInfo(baseInfo.value.name, baseInfo.value.region).then(res => {
			characterData.value = res.data.CharacterData;
		}).catch(e => {
			console.error(e)
		}).finally(() => {
			isLoading.value = false;
		})
	})

	const chartData = computed(() => {
		const categories = [];
		const data = [];

		if (characterData.value && characterData.value.GraphData) characterData.value.GraphData.forEach((item,
			index) => {
			if (index === 0) {
				data.push(item.EXPDifference)
				return;
			}
			data.push(item.EXPDifference)
			categories.push(item.DateLabel)
		})

		return {
			enableScroll: true,
			categories,
			series: [{
				name: "日经验",
				data
			}],
			legend: {
				show: false
			},
			xAxis: {
				scrollShow: true,
				scrollAlign: "right"
			}
		}
	})
</script>

<style lang="less" scoped>
	.character-detial-container {
		padding: 8px;

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

		.exp-chart-container {
			width: 100%;
			height: 300px;
		}
	}
</style>