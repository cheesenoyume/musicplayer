<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in lbt">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  <!-- 推荐歌单 -->
  <div id="recommendList">
    <ul>
      <h2>推荐歌单</h2>
      <li v-for="(item,index) in recoList" @click="toPlaylist(item.id)">
        <div class="img-container">
          <img :src="item.picUrl" alt="">
          <div class="imgDescri">{{item.name}}</div>
        </div>
      </li>
    </ul>
 </div>

  <!-- 最新音乐 -->
   <div id="newSongList">
    <ul>
      <h2>最新音乐</h2>
      <li v-for="(item,index) in newSong">
        <div class="img-container">
          <img :src="item.picUrl" alt="" @click="playSong(item.id)">
          <div class="imgDescri">{{item.name}}</div>
        </div>
      </li>
    </ul>
  </div>
    
  </div>
</template>

<script>
// import { getBanner, getPersonalizedPlaylist, getPersonalizedNewsong, getPersonalizedMv, getMusicUrl } from './network/request.js'

export default {
  name: 'discovery',
  data(){
    return {
      lbt:[],
      recoList:[],
      newSong:[],
      url:""
    }
  },
  methods:{
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    playSong(id){
      // console.log(id);
       this.$ajax.get('https://autumnfish.cn/song/url?id='+id).then(resp=>{
         this.url=resp.data.data[0].url;
        // console.log(resp.data.data[0].url);
        // app.vue中播放地址改变
        this.$parent.musicUrl = this.url;
        this.$router.push('/');
    },err=>err)
    }
  },
  created(){
    // banner接口
    this.$ajax.get('https://autumnfish.cn/banner').then(resp=>{
      this.lbt = resp.data.banners;
      // console.log(this.lbt);
    },err=>err),
    // 推荐歌单接口
    this.$ajax.get('https://autumnfish.cn/personalized?limit=8').then(resp=>{
      this.recoList = resp.data.result;
      // console.log(resp.data.result);   
    },err=>err),
    // 最新音乐
    this.$ajax.get('https://autumnfish.cn/personalized/newsong').then(resp=>{
      this.newSong = resp.data.result;
      // console.log(resp.data.result);   
    },err=>err)
  }
  
}
</script>

<style scoped>
.el-carousel{
  margin:20px 20px 0 20px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel img{
    width:550px;
    height:200px;
  }
  #recommendList{
    display:flex;
    margin:0 auto;
  }
  h2{
    margin-left:30px;
    margin-top:0;
  }
  #recommendList img{
    width:200px;
    height:200px;
  }
   #recommendList.imgDescri{
    margin:5px;
  }
   #recommendList .img-container{
    width:200px;
    height:250px;
    /* border:1px solid gray; */
    text-align:left;
  }

  li{
    float:left;
    margin:10px 30px;
    list-style-type: none;
    /* text-overflow:ellipsis; */
  }
   #newSongList .img-container{
    width:200px;
    height:150px;
    /* border:1px solid gray; */
    text-align:left;
  }
  #newSongList img{
     width:100px;
    height:100px;
  }
  #newSongList .imgDescri{
    margin:5px;
    width:90px;
     float:right;
     word-wrap:break-word;
  }
</style>
