<template>
	<div class="demo-block">
		<div class="header">
			<span class="description">
				<slot name="title"></slot>
			</span>
			<div class="button">
				<i class="ion ion-code" @click="sourceSlide"></i>
				<i class="copy ion ion-clipboard" @click="clip">
					<pre  ref="copy"><code><slot></slot></code></pre>
				</i>
			</div>
		</div>
		<div class="source" :style="{'height':height}">
			<div ref="source">
				<div class="description">
					<slot name="description"></slot>
				</div>
				<div class="code">
					<slot name="source"></slot>
				</div>
			</div>
		</div>
		<div class="example">
			<slot name="example"></slot>
		</div>
	</div>
</template>
<script>
	import Clipboard from 'clipboard';
	export default{
		data(){
			return {
				open:false,
				height:0,
			}
		},
		props:['code'],
		methods:{
			sourceSlide(){
				this.open=!this.open;
			},
			clip(){
				var code=this.$refs.copy.innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g, '>')
				console.log(code)
				const clipboard = new Clipboard('.copy', {
                    text () {
                        return code;
                    }
                });
			    //优雅降级:safari 版本号>=10,提示复制成功;否则提示需在文字选中后，手动选择“拷贝”进行复制
			    clipboard.on('success', function(e) {
			        alert('复制成功!')
			        clipboard.destroy();
			    });
			    clipboard.on('error', function(e) {
			        alert('请选择“拷贝”进行复制!')
			    });
			}
		},
		watch:{
			'open'(val){
				if(val){
					this.height=this.$refs.source.offsetHeight+"px";
				}else{
					this.height="0px";
				}
			}
		},
		mounted(){
			console.log(this.$refs.copy.innerHTML);
		}
	}
</script>
<style lang="less">
	@exampleBorder:#ebebeb;
	.demo-block{
	    border: 1px solid @exampleBorder;
	    border-radius: 3px;
	    margin-bottom: 2.5rem;
	    transition: .2s;
	    &:hover{
	    	box-shadow: 0 0 5px @exampleBorder;
	    }
	    .header{
	    	height: 2rem;
	    	border-bottom: 1px solid @exampleBorder;
	    	.description{
	    		display: inline-block;
	    		padding-left: 1rem;
	    		line-height: 2rem;
	    		color: #5e6d82;
	    	}
	    	.button{
	    		height: 100%;
	    		float: right;
	    		&:after{
	    			display: inline-block;
	    			vertical-align: middle;
	    			content:"";
	    			height: 100%;
	    			width: 0;
	    		}
	    		i{
	    			cursor: pointer;
	    			margin-right: .8rem;
	    			font-size: 1rem;
	    			color: #333;
	    			display: inline-block;
	    			vertical-align: middle;
	    		}
	    	}
	    }
	    .example{
	    	padding: 1rem;
	    }
	    .source{
	    	background: #fafafa;
	    	transition: height .2s linear;
	    	overflow: hidden;
	    	.description{
	    		margin: 0.5rem;
	    		background: #fff;
	    		padding: 0.5rem;
	    		font-size: 0.65rem;
	    		border-radius: 3px;
	    		p{
	    			margin: 0;
	    		}
	    		code{
	    			margin: 0 4px;
	    		}
	    	}
	    	.code pre{
	    		background: none;
	    		padding-top: 0;
	    	}
	    }
	}
	.copy pre{
		display: none;
	}
</style>