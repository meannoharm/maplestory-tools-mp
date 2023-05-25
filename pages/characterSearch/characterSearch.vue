<template>
	<view class="character-search-container">
		<view class="search-container">
			<uni-data-select class="region-select" v-model="region" :localdata="regionRange"
				:clear="false"></uni-data-select>
			<uni-easyinput class="name-input" placeholder="角色名称" confirmType="search" v-model="name" suffixIcon="search"
				@confirm="handleConfirm"></uni-easyinput>
		</view>
		<scroll-view class="auto-complete-list-container" scroll-y="true">
			<uni-list>
				<uni-list-item v-for="autoCompleteItem in autoCompleteList" :key="autoCompleteItem.Name"
					:title="autoCompleteItem.Name" clickable @click="handleClick(autoCompleteItem)" />
			</uni-list>
		</scroll-view>

	</view>
</template>

<script setup>
	import {
		watch,
		ref
	} from 'vue';
	import {
		getAutoCompleteList
	} from "../../api";
	import {
		debounce
	} from "lodash"

	const regionRange = [{
			value: "gms",
			text: "gms"
		},
		{
			value: "ems",
			text: "ems"
		}
	]

	const name = ref("")
	const region = ref("gms")
	const autoCompleteList = ref([])

	watch([name, region], debounce(() => {
		getAutoCompleteList(name.value, region.value).then(res => {
			autoCompleteList.value = res.data
		}).catch(e => {
			console.error(e)
		})
	}, 300))

	const handleClick = (autoCompleteItem) => {
		uni.navigateTo({
			url: `/pages/characterDetail/characterDetail?name=${autoCompleteItem.Name}&region=${autoCompleteItem.Region}`
		})
	}

	const handleConfirm = () => {
		uni.navigateTo({
			url: `/pages/characterDetail/characterDetail?name=${name.value}`
		})
	}
</script>

<style lang="less">
	.character-search-container {
		padding: 8px;
		height: 100vh;

		.search-container {
			display: flex;
			align-items: center;
			margin-bottom: 8px;

			.region-select {
				width: 80px;
			}
		}

		.auto-complete-list-container {
			height: 320px;
		}
	}
</style>