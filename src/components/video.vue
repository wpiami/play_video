<template>
    <div class="video" :id="'video_' + random">
    </div>
</template>

<script>
import '../assets/js/videoControl'

export default {
    name: 'xvideo',
    props: {
       show:{
           type: Boolean,
           default: true
       }
    },
    data(){
        return {
            videoshow:true,
            isIE: (!!window.ActiveXObject || "ActiveXObject" in window),
            random: Math.random().toString(),
            player: null,
            url: ''
        }
    },
    mounted(){
        let self = this;
        setTimeout(()=>{
            try {
                self.$refs.video.Stop()
            } catch (e) {
                self.videoshow = false;
            }
        },1000)
        
    },
    methods: {
        play(obj, isLive = true){
            // let flashUrl = obj.rtmp || obj.hls;
            let flashUrl = obj.hls || obj.rtmp;
            if( !obj.rtmp && !obj.hls) return;
            //let isLive = true;
            let videoObject = {
                playerID: this.random,
                container: '#video_' + this.random ,//“#”代表容器的ID，“.”或“”代表容器的class
                letiable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
                width:"100%",
                height:"100%",
                autoplay:true,
                html5m3u8:true,
                bufferTime: 2000,
                live: isLive, //是否是直播
                logoShow:false,
                seek:0,
                video: flashUrl ,//视频地址,
                //videoUrl:videoUrl
            };
            this.url = flashUrl;
            if(this.player == null){
                this.player = new ckplayer(videoObject);
            }else{
                try{
                    this.player.videoClear();
                }catch(e){}
                
                this.player.hlsTemp && 
                this.player.hlsTemp.destroy()
                this.player = new ckplayer(videoObject);
            }
            
        },
        stop(){
            this.url = '';
            if(this.player != null){
                this.player.videoClear &&
                this.player.videoClear();
                this.player.hlsTemp && 
                this.player.hlsTemp.destroy()
            }
        },
        download(){
        }
    }
    
}
</script>

<style lang="stylus" scoped>
.video
    width 100%
    height 100%
    background #313131
    position relative
    font-size 12px
    
</style>
