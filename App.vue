<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';

	export default {
		onLaunch: async function() {
			await uniIdPageInit()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>