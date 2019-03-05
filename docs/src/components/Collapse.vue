<template>
	<div class="collapse">
		<div class="collapse-title" @click="slideToggle">
			<slot name="title"></slot>
		</div>
		<div class="collapse-content" :style="{'height':height}">
			<div ref="content">
				<slot name="content"></slot>
			</div>
		</div>
	</div>	
</template>

<script>
export default {
  name: 'Collapse',
  data () {
    return {
      open:true,
      height:"auto",
    }
  },
  methods:{
  	slideToggle(){
  		if(this.open){
  			this.height="0px";
  			this.open=false;
  		}else{
  			this.open=true;
  			this.height="0px";
  			this.height=this.$refs.content.offsetHeight+"px";
  		}
  	}
  },
  mounted(){
  	this.$nextTick(()=>{
  		this.height=this.$refs.content.offsetHeight+"px";
  	})
  }
}
</script>
<style lang="less">
   @import "~@/src/less/var.less";
	.collapse-title{
		height: 2rem;
		padding-left: 1rem;
		line-height: 2rem;
		cursor: pointer;
	}
	.collapse-content{
		padding-left: 2rem;
		color:#666;
		overflow: hidden;
		transition:height .1s ease-out;
	}
	.collapse-content ul li{
		padding: .5rem 0;
		cursor: pointer;
		&:hover{
			color:@themeColor;
		}
	}
</style>