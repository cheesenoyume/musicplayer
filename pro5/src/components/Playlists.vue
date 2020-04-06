<template>
  <div class="playlists-container">
    <!-- 顶部图 -->
    <div id="toppicture">
      <img class="img1" :src="toppicture.coverImgUrl" alt="">
      <div class="imgDescri">{{toppicture.name}}</div>
      <div class="imgDescri2">{{toppicture.description.slice(0,200)+"..."}}</div>
        <img :src="toppicture.coverImgUrl" alt="" class="bg" />
        <div class="bg-mask"></div>  
    </div>
    <!-- 歌曲分类 -->
    <div id="cat">
      <ul>
      <li v-for="item in cat">
        <span @click="catStr = item,tag=item" :class="{active:catStr===item}">{{item}}</span></li>
      </ul>
    </div>
    <!-- 歌单 -->
   <div id="recommendList">
    <ul>
      <h2>{{tag}}</h2>
      <li v-for="(item,index) in playlist" @click="toPlaylist(item.id)">
        <div class="img-container">
          <img :src="item.coverImgUrl" alt="">
          <div class="imgDescri">{{item.name}}</div>
        </div>
      </li>
    </ul>
 </div>
 <!-- 分页 -->
<el-pagination
  @current-change="handleCurrentChange"
  background
  layout="prev, pager, next"
  :total="total"
  :current-page="pageNum" 
  :page-size="pageSize">>
</el-pagination>
   </div>
</template>

<script>
// import { getTopPlaylist, getPalylist } from './network/request'

export default {
  name: 'recommend',
  data(){
    return{
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 12,
       toppicture:{
         //不写会报错Undefined
         description:"描述"
       },
       playlist:[],
       cat:["欧美","华语","流行","说唱"],
       catStr:'欧美',
       tag:"推荐歌单"
    }
  },
  methods:{
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    async handleCurrentChange(val){
      this.pageNum = val;
      // console.log(this.pageNum);
      // 重新获取数据
      this.AllData();
      //返回顶部
      document.documentElement.scrollTop = 0;
    },
      async topData(){
         this.$ajax.get('https://autumnfish.cn/top/playlist?limit=1&cat='+this.catStr).then(res=>{
        this.toppicture=res.data.playlists[0];
        // console.log(this.toppicture)
    },err=>{})
      },
      async AllData(){
        this.$ajax.get('https://autumnfish.cn/top/playlist?limit=12&cat='+this.catStr+"&offset="+12*(this.pageNum-1)).then(res=>{
        // console.log('https://autumnfish.cn/top/playlist/highquality?limit=10&cat='+this.catStr+"&offset="+10*(this.pageNum-1))
        
        this.playlist=res.data.playlists;
        this.total = res.data.total;
        // console.log( this.total)
      },err=>{})
      }
  },
  watch:{
    catStr(){
      this.topData();
      this.AllData();
      this.pageNum=1;
    }
  },
   async created(){
       this.topData();
      this.AllData();
  }
 
  }
</script>

<style scoped>
.el-pagination{
  float:left;
  text-align:center;
  margin:30px 320px;
}
#toppicture{
  position:relative;
  border:1px solid gray;
  width:100%;
  height:200px;
  color:white;
}
#toppicture .img1{
  float:left;
  width:160px;
  height:160px;
  margin:20px;
}
#toppicture .imgDescri{
  /* float:left; */
  margin:20px;
  font-size:25px;
  /* text-overflow:ellipsis; */
}
#toppicture .imgDescri2{
  font-size:15px;
}
#cat{
  float:right;
  margin-right:50px;
  font-weight:bold;
  color:blue;
}
#cat span.active{
  color:black;
}
 #recommendList{
    /* display:flex; */
    float:left;
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
  /* 背景图 */
  #toppicture .bg {
  width: 100%;
  height:200px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  filter: blur(20px);
}

#toppicture .bg-mask {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
