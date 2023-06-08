<template>
	<view class="about-container">

		<rich-text :nodes="nodes">
		</rich-text>

	</view>
</template>

<script setup>
	import {
		marked
	} from 'marked';

	const nodes = marked(`
### 关于我

- 我是 **RebornMaster** 家族的 **Rossciaco**
- 为爱发电的小程序，以后可能会添加其他更多实用的功能
- 如果觉得好用的话，可以带带我h4m

### 更新日志

#### v1.1.1 2023-06-07 
1. 修复一些bug
2. 样式优化

#### v1.1.0 2023-06-06 
1. 用户体系
2. 关注用户功能，不用每次都输入搜索
3. 分享角色到微信

#### v1.0.0 2023-05-30 
- 查询功能demo

`)
</script>

<style lang="scss" scoped>
	.about-container {
		padding: 8px;
	}
</style>