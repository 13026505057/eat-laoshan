<template>
    <div class="login-wrap">
        <div class="head-img">
            <!-- <img src="../../../static/img/head1.png" alt="">
            <img src="../../../static/img/head2.png" alt=""> -->
        </div>
        <div class="back-white">
            <div class="userBox1">
                <div class="normal">
                    <div class="normalTitle">
                        干警
                    </div>
                    <div class="normalTitle2">
                        干警总数：{{yuangongQuantity}}
                    </div>
                    <div class="normalTitle2">
                        今日实刷：{{yuangongEatQuantity}}
                    </div>
                </div>
                <div class="normal">
                    <div class="normalTitle">
                        临时餐卡
                    </div>
                    <div class="normalTitle2">
                        餐卡总数：{{fangkeQuantity}}
                    </div>
                    <div class="normalTitle2">
                        今日实刷：{{fangkeEatQuantity}}
                    </div>
                </div>
                <div class="normal">
                    <div class="normalTitle">
                        特殊餐卡
                    </div>
                    <div class="normalTitle2">
                        餐卡总数：{{teshuQuantity}}
                    </div>
                    <div class="normalTitle2">
                        今日实刷：{{teshuEatQuantity}}
                    </div>
                </div>
                <!-- <div class="userBoxItem">
                    <div class="userFace">
                        <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                    </div>
                    <div class="userType">
                        陌生人
                    </div>
                </div> -->
            
            </div>
            <div class="userBox2">
                <div class="outruleBox">
                    <div class="outruleBoxHeadline">未打卡</div>
                    <div class="outruleBoxTitle">
                        <div class="outruleBoxTitleItem">
                            时间
                        </div>
                        <div class="outruleBoxTitleItem">
                            姓名
                        </div>
                        <div class="outruleBoxTitleItem" style="border-right: none;">
                            违规类型
                        </div>
                    </div>
                    <div class="outruleBoxTitle" v-for="(outruleItem,index) in outruleItems" :key="index">
                        <div class="outruleBoxTitleItem">
                            <!-- 2019-08-01 23：23：23 -->
                            {{outruleItem.eat_time}}
                        </div>
                        <div class="outruleBoxTitleItem">
                            {{outruleItem.user_true_name}}
                        </div>
                        <div class="outruleBoxTitleItem" style="border-right: none;">
                            未刷卡
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="userBox3">
                <div class="normal1">
                    <div class="normalTitle">
                        未注册人员
                    </div>
                    <div class="userBoxItem" v-for="(stranger,index) in strangers" :key="index">
                        <div class="userFace">
                            <img style="width: 100%;height: 100%;" :src="stranger.face_url">
                        </div>
                    </div>
                    <!-- <div class="userBoxItem">
                        <div class="userFace">
                            <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                        </div>
                    </div>
                    <div class="userBoxItem">
                        <div class="userFace">
                            <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                        </div>
                    </div>
                    <div class="userBoxItem">
                        <div class="userFace">
                            <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                        </div>
                    </div> -->
                </div>
                
                <!-- <div class="userBoxItem">
                    <div class="userFace">
                        <img style="width: 100%;height: 100%;" src="../../../static/img/test.png">
                    </div>
                    <div class="userType">
                        陌生人
                    </div>
                </div> -->
            
            </div>
            <div class="clear"></div>
            <div class="eattime">{{eat_date}}/
                <span>{{eat_type=="breakfast"?"早餐":""}}</span>
                <span>{{eat_type=="lunch"?"午餐":""}}</span>
                <span>{{eat_type=="dinner"?"晚餐":""}}</span>
                打卡情况
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
                dialogCard:false,
                msg_card:'',
                tableData: [{
                      date: '2016-05-02',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                      date: '2016-05-04',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                      date: '2016-05-03',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1516 弄'
                    }],
                yuangongEatQuantity:'',
                yuangongQuantity:'',
                fangkeQuantity:'',
                fangkeEatQuantity:"",
                teshuQuantity:'',
                teshuEatQuantity:'',
                outruleItems:[],
                strangers:'',
                eat_date:'',
                eat_type:'',
            }
        },
        methods: {
            getCardOut(){
                const self = this;
                var params = new URLSearchParams();
                var token = localStorage.getItem('auth');
                
                params.append('begin_time','');
                params.append('end_time','');
                params.append('card',0);
                params.append('pageNum',1);
                params.append('pageSize',200);
                params.append('user_id','');
                params.append('eat_type',self.eat_type);
                params.append('user_tel',self.user_tel);
                params.append('user_type',self.user_type);
                //这里需要查的是当前就餐
                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getByPage',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','kf-token':token},
                 }).then(function(data){
                    
                    if(data.data.code==0){
                        self.caseList = data.data.data.list;
                        self.total = data.data.data.total;
                    }else{
                      self.$response(data,self);
                    }
                 });
            },
            getCard(){
                // log/eat-log/getNowEatUserQuantity
                // 带eat实刷
                const self = this;
                var params = new URLSearchParams();
                //这里需要查的是当前就餐
                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getNowEatUserQuantity',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).then(function(data){
                    if(data.data.code==0){
                        self.yuangongEatQuantity = data.data.data.yuangong_eat_quantity;
                        self.yuangongQuantity = data.data.data.yuangong_quantity;
                        self.fangkeQuantity = data.data.data.fangke_quantity;
                        self.fangkeEatQuantity = data.data.data.fangke_eat_quantity;
                        self.teshuQuantity = data.data.data.teshu_quantity;
                        self.teshuEatQuantity = data.data.data.teshu_eat_quantity;
                        self.strangers = data.data.data.msr;
                        self.eat_type = data.data.data.eat_type;
                        self.eat_date = data.data.data.eat_date;

                    }else{
                      self.$response(data,self);
                    }
                });
            },
            // 违规
            getOutOfLine(){
                const self = this;
                var params = new URLSearchParams();
                //这里需要查的是当前就餐
                self.$axios({
                    method: 'post',
                    url: '/log/eat-log/getNowEatUserNoMsr',
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).then(function(data){
                    if(data.data.code==0){
                        self.outruleItems = data.data.data;
                    }else{
                      self.$response(data,self);
                    }
                });
            },
            showCard(val,code){
                var self  = this;
                // self.msg_card = val;
                // self.dialogCard = true;
                if(code == "0"){
                    self.$notify({
                        title: '打卡成功',
                        message: val,
                        type: 'success',
                        duration:3000,
                    });
                }else{
                    self.$notify.error({
                        title: '打卡失败',
                        message: val,
                        duration:3000,
                    });
                }
                
                // setTimeout(function(){
                    // self.dialogCard = false;
                // },2000)
            },

        },
        mounted(){
            var self = this;
            // this.onload();
            
            this.getCard();
            this.getOutOfLine();
            setInterval(function(){
                self.getCard();
                self.getOutOfLine();
            },10000);
            
        },
        created(){
            var self = this;
            bus.$on('isCard',function(val, code){
                self.showCard(val,code);
            })
        }
    }
