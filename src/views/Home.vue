<template>
  <div class="home">
    <button @click="playFn()" class="button">播放</button>
    <button @click="shortCuts()" class="button">截图</button>
    <div style="font-size: 18px;">第一种方式： 方向键右→：快进5秒；方向键左←：后退5秒； 按键F：下一帧； 按键D：上一帧</div>
    <div style="font-size: 18px;">第二种方式： 操作以下按钮</div>
    <button @click="up()" class="button">上一帧</button>
    <button @click="down()" class="button">下一帧</button>
    <button @click="fastForward()" class="button">快进5秒</button>
    <button @click="fastBehind()" class="button">快退5秒</button>
    <div style="width:400px;height:300px;margin-bottom: 10px;">
        <x-video :videoshow="videoshow" ref="videos"></x-video>
    </div>
    <canvas style="margon-top:10px" width="600" height="400" id="myCanvas"></canvas>
  </div>
</template>

<script>
import xvideo from '../components/video'
import '../assets/js/videoFrame-new'
import dayjs from 'dayjs'

function VideoQueryWidth(){
    let height = $('.vq_video').height()
    $('.vq_video').css({
        width: this.isIE ? height*4/3 + 'px' : height*4/3 + 12 + 'px'
    })
}

export default {
  name: 'home',
  components: {
    'x-video':xvideo
  },
  data () {
    return {
      imgurl:"",
      isIE: (!!window.ActiveXObject || "ActiveXObject" in window),
      videoshow:false,
      url:"/static/views/common/videoFile/gongshi2.mp4",
      newVideo:null,
    }
  },
  created(){
    $(window).resize(VideoQueryWidth)
  },
  beforeDestroy(){
      this.$refs.videos && this.$refs.videos.stop()
      $(window).unbind('resize', VideoQueryWidth)
  },
  methods: {
    playFn(){
      this.videoshow = true;
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.$refs.videos.play({
              hls:  this.url,
              rtmp:  this.url,
              url: this.url
          },false);
          this.newVideo =  VideoFrame();
        },500)
      })
    },
    up(){
      this.newVideo.seekForward()
    },
    down(){
      this.newVideo.seekBackward()
    },
    fastForward(){
      let time = dayjs().format("2019-12-12" + this.newVideo.toTime())
      let seTime = dayjs(time).add(5, 'second')
      this.newVideo.seekTo({time:dayjs(seTime).format("HH:mm:ss")})
    },
    fastBehind(){
      let time = dayjs().format("2019-12-12" + this.newVideo.toTime())
      let seTime = dayjs(time).subtract(5, 'second')
      this.newVideo.seekTo({time:dayjs(seTime).format("HH:mm:ss")})
    },
    shortCuts() { // 截图
        const c = document.getElementById('myCanvas');
        const cxt = c.getContext('2d');
        const video = document.querySelector('video');
        cxt.drawImage(video, 0, 0, 400,300)
        this.imgurl = this.saveAsPNG(c);
        this.downLoad( this.imgurl)
    },
    saveAsPNG(canvas) { // 转为图片
        return canvas.toDataURL('image/png');
    },
    downLoad(url) { // 下载图片
        const oA = document.createElement('a');
        oA.download = '';// 设置下载的文件名，默认是'下载'
        oA.href = url;
        document.body.appendChild(oA)
        oA.click()
        oA.remove() // 下载之后把创建的元素删除=
    }
  },
}
</script>

<style lang="stylus" scoped>
.home
  width: 96%;
  height: 92%;
  text-align: left;
  padding: 2%;
.button {
    background: #205782;
    border: 1px solid #56c7e6;
    border-radius: 3px;
    height: 30px;
    line-height: 30px;
    width: 100px;
    color: #fff;
    cursor: pointer;
    font-size: 0.06rem;
    margin-left: 3px;
    margin-bottom: 5px;
}
</style>