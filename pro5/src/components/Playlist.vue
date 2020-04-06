<template>
  <div id='playlist'>
      <div class="header"> 
        <img :src="item.coverImgUrl" alt="">
        <div class="container">
            <h2>{{item.name}}</h2>
            <p><span class="name">{{item.creator.nickname}}</span>   创建</p>
            <p>标签: <span class='tag' v-for="a in item.tags">{{a}}</span></p>
            <p>简介: <span class="desc">{{item.description.slice(0,220)+'...'}}</span></p>
        </div>
      </div>
      <!-- <hr> -->
      <!-- 歌曲详情 -->
      <ul>
         <li v-for="i in playlist">
      <div class="single"  @click="playSong(i.id)"> 
        <div class="imgDetail"> <img :src="i.al.picUrl" alt=""></div>  
        <div class='detail2'><p>{{i.name}}</p> </div>
        <div class='detail'>  <p>{{i.ar[0].name}}</p></div>
        <div class='detail2'> {{i.al.name}}</div>  
        <div class='detail'> {{i.dt | playTimeFormat}}</div>
      </div>
    </li>
      </ul>
  </div>
</template>

<script>

export default {
  name: 'playlist',
  data(){
    return {
      id:0,
      item:{creator:[],description:'s'},
      playlist:[]
    }
  },
  created(){
     this.id = this.$route.query.id;
     this.getData();
  },
  methods: {
    playSong(id){
      var url = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
      this.$parent.musicUrl=url;
    },
    async getData(){
      this.$ajax.get('https://autumnfish.cn/playlist/detail?id='+this.id).then(res=>{
        // alert("sfd");
        this.item = res.data.playlist;
        this.playlist = this.item.tracks;
        // console.log(this.item);
      },err=>err)
    }
  }

}
</script>

<style scoped>
img{
  float:left;
  width:250px;
  height:250px;
  margin:auto 20px;
}
.container{
  margin:20px;
  width:1000px;
  height:250px;
  /* border:1px solid gray; */
}
.header{
  margin-bottom:70px;
}
.name{
  font-weight: bold;
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
.single img{
  width:100px;
  height:100px;
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
.single p{
  display:inline-block;
   vertical-align:middle; 
}
.single:hover{
  background-color: #cccccc;
}
</style>