</script>

<style scoped>
    .clear{
        clear: both;
    }
    .eattime{
        color: #002770;
        font-size: 20px;
        text-align: right;
        margin-right: 20px;
        margin-top: 10px;
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
        height: 90px;
        background-image: url(../../../static/img/headjpg.jpg);
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
    .normalTitle{
        width: 100%;
        height: 36px;
        /* margin: 0 auto; */
        line-height: 36px;
        font-size: 24px;
        text-align: center;
        color: #fff;
        /* margin-top: 9px; */
        letter-spacing: 10px;
        /* border-bottom: 1px solid #fff; */
        background-color: #002770;
    }
    .normalTitle2{
        width: 100%;
        height: 50px;
        line-height: 30px;
        font-size: 24px;
        text-align: center;
        color: #fff;
        margin-top: 50px;
        letter-spacing: 20px;
    }
    .normal{
        width: 100%;
        height: 32.6%;
        margin-top: 2%;
        background-color: #2A5CAA;
        /* background-image: url(../../../static/img/banner1.png); */
        background-size: 100% 100%; 
        overflow: hidden;
    }
    .normal1{
        width: 100%;
        height: 100%;
        /* margin-top: 3%; */
        background-color: #2A5CAA;
        background-size: 100% 100%; 
        overflow: hidden;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -260px;
        text-align: center;
        font-size:35px;
        color: #fff;

    }
    .ms-title2{
        position: absolute;
        top:60%;
        width:100%;
        margin-top: -280px;
        text-align: center;
        font-size:45px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:65%;
        width:300px;
        height:160px;
        margin:-190px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background-color: #e4e4e4;
    }
    .el-input__inner{
        border-radius: 20px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .userBox1,.userBox2,.userBox3{
        
        height: 90%;
        margin:0 auto;
        
        margin-left: 1.2%;
        float: left;
        /*background-color: red;*/
    }
    .userBox1{
        width: 28.5%;
        margin-top: 1.4%;
    }
    .userBox2{
        width: 38.5%;
        margin-top: 2%;
    }
    .userBox3{
        width: 28.5%;
        margin-top: 2%;
    }
    .userBoxItem{
        width: 150px;
        height: 170px;
        margin-left: 20px;
        margin-top: 20px;
        float: left;
        /*background-color: blue;*/

    }
    .userFace{
        width: 100%;
        height: 170px;
        /*background-color: black;*/
    }
    .userType{
        width: 100%;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: red;
    }
    
</style>