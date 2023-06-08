<template>
	<view class="character-search-container">
		<view class="search-container">
			<!-- 			<uni-data-select class="region-select" v-model="region" :localdata="regionRange"
				:clear="false"></uni-data-select> -->
			<picker @change="bindPickerChange" :value="regionIndex" :range="regionRange">
				<view class="picker-content">
					<view class="text">{{regionRange[regionIndex]}}</view>
					<uni-icons type="bottom" size="14"></uni-icons>
				</view>
			</picker>
			<uni-easyinput prefixIcon="search" class="name-input" placeholder="角色名称" confirmType="search" v-model="name"
				:clearable="true" @confirm="handleSearchConfirm">
			</uni-easyinput>

		</view>
		<scroll-view v-if="autoCompleteList.length > 0" class="auto-complete-list-container" scroll-y="true">
			<uni-list>
				<uni-list-item v-for="autoCompleteItem in autoCompleteList" :key="autoCompleteItem.Name"
					:title="autoCompleteItem.Name" clickable @click="handleAutoCompleteClick(autoCompleteItem)" />
			</uni-list>
		</scroll-view>
		<uni-section title="关注角色" type="line">
			<uni-list v-if="userInfoStore.isLogin && userInfoStore.followCharacterList.length > 0">
				<uni-list-item v-for="followCharacter in userInfoStore.followCharacterList"
					:key="followCharacter.character_name" :title="followCharacter.character_name" clickable
					:note="followCharacter.character_region" @click="handleFollowCharacterClick(followCharacter)">
					<!-- <template #footer>132</template> -->
				</uni-list-item>
			</uni-list>
			<view v-else-if="!userInfoStore.isLogin" class="tips-container">
				<button class="button" size="mini" @click="handleLogin">点击登录</button>
				<view class="sub-text">登录即可关注角色</view>
			</view>
			<view v-else class="tips-container">
				<view class="text">搜索查看详情后关注</view>
			</view>
		</uni-section>
	</view>
</template>

<script setup>
	import {
		onShow,
	} from "@dcloudio/uni-app";
	import {
		computed,
		watch,
		ref,
		onMounted
	} from 'vue';
	import {
		debounce
	} from "lodash";
	import {
		useUserInfoStore
	} from "/store/userInfo.js";
	import {
		regionMap
	} from "/constant/index.js"

	const userInfoStore = useUserInfoStore();

	const regionRange = ["gms", "ems"]

	const name = ref("");
	const regionIndex = ref(0);
	const autoCompleteList = ref([]);

	onShow(() => {
		if (userInfoStore.isLogin) {
			userInfoStore.getFollowCharacterList();
		}
	})

	const bindPickerChange = function(e) {
		regionIndex.value = e.detail.value;
	}

	const region = computed(() => regionRange[regionIndex.value]);

	watch([name, region], () => {
		if (name.value) {
			getAutoCompleteList(name.value, region.value);
		} else {
			autoCompleteList.value = [];
		}
	})

	const getAutoCompleteList = debounce((name, region) => {
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
		})
	}, 300)

	const handleFollowCharacterClick = (followCharacter) => {
		toDetail(followCharacter.character_name, followCharacter.character_region)
	}

	const handleAutoCompleteClick = (autoCompleteItem) => {
		// autoCompleteItem.Region:
		// 1: gms
		// 2: ems

		toDetail(autoCompleteItem.Name, regionMap[autoCompleteItem.Region])
	}

	const handleSearchConfirm = () => {
		toDetail(name.value, region.value)
	}

	const toDetail = (name, region) => {
		uni.navigateTo({
			url: `/pages/characterDetail/CharacterDetail?name=${name}&region=${region}`
		})
	}

	const handleLogin = () => {
		userInfoStore.login();
	}
</script>

<style lang="scss" scoped>
	.character-search-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;

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

		.auto-complete-list-container {
			height: 320px;
			position: absolute;
			background-color: #fff;
			border-bottom: 1px solid #e5e5e5;
			z-index: 9999;
			top: 45px;
			left: 0;
			right: 0;
		}

		.follow-list-container {
			border-top: 1px solid #ebeef5;

			.follow-title {
				margin-bottom: 8px;
				font-size: 15px;
				color: #3a3a3a;
			}
		}

		.tips-container {
			display: flex;
			flex-direction: column;
			align-items: center;

			.button {
				margin: 8px auto;
				color: #007AFF;
				background-color: transparent;
				border: 1px solid #007AFF;
				border-radius: 5px;

				&::after {
					border: none;
				}
			}

			.sub-text {
				font-size: 12px;
				color: #3a3a3a;
			}
		}
	}
</style>