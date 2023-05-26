<template>
	<qiun-data-charts type="line" :chartData="chartData" :opts="opts" />
</template>

<script setup>
	import {
		computed
	} from 'vue';

	const props = defineProps({
		graphData: Array
	})

	const opts = {
		fontSize: 12,
		fontColor: "#999",
		xAxis: {
			labelCount: 2,
			fontSize: 12,
			fontColor: "#999",
		},
		yAxis: {
			format: "formatCompactNumber",
		},
		extra: {
			bar: {
				width: 30,
				categoryGap: 2,
			},
		},
		legend: {
			show: false,
		}
	};

	const chartData = computed(() => {
		const categories = [];
		const currentExp = [];
		const nextLevel = [];

		if (props.graphData) {
			props.graphData.forEach((item, index) => {
				currentExp.push(item.CurrentEXP);
				nextLevel.push(item.CurrentEXP + item.EXPToNextLevel)
				categories.push(item.DateLabel);
			});
		}

		return {
			categories,
			series: [{
				format: "formatCompactNumber",
				name: "当前经验",
				data: currentExp,
			}, {
				format: "formatCompactNumber",
				name: "下一等级",
				data: nextLevel,
			}],
		};
	});
</script>

<style>
</style>