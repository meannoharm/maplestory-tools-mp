<template>
	<view class="search-input-container">
		<view class="search-container">
			<picker @change="bindPickerChange" :value="regionIndex" :range="regionRange">
				<view class="picker-content">
					<view class="text">{{regionRange[regionIndex]}}</view>
					<uni-icons type="bottom" size="14"></uni-icons>
				</view>
			</picker>
			<uni-easyinput prefixIcon="search" class="name-input" placeholder="请输入角色名称" confirmType="search"
				v-model="name" focus :clearable="true" @confirm="handleSearchConfirm" @focus="isInputFocus = true"
				@blur="handleBlur">
			</uni-easyinput>
		</view>
		<!-- 		<scroll-view v-if="isInputFocus && name" class="auto-complete-list-container" scroll-y="true">
		<view v-if="isAutoCompleteListLoading" class="loading-container">
			<view class="loading-icon-container">
				<uni-icons class="loading-icon" color="#fff" type="spinner-cycle" size="60"></uni-icons>
			</view>
		</view>
		<uni-list v-if="autoCompleteList.length > 0" class="auto-complete-list">
			<uni-list-item v-for="autoCompleteItem in autoCompleteList" :key="autoCompleteItem.Name"
				:title="autoCompleteItem.Name" :rightText="regionMap[autoCompleteItem.Region]" clickable
				@click="handleAutoCompleteClick(autoCompleteItem)" />
		</uni-list>
	</scroll-view> -->
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';
	import {
		debounce
	} from "lodash";
	import {
		onShareAppMessage
	} from "@dcloudio/uni-app";
	uni.showShareMenu({
		withShareTicket: true,
	});

	onShareAppMessage(() => ({
		title: "冒险岛GMS角色查询",
		path: `/pages/characterSearch/CharacterSearch`,
		imageUrl: "https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/assets/images/maplestory-tools.png",
	}));

	const regionRange = ["gms", "ems"]

	const name = ref("");
	const regionIndex = ref(0);
	const isAutoCompleteListLoading = ref(false);
	const autoCompleteList = ref([]);
	const isInputFocus = ref(false);

	const bindPickerChange = function(e) {
		regionIndex.value = e.detail.value;
	}

	const toDetail = (name, region) => {
		uni.redirectTo({
			url: `/pages/characterDetail/CharacterDetail?name=${name}&region=${region}`
		})
	}

	const getAutoCompleteList = debounce((name, region) => {
		isAutoCompleteListLoading.value = true;
		uniCloud.callFunction({
			name: "get-auto-complete-list",
			data: {
				input: name,
				region: region
			}
		}).then(res => {
			if (res.result.data) {
				autoCompleteList.value = res.result.data;
			}
		}).catch(e => {
			console.error(e)
		}).finally(() => {
			isAutoCompleteListLoading.value = false;
		})
	}, 300)

	const handleBlur = () => setTimeout(() => isInputFocus.value = false, 10);

	const region = computed(() => regionRange[regionIndex.value]);


	const handleAutoCompleteClick = (autoCompleteItem) => {
		// autoCompleteItem.Region:
		// 1: gms
		// 2: ems

		toDetail(autoCompleteItem.Name, regionMap[autoCompleteItem.Region])
	}

	const handleSearchConfirm = () => {
		toDetail(name.value, region.value)
	}

	// watch([name, region], () => {
	// 	if (name.value) {
	// 		getAutoCompleteList(name.value, region.value);
	// 	} else {
	// 		autoCompleteList.value = [];
	// 	}
	// })
</script>

<style lang="scss" scoped>
	.search-input-container {
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
		}
	}
</style>