<template>
  <div id="app">
  <headerpart></headerpart>
  <div id="main">
    <navpart id='navpart'></navpart>
    <router-view id="router-view"></router-view>
<!-- 播放音乐 -->
    <div class="playMain">
    <audio :src="musicUrl" controls autoplay></audio>
  </div>
  </div>
  </div>
</template>

<script>
import HeaderPart from './components/HeaderPart.vue'
import NavPart from './components/NavPart.vue'

export default {
  name: 'App',
  data(){
    return{
      musicUrl:""
    }
  },
  components: {
    "headerpart":HeaderPart,
    "navpart":NavPart
  }
}
</script>

<style>
#main{
  display:flex;
}
#navpart{
  width:200px;
}
#router-view{
  flex:1;
  /* border: 1px solid red; */
  /* height:830px; */
  display:table-cell;
}
.playMain{
  position:fixed;
  width:200px;
  bottom:0;
}
</style>
