import {
	defineStore
} from 'pinia';
import {
	JQLTokenErrorCode
} from '/constant/index.js'

const db = uniCloud.database();
const uniIdCo = uniCloud.importObject('uni-id-co');
const hostUserInfo = uni.getStorageSync('uni-id-pages-userInfo') || {}

export const useUserInfoStore = defineStore('userInfo', {
	state: () => ({
		isFollowListLoading: false,
		followCharacterList: [],
		userInfo: hostUserInfo,
		isLogin: Object.keys(hostUserInfo).length != 0,
	}),
	actions: {
		getFollowCharacterList() {
			this.isFollowListLoading = true;
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
					uni.showModal({
						content: err.message || '关注失败',
						showCancel: false
					})
					if (JQLTokenErrorCode.includes(err.code)) {
						this.clearUserInfo();
					}
				}).finally(() => this.isFollowListLoading = false)
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
					if (JQLTokenErrorCode.includes(err.code)) {
						this.clearUserInfo();
					}
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
					if (JQLTokenErrorCode.includes(err.code)) {
						this.clearUserInfo();
					}
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
			this.clearUserInfo();
			uni.removeStorageSync('uni_id_token');
			uni.setStorageSync('uni_id_token_expired', 0);
			uni.showToast({
				title: '退出成功',
				icon: 'none'
			})
		},
		clearUserInfo() {
			this.isLogin = false;
			this.userInfo = {}
		}
	},
});