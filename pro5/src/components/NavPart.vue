<template>
  <div id='navpart'>
  <ul>
    <li class="li1"><router-link to="/">发现音乐</router-link></li>
    <li><router-link to="/playlists">推荐歌单</router-link></li>
    <li><router-link to="/songs">最新音乐</router-link></li>
  </ul>
  
  </div>
</template>

<script>

export default {
  name: 'navpart',
  data(){
    return {

    }
  }

}
</script>

<style>
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
#navpart{
  margin:0;
  /* float:left; */
  width:200px;
  background-color: #f1e8e8;
  border:1px solid #f1e8e8;
  display:table-cell;
}
a{
 text-decoration: none;
 color:black;
}
</style>
<style scoped>
li{
  list-style-type:none;
  margin:30px;
  text-decoration: none;
}
ul li:first-child:before{
  font-family:"iconfont";
  content:"\e680";
  padding:5px;
}
ul li:nth-child(2)::before{
  font-family:"iconfont";
  content:"\e600";
  padding:5px;
}
ul li:nth-child(3)::before{
  font-family:"iconfont";
  content:"\e6a1";
  padding:5px;
}
ul li:nth-child(4)::before{
  font-family:"iconfont";
  content:"\e60d";
  padding:5px;
}
</style>

