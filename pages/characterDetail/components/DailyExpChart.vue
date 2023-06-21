<template>
	<qiun-data-charts type="bar" :chartData="chartData" :opts="opts" />
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
		padding: [0, 50, 0, 0],
		xAxis: {
			labelCount: 2,
			format: "formatCompactNumber",
			fontSize: 12,
			fontColor: "#999",
		},
		yAxis: {},
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
		const data = [];

		if (props.graphData) {
			props.graphData.forEach((item, index) => {
				// 截取DateLabel月日部分
				const date = item.DateLabel.slice(5);

				if (index === 0) {
					data.push(item.EXPDifference);
					return;
				}
				if (index === props.graphData.length - 1) {
					categories.push(date);
					return;
				}
				data.push(item.EXPDifference);
				categories.push(date);
			});
		}

		return {
			categories: categories.reverse(),
			series: [{
				format: "formatCompactNumber",
				name: "经验",
				data: data.reverse(),
			}, ],
		};
	});
</script>

<style>
</style>