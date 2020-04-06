<template>
  <div id='navpart'>
    <h2>{{queryName}}</h2>
    <!-- <p>共<span>{{all}}</span>个结果</p> -->
   <hr>
      <!-- tab切换 -->
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="歌曲" name="first">
      <!-- 页面 -->
 <table>
   <tr class="thead">
     <th class="cla">标题</th>
     <th class="cla">歌名</th>
     <th class="cla">专辑</th>
   </tr>
   <tr v-for="item in songList" @click="playSong(item.id)" class="change">
     <td>
        <span class="cla">{{item.name}}</span>
     </td>
         <td>
        <span class="cla">{{item.artists[0].name}}</span>
     </td>
       <td>
        <span class="cla">{{item.album.name}}</span>
     </td>
   </tr>
 </table>
    </el-tab-pane>
    <!-- 分页，第二页 -->
    <el-tab-pane label="歌单" name="second">
       <div id="recommendList">
    <ul>
      <li v-for="(item,index) in songList"@click="toPlaylist(item.id)" >
        <div class="container">
          <div class="title">{{item.album.name}}</div>
          <div class="content">{{item.name}}</div>
        </div>
      </li>
    </ul>
 </div>
    </el-tab-pane>
  </el-tabs>
  
  <!-- 分页 -->
  <!-- <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
  </el-pagination> -->
  </div>
</template>

<script>

export default {
  name: 'navpart',
  data(){
    return {
        queryName:"搜索",
        activeName: 'first',
        songList:[],
        all:0
    }
  },
  created(){
      this.queryName = this.$route.query.q;
      this.getSong(1);
  },
  watch:{
    activeName(){
      if(this.activeName==1){
          this.getSong(1);
      }else if(this.activeName==2){
          this.getSong(1000);
      }
     
    }
  },
  methods: {
     toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
     playSong(id){
      var url = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
      this.$parent.musicUrl=url;
    },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async getSong(type){
        this.$ajax.get('https://autumnfish.cn/search?limit=15&keywords='+this.queryName+'&type='+type).then(res=>{
        // console.log(res)
        // alert(this.queryName)
      
        this.songList = res.data.result.songs

        // this.all=res.data.result.songCount;
          // console.log(res.data)
    },err=>{})
      }
    } 

}
</script>

<style scoped>
h2{
  margin-left:50px;
}
.el-tabs{
  margin-left:50px;
}
.thead{
  font-weight: bold;
}
.cla{
  width:300px;
  margin:10px;
  text-align: center;
  /* border:1px solid gray; */
}
td,span{
  vertical-align: middle;
}
span{
  display:inline-block;
}
.el-pagination{
text-align: center;
margin:20px auto;
}
tr{
  width:1000px;
  height:20px;
  border:1px solid gray;
}
.change:hover{
  transform:scale(1.03);
  background-color: #f0eeee;
}
p{
  margin-left:50px;
}
#recommendList li{
  width:800px;
  height:70px;
  border:1px solid gray;
  margin:30px;
  list-style-type: none;
  padding:30px;
}
.title{
  font-weight: bold;
  font-size:20px;
}
.content{
  color:#cccccc;
}
#recommendList li:hover{
    transform:scale(1.1);
}
</style>

