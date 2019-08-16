<template>
   <div class="box">
       <div class="right">
          <!--  <div class="rightTop">
               <div class="littleBox" @click="newsClick()">
                   <div class="leftIcon" style="background-color: #fe5c45;">
                       <i class="el-icon-bell"></i> <span style="margin-left: 10px; font-size: 20px;">{{numInfo.warnMsgCount}}</span>
                   </div>
                   <div class="rightTitle">
                       告警提示
                   </div>
               </div>
               <div class="littleBox" @click="shenpiClick()">
                   <div class="leftIcon" style="background-color: #fa9801;">
                       <i class="el-icon-date"></i> <span style="margin-left: 10px; font-size: 20px;">{{numInfo.noneCaseCount}}</span>
                   </div>
                   <div class="rightTitle">
                       待入库卷宗
                   </div>
               </div>
               <div class="littleBox" @click="jieshouClick()">
                   <div class="leftIcon" style="background-color: #74c810;">
                       <i class="el-icon-sort"></i> <span style="margin-left: 10px; font-size: 20px;">{{numInfo.woutCaseCount}}</span>
                   </div>
                   <div class="rightTitle">
                       待出库卷宗
                   </div>
               </div>
               <div class="littleBox" @click="newsClick()">
                   <div class="leftIcon" style="background-color: #1fb8a4;">
                       <i class="el-icon-refresh"></i> <span style="margin-left: 10px; font-size: 20px;">{{numInfo.noticeMsgCount}}</span>
                   </div>
                   <div class="rightTitle">
                       通知消息
                   </div>
               </div>
           </div> -->
           <!-- <div class="rightCenter">
               <div class="table" style="overflow-y:scroll;">
                    <div class="tableTop">
                        系统公告
                    </div>
                    <div class="tableBody" v-for="item in msgList" >
                        {{item.msg_content}}<span style="margin-right:10px;float: right;">{{item.msg_time}}</span>
                    </div>
                   
               </div>
               <div class="table">
                    <div class="tableTop">
                        涉案财物统计
                    </div>
                    <div class="tableBody" style="text-align:center;">
                        {{monthStr}}月份涉案财物统计
                    </div>
                    <div class="tableBody2">
                        在库案件
                    </div>
                    <div class="tableBody2">
                        入库案件
                    </div>
                    <div class="tableBody2">
                        出库案件
                    </div>
                    <div class="tableBody2" style="border-right:none;">
                        入库告警案件
                    </div>
                    <div class="tableBody2" style="color:#71b7db;">
                        {{numInfo.inCaseCount}}
                    </div>
                    <div class="tableBody2" style="color:#71b7db;">
                        {{numInfo.inCasesMonth}}
                    </div>
                    <div class="tableBody2" style="color:#71b7db;">
                        {{numInfo.outCaseCount}}
                    </div>
                    <div class="tableBody2" style="border-right:none;color:#71b7db;">
                        {{numInfo.nonoWarnCount}}
                    </div>
                    <div class="tableBody2">
                        待入库案件
                    </div>
                    <div class="tableBody2">
                        待出库案件
                    </div>
                    <div class="tableBody2">
                        待归还案件
                    </div>
                    <div class="tableBody2" style="border-right:none;">
                        出库告警案件
                    </div>
                    <div class="tableBody2" style="color:#71b7db;">
                        {{numInfo.noneCaseCount}}
                    </div>
                    <div class="tableBody2" style="color:#71b7db;">
                        {{numInfo.woutCaseCount}}
                    </div>
                    <div class="tableBody2" style="color:#71b7db;">
                        {{numInfo.outCaseCount}}
                    </div>
                    <div class="tableBody2" style="border-right:none;color:#71b7db;">
                        {{numInfo.woutWarnCount}}
                    </div>
               </div>
           </div> -->
            <div class="rightCenter">
               <div class="table" style="width: 100%;height:400px;">
                    <div class="tableTop">
                        就餐人数按月统计
                    </div>
                    <div id="myEchars1" style="width:100%;height:90%; float:left;"></div>
                    
               </div>
               <div class="table" style="width: 100%;height:400px;">
                    <div class="tableTop">
                        违规就餐人数按月统计
                    </div>
                    <div id="myEchars2" style="width:100%;height:90%; float:left;"></div>
                    
               </div>
               <!-- <div class="table" style="width: 100%;height:400px;">
                    <div class="tableTop">
                        入库案件按时间统计
                    </div>
                    <div id="myEchars3" style="width:100%;height:90%; float:left;"></div>
                    
               </div>
               <div class="table" style="width: 100%;height:400px;">
                    <div class="tableTop">
                        出库案件按时间统计
                    </div>
                    <div id="myEchars4" style="width:100%;height:90%; float:left;"></div>
               </div> -->
           </div>
       </div>
   </div>
