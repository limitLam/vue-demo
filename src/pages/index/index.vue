<template>
	<div>
		<el-button type="primary" @click="getData">取数据</el-button>
		<p>{{ content }}</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				content : ''
			}
		},
		methods: {
			getData() {
				if(this.content != ''){
					return false;
				}
				this.$http.get('/api/limitTest').then((res) => {
					let response = res.body;
					this.content = response.message;
				}).catch((res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style>

</style>

<style scoped>

</style>