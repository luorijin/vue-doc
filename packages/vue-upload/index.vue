<template>
    <div class="vue-upload">
        <div class="upload-images">
            <div class="img" :class="file.status|fstyle" v-for="(file,index) in files" :key="file.name+index"  :style="{backgroundImage:'url('+file.src+')'}">
                <div class="wrap">
                    <span class="status">{{file.status | fsta}}</span>
                    <div v-show="file.status==2">点击重试</div>
                </div>
            </div>
        </div>
        <label class="add">
            <input type="file" accept="image/*" ref="file" @change="fileChanged" multiple>
        </label>
    </div>
</template>

<script>
export default {
    name:"vue-upload",
    data (){
        return {
            imgs:[],
            files:[]
        }
    },
    filters:{
        fsta(val){
            switch(val){
                case 0:
                    return '等待中';
                    break;    
                case 2:
                    return '上传失败'; 
                    break;
            }
        },
        fstyle(val){
             switch(val){
                case 0:
                    return 'wait';
                    break;
                case 1:
                    return 'sucess'; 
                    break;     
                case 2:
                    return 'error'; 
                    break;
            }
        }
    },
    methods:{
        fileChanged(){
            let list = [].slice.call(this.$refs.file.files);
            list.forEach(file => {
                let nFile = {
                    name:file.name,
                    Osize:file.size,
                    file:file,
                    type:file.type,
                    status:1,
                    src:this.fileToSrc(file)
                }
                this.files.push(nFile)
            });
        },
        compress(nFile){
            let scale = nFile.size/500*1024;
            if(scale>1&&/^image\/.+$/.test(nFile.type)){
                let canvas, ctx, img64;
                let img = new Image();
                img.src = nFile.src;
                img.onload=function(){
                    let width =  this.width/scale;
                    let height =  this.height/scale;
                    canvas = document.createElement('canvas');        
                    canvas.width = width;
                    canvas.height =height;
                            
                    ctx = canvas.getContext("2d");        
                    ctx.drawImage(img, 0, 0, width, height);
                            
                    img64 = canvas.toDataURL("image/jpeg");
                }
            }else{

            }

        },
        dataURLtoBlob(dataurl) {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
            }
            return new Blob([u8arr], {type: mime})
        },
        upload(file){

        },
        fileToSrc(blob){
            return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
        }

    }
}
</script>

<style lang="less">
    @size:4rem;
    .vue-upload{
        input[type=file]{
            display: none;
        }
        .upload-images{
            display: inline-block;
            overflow: hidden;
            .img{
                position: relative;
                float: left;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.6rem;
                width: @size;
                height: @size;
                border-radius: 0.2rem;
                background-color: #f4f4f4;
                background-size: cover;
                background-position: center center;
                &.wait,&.error{
                    &::before{
                        content:"";
                        position: absolute;
                        top:0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        z-index: 1;
                        background:#333;
                        opacity: 0.3;
                    }
                }
                &.wait{
                    color: #fff;
                }
                &.error{
                    color: #f00;
                }
                .wrap{
                    position: relative;
                    z-index: 2;
                }
                + .img{
                    margin-left: 0.3rem;
                }
            }
        }
        .add{
            cursor: pointer;
            display: inline-block;
            vertical-align: top;
            width: @size;
            height: @size;
            border-radius: 0.2rem;
            text-align: center;
            line-height: @size;
            font-size: 0;
            border:1px solid #f4f4f4;
            margin-left: 0.3rem;
            &::after{
                display: inline-block;
                content:"+";
                font-size: 2rem;
            }
        }
    }
</style>
