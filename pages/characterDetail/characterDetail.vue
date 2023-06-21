<template>
	<view class="character-detial-container">
		<view class="mask" v-if="!isCharacterExist">
			<view class="character-not-exist">未查询到用户</view>
		</view>

		<uni-card class="basic-info-card" :isFull="true">
			<template v-slot:title>
				<view class="title-container">
					<view class="info">
						<div class="main">{{ characterData.Name || "-" }}</div>
						<div class="sub">
							{{ characterData.Class || "-" }} |
							{{ characterData.Server || "-" }}
						</div>
					</view>
					<view class="operation" v-if="characterData.Name">
						<uni-fav :checked="isFollowed" :contentText="{ contentDefault: '关注', contentFav: '已关注' }"
							@click="handleFavClick" />
					</view>
				</view>
			</template>
			<image class="character-image" :src="characterData.CharacterImageURL" mode="widthFix"></image>
			<view class="level-content">等级 {{ characterData.Level }} ({{ characterData.EXPPercent }}%)
			</view>
			<view class="global-rank sub-content">全球排名
				{{
          characterData.GlobalRanking
            ? numeral(characterData.GlobalRanking).format("0,0")
            : "-"
        }}
				| 职业全球排名
				{{
          characterData.ClassRank
            ? numeral(characterData.ClassRank).format("0,0")
            : "-"
        }}
			</view>
			<view class="server-rank sub-content">服务器排名
				{{
          characterData.ServerRank
            ? numeral(characterData.ServerRank).format("0,0")
            : "-"
        }}
				| 职业服务器排名
				{{
          characterData.ServerClassRanking
            ? numeral(characterData.ServerClassRanking).format("0,0")
            : "-"
        }}
			</view>
		</uni-card>
		<view style="height: 8px" />
		<uni-card v-if="characterData.GraphData && characterData.GraphData.length > 0" class="exp-info-card" title="日经验"
			:isFull="true">
			<view class="exp-chart-container">
				<view class="detail last">根据最新一天肝度，升级还需 <text class="days">{{needDays}}</text> 天</view>
				<DailyExpChart :graphData="characterData.GraphData" />
			</view>
		</uni-card>
		<view style="height: 8px" />
		<uni-card v-if="characterData.LegionLevel && characterData.LegionLevel >= 500" class="legion-info-card"
			:title="`${legionRankMap[legionLevel[0]]}联盟${legionLevel[1]}`"
			:thumbnail="iconPathMap[`${legionLevel[0]}_${legionLevel[1]}`]" :sub-title="characterData.LegionLevel + ''"
			:isFull="true">
			<view class="sub-content">联盟排名
				{{
          characterData.LegionRank
            ? numeral(characterData.LegionRank).format("0,0")
            : "-"
        }}
			</view>
			<view class="sub-content">联盟战力
				{{
          characterData.LegionPower
            ? numeral(characterData.LegionPower).format("0,0")
            : "-"
        }}
			</view>
			<view class="sub-content">
				<image class="legion-icon" :src="iconPathMap.Legion_Coin"></image>
				每日联盟币
				{{
          characterData.LegionCoinsPerDay
            ? numeral(characterData.LegionCoinsPerDay).format("0,0")
            : "-"
        }}
			</view>
		</uni-card>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow,
		onShareAppMessage
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
	} from "/constant/index.js";
	import {
		useUserInfoStore
	} from "/store/userInfo.js";

	const userInfoStore = useUserInfoStore();
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
			mask: true,
		});
		uniCloud
			.callFunction({
				name: "get-maplestory-character-info",
				data: {
					userName: baseInfo.value.name,
					region: baseInfo.value.region,
				},
			})
			.then((res) => {
				uni.hideLoading();
				if (res.result.data) {
					characterData.value = res.result.data.CharacterData;
				} else {
					isCharacterExist.value = false;
				}
			})
			.catch((e) => {
				console.error(e);
				uni.hideLoading();
				uni.showToast({
					title: "查询失败",
					icon: "none",
				});
			})
	});

	onShow(() => {
		if (userInfoStore.isLogin) {
			userInfoStore.getFollowCharacterList();
		}
	})

	onShareAppMessage(() => ({
		path: `/pages/characterDetail/CharacterDetail?name=${baseInfo.value.name}&region=${baseInfo.value.region}`,
		imageUrl: characterData.value.CharacterImageURL,
		title: `${characterData.value.Name} | ${characterData.value.Class} | Lv.${characterData.value.Level} | ${characterData.value.Server}`,
	}));

	uni.showShareMenu({
		withShareTicket: true,
	});

	const needDays = computed(() => {
		if (characterData.value.GraphData) {
			const graphDataLength = characterData.value.GraphData.length;
			const expToNextLevel = characterData.value.GraphData[graphDataLength - 1].EXPToNextLevel;
			const day1 = characterData.value.GraphData[graphDataLength - 2].EXPDifference ? Math.ceil(
				expToNextLevel /
				characterData.value.GraphData[graphDataLength - 2].EXPDifference) : "-";
			return day1;
		} else return '-'
	})

	const legionLevel = computed(() => {
		const levelList = ["Nameless", "Renowned", "Heroic", "Legendary", "Supreme"];
		let levelIndex = 0;
		let star = 0;
		if (characterData.value.LegionLevel >= 500) {
			levelIndex = parseInt((characterData.value.LegionLevel - 500) / 2500);
			star =
				parseInt(
					(characterData.value.LegionLevel - 500 - levelIndex * 2500) / 500
				) + 1;
		}
		return [levelList[levelIndex], star];
	});

	const isFollowed = computed(() => {
		return (
			userInfoStore.followCharacterList.findIndex((item) => {
				console.log(item, baseInfo.value)
				return (
					item.character_name === baseInfo.value.name &&
					item.character_region === baseInfo.value.region
				);
			}) !== -1
		);
	});

	const handleFavClick = () => {
		if (!userInfoStore.isLogin) {
			userInfoStore.login();
			return;
		}
		if (isFollowed.value) {
			userInfoStore.unFollowCharacter(baseInfo.value.name, baseInfo.value.region);
		} else {
			userInfoStore.followCharacter(baseInfo.value.name, baseInfo.value.region);
		}
	};
</script>

<style lang="scss" scoped>
	.character-detial-container {
		.mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
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
			.title-container {
				display: flex;
				align-items: center;
				border-bottom: 1px #ebeef5 solid;
				flex-direction: row;
				padding: 10px;
				overflow: hidden;

				.info {
					margin-right: auto;

					.main {
						font-size: 15px;
						color: #3a3a3a;
					}

					.sub {
						font-size: 12px;
						margin-top: 5px;
						color: #909399;
					}
				}
			}

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

				.detail {
					font-size: 12px;
					color: #999;

					&.last {
						margin-bottom: 8px;
					}
					
					.days {
						font-weight: bold;
					}
				}
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