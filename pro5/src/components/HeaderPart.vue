<template>
  <div id='headerpart'>
    <div id="appName"><router-link to="/">小李云音乐</router-link> </div>
    <!-- 搜索框按下回车跳转到搜索页面 -->
    <div id="searchBar"> <label for=""></label><input type="text" id="search" v-model="inputValue" @keyup.enter="toSearch(inputValue)"><button @click="toSearch(inputValue)"></button></div>
  </div>
</template>

<script>

export default {
  name: 'headerpart',
  data(){
    return{
      inputValue:""
    }
  },
  methods:{
    toSearch:function(value){
      // 判断输入为空？
      if(value==''){
        alert("请输入内容！")
      }else{
        // this.$router.push("/results").catch(err => err);
        this.$router.push("/results?q="+value).catch(err => err);
      }
    }
  }

}
</script>


<style scoped>
@font-face {
  font-family: 'iconfont';
  src: url('iconfont/iconfont.eot');
  src: url('iconfont/iconfont.eot?#iefix') format('embedded-opentype'),
      url('iconfont/iconfont.woff2') format('woff2'),
      url('iconfont/iconfont.woff') format('woff'),
      url('iconfont/iconfont.ttf') format('truetype'),
      url('iconfont/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#headerpart{
  margin:0;
  width:100%;
  height:50px;
  background-color:blue;
  border:1px solid blue;
  text-align:center;
  vertical-align: middle;
  border-radius:7px 7px 0 0 ;
}
#appName{
  float:left;
  width:200px;
  height:50px;
  line-height:50px;
  font-size:20px;
}
#appName::before{
  font-family:"iconfont";
  content:"\e697";
  padding:5px;
  font-size:20px;
  }
#searchBar{
  display:flex;
  vertical-align: middle;
  display:table-cell;
  padding:15px;
}
#search{
  position:relative;
  height:20px;
  border-width:0;
  border-radius:5px 0 0 5px;
}
button{
  width:25px;
  height:22px;
  vertical-align: middle;
  background-color: white;
  border:white;
  border-radius:0 5px 5px 0;
}
button::before{
  font-family:"iconfont";
  content:"\e61c";
  font-size:15px;
}

a{
 text-decoration: none;
 color:black;
}
</style>

