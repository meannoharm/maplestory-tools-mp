<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.cloud.init({
				env: "maplestory-tool-2gb1dfhgc2f90e12",
				traceUser: true
			})
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
