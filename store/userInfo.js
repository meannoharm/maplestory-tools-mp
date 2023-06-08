import {
	defineStore
} from 'pinia';

const db = uniCloud.database();
const uniIdCo = uniCloud.importObject('uni-id-co');

export const useUserInfoStore = defineStore('userInfo', {
	state: () => ({
		followCharacterList: [],
		userInfo: {},
		isLogin: false,
	}),
	actions: {
		getFollowCharacterList() {
			db.collection('maplestory-follow-characters')
				.where("follow_uid==$cloudEnv_uid").get()
				.then(({
					result
				}) => {
					if (!result.errCode) {
						this.followCharacterList = result.data;
					}
				}).catch((err) => {
					console.log(err.code);
					console.log(err.message);
				})
		},
		followCharacter(name, region) {
			db.collection('maplestory-follow-characters')
				.add({
					character_name: name,
					character_region: region
				})
				.then(() => {
					uni.showToast({
						title: '关注成功'
					})
					this.getFollowCharacterList();
				}).catch((err) => {
					console.log(err)
					uni.showModal({
						content: err.message || '关注失败',
						showCancel: false
					})
				})
		},
		unFollowCharacter(name, region) {
			db.collection('maplestory-follow-characters')
				.where(`follow_uid==$cloudEnv_uid&&character_name=="${name}"&&character_region=="${region}"`)
				.remove().then(() => {
					uni.showToast({
						title: '取消关注成功'
					})
					this.getFollowCharacterList();
				}).catch((err) => {
					uni.showModal({
						content: err.message || '取消关注失败',
						showCancel: false
					})
				});
		},
		login() {
			uni.navigateTo({
				url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
			})
		},
		async logout() {
			// 1. 已经过期就不需要调用服务端的注销接口	2.即使调用注销接口失败，不能阻塞客户端
			if (uniCloud.getCurrentUserInfo().tokenExpired > Date.now()) {
				try {
					await uniIdCo.logout();
				} catch (e) {
					console.error(e);
				}
			}
			this.isLogin = false;
			uni.removeStorageSync('uni_id_token');
			uni.setStorageSync('uni_id_token_expired', 0);
			uni.showToast({
				title: '退出成功',
				icon: 'none'
			})
		}
	},
});
