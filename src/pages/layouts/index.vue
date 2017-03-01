<template>
	<div class="layout">
		<LayoutHeader />
		<el-row class="body">
			<el-col :span="6" class="bodyCol">
				<LayoutNav />
			</el-col>
			<el-col :span="18" class="bodyCol">
				<div class="container">
					<router-view />
				</div>
			</el-col>
		</el-row>
		<LayoutFooter />
	</div>
</template>

<script>
	import LayoutHeader from './components/header';
	import LayoutFooter from './components/footer';
	import LayoutNav from './components/nav';

	export default {
		data() {
			return {}
		},
		components: {
		    LayoutHeader,
		    LayoutFooter,
		    LayoutNav,
		},
	}
</script>

<style>
	html,body{
		padding:0;
		margin:0;
		width:100%;
		height:100%;
	}
	body {
	  font-family: Helvetica, sans-serif;
	}
	#app{
		width:100%;
		height:100%;
	}
	.example-tips{
		text-align: center;
		color:#fff;
		font-size:48px;
		line-height: 80px;
	}
</style>

<style scoped>
	.layout{
		width:100%;
		height:100%;
		position:relative;
	}
	.bodyCol{
		height:100%;
	}
	.container{
		box-sizing: border-box;
		width:100%;
		height:100%;
		overflow: auto;
		padding:20px;
	}
</style>