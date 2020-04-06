<template>
  <div class="songs-container">
    <!-- 歌曲分类 -->
  <div id="cat">
      <ul>
      <li v-for="(item,index) in cat">
        <span @click="catIndex=index" :class="{active:catIndex==index}">{{item}}</span></li>
      </ul>
    </div>
 
  <!-- 歌曲详情 -->
    <li v-for="item in playlist">
      <div class="single"  @click="playSong(item.id)"> 
        <div class="imgDetail"> <img :src="item.album.picUrl" alt=""></div>  
        <div class='detail2'><p>{{item.name}}</p> </div>
        <div class='detail'>  <p>{{item.artists[0].name}}</p></div>
        <div class='detail2'> {{item.album.name}}</div>  
        <div class='detail'> {{item.duration | playTimeFormat}}</div>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
// import { getNewSongs, getMusicUrl } from './network/request'

export default {
  name: 'songs',
  data(){
    return{
      catIndex:0,
      catStr:"全部",
      cat:["全部","欧美","华语","日本","韩国"],
      catNum:[0,96,7,8,16],
      playlist:[]
    }
  },
  methods:{
    playSong(id){
      var url = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
      this.$parent.musicUrl=url;
    },
    async getList(){
      this.$ajax.get('https://autumnfish.cn/top/song?type='+this.catNum[this.catIndex]).then(res=>{
      // console.log(this.catNum[this.catIndex])
        this.playlist=res.data.data.slice(1,20);
        // console.log(res.data.data.slice(1,10));
    },err=>{})
    }
  },
  watch:{
    catIndex(){
      this.getList();
    }
  },
  created(){
    this.getList();
  }
 
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  padding:0;
  margin:0;
}
#cat ul{
  float:right;
  margin-right:50px;
  font-weight:bold;
  padding:0;
  margin-top:0;
}
#cat ul li{
  float:left;
  margin:30px;
}
.songs{
  margin-top:100px;
}
span.active{
  color:blue;
}
img{
  width:80px;
  height:80px;
  vertical-align: middle;
}
li{
  list-style-type: none;
  /* overflow:hidden; */
}
.single{
  width:1000px;
  height:80px;
  border:1px solid gray;
  margin:30px auto;
  display:table;
}
.imgDetail{
  float:left;
}

.detail{
   /* float:left; */
   height:80px;
   /* line-height:80px; */
   margin-left:10px;
   /* border:1px solid gray; */
   width:150px;
    display:table-cell;
    vertical-align:middle;
   /* text-overflow: ellipsis; */
}
.detail2{
   /* float:left; */
   height:80px;
   /* line-height:80px; */
   margin-left:10px;
   display:table-cell;
   vertical-align:middle;
   /* border:1px solid gray; */
   width:240px;
   /* text-overflow: ellipsis; */
}
.detail1,.detail2{
  overflow:hidden;
}
p{
  display:inline-block;
   vertical-align:middle; 
}
.single:hover{
  background-color: #f0eeee;
}
</style>
