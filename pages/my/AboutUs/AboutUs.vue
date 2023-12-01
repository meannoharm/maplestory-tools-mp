<template>
	<view class="about-container">
		<uni-section title="关于我" type="line" padding>
			<view>号已经被封了，以后随缘更新了</view>
			<view>谢谢各位的支持</view>
		</uni-section>
		<uni-section title="更新日志" type="line" padding>
			<view class="version-contianer" v-for="versionItem in versionList" :key="versionItem.version">
				<view class="version">v{{ versionItem.version }} {{ versionItem.date }}</view>
				<view>
					<view v-for="(description, index) in versionItem.description">{{ index + 1 }}.{{ description }}
					</view>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script setup>
	import {
		onShareAppMessage
	} from '@dcloudio/uni-app';
	uni.showShareMenu({
		withShareTicket: true,
	});

	onShareAppMessage(() => ({
		title: '冒险岛GMS角色查询',
		path: `/pages/characterSearch/CharacterSearch`,
		imageUrl: 'https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/assets/images/maplestory-tools.png',
	}));

	const versionList = [{
			version: "1.2.1",
			date: "2023-11-01",
			description: [
				"更新公告"
			]
		},
		{
			version: '1.2.0',
			date: '2023-06-20',
			description: ['添加打炮，做菜图片'],
		},
		{
			version: '1.1.1',
			date: '2023-06-07',
			description: ['修复一些bug', '样式优化'],
		},
		{
			version: '1.1.0',
			date: '2023-06-06',
			description: [
				'用户体系，支持微信登录',
				'关注用户功能，不用每次都输入搜索',
				'分享角色到微信',
			],
		},
		{
			version: '1.0.0',
			date: '2023-05-30',
			description: ['查询功能demo'],
		},
	];
</script>

<style lang="scss" scoped>
	.about-container {
		padding: 8px;
		color: #0e0e0e;

		.version-contianer {
			margin-bottom: 8px;

			.version {
				margin-bottom: 4px;
				color: #000;
				font-weight: bold;
			}
		}
	}
</style>