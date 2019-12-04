<template>
    <div  class="login-wrap">
        <div class="head-img">
            <!-- <img src="../../../static/img/head1.png" alt="">
            <img src="../../../static/img/head2.png" alt=""> -->
        </div>
        <div class="back-white">
            <div class="userBox1">
                <div class="eattime">
                    当天未打卡情况统计
                </div>
                <div class="conent-box-1">
                    <el-carousel :interval="interval" height="1400px" >
                        <el-carousel-item>
                            <!-- <h3>{{ item }}</h3> -->
                            <div class="tab_title">
                                <ul>
                                    <li>
                                        干警
                                    </li>
                                </ul>
                            </div>
                            <div class="tableList1" id="tableList1">
                                <el-table
                                    :header-cell-style="{ 'background-color': '#03004D','color':'#fff','height':'90px'}"
                                    :data="tableData1"
                                    style="width: 92%;margin:0 auto;"
                                    :row-style="rowStyle">
                                    <el-table-column
                                        type="index"
                                        align="center"
                                        width="50">
                                    </el-table-column>
                                    <el-table-column
                                        label="照片"
                                        align="center"
                                        prop="">
                                        <template  slot-scope="props">
                                            <img  @click="lookPic(props.row)" class="headImg1" :src="props.row.face_url" alt="">
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="记录时间"
                                        align="center"
                                        prop="eat_time">
                                    </el-table-column>
                                    <el-table-column
                                        label="就餐类型"
                                        align="center"
                                        >
                                        <template slot-scope="props">
                                        <span>{{props.row.eat_type=='breakfast'?'早餐':''}}</span>
                                        <span>{{props.row.eat_type=='lunch'?'午餐':''}}</span>
                                        <span>{{props.row.eat_type=='dinner'?'晚餐':''}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="人员"
                                        align="center"
                                        prop="user_true_name"
                                        >
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item >
                            <!-- <h3>{{ item }}</h3> -->
                            <div class="tab_title">
                                <ul>
                                    <li >
                                        陌生人
                                        <!-- {{item.itemText}} -->
                                    </li>
                                    
                                </ul>
                            </div>
                            <div class="tableList1" id="tableList1">
                                <el-table
                                    :header-cell-style="{ 'background-color': '#03004D','color':'#fff','height':'90px'}"
                                    :data="tableData2"
                                    style="width: 92%;margin:0 auto;"
                                    :row-style="rowStyle">
                                    <el-table-column
                                        type="index"
                                        align="center"
                                        width="50">
                                    </el-table-column>
                                    <el-table-column
                                        label="照片"
                                        align="center"
                                        prop="">
                                        <template  slot-scope="props">
                                            <img  @click="lookPic(props.row)" class="headImg1" :src="props.row.face_url" alt="">
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="记录时间"
                                        align="center"
                                        prop="eat_time">
                                    </el-table-column>
                                    <el-table-column
                                        label="就餐类型"
                                        align="center"
                                        >
                                        <template slot-scope="props">
                                        <span>{{props.row.eat_type=='breakfast'?'早餐':''}}</span>
                                        <span>{{props.row.eat_type=='lunch'?'午餐':''}}</span>
                                        <span>{{props.row.eat_type=='dinner'?'晚餐':''}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="人员"
                                        align="center"
                                        prop="user_true_name"
                                        >
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item >
                            <!-- <h3>{{ item }}</h3> -->
                            <div class="tab_title">
                                <ul>
                                    <li >
                                        其他
                                        <!-- {{item.itemText}} -->
                                    </li>
                                    
                                </ul>
                            </div>
                            <div class="tableList1" id="tableList1">
                                <el-table
                                    :header-cell-style="{ 'background-color': '#03004D','color':'#fff','height':'90px'}"
                                    :data="tableData3"
                                    style="width: 92%;margin:0 auto;"
                                    :row-style="rowStyle">
                                    <el-table-column
                                        type="index"
                                        align="center"
                                        width="50">
                                    </el-table-column>
                                    <el-table-column
                                        label="照片"
                                        align="center"
                                        prop="">
                                        <template  slot-scope="props">
                                            <img  @click="lookPic(props.row)" class="headImg1" :src="props.row.face_url" alt="">
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="记录时间"
                                        align="center"
                                        prop="eat_time">
                                    </el-table-column>
                                    <el-table-column
                                        label="就餐类型"
                                        align="center"
                                        >
                                        <template slot-scope="props">
                                        <span>{{props.row.eat_type=='breakfast'?'早餐':''}}</span>
                                        <span>{{props.row.eat_type=='lunch'?'午餐':''}}</span>
                                        <span>{{props.row.eat_type=='dinner'?'晚餐':''}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="人员"
                                        align="center"
                                        prop="user_true_name"
                                        >
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    
                </div>
                
                <div class="eattime1">
                    日期：{{today}} /
                    早餐未打卡总人数：{{breakfast_card_0}} /
                    午餐未打卡总人数：{{lunch_card_0}}

                </div>
            </div>
        </div>
        <!-- <el-dialog
          title="打卡成功"
          :visible.sync="dialogCard"
          width="40%"
          >
          <span>{{msg_card}}</span>
        </el-dialog> -->

    </div>
</template>

<script>
    import md5 from 'js-md5';
    import {bus} from '../../main.js';
    export default {
        data: function(){
            return {
                // {
                //     face_url:"../../../static/img/test.png"
                // }
                tableData1: [],
                tableData2: [],
                tableData3: [],
                pageNum1:1,
                pageNum2:1,
                pageNum3:1,
                pageSize:12,
                total:0,
                loadSign:false,
                today:"2019-11-11",
                breakfast_card_0:"15",
                lunch_card_0:"20",
                active:'',
                interval:10000,
            }
        },
        methods: {
            
            getDataList1(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                // var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
                console.log(date2)
                var startTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + "00" + ':' + "00" + ':' + "00"
                // var finishTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + (date2.getDate()+24*60*60*1000) + ' ' + "00" + ':' + "00" + ':' + "00"
                
                console.log(date2.getDate()+24*60*60*1000)
                var day3 = new Date();
                day3.setTime(day3.getTime()+24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() + ' ' + "00" + ':' + "00" + ':' + "00";

                var begin_time = startTime;
                var end_time = finishTime;
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('pageNum',self.pageNum1);
                params.append('pageSize',self.pageSize);
                params.append("user_type","yuangong");
                // card=0代表未打卡
                // bd_card=0代表未补打
                params.append('card','0');
                params.append('bd_card','0');

                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.tableData1 = data.data.data.list;
                        self.pageNum1 = self.pageNum1+1;
                        self.total = data.data.data.total;
                        if(self.tableData1.length < 12){
                            self.pageNum1 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            getDataList2(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                // var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
                // console.log(date2)
                var startTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + "00" + ':' + "00" + ':' + "00"
                // var finishTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + (date2.getDate()+24*60*60*1000) + ' ' + "00" + ':' + "00" + ':' + "00"
                
                // console.log(date2.getDate()+24*60*60*1000)
                var day3 = new Date();
                day3.setTime(day3.getTime()+24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() + ' ' + "00" + ':' + "00" + ':' + "00";

                var begin_time = startTime;
                var end_time = finishTime;
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('pageNum',self.pageNum2);
                params.append('pageSize',self.pageSize);
                params.append("user_type","moshengren");
                // card=0代表未打卡
                // bd_card=0代表未补打
                params.append('card','0');
                params.append('bd_card','0');

                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.tableData2 = data.data.data.list;
                        self.pageNum2 = self.pageNum2+1;
                        self.total = data.data.data.total;
                        if(self.tableData2.length < 12){
                            self.pageNum2 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            getDataList3(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                // var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
                // console.log(date2)
                var startTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + "00" + ':' + "00" + ':' + "00"
                // var finishTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + (date2.getDate()+24*60*60*1000) + ' ' + "00" + ':' + "00" + ':' + "00"
                
                // console.log(date2.getDate()+24*60*60*1000)
                var day3 = new Date();
                day3.setTime(day3.getTime()+24*60*60*1000);
                var finishTime = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate() + ' ' + "00" + ':' + "00" + ':' + "00";

                var begin_time = startTime;
                var end_time = finishTime;
                params.append('begin_time',begin_time);
                params.append('end_time',end_time);
                params.append('pageNum',self.pageNum3);
                params.append('pageSize',self.pageSize);
                params.append("user_type","qita");
                // card=0代表未打卡
                // bd_card=0代表未补打
                params.append('card','0');
                params.append('bd_card','0');

                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.tableData3 = data.data.data.list;
                        self.pageNum3 = self.pageNum3+1;
                        self.total = data.data.data.total;
                        if(self.tableData3.length < 12){
                            self.pageNum3 = 1
                        }
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            // 早餐未打卡总人数
            getBreakfast(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getTodayUserQuantity',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                }).then(function(data){
                    
                    if(data.data.code==0){
                        self.today = data.data.data.today;
                        self.breakfast_card_0 = data.data.data.breakfast_card_0;
                        self.lunch_card_0 = data.data.data.lunch_card_0;
                    }else{
                        self.$response(data,self);
                    }
                });
            },
            rowStyle({ row, rowIndex}){
                console.log(row)
                console.log(rowIndex)
                if(rowIndex%2 ==0){
                    return 'background:#eee;color:#000;height:90px;line-height:90px'
                }else{
                    return 'background:#e5e7e8;color:#000;line-height:90px'
                }
            },   
   
           

        },
        mounted(){
            var self = this;
            self.getDataList1();
            self.getDataList2();
            self.getDataList3();
            self.getBreakfast()
            setInterval(function(){
                self.getDataList1();
                self.getDataList2();
                self.getDataList3();
            },8000);
            
        },
        created(){
            document.oncontextmenu = function(){
                event.returnValue = false;
            }
            var self = this;

            // bus.$on('isCard',function(val, code){
            //     self.showCard(val,code);
            // })
        }
    }
    
</script>

<style>
    #tableList1 .el-table .cell{
        line-height: 80px;
    }
</style>
<style scoped>
    .clear{
        clear: both;
    }
    .eattime{
        color: #002770;
        font-size: 35px;
        text-align: center;
        padding-top: 60px;
    }
    .eattime1{
        color: #002770;
        font-size: 24px;
        text-align: right;
        margin-right: 20px;
        margin-top: 20px;
    }
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../../static/img/banner2.png);
        background-size: 100% 100%;
        overflow: hidden;
    }
    .head-img{
        margin-top: 2px;
        /* text-align: center; */
        width: 100%;
        height: 150px;
        background-image: url(../../../static/img/head1.jpg);
        background-size: 100% 100%;
    }
    .back-white{
        /* position: relative;
        width:100%;
        height:100%;
        background-image: url(../../../static/img/radius.png);
        background-size: 100% 100%;
        overflow: hidden; */
        width: 96%;
        height: 90%;
        margin: 0px auto 20px;
        background-color: #ffffff;
        border-radius: 12px;
        
    }
    .outruleBoxTitle{
        width: 100%;
        height: 50px;
        background-color: #2B5CA9;
    }
    .outruleBoxHeadline{
        width: 100%;
        height: 50px;
        background-color: #012770;
        color:#ffffff;
        text-align: center;
        line-height: 50px;
        font-size: 24px;
    }
    .outruleBoxTitleItem{
        width: 33.1%;
        height: 50px;
        float: left;
        text-align: center;
        line-height: 50px;
        color: #fff;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        /*background-color: red;*/
    }
    .outruleBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        border:2px solid #012770;
    }
    .userBox1{
        height: 100%;
    }
    .conent-box-1{
        height: 87%;
    }
    .tableList1{
        margin-top: 20px;
        height: 87%;
        overflow-y: auto;
    }
    .headImg1{
        width: 96px;
        height: 110px;
    }
    .tab_title{
        width:30%;
        margin: 0 auto;
        background: #0000CD;
        margin-top: 40px;
        /* border: 2px solid #A9A9A9; */
        height: 80px;
        /* border-radius */
         border-radius: 10px;
    }
    .tab_title ul{
        display: flex;
        justify-content: space-around;
    }
    .tab_title li{
        width: 30%;
        text-align: center;
        list-style:none;
        height: 80px;
        line-height: 80px;
        font-size: 26px;
        color: #ffffff;
       
    }
    .tab_title .active{
        border-bottom: 2px solid #0000CD;
    }
</style>