</template>

<script>
     import Schart from 'vue-schart';
    var echarts = require('echarts');
    export default {
  name: 'hello',
  data () {
    return {
      numInfo:{},
      msgList:[],
      monthStr:'',
      status_in:'0',
      flow_in:'0',
      flow_out: "0",
      exhibit_expir: "0",
      guizhong: "0",
      dupin: "0",
      qiangzhi: "0",
      weihua: "0",
      newsNum:'',
      needAcceptNum:'',
      needApproveNum:'',
      msg: 'Welcome to Your Vue.js App',
      idArr:[1,2,3,4,5,6],
      dateMsg:'',
      weekStr:'',
      newsList:'',
      user_info:{},
      option:{
     
          title: {
              text: '入库案件按部门统计',
              subtext: '按月分布'
          },
          tooltip: {
              trigger: 'axis'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [{
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              splitLine: {
                  show: false
              },
              axisTick: {
                  alignWithLabel: true
              }
          }],
          yAxis: [{
              type: 'value',
              splitLine: {
                  show: false
              },
              splitArea: {
                  show: true,
              },
          }],
          series: [{
              name: '数量',
              type: 'bar',
              barWidth : 35,
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              itemStyle: {
                  normal: {
                      // 随机显示
                      //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                    
                      // 定制显示（按顺序）
                      color: function(params) { 
                          var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                          return colorList[params.dataIndex] 
                      }
                  },
              },
              data: [32, 25, 39, 26, 28, 70, 75, 82, 48, 58, 16, 32],
          }]
      },
      option1:{
     
          title: {
              text: '出库案件按部门统计',
              subtext: '按月分布'
          },
          tooltip: {
              trigger: 'axis'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [{
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              splitLine: {
                  show: false
              },
              axisTick: {
                  alignWithLabel: true
              }
          }],
          yAxis: [{
              type: 'value',
              splitLine: {
                  show: false
              },
              splitArea: {
                  show: true,
              },
          }],
          series: [{
              name: '数量',
              type: 'bar',
              barWidth : 35,
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              itemStyle: {
                  normal: {
                      // 随机显示
                      //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                    
                      // 定制显示（按顺序）
                      color: function(params) { 
                          var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                          return colorList[params.dataIndex] 
                      }
                  },
              },
              data: [32, 25, 39, 26, 28, 70, 75, 82, 48, 58, 16, 32],
          }]
      },
      option2:{
     
          title: {
              text: '入库案件按时间统计',
              subtext: '按月分布'
          },
          tooltip: {
              trigger: 'axis'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [{
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              splitLine: {
                  show: false
              },
              axisTick: {
                  alignWithLabel: true
              }
          }],
          yAxis: [{
              type: 'value',
              splitLine: {
                  show: false
              },
              splitArea: {
                  show: true,
              },
          }],
          series: [{
              name: '数量',
              type: 'bar',
              barWidth : 35,
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              itemStyle: {
                  normal: {
                      // 随机显示
                      //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                    
                      // 定制显示（按顺序）
                      color: function(params) { 
                          var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                          return colorList[params.dataIndex] 
                      }
                  },
              },
              data: [32, 25, 39, 26, 28, 70, 75, 82, 48, 58, 16, 32],
          }]
      },
      option3:{
     
          title: {
              text: '出库案件按时间统计',
              subtext: '按月分布'
          },
          tooltip: {
              trigger: 'axis'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [{
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              splitLine: {
                  show: false
              },
              axisTick: {
                  alignWithLabel: true
              }
          }],
          yAxis: [{
              type: 'value',
              splitLine: {
                  show: false
              },
              splitArea: {
                  show: true,
              },
          }],
          series: [{
              name: '数量',
              type: 'bar',
              barWidth : 35,
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              itemStyle: {
                  normal: {
                      // 随机显示
                      //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                    
                      // 定制显示（按顺序）
                      color: function(params) { 
                          var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                          return colorList[params.dataIndex] 
                      }
                  },
              },
              data: [32, 25, 39, 26, 28, 70, 75, 82, 48, 58, 16, 32],
          }]
      }
    }
  },
  mounted(){
    
    this.getWeek();
    this.getDate();
    // this.getInByDept();
    // this.getOutByDept();
    // this.getInByTime();
    // this.getOutByTime();
    this.getUserName();
    this.loading();
    this.getNum();
    this.getNewsList();
    this.getSheetDate();
    this.getMonth();
    this.drawLine();
  },
  methods: {
    getInByDept(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
               
                self.$axios({
                    method: 'post',
                    url: '/chart/getInCaseCountByDept',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].dept_name);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.option.xAxis[0].data = countArr;
                        self.option.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
    },
    getOutByDept(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
               
                self.$axios({
                    method: 'post',
                    url: '/chart/getOutCaseCountByDept',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].dept_name);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.option1.xAxis[0].data = countArr;
                        self.option1.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
    },
    getInByTime(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
               
                self.$axios({
                    method: 'post',
                    url: '/chart/getInCaseCountByMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.option2.xAxis[0].data = countArr;
                        self.option2.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
    },
    getOutByTime(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
               
                self.$axios({
                    method: 'post',
                    url: '/chart/getOutCaseCountByMonth',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        var countArr = [];
                        var countArr1 = [];
                        for(var i = 0;i<data.data.data.length;i++){
                            countArr.push(data.data.data[i].month);
                            countArr1.push(data.data.data[i].quantity);
                        }
                        self.option3.xAxis[0].data = countArr;
                        self.option3.series[0].data = countArr1;
                        self.drawLine();
                    }else{
                      self.$response(data,self);
                    }
                 });
    },
    getSheetDate(){
      var self = this;
      
    },
    getNewsList(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                params.append('pageNum',1);
                params.append('pageSize',10);
                params.append('msg_read','0');
                // const loading = self.$loading({
                //   lock: true,
                //   text: '打印中',
                //   spinner: 'el-icon-loading',
                //   background: 'rgba(0, 0, 0, 0.6)'
                // });
                self.$axios({
                    method: 'post',
                    url: '/msg/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                      self.msgList = data.data.data.list;
                      // loading.close();
                      // self.$message({
                      //   type: 'success',
                      //   message: '已发送打印请求'
                      // });
                    }else{
                      self.$response(data,self);
                    }
                 });
      
    },
    getNum(){
                var self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
               
                self.$axios({
                    method: 'post',
                    url: '/chart/index',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                     self.numInfo = data.data.data;
                      
                    }else{
                      self.$response(data,self);
                    }
                 });      
    },
    jieshouClick(){
      
    },
    shenpiClick(){
      
    },
    newsClick(){
      
    },
    getUserName(){
      
      
      var self = this;
               
    },
    getWeek(){
      var a = new Array("日", "一", "二", "三", "四", "五", "六");  
      var week = new Date().getDay();  
      var str = "星期"+ a[week];
      this.weekStr = str;
      console.log(str)
    },
    getMonth(){
      var date=new Date;
      var month=date.getMonth()+1;
      this.monthStr = month;
    },
    getDate(){
       var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.dateMsg = currentdate;
        console.log(currentdate)
    },
    loading(){
      var self = this;
      
    },
    drawLine(){
        var self = this;
        // 基于准备好的dom，初始化echarts实例
            let myEchars1 = this.$echarts.init(document.getElementById('myEchars1'))
        // 绘制图表
            myEchars1.setOption(self.option);
        // 基于准备好的dom，初始化echarts实例
            let myEchars2 = this.$echarts.init(document.getElementById('myEchars2'))
        // 绘制图表
            myEchars2.setOption(self.option1);
        // 基于准备好的dom，初始化echarts实例
            let myEchars3 = this.$echarts.init(document.getElementById('myEchars3'))
        // 绘制图表
            myEchars3.setOption(self.option2);
        // 基于准备好的dom，初始化echarts实例
            let myEchars4 = this.$echarts.init(document.getElementById('myEchars4'))
        // 绘制图表
            myEchars4.setOption(self.option3);
             
           
        
        
    },
    open3() {
      var self = this;
        this.$prompt('请输入新密码(6-18位，字母开头且只能是字母数字组合)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[a-zA-Z]\w{5,17}$/,
          inputErrorMessage: '密码格式不正确'
        }).then(({ value }) => {
                self.$axios({
                    method: 'post',
                    url: self.$url+'/exhibit/public/index.php/user/Index/resetPw',
                    data: {
                      pass_word:value
                    },
                    headers: {'Content-Type': 'application/json'},
                 }).then(function(data){
                    console.log(data)
                    if(data.data.code==0){
                              self.$message({
                                type: 'success',
                                message: '你的新密码: ' + value
                              });
                    }else if(data.data.code==403){
                         self.$router.push('/Login');
                        
                    }else if(data.data.code==404){
                         // self.$router.push('/Login');
                        self.$message({
                          message: '权限不足',
                          type: 'warning'
                        });
                        
                    }else{
                      self.$message({
                        message: data.data.msg,
                        type: 'warning'
                      });
                    }
                    
                 });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    open4() {
      var self = this;
        this.$prompt('请输入手机号(11位)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
          inputErrorMessage: '手机号格式不正确'
        }).then(({ value }) => {
                self.$axios({
                    method: 'post',
                    url: self.$url+'/exhibit/public/index.php/user/Index/updateUser',
                    data: {
                      user_tel:value
                    },
                    headers: {'Content-Type': 'application/json'},
                 }).then(function(data){
                    console.log(data)
                    if(data.data.code==0){
                              self.$message({
                                type: 'success',
                                message: '你的手机号: ' + value
                              });
                              self.getWeek();
                              self.getDate();
                              self.getUserName();
                              self.loading();
                              self.getNum();
                              self.getNewsList();
                              self.getSheetDate();
                              self.getMonth();
                    }else if(data.data.code==403){
                         self.$router.push('/Login');
                        
                    }else if(data.data.code==404){
                         // self.$router.push('/Login');
                        self.$message({
                          message: '权限不足',
                          type: 'warning'
                        });
                        
                    }else{
                      self.$message({
                        message: data.data.msg,
                        type: 'warning'
                      });
                    }
                    
                 });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
  },
}

</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
    .box{
        width:100%;
        height:100%;
        overflow: scroll;
        
    }
    .box::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
    }
    .box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
    }
    .box::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
    }
    .left{
        width:25%;
        height:100%;
        float:left;
    }
    .right{
        width:100%;
        height:100%;
       /*border:1px solid #ccc;*/
       float:right;
    }
    .left-top{
        width:100%;
        height:45%;
        background-color:#71b7db    ;
        position:relative;
        border:1px solid #ccc;
    }
    .left-bottom{
        width:100%;
        height:55%;
        border:1px solid #ccc;
        background-color:#71b7db;
        position: relative;
    }
    .left-top img{
        width:150px;
        height:150px;
        position: absolute;
        left:50%; top: 50%;
        margin-left: -75px;
        margin-top: -95px;
    }
    .username{
        width:150px;
        height:40px;
        background-color:#71b7db;
        color:#fff;
        font-size:22px;
        border-radius:20px;
        border:1px solid #71b7db    ;
        position:absolute;
        bottom:10px;
        left:50%;
        margin-left:-75px;
        text-align:center;
        line-height:40px;
    }
    .date{
        width:100%;
        height:50px;
        line-height:50px;
        text-align:center;
        font-size:22px;
        background-color:#c2e0f0;
    }
    .time{
        width:100%;
        height:50px;
        line-height:50px;
        text-align:center;
        font-size:25px;
        background-color:#c2e0f0;
    }
    .left .btn{
        width:150px;
        height:40px;
        margin:0 auto;
        margin-top:10px;
        line-height:40px;
        text-align:center;
        font-size:20px;
        background-color:#47a1d2;
        border:1px solid #47a1d2;
        border-radius:30px;
        color:#fff;
    } 
     .left .btn1{
        width:200px;
        height:40px;
        margin:0 auto;
        margin-top:10px;
        line-height:40px;
        text-align:center;
        font-size:20px;
        background-color:#47a1d2;
        border:1px solid #47a1d2;
        border-radius:30px;
        color:#fff;
    } 
    .rightTop{
        width:100%;
        height:100px;
        
    }
    .littleBox{
        width:24.1%;
        height:95%;
        float:left;
        margin-left:8px;
        border:1px solid #ccc;
    }
    .leftIcon{
        width:35%;
        height:100%;
        background-color:#71b7db;
        color:#fff;
        line-height:90px;
        text-align:center;
        float:left;
    }
     .rightTitle{
        width:65%;
        height:100%;
        /*background-color:#c2e0f0;*/
        color:#002b80;
        line-height:90px;
        text-align:center;
        float:left;
    }
    .rightCenter{
        width:100%;
        height:40%;
        
    }
    .table{
        width:48.8%;
        height:99%;
        margin-top:10px;
        border:1px solid #ccc;
        float:left;
        margin-left:10px;
        overflow:hidden;
    }
    .tableTop{
        width:100%;
        height:30px;
        background-color:#b3f2ff;
        border-bottom:1px solid #ccc;
        font-size:16px;
        font-weight: bold;
        line-height:30px;
        text-align:center;
    }
    .tableBody{
        width:100%;
        height:30px;
        line-height:30px;
        text-indent:15px;
        font-size:14px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        border-bottom:1px solid #ccc;
    }
    .tableBody2{
        width:24.5%;
        height:20%;
        border-right:1px solid #ccc;
        line-height:45px;
        
        font-size:14px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        border-bottom:1px solid #ccc;
        text-align:center;
        float:left;
    }
    .el-icon-bell,.el-icon-date,.el-icon-sort,.el-icon-refresh{
      font-size: 22px;
    }
</style>