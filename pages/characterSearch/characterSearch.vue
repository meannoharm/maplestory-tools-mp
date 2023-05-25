<template>
	<view class="character-search-container">
		<uni-easyinput placeholder="角色名称" v-model="inputValue"></uni-easyinput>
		<view class="auto-complete-list-container">
			<view class="auto-complete-item"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { watch, ref } from 'vue';
	import {
		getCharacterInfo,
		getAutoCompleteList
	} from "../../api";

	const inputValue = ref("")

	watch(inputValue, () => {
		console.log(123)
		getAutoCompleteList(inputValue.value).then(res => {
			console.log(res)
		}).catch(e => {
			console.error(e)
		})
	})
</script>

<style lang="less">

</style>