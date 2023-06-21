<template>
	<view class="center">
		<view class="center-list">
			<uni-list-item title="关于我们" link :clickable="true" to="/pages/my/AboutUs/AboutUs" :show-extra-icon="true"
				:extraIcon="{type: 'info',color:'#999'}">
			</uni-list-item>
			<view class="list-item">
				<view class="border"></view>
				<button class="contact-button" open-type="contact">
					<uni-icons type="chat" size="16" color="#999" class="icon icon-left"></uni-icons>
					<view class="text">联系客服</view>
					<uni-icons type="right" size="16" color="#bbb" class="icon"></uni-icons>
				</button>
			</view>
		</view>
		<view class="bottom-back" @click="changeLoginState">
			<text class="bottom-back-text logout" v-if="userInfoStore.isLogin">登出</text>
			<text class="bottom-back-text login" v-else>登录</text>
		</view>
	</view>
</template>

<script setup>
	const db = uniCloud.database();
	import {
		computed
	} from "vue";
	import {
		useUserInfoStore
	} from "/store/userInfo.js";
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

	const userInfoStore = useUserInfoStore();

	const changeLoginState = async () => {
		if (userInfoStore.isLogin) {
			userInfoStore.logout();
		} else {
			userInfoStore.login();
		}
	}
</script>

<style lang="scss" scoped>
	.center {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		background-color: #f8f8f8;

		.center-list {
			margin-bottom: 8px;
			background-color: #f9f9f9;

			.list-item {
				position: relative;
				height: 46px;

				.border {
					position: absolute;
					top: 0;
					right: 0;
					left: 0;

					&::after {
						z-index: 999;
						position: absolute;
						top: 0;
						right: 0;
						left: 0;
						height: 1px;
						content: "";
						background-color: #e5e5e5;
						transform: scaleY(0.5);
					}
				}

				.contact-button {
					display: flex;
					box-sizing: border-box;
					height: 46px;
					padding: 0 10px 0 15px;
					align-items: center;
					background-color: #fff;
					flex-direction: row;

					&::after {
						border: none;
						border-radius: 0;
					}

					.icon-left {
						margin-right: 18rpx;
					}

					.text {
						font-size: 14px;
						margin-right: auto;
						color: #3b4144;
					}
				}
			}

			.center-list-cell {
				width: 750rpx;
				background-color: #007AFF;
				height: 40rpx;
			}
		}

		.bottom-back {
			margin-top: 10px;
			width: 750rpx;
			height: 44px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: none;
			border-width: 0;
			border-radius: 0;
			background-color: #FFFFFF;
			.bottom-back-text {
				font-size: 14px;
				color: #3b4144;
				&.logout {
					color: #e64340;
					
				}
			}
		}

		
	}


	.grid {
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}

	.uni-grid .text {
		font-size: 16px;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}


	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #DD524D;
	}
</style>