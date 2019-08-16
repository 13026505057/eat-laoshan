<template>
   <!--  <p class="page-container">检测到该账号暂未绑定公众号</p> -->
   <div >
      <section ref="print">
          打印内容
          <div class="no-print">不要打印我</div>
      </section>
      <p class="page-container">无此权限操作</p>
      <div @click="print">打印</div>
      <!-- <p class="page-container1" @click="handleClick2">绑定公众号</p> -->
   </div>
</template>
<script type="text/javascript">
  
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
       
      };
    },
    methods: {
 
       print(){
        var self = this;
         self.$print(self.$refs.print)
        // setInterval(function(){
        //   // self.$print(self.$refs.print)
        // },5000)
         // 使用
       }, 
       handleClick2(){
        var name = JSON.parse(localStorage.getItem('XMusername'))
        var _this = this;
        this.$ajax({
            method: 'get',
            url: 'http://www.kofanchina.com/main.php/Home/Auth/forAuth'
            // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         }).then(function(data){
            console.log(data.data)
            window.location.href = data.data+'?username='+name+'%26authType=1';
         });
      },
    }
  }
</script>

<style  scoped>
    .page-container {
      margin-top: 100px;
        font-size: 24px;
        text-align: center;
        color: #F7BA2A;
    }
    .page-container1 {
      width: 200px;
      height: 60px;
      line-height: 60px;
      margin:0 auto;
      cursor:pointer;
      border:1px solid #fff;
      border-radius: 10px;
      margin-top: 100px;
        font-size: 24px;
        text-align: center;
        background-color: #13CE66;
        color: #fff;
    }
</style>